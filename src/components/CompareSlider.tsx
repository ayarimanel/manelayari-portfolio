"use client";

import Image, { type StaticImageData } from "next/image";
import { useId, useState, type CSSProperties } from "react";
import styles from "./CompareSlider.module.css";

type Side = { image: StaticImageData; label: string; alt: string };

type Props = {
  before: Side;
  after: Side;
  sizes: string;
  /** Fill the parent (e.g. a phone screen) instead of using the image's ratio. */
  fill?: boolean;
};

/**
 * Two images with a draggable divider. A native range input does the work,
 * so arrow keys, touch and screen readers all behave as expected.
 */
export function CompareSlider({ before, after, sizes, fill = false }: Props) {
  const [pos, setPos] = useState(50);
  const id = useId();

  return (
    <div
      className={styles.compare}
      style={
        {
          "--pos": `${pos}%`,
          height: fill ? "100%" : undefined,
          aspectRatio: fill ? undefined : `${after.image.width} / ${after.image.height}`,
        } as CSSProperties
      }
    >
      <Image src={after.image} alt={after.alt} sizes={sizes} className={styles.img} />
      <div className={styles.beforeClip}>
        <Image src={before.image} alt={before.alt} sizes={sizes} className={styles.img} />
      </div>

      <span className={`${styles.tag} ${styles.tagLeft}`} aria-hidden="true">
        {before.label}
      </span>
      <span className={`${styles.tag} ${styles.tagRight}`} aria-hidden="true">
        {after.label}
      </span>

      <div className={styles.divider} aria-hidden="true">
        <span className={styles.handle}>
          <svg viewBox="0 0 24 24" width="20" height="20">
            <path
              d="M9 6l-6 6 6 6M15 6l6 6-6 6"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </span>
      </div>

      <label htmlFor={id} className="visually-hidden">
        Compare {before.label} and {after.label}
      </label>
      <input
        id={id}
        type="range"
        min={0}
        max={100}
        step={1}
        value={pos}
        onChange={(e) => setPos(Number(e.target.value))}
        className={styles.range}
        aria-valuetext={`${pos}% ${before.label}, ${100 - pos}% ${after.label}`}
      />
    </div>
  );
}
