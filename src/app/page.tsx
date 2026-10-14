import type { Metadata } from "next";
import Link from "next/link";
import { site, tools } from "@/content/site";
import { projects } from "@/content/projects";
import { Doodle } from "@/components/Doodle";
import { PaperClip } from "@/components/PaperClip";
import { ProjectCard } from "@/components/ProjectCard";
import { Marquee } from "@/components/Marquee";
import { ContactBlock } from "@/components/ContactBlock";
import { Reveal } from "@/components/Reveal";
import { HeroAvatar } from "@/components/HeroAvatar";
import styles from "./home.module.css";

export const metadata: Metadata = {
  title: { absolute: `${site.name} — ${site.role}` },
  description: site.description,
  alternates: { canonical: "/" },
  openGraph: {
    title: `${site.name} — ${site.role}`,
    description: site.description,
    url: "/",
    images: [{ url: "/og/home.png", width: 1200, height: 630, alt: `${site.name}, ${site.role}` }],
  },
};

const heroClaims = ["Glutenia: designed + built solo", "Figma → React Native", "Open to UX/UI, Product & Full-Stack roles"];

const skills = [
  {
    title: "Understand and structure",
    body: "I map users, roles and flows before drawing screens.",
    doodle: "flow",
  },
  { title: "Design and prototype", body: "I design interfaces and clickable prototypes in Figma.", doodle: "pencil" },
  {
    title: "Build it",
    body: "I turn designs into working apps with React Native and Node.js.",
    doodle: "code",
  },
] as const;

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: site.name,
  jobTitle: site.role,
  email: `mailto:${site.email}`,
  url: site.url,
  address: { "@type": "PostalAddress", addressLocality: "Tunis", addressCountry: "TN" },
};

export default function Home() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      {/* 1. Hero */}
      <section className={`container ${styles.hero}`} aria-labelledby="hero-heading">
        <div className={styles.heroText}>
          <p className={styles.heroHello}>
            <span className={styles.heroHi}>Hi, I&rsquo;m Manel</span> · {site.role} · Tunis
          </p>
          <h1 id="hero-heading" className={`display ${styles.heroTitle}`}>
            I design <em>mockups &amp; prototypes</em>.
          </h1>
          <p className={styles.heroLine}>
            And I can build them too. Designing is my favourite part: user flows, Figma screens and clickable
            prototypes for websites and apps.
          </p>
          <div className={styles.heroCtas}>
            <a className={`btn ${styles.ctaPrimary}`} href="#work">
              Open my work <span aria-hidden="true">↓</span>
            </a>
            {site.cvUrl && (
              <a className="btn" href={site.cvUrl} download>
                Download CV <span className="visually-hidden">(PDF)</span>
              </a>
            )}
          </div>
          <ul className={styles.heroClaims} aria-label="In short">
            {heroClaims.map((c, i) => (
              <li key={c}>
                {i === 0 && <span aria-hidden="true">✶ </span>}
                {c}
              </li>
            ))}
          </ul>
        </div>

        <div className={styles.heroArt}>
          <div className={`stamp-edge ${styles.polaroid}`} aria-hidden="true">
            <div />
          </div>
          <PaperClip className={styles.heroClip} />
          <Doodle name="star" color="var(--ink)" fill="var(--blue)" className={styles.heroStar} />
          <HeroAvatar />
        </div>
      </section>

      {/* 2. Selected work */}
      <section id="work" className={`container ${styles.work}`} aria-labelledby="work-heading">
        <h2 id="work-heading" className={`h2 ${styles.workHeading}`}>
          Selected work{" "}
          <span className={styles.workHint}>
            {projects.length} folders, pull one out <span aria-hidden="true">↓</span>
          </span>
        </h2>
        <div className={styles.cards}>
          {projects.map((p, i) => (
            <Reveal key={p.slug}>
              <ProjectCard project={p} index={i} />
            </Reveal>
          ))}
        </div>
      </section>

      {/* 3. What I do */}
      <section className={`container ${styles.skillsSection}`} aria-labelledby="skills-heading">
        <h2 id="skills-heading" className="h2">
          What I do
        </h2>
        <ul className={styles.skills}>
          {skills.map((s) => (
            <li key={s.title}>
              <Doodle name={s.doodle} color="var(--tomato)" className={styles.skillIcon} />
              <h3 className="h3">{s.title}</h3>
              <p>{s.body}</p>
            </li>
          ))}
        </ul>
        <Marquee items={tools} label="Tools I use" />
      </section>

      {/* 4. About teaser */}
      <section className={`container ${styles.about}`} aria-labelledby="about-heading">
        <Reveal className={styles.aboutInner}>
          <h2 id="about-heading" className="h2">
            About me
          </h2>
          <p className={styles.aboutText}>
            I&rsquo;m a Computer Science graduate from the Faculté des Sciences de Tunis, based in Bardo, Tunis. I care
            about turning stressful everyday tasks into clear, friendly interfaces.
          </p>
          <Link href="/about" className="link link-ink">
            More about me
          </Link>
        </Reveal>
      </section>

      {/* 5. Contact */}
      <ContactBlock />
    </>
  );
}
