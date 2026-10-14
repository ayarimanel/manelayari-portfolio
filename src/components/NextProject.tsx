import Link from "next/link";
import type { Project } from "@/content/types";
import { Doodle } from "./Doodle";
import styles from "./NextProject.module.css";

export function NextProject({ project }: { project: Project }) {
  return (
    <nav aria-label="Next project" className={`container ${styles.wrap}`}>
      <Link href={`/work/${project.slug}`} className={`theme-${project.theme} ${styles.panel}`}>
        <span className={styles.kicker}>Next project</span>
        <span className={`display ${styles.title}`}>{project.title}</span>
        <span className={styles.summary}>{project.summary}</span>
        <span className={styles.cta}>
          Read the case study <span className={styles.arrow}>→</span>
        </span>
        <Doodle name="arrow" color="var(--ink)" className={`doodle-desktop ${styles.doodle}`} />
      </Link>
    </nav>
  );
}
