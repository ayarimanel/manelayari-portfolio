import Image from "next/image";
import laptop from "@media/design-book/laptop-typing-brown.png";
import { Heart, RansomTitle, Sparkle } from "./Decor";
import styles from "./DesignBook.module.css";

/** Final chip spots in stage units; each flies out from the laptop (≈ 50, 50). */
const CHIPS = [
  { text: "</>", x: 10, y: 30, r: -8, d: 1.3 },
  { text: "{ }", x: 82, y: 22, r: 7, d: 1.4 },
  { text: "npm run build", x: 38, y: 25, r: -4, d: 1.5 },
  { text: "{ }", x: 12, y: 50, r: 5, d: 1.6 },
  { text: "</>", x: 84, y: 46, r: -6, d: 1.7 },
];

export function PageBuild() {
  return (
    <div aria-hidden="true">
      <RansomTitle text="Build" className={styles.abs} style={{ left: "4cqw", top: "3cqw" }} />
      <p className={`${styles.abs} ${styles.hand} ${styles.buildCaption}`}>
        <span className={styles.write} style={{ display: "inline-block", ["--d" as string]: "2s" }}>
          On Wednesdays we push to production 💅
        </span>
      </p>
      <div className={`${styles.abs} ${styles.laptopTyping}`}>
        <div className={styles.sticker}>
          <Image src={laptop} alt="" sizes="(min-width: 900px) 520px, 58vw" className={styles.img} />
        </div>
      </div>
      {CHIPS.map((c, i) => (
        <span
          key={i}
          className={`${styles.abs} ${styles.chip}`}
          style={{
            left: `${c.x}cqw`,
            top: `${c.y}cqw`,
            ["--r" as string]: `${c.r}deg`,
            ["--d" as string]: `${c.d}s`,
            ["--dx" as string]: `${50 - c.x}cqw`,
            ["--dy" as string]: `${50 - c.y}cqw`,
          }}
        >
          {c.text}
        </span>
      ))}
      <Heart x={88} y={64} r={12} d={2.4} size={5} />
      <Sparkle x={6} y={68} d={2.5} size={4} color="#FFE45C" />
    </div>
  );
}
