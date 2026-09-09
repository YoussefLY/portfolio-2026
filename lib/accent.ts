import "server-only";
import { readFile } from "node:fs/promises";
import path from "node:path";
import { cache } from "react";
import sharp from "sharp";

/**
 * The dominant colour of an image, computed at build time.
 * `hex` is the colour as it appears in the picture; `ink` is the same hue
 * darkened until it actually passes WCAG AA against the page as small text.
 */
export type ImageAccent = { hex: string; ink: string };

const SAMPLE_SIZE = 200;
const HUE_BINS = 24;

// Pixels outside these bounds are treated as "not a colour": near-white,
// near-black, and greys are ignored so a screenshot's chrome does not win.
const MAX_LIGHTNESS = 0.9;
const MIN_LIGHTNESS = 0.1;
const MIN_SATURATION = 0.25;

// `ink` is used for 9.5-11px labels, so it has to clear AA's 4.5:1 for small text.
// Aim past it: exactly 4.5 leaves nothing for a future background tint.
const PAGE_BG: [number, number, number] = [255, 255, 255];
const MIN_CONTRAST = 5;
// Below this the hue is gone and the accent is indistinguishable from --ink.
const INK_MIN_LIGHTNESS = 0.14;
const INK_MIN_SATURATION = 0.35;

type Bin = { weight: number; r: number; g: number; b: number };

function rgbToHsl(r: number, g: number, b: number): [number, number, number] {
  r /= 255;
  g /= 255;
  b /= 255;
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  const l = (max + min) / 2;
  if (max === min) return [0, 0, l];
  const d = max - min;
  const s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
  let h: number;
  if (max === r) h = (g - b) / d + (g < b ? 6 : 0);
  else if (max === g) h = (b - r) / d + 2;
  else h = (r - g) / d + 4;
  return [h * 60, s, l];
}

function toHex(r: number, g: number, b: number): string {
  return `#${[r, g, b].map((v) => Math.round(v).toString(16).padStart(2, "0")).join("")}`;
}

function hslToRgb(h: number, s: number, l: number): [number, number, number] {
  const k = (n: number) => (n + h / 30) % 12;
  const a = s * Math.min(l, 1 - l);
  const f = (n: number) => (l - a * Math.max(-1, Math.min(k(n) - 3, Math.min(9 - k(n), 1)))) * 255;
  return [f(0), f(8), f(4)];
}

/** WCAG 2.x relative luminance. */
function luminance([r, g, b]: [number, number, number]): number {
  const [rs, gs, bs] = [r, g, b].map((v) => {
    const c = v / 255;
    return c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4;
  });
  return 0.2126 * rs + 0.7152 * gs + 0.0722 * bs;
}

function contrast(a: [number, number, number], b: [number, number, number]): number {
  const [x, y] = [luminance(a), luminance(b)];
  return (Math.max(x, y) + 0.05) / (Math.min(x, y) + 0.05);
}

/**
 * Darken the hue until it clears MIN_CONTRAST against the page. HSL lightness is not
 * perceptual — a saturated yellow and a saturated blue at the same L read very
 * differently against white — so clamping L is a proxy that silently fails. This
 * measures instead, and binary-searches the lightness that just passes.
 */
function readableInk(h: number, s: number, l: number): string {
  const sat = Math.max(s, INK_MIN_SATURATION);
  if (contrast(hslToRgb(h, sat, l), PAGE_BG) >= MIN_CONTRAST) return toHex(...hslToRgb(h, sat, l));
  let lo = INK_MIN_LIGHTNESS;
  let hi = l;
  for (let i = 0; i < 24; i++) {
    const mid = (lo + hi) / 2;
    if (contrast(hslToRgb(h, sat, mid), PAGE_BG) >= MIN_CONTRAST) lo = mid;
    else hi = mid;
  }
  return toHex(...hslToRgb(h, sat, lo));
}

/** Resolve a `/public`-relative URL (as used in `heroImage`) to a file on disk. */
function publicFile(src: string): string {
  return path.join(process.cwd(), "public", src.replace(/^\/+/, ""));
}

/**
 * Pick the dominant colour by binning saturated pixels by hue and weighting each
 * pixel by how vivid it is, so a small but strong brand colour beats a large
 * area of tinted grey. The returned colour is the weighted average of the
 * winning hue bin, i.e. the actual shade that shows up in the picture.
 */
export const getImageAccent = cache(async (src: string): Promise<ImageAccent | null> => {
  let data: Buffer;
  try {
    const file = await readFile(publicFile(src));
    data = await sharp(file)
      .resize(SAMPLE_SIZE, SAMPLE_SIZE, { fit: "inside", withoutEnlargement: true })
      .removeAlpha()
      .raw()
      .toBuffer();
  } catch {
    return null;
  }

  const bins = new Map<number, Bin>();
  for (let i = 0; i + 2 < data.length; i += 3) {
    const r = data[i];
    const g = data[i + 1];
    const b = data[i + 2];
    const [h, s, l] = rgbToHsl(r, g, b);
    if (l > MAX_LIGHTNESS || l < MIN_LIGHTNESS || s < MIN_SATURATION) continue;
    // Vivid mid tones count most; washed-out or very dark pixels count less.
    const weight = s * (1 - Math.abs(l - 0.5) * 0.8);
    const key = Math.round(h / (360 / HUE_BINS)) % HUE_BINS;
    const bin = bins.get(key) ?? { weight: 0, r: 0, g: 0, b: 0 };
    bin.weight += weight;
    bin.r += r * weight;
    bin.g += g * weight;
    bin.b += b * weight;
    bins.set(key, bin);
  }

  let best: Bin | null = null;
  for (const bin of bins.values()) {
    if (!best || bin.weight > best.weight) best = bin;
  }
  if (!best || best.weight === 0) return null;

  const r = best.r / best.weight;
  const g = best.g / best.weight;
  const b = best.b / best.weight;
  const [h, s, l] = rgbToHsl(r, g, b);

  return {
    hex: toHex(r, g, b),
    ink: readableInk(h, s, Math.min(l, 0.4)),
  };
});
