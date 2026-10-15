import Image from "next/image";
import typewriter from "@media/design-book/typewriter.png";
import coffee from "@media/design-book/iced-coffee.png";
import beans from "@media/design-book/coffee-beans.png";
import { RansomTitle, Sparkle } from "./Decor";
import styles from "./DesignBook.module.css";

/** Typed onto the typewriter's sheet, one line after another. */
const LINES = [
  { text: "EXPERIENCE", head: true },
  { text: "" },
  { text: "RedStart Tunisie", head: true },
  { text: "2026 - Glutenia" },
  { text: "design + build" },
  { text: "" },
  { text: "Optima Junior", head: true },
  { text: "Entreprise - 2025" },
  { text: "client sites" },
  { text: "+ visuals" },
];

export function PageWork() {
  return (
    <div aria-hidden="true">
      <RansomTitle text="Experience" className={styles.abs} style={{ right: "4cqw", top: "3cqw", left: "auto" }} />

      <div className={`${styles.abs} ${styles.typewriter} ${styles.sticker} ${styles.slap}`}>
        <Image src={typewriter} alt="" sizes="(min-width: 900px) 260px, 30vw" className={styles.img} />
        <div className={styles.typed}>
          {LINES.map((l, i) => (
            <p
              key={i}
              className={`${styles.typedLine} ${l.head ? styles.typedHead : ""} ${styles.write}`}
              style={{ ["--d" as string]: `${0.9 + i * 0.32}s` }}
            >
              {l.text || " "}
            </p>
          ))}
        </div>
      </div>

      <span className={`${styles.abs} ${styles.coffeeStain}`} />
      <div className={`${styles.abs} ${styles.icedCoffee} ${styles.sticker} ${styles.pop}`}>
        <Image src={coffee} alt="" sizes="(min-width: 900px) 120px, 14vw" className={styles.img} />
      </div>
      <div className={`${styles.abs} ${styles.beans} ${styles.sticker} ${styles.pop}`}>
        <Image src={beans} alt="" sizes="(min-width: 900px) 110px, 13vw" className={styles.img} />
      </div>
      <p className={`${styles.abs} ${styles.hand} ${styles.workCaption}`}>
        <span className={styles.write} style={{ display: "inline-block", ["--d" as string]: "4.2s" }}>
          powered by coffee
        </span>
      </p>
      <Sparkle x={58} y={22} d={1.6} size={4} />
    </div>
  );
}
