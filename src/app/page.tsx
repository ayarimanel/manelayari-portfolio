import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { site, summary } from "@/content/site";
import { projects } from "@/content/projects";
import { ProjectCard } from "@/components/ProjectCard";
import { ContactBlock } from "@/components/ContactBlock";
import { Reveal } from "@/components/Reveal";
import { Laptop } from "@/components/Laptop";
import { SkillTiles } from "@/components/SkillTiles";
import { DiaryButton } from "@/components/design-book/DiaryButton";
import coffee from "../../public/media/home/coffee.png";
import pointingHand from "../../public/media/home/pointing-hand.png";
import manelCartoon from "../../public/media/about/manel-cartoon.png";
import lafricainePage from "../../public/media/home/lafricaine-page.jpg";
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

const designTools = ["Figma", "Photoshop", "Illustrator", "Canva"];
const buildTools = ["React Native", "Expo", "Next.js", "TypeScript", "Node.js", "Express", "MongoDB", "Remotion"];


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

      {/* 1. Hero: who I am + a laptop scrolling through my websites */}
      <section className={styles.heroBand} aria-labelledby="hero-heading">
        <div className={`container ${styles.hero}`}>
          <div className={styles.heroText}>
            <p className={styles.hello} aria-hidden="true">
              Hello!
            </p>
            <h1 id="hero-heading" className={styles.heroTitle}>
              I&rsquo;m <strong>Manel</strong>. I design friendly apps and websites, then I build them.
            </h1>
            <p className={styles.heroLine}>
              UX/UI Designer &amp; Full-Stack Developer in Tunis. Because I also code, my designs are ready to build.
            </p>
            <div className={styles.heroCtas}>
              <a className="btn btn-ink" href="#work">
                Open my folders <span aria-hidden="true">↓</span>
              </a>
              {site.cvUrl && (
                <a className="btn" href={site.cvUrl} download>
                  Download CV <span className="visually-hidden">(PDF)</span>
                </a>
              )}
            </div>
          </div>

          <div className={styles.heroArt}>
            <Laptop
              pages={[
                {
                  image: lafricainePage,
                  alt: "L'Africaine de Prod Artistique homepage mockup, scrolling",
                  domain: "editionapa.tn",
                },
              ]}
            />
            <div className={styles.fuel}>
              <Image src={coffee} alt="" sizes="130px" className={styles.coffee} />
              <p className={styles.fuelNote}>
                <svg viewBox="0 0 60 30" aria-hidden="true">
                  <path
                    d="M56 6C42 8 26 12 10 24m0 0 10 1M10 24l3-9"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                </svg>
                my fuel
              </p>
            </div>
          </div>
        </div>
        <svg className={styles.wave} viewBox="0 0 1440 40" preserveAspectRatio="none" aria-hidden="true">
          <path d="M0 18c120 18 240 18 360 0s240-18 360 0 240 18 360 0 240-18 360 0v22H0z" fill="var(--burgundy)" />
        </svg>
      </section>

      {/* 2. Ribbon */}
      <div className={styles.ribbon} aria-hidden="true">
        <div className={styles.ribbonTrack}>
          {[0, 1].map((k) => (
            <span key={k}>
              Open to UX/UI, Product Designer &amp; Full-Stack roles ✶ Designed in Figma, built in code ✶ Based in
              Tunis ✶&nbsp;
            </span>
          ))}
        </div>
      </div>

      {/* 3. Me and my skills, all in one place */}
      <section id="about" className={`container ${styles.intro}`} aria-labelledby="intro-heading">
        <div className={styles.me}>
          <div className={styles.portrait}>
            <Image src={manelCartoon} alt="Illustrated sticker of Manel waving" sizes="(max-width: 767px) 70vw, 320px" />
            <span className={`${styles.bubble} ${styles.bubbleA}`}>UX/UI Designer</span>
            <span className={`${styles.bubble} ${styles.bubbleB}`}>Developer</span>
          </div>
          <ul className={styles.contact} aria-label="Contact">
            <li>
              <a className="link" href={`mailto:${site.email}`}>
                {site.email}
              </a>
            </li>
            <li>{site.location}</li>
            <li>Arabic · French · English (C1)</li>
          </ul>
        </div>

        <div className={styles.about}>
          <h2 id="intro-heading" className={styles.introHeading}>
            A bit about me
          </h2>
          <p className={styles.aboutText}>{summary}</p>

          <div className={styles.grid}>
            <div>
              <h3 className={styles.label}>Design tools</h3>
              <SkillTiles items={designTools} tone="butter" />
            </div>
            <div>
              <h3 className={styles.label}>Build tools</h3>
              <SkillTiles items={buildTools} tone="blue" />
            </div>
            <div>
              <h3 className={styles.label}>Education</h3>
              <p className={styles.small}>
                <strong>Licence en Informatique, GLSI</strong>
                <br />
                Faculté des Sciences de Tunis, 2026
                <br />
                <em>Mention Très Bien</em>
              </p>
            </div>
            <div>
              <h3 className={styles.label}>UX skills</h3>
              <p className={styles.small}>
                User flows, information architecture, wireframes, high-fidelity UI, prototyping, UI states, hand-off.
              </p>
            </div>
          </div>

          <div className={styles.diaryRow}>
            <DiaryButton />
            <Link href="/about" className="link link-ink">
              The longer version
            </Link>
          </div>
        </div>
      </section>

      {/* 4. The three folders, side by side */}
      <section id="work" className={styles.workBand} aria-labelledby="work-heading">
        <div className="container">
          <h2 id="work-heading" className={styles.workHeading}>
            <span className={styles.script}>My</span> work
          </h2>
          <p className={styles.workHint}>Three projects, three folders.</p>
          <div className={styles.folders}>
            {projects.map((p, i) => (
              <Reveal key={p.slug}>
                <ProjectCard project={p} index={i} compact />
              </Reveal>
            ))}
            <div className={styles.pointer} aria-hidden="true">
              <span className={styles.tap} />
              <Image src={pointingHand} alt="" sizes="80px" className={styles.hand} />
              <span className={styles.pointerNote}>click a folder to open it</span>
            </div>
          </div>
        </div>
      </section>

      <ContactBlock />
    </>
  );
}
