import type { ReactNode } from "react";
import styles from "./SectionLabel.module.css";

type Props = {
  /** Shown in the project colour, e.g. "01". */
  number?: string;
  children: ReactNode;
  className?: string;
};

/** Small line above a heading, e.g. "Academic project · 01 Mobile app". */
export function SectionLabel({ number, children, className }: Props) {
  if (!number) {
    return <p className={[styles.label, className].filter(Boolean).join(" ")}>{children}</p>;
  }
  // "Academic project · 01 Mobile app" → put the number in place when the label has a "·".
  const text = String(children);
  const [before, after] = text.includes(" · ") ? text.split(" · ") : ["", text];
  return (
    <p className={[styles.label, className].filter(Boolean).join(" ")}>
      {before && <>{before} · </>}
      <span className={styles.number}>{number}</span> {after}
    </p>
  );
}
