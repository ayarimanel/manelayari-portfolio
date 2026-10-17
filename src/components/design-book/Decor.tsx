import type { CSSProperties } from "react";
import styles from "./DesignBook.module.css";

type Pos = { x: number; y: number; r?: number; d?: number };

/** Inline position in cqw (the stage is 100 × 80 cqw), with rotation and delay vars. */
export function place({ x, y, r = 0, d }: Pos, extra?: CSSProperties): CSSProperties {
  return {
    left: `${x}cqw`,
    top: `${y}cqw`,
    ["--r" as string]: `${r}deg`,
    ...(d !== undefined ? { ["--d" as string]: `${d}s` } : {}),
    ...extra,
  };
}

export function Tape({ kind = "gingham", ...pos }: Pos & { kind?: "gingham" | "hearts" }) {
  return (
    <span
      aria-hidden="true"
      className={`${styles.abs} ${styles.tape} ${styles.slap} ${kind === "gingham" ? styles.tapeGingham : styles.tapeHearts}`}
      style={place(pos)}
    />
  );
}

export function Sparkle({ size = 4, color = "#fff", ...pos }: Pos & { size?: number; color?: string }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      className={`${styles.abs} ${styles.twinkle}`}
      style={place(pos, { width: `${size}cqw` })}
    >
      <path
        d="M12 1c1 6 4 10 11 11-7 1-10 4-11 11-1-7-4-10-11-11 7-1 10-5 11-11z"
        fill={color}
        stroke="#43302e"
        strokeWidth="1.4"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function Heart({ size = 4, color = "#2f5a78", className = styles.pop, ...pos }: Pos & {
  size?: number;
  color?: string;
  className?: string;
}) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 22"
      className={`${styles.abs} ${styles.sticker} ${className}`}
      style={place(pos, { width: `${size}cqw` })}
    >
      <path
        d="M12 20.5S2 14.3 2 7.6C2 4.5 4.4 2 7.3 2c2 0 3.6 1.1 4.7 2.7C13.1 3.1 14.7 2 16.7 2 19.6 2 22 4.5 22 7.6c0 6.7-10 12.9-10 12.9z"
        fill={color}
        stroke="#43302e"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
    </svg>
  );
}

const FONTS = [
  "Georgia, 'Times New Roman', serif",
  "Impact, 'Arial Black', sans-serif",
  "'Courier New', ui-monospace, monospace",
  "var(--font-display), sans-serif",
  "'Times New Roman', serif",
  "var(--font-caveat), cursive",
  "'Trebuchet MS', sans-serif",
];
const PAPERS: [string, string][] = [
  ["#fff", "#43302e"],
  ["#43302e", "#fff"],
  ["#c1dbe8", "#43302e"],
  ["#fff8de", "#2f5a78"],
  ["#2f5a78", "#fff"],
  ["#f6d873", "#43302e"],
  ["#fff", "#2f5a78"],
];
const TILTS = [-6, 4, -3, 7, -5, 2, 5, -2, 3];
const STYLES = ["normal", "italic"];

/** Magazine ransom-note title: every letter on its own scrap (fixed, not random). */
export function RansomTitle({
  text,
  big = false,
  className = "",
  style,
  delay = 0.45,
  as: Tag = "p",
}: {
  text: string;
  big?: boolean;
  className?: string;
  style?: CSSProperties;
  delay?: number;
  as?: "p" | "span";
}) {
  let n = 0;
  return (
    <Tag aria-hidden="true" className={`${styles.ransom} ${big ? styles.ransomBig : ""} ${className}`} style={style}>
      {text.split(" ").map((word, w) => (
        <span key={w} className={styles.ransomWord}>
          {[...word].map((ch, i) => {
            const k = n++;
            const [bg, fg] = PAPERS[(k * 3 + w) % PAPERS.length];
            return (
              <span
                key={i}
                className={styles.letter}
                style={{
                  fontFamily: FONTS[(k * 2 + w) % FONTS.length],
                  fontStyle: STYLES[k % 3 === 2 ? 1 : 0],
                  fontWeight: k % 2 ? 800 : 600,
                  background: bg,
                  color: fg,
                  ["--r" as string]: `${TILTS[k % TILTS.length]}deg`,
                  ["--d" as string]: `${delay + k * 0.05}s`,
                }}
              >
                {k % 4 === 1 ? ch.toUpperCase() : ch}
              </span>
            );
          })}
        </span>
      ))}
    </Tag>
  );
}
