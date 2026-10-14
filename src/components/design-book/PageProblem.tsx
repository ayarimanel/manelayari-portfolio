import Image from "next/image";
import phones from "@media/design-book/phones-question.png";
import question from "@media/design-book/question-mark.png";
import { RansomTitle, Sparkle, Tape } from "./Decor";
import styles from "./DesignBook.module.css";

const SIZES = "(min-width: 900px) 480px, 54vw";

export function PageProblem() {
  return (
    <div aria-hidden="true">
      <RansomTitle text="The problem" className={styles.abs} style={{ left: "4cqw", top: "3cqw" }} />
      <Tape kind="gingham" x={74} y={4} r={9} d={0.5} />
      <div className={`${styles.abs} ${styles.phones}`}>
        <div className={`${styles.handLeft} ${styles.sticker}`}>
          <Image src={phones} alt="" sizes={SIZES} className={styles.img} />
        </div>
        <div className={`${styles.handRight} ${styles.sticker}`}>
          <Image src={phones} alt="" sizes={SIZES} className={styles.img} />
        </div>
        <div className={styles.bubbleLeft}>
          <Image src={phones} alt="" sizes={SIZES} className={styles.img} />
        </div>
        <div className={styles.bubbleRight}>
          <Image src={phones} alt="" sizes={SIZES} className={styles.img} />
        </div>
      </div>
      <div className={`${styles.abs} ${styles.question} ${styles.sticker}`}>
        <Image src={question} alt="" sizes="(min-width: 900px) 100px, 11vw" className={styles.img} />
      </div>
      <p className={`${styles.abs} ${styles.hand} ${styles.problemCaption}`}>
        <span className={styles.write} style={{ display: "inline-block", ["--d" as string]: "2.2s" }}>
          users are confused
        </span>
      </p>
      <Sparkle x={86} y={56} d={2.4} size={4} />
      <Sparkle x={14} y={18} d={2.6} size={3} color="#FFE45C" />
    </div>
  );
}
