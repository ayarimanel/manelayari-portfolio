import Image from "next/image";
import Link from "next/link";
import type { Project } from "@/content/types";
import { BrowserFrame } from "./BrowserFrame";
import { PhoneFrame } from "./PhoneFrame";
import { Reveal } from "./Reveal";
import { Sticker } from "./Sticker";
import { VideoLoop } from "./VideoLoop";
import styles from "./ProjectCard.module.css";

/**
 * Full-width project panel. One link (the heading's) stretches over the whole
 * card; only the video's pause button sits above it, so it stays usable.
 */
export function ProjectCard({ project, index }: { project: Project; index: number }) {
  const visual = project.cardVisual;
  const headingId = `card-${project.slug}`;

  return (
    <article className={`theme-${project.theme} ${styles.card}`} aria-labelledby={headingId}>
      <div className={styles.text}>
        <p className={styles.label}>{project.cardLabel}</p>
        <h3 id={headingId} className={`h1 ${styles.title}`}>
          <Link href={`/work/${project.slug}`} className={styles.link}>
            {project.title}
          </Link>
        </h3>
        <p className={styles.summary}>{project.summary}</p>
        <ul className={styles.stickers} aria-label="Highlights">
          {project.cardStickers.map((s, i) => (
            <li key={s}>
              <Sticker variant={i === 0 ? "project" : "cream"} rotate={[-2, 2, -1][i % 3]} size="sm">
                {s}
              </Sticker>
            </li>
          ))}
        </ul>
        <p className={styles.cta} aria-hidden="true">
          Read the case study <span className={styles.arrow}>→</span>
        </p>
      </div>

      <div className={styles.visual}>
        {visual.kind === "fan" ? (
          <Reveal reveal={false} threshold={0.3} className={styles.fan}>
            {visual.mascot && (
              <Image src={visual.mascot.image} alt={visual.mascot.alt} sizes="120px" className={styles.mascot} />
            )}
            <PhoneFrame className={`${styles.phone} ${styles.phoneLeft}`}>
              <Image src={visual.left.image} alt={visual.left.alt} sizes="200px" />
            </PhoneFrame>
            <PhoneFrame className={`${styles.phone} ${styles.phoneRight}`}>
              <Image src={visual.right.image} alt={visual.right.alt} sizes="200px" />
            </PhoneFrame>
            <PhoneFrame className={`${styles.phone} ${styles.phoneCenter}`}>
              <VideoLoop video={visual.center.video} label={visual.center.label} priority={index === 0} />
            </PhoneFrame>
          </Reveal>
        ) : (
          <figure className={styles.browser}>
            <BrowserFrame domain={visual.domain} aspect="16 / 10">
              {visual.kind === "browser" ? (
                <VideoLoop video={visual.video} label={visual.label} priority={index === 0} />
              ) : (
                <Image
                  src={visual.image}
                  alt={visual.alt}
                  sizes="(max-width: 1023px) 100vw, 640px"
                  className={styles.browserImage}
                />
              )}
            </BrowserFrame>
            {visual.note && <figcaption className={styles.note}>{visual.note}</figcaption>}
          </figure>
        )}
      </div>
      <span className={styles.index} aria-hidden="true">
        {String(index + 1).padStart(2, "0")}
      </span>
    </article>
  );
}
