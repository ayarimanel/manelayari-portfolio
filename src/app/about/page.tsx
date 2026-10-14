import type { Metadata } from "next";
import Image from "next/image";
import { openTo, site, skillGroups } from "@/content/site";
import { Doodle } from "@/components/Doodle";
import { ContactBlock } from "@/components/ContactBlock";
import { DesignBookLazy } from "@/components/design-book/DesignBookLazy";
import styles from "./about.module.css";

const description =
  "About Manel Ayari: UX/UI Designer & Full-Stack Developer and Computer Science graduate from the Faculté des Sciences de Tunis, based in Bardo, Tunis.";

export const metadata: Metadata = {
  title: "About",
  description,
  alternates: { canonical: "/about" },
  openGraph: {
    title: `About — ${site.name}, ${site.role}`,
    description,
    url: "/about",
    images: [{ url: "/og/about.png", width: 1200, height: 630, alt: `About ${site.name}` }],
  },
};

export default function About() {
  return (
    <>
      <section className={`container ${styles.intro}`} aria-labelledby="about-title">
        <div className={styles.polaroidWrap}>
          <figure className={styles.polaroid}>
            <span className={styles.tape} aria-hidden="true" />
            <div className={styles.photo}>
              {site.photo ? (
                <Image src={site.photo} alt={`Portrait of ${site.name}`} sizes="320px" preload />
              ) : (
                <>
                  <Doodle name="circle" color="var(--tomato)" className={styles.photoDoodle} />
                  <span className={styles.initials} aria-hidden="true">
                    MA
                  </span>
                </>
              )}
            </div>
            <figcaption className={styles.polaroidCaption}>{site.name}</figcaption>
          </figure>
        </div>

        <div className={styles.copy}>
          <h1 id="about-title" className="h1">
            About me
          </h1>
          <p className="lead">
            I&rsquo;m Manel, a Computer Science graduate (Software Engineering &amp; Information Systems) working as a
            UX/UI designer and full-stack developer. I turn stressful everyday tasks into clear, friendly interfaces.
          </p>
          <p>
            Designing is my favourite part: I map users and flows, then design high-fidelity mockups and interactive
            prototypes in Figma, in Scrum teams and on client projects. Because I also code (React Native and Next.js
            on a Node.js, Express and MongoDB back end), I know what developers need, so my designs are ready to build.{" "}
            {openTo}
          </p>
          {site.cvUrl && (
            <p className={styles.cv}>
              <a className="link link-ink" href={site.cvUrl} download>
                Download CV <span className="visually-hidden">(PDF)</span>
              </a>
            </p>
          )}
        </div>
      </section>

      <DesignBookLazy />

      <section className={`container ${styles.details}`} aria-label="Background">
        <dl className={styles.list}>
          <div>
            <dt className="h3">Education</dt>
            <dd>
              Licence en Informatique — GLSI (Software Engineering &amp; Information Systems), Faculté des Sciences de
              Tunis, Université de Tunis El Manar, 2026. <em>Mention Très Bien</em>.
            </dd>
          </div>
          <div>
            <dt className="h3">Experience</dt>
            <dd>
              RedStart Tunisie — UX/UI Designer &amp; Full-Stack Developer, final-year project (solo), 2026.
              <br />
              Optima Junior Entreprise — project team: UX/UI design for client work; marketing team: web design, the X
              account and visuals in Photoshop and Illustrator.
            </dd>
          </div>
          <div>
            <dt className="h3">Based in</dt>
            <dd>{site.location}.</dd>
          </div>
        </dl>
      </section>

      <section className={`container ${styles.details}`} aria-labelledby="skills-title">
        <h2 id="skills-title" className="h2">
          Skills
        </h2>
        <dl className={`${styles.list} ${styles.skills}`}>
          {skillGroups.map((g) => (
            <div key={g.title}>
              <dt className="h3">{g.title}</dt>
              <dd>{g.items.join(", ")}.</dd>
            </div>
          ))}
        </dl>
      </section>

      <ContactBlock />
    </>
  );
}
