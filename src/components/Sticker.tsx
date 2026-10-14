import type { CSSProperties, ReactNode } from "react";
import styles from "./Sticker.module.css";

export type StickerVariant = "ink" | "tomato" | "blue" | "cream" | "project";

type Props = {
  children: ReactNode;
  variant?: StickerVariant;
  /** Degrees, −4 to 4. Set per instance — never random. */
  rotate?: number;
  size?: "sm" | "md" | "lg";
  className?: string;
  style?: CSSProperties;
};

export function Sticker({ children, variant = "cream", rotate = 0, size = "md", className, style }: Props) {
  const r = Math.max(-4, Math.min(4, rotate));
  return (
    <span
      className={[styles.sticker, styles[variant], styles[size], className].filter(Boolean).join(" ")}
      style={{ "--rot": `${r}deg`, ...style } as CSSProperties}
    >
      {children}
    </span>
  );
}
