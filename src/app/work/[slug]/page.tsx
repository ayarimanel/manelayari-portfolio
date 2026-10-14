import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getProject, projects } from "@/content/projects";
import { SectionLabel } from "@/components/SectionLabel";
import { FactsRow } from "@/components/FactsRow";
import { CaseSection } from "@/components/CaseSection";
import { CaseBlock } from "@/components/case/CaseBlock";
import { NextProject } from "@/components/NextProject";
import styles from "./case.module.css";

export const dynamicParams = false;

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: PageProps<"/work/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) return {};
  return {
    title: project.title,
    description: project.metaDescription,
    alternates: { canonical: `/work/${project.slug}` },
    openGraph: {
      type: "article",
      title: `${project.title} — case study by Manel Ayari`,
      description: project.metaDescription,
      url: `/work/${project.slug}`,
      images: [{ url: project.ogImage, width: 1200, height: 630, alt: `${project.title} case study` }],
    },
  };
}

export default async function CaseStudy({ params }: PageProps<"/work/[slug]">) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();
  const next = getProject(project.next);

  return (
    <article className={`theme-${project.theme}`}>
      <header className={`container ${styles.hero}`}>
        <SectionLabel number={project.heroLabel.number}>{project.heroLabel.text}</SectionLabel>
        <h1 className={`h1 ${styles.title}`}>{project.title}</h1>
        <p className={`lead ${styles.lead}`}>{project.lead}</p>
        <p className={styles.reading}>{project.readingTime}</p>
        <div className={styles.heroMedia}>
          <CaseBlock block={project.hero} preload />
        </div>
        <FactsRow facts={project.facts} />
      </header>

      {project.sections.map((s, i) => (
        <CaseSection key={s.id} section={s} index={i} />
      ))}

      <footer className="container">
        <div className={styles.credits}>
          <ul>
            {project.credits.map((c) => (
              <li key={c}>{c}</li>
            ))}
          </ul>
          {project.live && (
            <a className="btn" href={project.live.href} target="_blank" rel="noopener">
              {project.live.label} <span aria-hidden="true">↗</span>
              <span className="visually-hidden">(opens in a new tab)</span>
            </a>
          )}
        </div>
      </footer>

      {next && <NextProject project={next} />}
    </article>
  );
}
