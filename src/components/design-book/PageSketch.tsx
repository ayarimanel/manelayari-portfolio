import Image from "next/image";
import paper from "@media/design-book/grid-paper-tape-brown.png";
import stylus from "@media/design-book/hand-stylus.png";
import pin from "@media/design-book/push-pin-brown.png";
import { RansomTitle } from "./Decor";
import styles from "./DesignBook.module.css";

/** Flow boxes in stage units (100 × 80), drawn in the order the stylus visits them. */
const BOXES = [
  { x: 18, label: "Scan", d: 1.2 },
  { x: 42, label: "Result", d: 1.6 },
  { x: 66, label: "Save", d: 2.0 },
];
const ARROWS = [
  { from: 34, to: 42, d: 2.4 },
  { from: 58, to: 66, d: 2.6 },
];

export function PageSketch() {
  return (
    <div aria-hidden="true" className={styles.shake}>
      <RansomTitle text="Sketch" className={styles.abs} style={{ left: "4cqw", top: "3cqw" }} />
      <div className={`${styles.abs} ${styles.paper} ${styles.slap} ${styles.sticker}`} style={{ ["--d" as string]: "0.45s" }}>
        <Image src={paper} alt="" sizes="(min-width: 900px) 740px, 84vw" className={styles.img} />
      </div>
      <svg className={`${styles.abs} ${styles.flow}`} viewBox="0 0 100 80" preserveAspectRatio="none">
        {BOXES.map((b) => (
          <rect
            key={b.label}
            x={b.x}
            y={27}
            width={16}
            height={11}
            rx={2}
            pathLength={1}
            style={{ ["--d" as string]: `${b.d}s` }}
          />
        ))}
        {ARROWS.map((a) => (
          <path
            key={a.from}
            d={`M${a.from} 32.5H${a.to - 0.8}m-2 -1.6l2 1.6-2 1.6`}
            pathLength={1}
            style={{ ["--d" as string]: `${a.d}s`, animationDuration: "0.2s" }}
          />
        ))}
      </svg>
      {BOXES.map((b) => (
        <span
          key={b.label}
          className={`${styles.abs} ${styles.hand} ${styles.flowLabel}`}
          style={{ left: `${b.x + 8}cqw`, top: "32.5cqw", ["--d" as string]: `${b.d + 0.35}s` }}
        >
          {b.label}
        </span>
      ))}
      <div className={`${styles.abs} ${styles.tip}`}>
        <div className={styles.sticker}>
          <Image src={stylus} alt="" sizes="(min-width: 900px) 220px, 24vw" className={styles.img} />
        </div>
      </div>
      <div className={`${styles.abs} ${styles.pin} ${styles.sticker}`}>
        <Image src={pin} alt="" sizes="(min-width: 900px) 70px, 8vw" className={styles.img} />
      </div>
      <div className={`${styles.abs} ${styles.note} ${styles.sticker} ${styles.slap} ${styles.hand} ${styles.sketchNote}`} style={{ ["--d" as string]: "3.5s" }}>
        user flow
        <br />
        v1 ♡
      </div>
    </div>
  );
}
