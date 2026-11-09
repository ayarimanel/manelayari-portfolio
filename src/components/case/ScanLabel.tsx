"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { prefersReducedMotionNow } from "@/lib/reducedMotion";

type Props = { className: string; barClassName: string; children: ReactNode };

const DURATION = 2800;

/** A scan line passes over the ingredient label and the gluten words light up as it reaches them. */
export function ScanLabel({ className, barClassName, children }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const barRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const label = ref.current;
    const bar = barRef.current;
    if (!label || !bar || prefersReducedMotionNow()) return;

    const marks = Array.from(label.querySelectorAll("mark"));
    let raf = 0;
    let timer = 0;

    const finish = () => {
      delete label.dataset.scanning;
      for (const mark of marks) delete mark.dataset.on;
    };
    const play = () => {
      label.dataset.scanning = "";
      const start = performance.now();
      const height = label.clientHeight;
      const step = (now: number) => {
        const progress = Math.min(1, (now - start) / DURATION);
        const y = progress * height;
        bar.style.top = `${y}px`;
        for (const mark of marks) {
          if (y >= mark.offsetTop + mark.offsetHeight / 2) mark.dataset.on = "";
        }
        if (progress < 1) raf = requestAnimationFrame(step);
        else timer = window.setTimeout(finish, 250);
      };
      raf = requestAnimationFrame(step);
    };

    // Start plain only if the visitor has not reached it yet, so nothing flashes.
    if (label.getBoundingClientRect().top > window.innerHeight) label.dataset.scanning = "";

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        observer.disconnect();
        play();
      },
      { threshold: 0.5 },
    );
    observer.observe(label);

    return () => {
      observer.disconnect();
      cancelAnimationFrame(raf);
      window.clearTimeout(timer);
      finish();
    };
  }, []);

  return (
    <div ref={ref} className={className}>
      {children}
      <i ref={barRef} className={barClassName} aria-hidden="true" />
    </div>
  );
}
