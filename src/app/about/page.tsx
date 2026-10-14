import type { Metadata } from "next";
import Image from "next/image";
import { site } from "@/content/site";
import { Sticker } from "@/components/Sticker";
import { Doodle } from "@/components/Doodle";
import { ContactBlock } from "@/components/ContactBlock";
import styles from "./about.module.css";

const description =
  "About Manel Ayari: UX/UI designer and Computer Science graduate from the Faculté des Sciences de Tunis, based in Bardo, Tunis.";

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

const aboutTools = ["Figma", "Photoshop", "Illustrator", "React Native", "Expo", "Node.js", "MongoDB", "Remotion"];
const rotations = [-2, 1, -1, 3, -3, 2, 0, -2];

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
            I&rsquo;m Manel, a UX/UI designer who likes turning confusing everyday tasks into friendly, clear
            interfaces. For my final-year project I designed and built Glutenia, an app that helps people living
            gluten-free check products and find safe places. I also designed the website of L&rsquo;Africaine de Prod
            Artistique, a children&rsquo;s book publisher.
          </p>
        </div>
      </section>

      <section className={`container ${styles.details}`} aria-label="Background">
        <dl className={styles.list}>
          <div>
            <dt className="h3">Education</dt>
            <dd>
              BSc in Computer Science (GLSI — software engineering and information systems), Faculté des Sciences de
              Tunis, 2026.
            </dd>
          </div>
          <div>
            <dt className="h3">Experience</dt>
            <dd>
              Optima Junior Entreprise — marketing team: community manager for the X account and visuals in Photoshop
              and Illustrator; project team: UX/UI design for client work.
            </dd>
          </div>
          <div>
            <dt className="h3">Tools</dt>
            <dd>
              <ul className={styles.tools}>
                {aboutTools.map((t, i) => (
                  <li key={t}>
                    <Sticker variant={i % 4 === 0 ? "ink" : i % 4 === 2 ? "blue" : "cream"} rotate={rotations[i]}>
                      {t}
                    </Sticker>
                  </li>
                ))}
              </ul>
            </dd>
          </div>
          <div>
            <dt className="h3">Languages</dt>
            <dd>French, English (fluent), Arabic.</dd>
          </div>
          <div>
            <dt className="h3">Based in</dt>
            <dd>{site.location}.</dd>
          </div>
        </dl>
      </section>

      <ContactBlock />
    </>
  );
}
