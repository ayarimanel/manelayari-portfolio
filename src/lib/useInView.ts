"use client";

import { useEffect, useRef, useState, type RefObject } from "react";

type Options = {
  /** Fraction of the element that must be visible. */
  threshold?: number;
  /** Stop observing after the first time it enters view. */
  once?: boolean;
  rootMargin?: string;
};

export function useInView<T extends Element>({ threshold = 0.15, once = true, rootMargin }: Options = {}): [
  RefObject<T | null>,
  boolean,
] {
  const ref = useRef<T>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          if (once) observer.disconnect();
        } else if (!once) {
          setInView(false);
        }
      },
      { threshold, rootMargin },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold, once, rootMargin]);

  return [ref, inView];
}
