import Image from "next/image";
import cursor from "@media/design-book/cursor-orange.png";
import { Heart, RansomTitle, Sparkle } from "./Decor";
import styles from "./DesignBook.module.css";

/** Card rows in stage units; delays match the cursor's clicks (see cursorPath). */
const CARDS = [
  { y: 19, d: 0.9, kind: "profile" },
  { y: 30, d: 1.5, kind: "media" },
  { y: 41, d: 2.1, kind: "button" },
] as const;

export function PageDesign() {
  return (
    <div aria-hidden="true">
      <RansomTitle text="Design" className={styles.abs} style={{ left: "4cqw", top: "3cqw" }} />
      <div className={styles.ghostCards}>
        {CARDS.map((c) => (
          <div key={c.kind} className={styles.abs} style={{ top: `${c.y}cqw` }} />
        ))}
      </div>
      <div className={`${styles.abs} ${styles.phone}`}>
        {CARDS.map((c) => (
          <span key={c.kind} className={styles.phoneSlot} style={{ top: `${c.y - 12.6}cqw` }} />
        ))}
      </div>
      {CARDS.map((c) => (
        <div
          key={c.kind}
          className={`${styles.abs} ${styles.card} ${styles.sticker}`}
          style={{ top: `${c.y}cqw`, ["--d" as string]: `${c.d}s` }}
        >
          {c.kind === "profile" && <span className={styles.cardDot} />}
          {c.kind === "media" && <span className={styles.cardImg} />}
          {c.kind === "button" ? (
            <span className={styles.cardButton} />
          ) : (
            <span className={styles.cardLines}>
              <i />
              <i />
            </span>
          )}
        </div>
      ))}
      {CARDS.map((c) => (
        <Heart key={c.kind} x={76} y={c.y - 3} r={c.y % 4 ? -10 : 10} d={c.d + 0.36} size={4} className={`${styles.pop} ${styles.heart}`} />
      ))}
      <div className={`${styles.abs} ${styles.cursor}`}>
        <div className={styles.sticker}>
          <Image src={cursor} alt="" sizes="(min-width: 900px) 48px, 6vw" className={styles.img} />
        </div>
      </div>
      <p
        className={`${styles.abs} ${styles.hand} ${styles.handInk} ${styles.write}`}
        style={{ left: "6cqw", top: "64cqw", fontSize: "max(16px, 4.6cqw)", ["--d" as string]: "2.8s" }}
      >
        drag, drop, snap ✓
      </p>
      <Sparkle x={86} y={6} d={2.5} size={4} />
    </div>
  );
}
