import Image from "next/image";
import Link from "next/link";
import type { Project } from "@/content/types";
import { BrowserFrame } from "./BrowserFrame";
import { PaperClip } from "./PaperClip";
import { PhoneFrame } from "./PhoneFrame";
import styles from "./ProjectCard.module.css";

const phoneTilts = [-8, 1, 8];

/**
 * Home project as a paper folder: a tab on the back flap, the real work
 * sticking out of the top, and a front flap with a stamp label and a sticky
 * note. One transparent link covers the whole folder; hovering it pulls the
 * papers further out.
 */
export function ProjectCard({ project, index }: { project: Project; index: number }) {
  const visual = project.cardVisual;
  const headingId = `card-${project.slug}`;
  const layout = styles[`layout${index % 3}`];

  return (
    <article className={`theme-${project.theme} ${styles.folder} ${layout}`} aria-labelledby={headingId}>
      <div className={styles.back} aria-hidden="true">
        <span className={styles.tab}>
          {String(index + 1).padStart(2, "0")} {project.cardTab.title} <small>{project.cardTab.kind}</small>
        </span>
      </div>

      <div className={styles.papers}>
        {visual.kind === "phones" ? (
          <>
            {visual.screens.map((s, i) => (
              <PhoneFrame key={i} tilt={phoneTilts[i]} className={`${styles.phone} ${styles[`phone${i}`]}`}>
                <Image src={s.image} alt={s.alt} sizes="(max-width: 767px) 110px, 200px" priority={index === 0} />
              </PhoneFrame>
            ))}
            <PaperClip className={`${styles.clip} ${styles.clipPhones}`} />
          </>
        ) : (
          <>
            {visual.back && (
              <BrowserFrame domain={visual.domain} aspect="16 / 10" className={`${styles.sheet} ${styles.sheetBack}`}>
                <Image
                  src={visual.back.image}
                  alt={visual.back.alt}
                  sizes="(max-width: 767px) 240px, 560px"
                  className={styles.sheetImage}
                />
              </BrowserFrame>
            )}
            <BrowserFrame domain={visual.domain} aspect="16 / 10" className={`${styles.sheet} ${styles.sheetFront}`}>
              <Image
                src={visual.front.image}
                alt={visual.front.alt}
                sizes="(max-width: 767px) 260px, 600px"
                className={styles.sheetImage}
              />
            </BrowserFrame>
            <PaperClip className={`${styles.clip} ${styles.clipSheets}`} />
          </>
        )}
      </div>

      {visual.kind === "phones" && visual.mascot && (
        <Image src={visual.mascot.image} alt={visual.mascot.alt} sizes="140px" className={styles.mascot} />
      )}

      <div className={styles.front}>
        <div>
          <div className={`stamp-edge ${styles.label}`}>
            <div>
              <h3 id={headingId} className={styles.title}>
                {project.cardTab.title}
              </h3>
              <p className={styles.meta}>{project.cardLabel}</p>
            </div>
          </div>
          <p className={styles.summary}>{project.summary}</p>
          <ul className={styles.tags} aria-label="Highlights">
            {project.cardStickers.map((s) => (
              <li key={s}>{s}</li>
            ))}
          </ul>
          <p className={styles.cta} aria-hidden="true">
            Open the folder <span className={styles.arrow}>→</span>
          </p>
        </div>
        <p className={styles.note}>{project.cardNote}</p>
      </div>

      <Link href={`/work/${project.slug}`} className={styles.cover}>
        <span className="visually-hidden">Read the {project.title} case study</span>
      </Link>
    </article>
  );
}
