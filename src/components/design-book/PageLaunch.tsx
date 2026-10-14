import Image from "next/image";
import home from "@media/design-book/lafricaine-home.jpg";
import idea from "@media/about/manel-idea.png";
import { Heart, RansomTitle, Sparkle } from "./Decor";
import styles from "./DesignBook.module.css";

export function PageLaunch() {
  return (
    <div aria-hidden="true">
      <RansomTitle text="Launch" className={`${styles.abs} ${styles.launchTitle}`} style={{ left: "auto" }} />

      {/* The "bursting screen" laptop lives only on this page. */}
      <div className={`${styles.abs} ${styles.laptopWrap}`}>
        <div className={styles.laptop}>
          <div className={styles.lid} />
          <div className={styles.base} />
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
      <Sparkle x={92} y={50} d={2.25} size={4} color="#FFE45C" />
      <Sparkle x={56} y={44} d={2.4} size={3} />
      <Sparkle x={4} y={30} d={2.55} size={3.5} color="#FFE45C" />
      <Heart x={90} y={10} r={14} d={2.3} size={4} />
    </div>
  );
}
