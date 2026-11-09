"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import { prefersReducedMotionNow } from "@/lib/reducedMotion";
import coffee from "../../../public/media/home/coffee.png";
import styles from "./FuelCup.module.css";

/** "My fuel" follows the visitor once the hero is gone, and runs out at the end of the page. */
export function FuelCup() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || prefersReducedMotionNow()) return;

    let raf = 0;
    const update = () => {
      raf = 0;
      const y = window.scrollY;
      const max = document.documentElement.scrollHeight - window.innerHeight;
      const drain = max > 0 ? Math.min(1, Math.max(0, y / (max - 4))) : 0;
      el.style.setProperty("--drain", drain.toFixed(3));
      el.dataset.show = String(y > window.innerHeight * 0.6);
      el.dataset.empty = String(drain >= 1);
      // Rides above the footer instead of covering it.
      const footerTop = document.querySelector("footer")?.getBoundingClientRect().top ?? window.innerHeight;
      el.style.translate = `0 ${-Math.max(0, window.innerHeight - footerTop)}px`;
    };
    const schedule = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    return () => {
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div ref={ref} className={styles.fuel} aria-hidden="true">
      <div className={styles.cup}>
        <Image src={coffee} alt="" sizes="54px" className={styles.empty} />
        <Image src={coffee} alt="" sizes="54px" className={styles.full} />
      </div>
      <span className={styles.note}>my fuel</span>
    </div>
  );
}
