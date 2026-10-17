import Image from "next/image";
import thinking from "@media/about/manel-thinking.png";
import { RansomTitle, Sparkle, Heart } from "./Decor";
import styles from "./DesignBook.module.css";

export function PageCover() {
  return (
    <>
      <div className={`${styles.abs} ${styles.coverInside}`} aria-hidden="true">
        <RansomTitle text="The Design Book" big className={styles.abs} style={{ left: "8cqw", top: "18cqw", maxWidth: "62cqw" }} delay={1.4} />
        <p
          className={`${styles.abs} ${styles.hand} ${styles.write}`}
          style={{ left: "9cqw", top: "50cqw", fontSize: "5.4cqw", ["--d" as string]: "2s" }}
        >
          how I work, in 5 steps →
        </p>
        <Heart x={56} y={8} r={-12} d={1.8} size={5} />
        <Sparkle x={70} y={30} d={1.9} size={4} color="#f6d873" />
        <div className={`${styles.abs} ${styles.peek} ${styles.sticker}`}>
          <Image src={thinking} alt="" sizes="(min-width: 900px) 280px, 32vw" className={styles.img} />
        </div>
      </div>

      <div className={styles.cover} aria-hidden="true">
        <RansomTitle text="The Design Book" big delay={0} />
        <p className={`${styles.hand} ${styles.coverOwner}`}>property of Manel ♡</p>
      </div>
    </>
  );
}
