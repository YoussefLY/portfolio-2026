"use client";

import gsap from "gsap";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP);

export const MOTION = {
  duration: 0.4,
  ease: "power3.out",
} as const;

export const FADE_FROM = { autoAlpha: 0, y: 10 } as const;
export const FADE_TO = { autoAlpha: 1, y: 0 } as const;

export { gsap, useGSAP };
