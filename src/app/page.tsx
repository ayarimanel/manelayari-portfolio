import type { Metadata } from "next";
import Image from "next/image";
import { site } from "@/content/site";
import { projects } from "@/content/projects";
import { ProjectCard } from "@/components/ProjectCard";
import { ContactBlock } from "@/components/ContactBlock";
import { Reveal } from "@/components/Reveal";
import { HeroDesk } from "@/components/HeroDesk";
import { HomeAbout } from "@/components/HomeAbout";
import { HomeInfo } from "@/components/HomeInfo";
import coffee from "../../public/media/home/coffee.png";
import pointingHand from "../../public/media/home/pointing-hand.png";
import manelFace from "../../public/media/about/manel-face.png";
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

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: site.name,
  jobTitle: site.role,
  email: `mailto:${site.email}`,
  url: site.url,
  sameAs: [site.github],
  address: { "@type": "PostalAddress", addressLocality: "Tunis", addressCountry: "TN" },
};

/** A moving strip of text. Four copies so the loop never shows a gap on wide screens. */
function Ribbon({ text, two = false }: { text: string; two?: boolean }) {
  return (
    <div className={two ? `${styles.ribbon} ${styles.ribbonTwo}` : styles.ribbon} aria-hidden="true">
      <div className={styles.ribbonTrack}>
        {[0, 1, 2, 3].map((k) => (
          <span key={k}>{text}&nbsp;</span>
        ))}
      </div>
    </div>
  );
}

export default function Home() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      {/* 1. Hero */}
      <div className={styles.winBar} aria-hidden="true">
        <div className={styles.winDots}>
          <i />
          <i />
          <i />
        </div>
        <div className={styles.winTab}>
          <Image src={manelFace} alt="" sizes="26px" />
          2026
          <span>&times;</span>
        </div>
      </div>
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
              <div className={styles.fuel} aria-hidden="true">
                <Image src={coffee} alt="" sizes="58px" className={styles.coffee} />
                <p className={styles.fuelNote}>
                  <svg viewBox="0 0 60 30">
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

          <div className={styles.heroArt}>
            <HeroDesk />
          </div>
        </div>
        <svg className={styles.wave} viewBox="0 0 1440 40" preserveAspectRatio="none" aria-hidden="true">
          <path d="M0 18c120 18 240 18 360 0s240-18 360 0 240 18 360 0 240-18 360 0v22H0z" fill="var(--magenta)" />
        </svg>
      </section>

      <Ribbon text="Open to UX/UI, Product Designer & Full-Stack roles ✶ Designed in Figma, built in code ✶ Based in Tunis ✶" />

      {/* 2. About and background */}
      <HomeAbout />
      <HomeInfo />

      <Ribbon two text="Glutenia: designed and built solo ✶ L’Africaine: live at editionapa.tn ✶ Value: led the redesign mockups ✶" />

      {/* 3. The three folders, side by side */}
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
