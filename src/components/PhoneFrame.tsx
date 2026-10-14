import type { CSSProperties, ReactNode } from "react";
import styles from "./PhoneFrame.module.css";

type Props = {
  children: ReactNode;
  /** Degrees of tilt, for fanned layouts. */
  tilt?: number;
  className?: string;
  style?: CSSProperties;
};

/** Pure-CSS phone: 9:19.5 screen, 36 px radius, ink bezel, subtle notch. */
export function PhoneFrame({ children, tilt = 0, className, style }: Props) {
  return (
    <div
      className={[styles.phone, className].filter(Boolean).join(" ")}
      style={{ "--tilt": `${tilt}deg`, ...style } as CSSProperties}
    >
      <div className={styles.screen}>{children}</div>
      <span className={styles.notch} aria-hidden="true" />
    </div>
  );
}
