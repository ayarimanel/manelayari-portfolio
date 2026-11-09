"use client";

import { useEffect } from "react";
import { prefersReducedMotionNow } from "@/lib/reducedMotion";

/** The moving text strips speed up and lean while the page scrolls, then settle back. */
export function RibbonScrollSpeed() {
  useEffect(() => {
    if (prefersReducedMotionNow()) return;
    const tracks = Array.from(document.querySelectorAll<HTMLElement>("[data-ribbon-track]")).map((el) => ({
      el,
      lean: Number(el.dataset.ribbonTrack),
      animations: el.getAnimations(),
    }));

    let lastY = window.scrollY;
    let speed = 0;
    let raf = 0;

    const tick = () => {
      const delta = Math.abs(window.scrollY - lastY);
      lastY = window.scrollY;
      speed += (Math.min(delta, 90) - speed) * 0.12;
      if (speed < 0.05) speed = 0;

      for (const track of tracks) {
        for (const animation of track.animations) animation.playbackRate = 1 + speed * 0.5;
        track.el.style.setProperty("--ribbon-lean", `${(track.lean * Math.min(speed, 60) * 0.22).toFixed(2)}deg`);
      }
      raf = speed > 0 || delta > 0 ? requestAnimationFrame(tick) : 0;
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(tick);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(raf);
    };
  }, []);

  return null;
}
