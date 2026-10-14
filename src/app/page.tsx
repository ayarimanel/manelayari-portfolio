import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import portrait from "@media/about/manel-cartoon.png";
import { openTo, site, summary, tools } from "@/content/site";
import { projects } from "@/content/projects";
import { otherWork } from "@/content/otherWork";
import { Sticker } from "@/components/Sticker";
import { Doodle } from "@/components/Doodle";
import { ProjectCard } from "@/components/ProjectCard";
import { Marquee } from "@/components/Marquee";
import { ContactBlock } from "@/components/ContactBlock";
import { Reveal } from "@/components/Reveal";
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

const heroStickers = [
  { text: "Figma", variant: "ink", rotate: -3 },
  { text: "React Native", variant: "blue", rotate: 2 },
  { text: "Open to work", variant: "cream", rotate: -1 },
] as const;

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
          <h1 id="hero-heading" className={`display ${styles.heroTitle}`}>
            Hi, I&rsquo;m Manel.
          </h1>
          <p className={`lead ${styles.heroLine}`}>{site.roleLine}</p>
          <p className={styles.heroIntro}>
            {summary} {openTo}
          </p>
          <ul className={styles.heroStickers} aria-label="Skills and status">
            {heroStickers.map((s, i) => (
              <li key={s.text} style={{ animationDelay: `${300 + i * 60}ms` }}>
                <Sticker variant={s.variant} rotate={s.rotate} size="lg">
                  {s.text}
                </Sticker>
              </li>
            ))}
          </ul>
          {site.cvUrl && (
            <p className={styles.heroCv}>
              <a className="link link-ink" href={site.cvUrl} download>
                Download CV <span className="visually-hidden">(PDF)</span>
              </a>
            </p>
          )}
        </div>

        <div className={styles.heroArt}>
          <svg className={styles.blob} viewBox="0 0 440 380" preserveAspectRatio="none" aria-hidden="true">
            <path
              d="M60 30C140 2 300 0 386 30c46 18 52 110 42 192-10 78-54 148-160 152-100 4-202-4-242-72C2 250 8 64 60 30z"
              vectorEffect="non-scaling-stroke"
            />
          </svg>
          <Doodle name="star" color="var(--ink)" fill="var(--blue)" className={styles.heroStar} />
          <Doodle name="squiggle" className={`doodle-desktop ${styles.heroSquiggle}`} />
          {/* Two wrappers: one lands on load, the other tilts and lifts on hover. */}
          <div className={styles.portraitLand}>
            <div className={styles.portraitTilt}>
              <Image
                src={portrait}
                alt="Illustrated portrait of Manel"
                sizes="(max-width: 767px) 220px, (max-width: 1023px) 280px, 350px"
                preload
                className={styles.portrait}
              />
            </div>
          </div>
        </div>
      </section>

      {/* 2. Selected work */}
      <section id="work" className={`container ${styles.work}`} aria-labelledby="work-heading">
        <h2 id="work-heading" className="h2">
          Selected work
        </h2>
        <div className={styles.cards}>
          {projects.map((p, i) => (
            <Reveal key={p.slug}>
              <ProjectCard project={p} index={i} />
            </Reveal>
          ))}
        </div>
      </section>

      {/* 3. Other work: smaller projects without a case study */}
      {otherWork.length > 0 && (
        <section className={`container ${styles.other}`} aria-labelledby="other-heading">
          <h2 id="other-heading" className="h2">
            Other work
          </h2>
          <ul className={styles.otherList}>
            {otherWork.map((w) => (
              <li key={w.title}>
                <article className={styles.otherCard} aria-labelledby={`other-${w.title}`}>
                  <p className={styles.otherMeta}>
                    {w.context} · {w.date}
                  </p>
                  <h3 id={`other-${w.title}`} className="h3">
                    {w.title}
                  </h3>
                  <p className={styles.otherRole}>{w.role}</p>
                  <ul className={styles.otherPoints}>
                    {w.points.map((pt) => (
                      <li key={pt}>{pt}</li>
                    ))}
                  </ul>
                  <ul className={styles.otherTags} aria-label="Tools">
                    {w.tags.map((t, i) => (
                      <li key={t}>
                        <Sticker variant="cream" rotate={[-2, 2, -1][i % 3]} size="sm">
                          {t}
                        </Sticker>
                      </li>
                    ))}
                  </ul>
                </article>
              </li>
            ))}
          </ul>
        </section>
      )}

      {/* 4. What I do */}
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

      {/* 5. About teaser */}
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

      {/* 6. Contact */}
      <ContactBlock />
    </>
  );
}
