"use client";

import { useState } from "react";
import { Sticker, type StickerVariant } from "./Sticker";
import styles from "./Marquee.module.css";

const variants: StickerVariant[] = ["ink", "cream", "tomato", "cream", "blue", "cream"];
const rotations = [-2, 1, -1, 2, -3, 1, 0, -2, 2];

/** Slow, pausable sticker marquee. Static (wrapped) on mobile and under reduced motion. */
export function Marquee({ items, label }: { items: string[]; label: string }) {
  const [paused, setPaused] = useState(false);
  const row = (hidden: boolean) => (
    <ul className={styles.row} aria-hidden={hidden || undefined}>
      {items.map((t, i) => (
        <li key={t}>
          <Sticker variant={variants[i % variants.length]} rotate={rotations[i % rotations.length]}>
            {t}
          </Sticker>
        </li>
      ))}
    </ul>
  );
  return (
    <div className={styles.marquee} data-paused={paused}>
      <p className="visually-hidden">{label}</p>
      <div className={styles.viewport}>
        <div className={styles.track}>
          {row(false)}
          {row(true)}
        </div>
      </div>
      <button type="button" className={styles.toggle} onClick={() => setPaused((p) => !p)} aria-pressed={paused}>
        {paused ? "Play" : "Pause"} tool list animation
      </button>
    </div>
  );
}
