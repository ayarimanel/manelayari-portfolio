import Image from "next/image";
import home from "@media/design-book/lafricaine-home.jpg";
import idea from "@media/about/manel-idea.png";
import { RansomTitle, Sparkle } from "./Decor";
import styles from "./DesignBook.module.css";

/** Keyboard rows on the deck (SVG units, deck is 50 × 8): narrower at the back. */
const deckLeft = (y: number) => 3 - (3 * (y - 0.6)) / 5.6;
const KEYS = [1.1, 1.9, 2.7].flatMap((y) => {
  const xl = deckLeft(y) + 1.4;
  const w = (50 - 2 * xl - 13 * 0.3) / 14;
  return Array.from({ length: 14 }, (_, i) => ({ x: xl + i * (w + 0.3), y, w }));
});

export function PageLaunch() {
  return (
    <div aria-hidden="true">
      <RansomTitle text="Launch" className={`${styles.abs} ${styles.launchTitle}`} style={{ left: "auto" }} />

      {/* The "bursting screen" laptop lives only on this page. */}
      <div className={`${styles.abs} ${styles.laptopWrap}`}>
        <div className={styles.laptop}>
          <div className={styles.lid} />
          <svg className={styles.base} viewBox="0 0 50 8" aria-hidden="true">
            <ellipse cx="25" cy="7.6" rx="24" ry="0.5" fill="rgba(120, 40, 10, 0.22)" />
            <path d="M3 0.6H47L50 6.2H0Z" fill="#ffb894" stroke="#2B211C" strokeWidth="0.35" strokeLinejoin="round" />
            <path d="M3.4 0.75H46.6" stroke="#FFF1E2" strokeWidth="0.25" strokeLinecap="round" />
            {KEYS.map((k, i) => (
              <rect key={i} x={k.x} y={k.y} width={k.w} height={0.6} rx={0.18} fill="#ffdac4" stroke="#c44a22" strokeWidth="0.1" />
            ))}
            <rect x="20.5" y="3.6" width="9" height="2.1" rx="0.4" fill="#ffdac4" stroke="#c44a22" strokeWidth="0.15" />
            <path d="M0 6.2H50L49.2 7.1Q49 7.3 48.6 7.3H1.4Q1 7.3 0.8 7.1Z" fill="#e8663d" stroke="#2B211C" strokeWidth="0.35" strokeLinejoin="round" />
          </svg>
          <div className={styles.browser}>
            <div className={styles.browserBar}>
              <i />
              <i />
              <i />
              <span className={styles.address}>editionapa.tn</span>
            </div>
            <div className={styles.viewport}>
              <div className={styles.longPage}>
                <Image src={home} alt="" sizes="(min-width: 900px) 320px, 36vw" className={styles.img} />
              </div>
            </div>
          </div>
        </div>
      </div>
      <p className={`${styles.abs} ${styles.mockupNote}`}>Mockup with placeholder content</p>

      <div className={`${styles.abs} ${styles.idea} ${styles.sticker} ${styles.pop}`}>
        <Image src={idea} alt="" sizes="(min-width: 900px) 300px, 33vw" className={styles.img} />
      </div>
      <p className={`${styles.abs} ${styles.hand} ${styles.shipped}`}>
        <span className={styles.write} style={{ display: "inline-block", ["--d" as string]: "2.4s" }}>
          shipped ♡
        </span>
      </p>
      <Sparkle x={60} y={12} d={2.1} size={5} />
      <Sparkle x={88} y={50} d={2.25} size={4} color="#FFE45C" />
    </div>
  );
}
