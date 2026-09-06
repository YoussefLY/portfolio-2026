"use client";

import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(useGSAP, ScrollTrigger);

export { MOTION, FADE_FROM, FADE_TO } from "./gsap";

export function isAboveRevealLine(el: Element) {
  return el.getBoundingClientRect().top < window.innerHeight * 0.82;
}

export { gsap, useGSAP, ScrollTrigger };
