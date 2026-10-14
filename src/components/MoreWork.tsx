import type { Project } from "@/content/types";
import { projects } from "@/content/projects";
import { ProjectCard } from "./ProjectCard";
import styles from "./MoreWork.module.css";

/** End of a case study: the other projects as small folders, the next one first. */
export function MoreWork({ current }: { current: Project }) {
  const others = projects.filter((p) => p.slug !== current.slug);
  others.sort((a, b) => Number(b.slug === current.next) - Number(a.slug === current.next));

  return (
    <section className={`container ${styles.wrap}`} aria-labelledby="more-work">
      <h2 id="more-work" className={`h2 ${styles.heading}`}>
        More work{" "}
        <span className={styles.hint}>
          {others.length} more folders <span aria-hidden="true">↓</span>
        </span>
      </h2>
      <div className={styles.grid}>
        {others.map((p) => (
          <ProjectCard key={p.slug} project={p} index={projects.indexOf(p)} compact />
        ))}
      </div>
    </section>
  );
}
