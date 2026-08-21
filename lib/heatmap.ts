import type { CSSProperties } from "react";

const OPACITY_BY_LEVEL = [0.07, 0.22, 0.44, 0.68, 0.92];

function levels(n: number, seed: number): number[] {
  const out: number[] = [];
  let s = seed;
  for (let i = 0; i < n; i++) {
    s = (s * 1103515245 + 12345) & 0x7fffffff;
    const r = (s >>> 11) / 1048576;
    const dow = i % 7;
    const weekend = dow === 0 || dow === 6 ? 0.45 : 1;
    const burst = Math.sin(i / 23) * 0.35 + Math.sin(i / 7) * 0.15 + 0.5;
    const v = r * 0.55 + burst * 0.45;
    out.push(Math.max(0, Math.min(4, Math.round(v * weekend * 4.6))));
  }
  return out;
}

function cell(level: number, size: number): CSSProperties {
  return {
    width: size,
    height: size,
    borderRadius: 1,
    background: "var(--accent)",
    opacity: OPACITY_BY_LEVEL[level],
  };
}

/** Deterministic contribution heatmap, seeded so server and client render identically. */
export function heatmapCells(days: number, seed: number, size: number): CSSProperties[] {
  return levels(days, seed).map((level) => cell(level, size));
}
