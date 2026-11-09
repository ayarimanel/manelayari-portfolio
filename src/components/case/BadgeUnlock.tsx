"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import { prefersReducedMotionNow } from "@/lib/reducedMotion";
import badges from "@media/glutenia/app/badges.png";
import firstOrder from "@media/glutenia/app/badge-first-order.png";
import styles from "./BadgeUnlock.module.css";

const LOCKED = "grayscale(1) brightness(1.3)";
const OPEN = "grayscale(0) brightness(1)";
const SPARK_COLORS = ["#bf40fa", "#4928c2", "#d98cff", "#1e88e5"];

/** One Glutenia badge unlocks with a small pop the first time it comes into view. */
export function BadgeUnlock() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const badgeRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    const wrap = wrapRef.current;
    const badge = badgeRef.current;
    if (!wrap || !badge || prefersReducedMotionNow()) return;

    if (wrap.getBoundingClientRect().top > window.innerHeight) badge.style.filter = LOCKED;

    const play = () => {
      badge.style.filter = "";
      badge.animate(
        [
          { filter: LOCKED, scale: 1 },
          { filter: LOCKED, scale: 0.82, offset: 0.4 },
          { filter: OPEN, scale: 1.42, offset: 0.62 },
          { filter: OPEN, scale: 0.94, offset: 0.8 },
          { filter: OPEN, scale: 1 },
        ],
        { duration: 1200, easing: "ease-out" },
      );
      for (let i = 0; i < 12; i += 1) {
        const spark = document.createElement("span");
        spark.className = styles.spark;
        spark.style.background = SPARK_COLORS[i % SPARK_COLORS.length];
        wrap.appendChild(spark);
        const angle = (i / 12) * Math.PI * 2;
        const distance = 44 + (i % 2) * 18;
        spark
          .animate(
            [
              { transform: "translate(-50%, -50%) scale(1)", opacity: 1 },
              {
                transform: `translate(calc(-50% + ${Math.cos(angle) * distance}px), calc(-50% + ${Math.sin(angle) * distance}px)) scale(0.2)`,
                opacity: 0,
              },
            ],
            { duration: 620, delay: 720, easing: "cubic-bezier(0.22, 1, 0.36, 1)", fill: "backwards" },
          )
          .finished.then(() => spark.remove());
      }
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        observer.disconnect();
        play();
      },
      { threshold: 0.6 },
    );
    observer.observe(wrap);

    return () => {
      observer.disconnect();
      badge.style.filter = "";
    };
  }, []);

  return (
    <figure className={styles.figure}>
      <div ref={wrapRef} className={styles.screen}>
        <Image src={badges} alt="Glutenia badges screen: 3 of 19 badges earned" sizes="300px" className={styles.shot} />
        <Image ref={badgeRef} src={firstOrder} alt="" sizes="60px" className={styles.badge} />
      </div>
    </figure>
  );
}
