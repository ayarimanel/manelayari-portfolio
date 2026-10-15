import Image from "next/image";
import pencilCase from "@media/design-book/pencil-case.png";
import nib from "@media/design-book/pen-nib.png";
import palette from "@media/design-book/palette.png";
import ruler from "@media/design-book/ruler.png";
import ticket from "@media/design-book/ticket.png";
import { place, RansomTitle, Sparkle } from "./Decor";
import styles from "./DesignBook.module.css";

/** Design tools stick out of the pencil case; code tools are paper labels. */
const DESIGN = ["Figma", "Photoshop", "Illustrator"];
const CODE = [
  { t: "React Native", x: 54, y: 19, r: -4 },
  { t: "Next.js", x: 79, y: 27, r: 5 },
  { t: "Node.js", x: 56, y: 31, r: 3 },
  { t: "MongoDB", x: 75, y: 39, r: -5 },
];

export function PageTools() {
  return (
    <div aria-hidden="true">
      <RansomTitle text="My toolbox" className={styles.abs} style={{ left: "4cqw", top: "3cqw" }} />

      <div className={`${styles.abs} ${styles.pencilCase} ${styles.slap}`}>
        <ul className={styles.toolTags}>
          {DESIGN.map((t, i) => (
            <li key={t} style={{ ["--r" as string]: `${[-9, 2, 10][i]}deg` }}>
              {t}
            </li>
          ))}
        </ul>
        <div className={styles.sticker}>
          <Image src={pencilCase} alt="" sizes="(min-width: 900px) 260px, 30vw" className={styles.img} />
        </div>
      </div>
      <div className={`${styles.abs} ${styles.palette} ${styles.sticker} ${styles.pop}`}>
        <Image src={palette} alt="" sizes="(min-width: 900px) 110px, 13vw" className={styles.img} />
      </div>
      <div className={`${styles.abs} ${styles.nib} ${styles.sticker} ${styles.pop}`}>
        <Image src={nib} alt="" sizes="(min-width: 900px) 90px, 11vw" className={styles.img} />
      </div>
      <div className={`${styles.abs} ${styles.ruler} ${styles.sticker} ${styles.pop}`}>
        <Image src={ruler} alt="" sizes="(min-width: 900px) 90px, 11vw" className={styles.img} />
      </div>

      <p className={`${styles.abs} ${styles.hand} ${styles.codeNote}`}>
        <span className={styles.write} style={{ display: "inline-block", ["--d" as string]: "1.2s" }}>
          {"</> to build it"}
        </span>
      </p>
      {CODE.map((c, i) => (
        <span key={c.t} className={`${styles.abs} ${styles.codeLabel} ${styles.slap}`} style={place({ ...c, d: 1.5 + i * 0.15 })}>
          {c.t}
        </span>
      ))}

      <div className={`${styles.abs} ${styles.ticket} ${styles.sticker} ${styles.slap}`}>
        <Image src={ticket} alt="" sizes="(min-width: 900px) 120px, 14vw" className={styles.img} />
        <div className={styles.ticketText}>
          <p className={styles.ticketHead}>Languages</p>
          <p>Arabic · native</p>
          <p>French · fluent</p>
          <p>English · C1</p>
        </div>
      </div>
      <Sparkle x={47} y={60} d={2.3} size={4} color="#FFE45C" />
    </div>
  );
}
