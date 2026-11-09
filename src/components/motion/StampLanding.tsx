"use client";

import { useEffect } from "react";
import { prefersReducedMotionNow } from "@/lib/reducedMotion";

function land(label: HTMLElement, delay: number) {
  label.style.opacity = "";
  label.animate(
    [
      { scale: 2.8, rotate: "14deg", opacity: 0 },
      { scale: 0.93, rotate: "-3deg", opacity: 1, offset: 0.62, easing: "ease-out" },
      { scale: 1.04, rotate: "1deg", offset: 0.82 },
      { scale: 1, rotate: "0deg", opacity: 1 },
    ],
    { duration: 460, delay, easing: "cubic-bezier(0.55, 0.05, 0.9, 0.4)", fill: "backwards" },
  );
  label.closest<HTMLElement>("[data-stamp-pad]")?.animate(
    [{ translate: "0 0" }, { translate: "0 5px" }, { translate: "0 -2px" }, { translate: "0 0" }],
    { duration: 300, delay: delay + 280 },
  );
}

/** The folder labels stamp down the first time they come into view. */
export function StampLanding() {
  useEffect(() => {
    if (prefersReducedMotionNow()) return;
    // Labels already on screen stay put; only the ones still below get to land.
    const labels = Array.from(document.querySelectorAll<HTMLElement>("[data-stamp]")).filter(
      (label) => label.getBoundingClientRect().top > window.innerHeight,
    );
    for (const label of labels) label.style.opacity = "0";

    const observer = new IntersectionObserver(
      (entries) => {
        let order = 0;
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          observer.unobserve(entry.target);
          land(entry.target as HTMLElement, 150 + order * 340);
          order += 1;
        }
      },
      { threshold: 0.5 },
    );
    for (const label of labels) observer.observe(label);

    return () => {
      observer.disconnect();
      for (const label of labels) label.style.opacity = "";
    };
  }, []);

  return null;
}
