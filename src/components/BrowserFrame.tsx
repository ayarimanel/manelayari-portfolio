import type { ReactNode } from "react";
import styles from "./BrowserFrame.module.css";

type Props = {
  children: ReactNode;
  /** Real domain shown in the address bar. */
  domain: string;
  className?: string;
  /** Fix the viewport ratio (e.g. "16 / 10" for 1280×800 clips). Omit to size to content. */
  aspect?: string;
};

/** CSS browser window: three dots, an address bar with the real domain, 12 px radius. */
export function BrowserFrame({ children, domain, className, aspect }: Props) {
  return (
    <div className={[styles.browser, className].filter(Boolean).join(" ")}>
      <div className={styles.bar} aria-hidden="true">
        <span className={styles.dots}>
          <i />
          <i />
          <i />
        </span>
        <span className={styles.address}>{domain}</span>
      </div>
      <div className={styles.viewport} style={aspect ? { aspectRatio: aspect } : undefined}>
        {children}
      </div>
    </div>
  );
}
