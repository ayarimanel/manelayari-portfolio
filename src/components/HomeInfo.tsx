import Image from "next/image";
import { site } from "@/content/site";
import { toolIcons, type ToolIcon } from "@/content/toolIcons";
import { DiaryButton } from "@/components/design-book/DiaryButton";
import gluteniaLogo from "@media/glutenia/glutenia-logo.png";
import cvQr from "../../public/media/home/cv-qr.svg";
import styles from "./HomeInfo.module.css";

const skills = [
  "User flows",
  "Information architecture",
  "Wireframes and mockups",
  "High-fidelity UI",
  "Interactive prototyping",
  "Responsive web design",
  "Style guides",
  "UI states",
  "Design hand-off",
  "Scrum and Agile teamwork",
  "Client and developer collaboration",
];

const languages = [
  { name: "Arabic", level: "Native", tone: styles.c3 },
  { name: "French", level: "Fluent", tone: styles.c2 },
  { name: "English", level: "Advanced (C1)", tone: styles.c1 },
];

function Logo({ icon }: { icon: ToolIcon }) {
  switch (icon.kind) {
    case "figma":
      return (
        <svg viewBox="-9.5 0 57 57">
          <path fill="#1abcfe" d="M19 28.5a9.5 9.5 0 1 1 19 0 9.5 9.5 0 0 1-19 0z" />
          <path fill="#0acf83" d="M0 47.5A9.5 9.5 0 0 1 9.5 38H19v9.5a9.5 9.5 0 1 1-19 0z" />
          <path fill="#ff7262" d="M19 0v19h9.5a9.5 9.5 0 1 0 0-19H19z" />
          <path fill="#f24e1e" d="M0 9.5A9.5 9.5 0 0 0 9.5 19H19V0H9.5A9.5 9.5 0 0 0 0 9.5z" />
          <path fill="#a259ff" d="M0 28.5A9.5 9.5 0 0 0 9.5 38H19V19H9.5A9.5 9.5 0 0 0 0 28.5z" />
        </svg>
      );
    case "gemini":
      return (
        <svg viewBox="0 0 24 24">
          <defs>
            <linearGradient id="gemini-mark" x1="0" y1="1" x2="1" y2="0">
              <stop offset="0" stopColor="#4285f4" />
              <stop offset=".6" stopColor="#9b72cb" />
              <stop offset="1" stopColor="#d96570" />
            </linearGradient>
          </defs>
          <path fill="url(#gemini-mark)" d={icon.d} />
        </svg>
      );
    case "play":
      return (
        <svg viewBox="0 0 24 24">
          <path fill="#fff" d="M8 6.2v11.6c0 .7.8 1.1 1.4.7l9-5.8c.5-.3.5-1.1 0-1.4l-9-5.8C8.8 5.1 8 5.5 8 6.2z" />
        </svg>
      );
    case "text":
      return (
        <svg viewBox="0 0 24 24">
          <text
            x="12"
            y={12 + icon.size * 0.36}
            textAnchor="middle"
            fontFamily="Arial, sans-serif"
            fontWeight="700"
            fontSize={icon.size}
            fontStyle={icon.italic ? "italic" : undefined}
            fill={icon.fill}
          >
            {icon.text}
          </text>
        </svg>
      );
    default:
      return (
        <svg viewBox="0 0 24 24">
          <path fill={icon.fill} d={icon.d} />
        </svg>
      );
  }
}

/** Education, experience, languages, skills and tools. */
export function HomeInfo() {
  return (
    <section className={styles.info} aria-label="Background">
      <div className={styles.inner}>
        <div>
          <div className={styles.block}>
            <h3 className={styles.c3}>Education</h3>
            <div className={styles.card}>
              <p>
                2026
                <br />
                <span className={styles.c3}>Licence en Informatique, GLSI</span>
                <br />
                Faculté des Sciences de Tunis
              </p>
              <p>
                Mention Très Bien
                <br />
                <span className={styles.c3}>Software Engineering &amp; Info Systems</span>
                <br />
                Université de Tunis El Manar
              </p>
            </div>
          </div>

          <div className={styles.block}>
            <h3 className={styles.c2}>Experience</h3>
            <div className={styles.card}>
              <div>
                <p>
                  Mar 2026 &ndash; Sep 2026
                  <br />
                  <span className={styles.c2}>RedStart Tunisie</span>
                  <br />
                  UX/UI Designer &amp; Full-Stack Developer
                </p>
                <p className={styles.equation} aria-hidden="true">
                  <span>Fig</span>&times;<span>&lt;/&gt;</span>=
                  <span>
                    <Image src={gluteniaLogo} alt="" sizes="36px" />
                  </span>
                </p>
              </div>
              <p>
                2025 &ndash; 2026
                <br />
                <span className={styles.c2}>Optima Junior Entreprise</span>
                <br />
                UX/UI Designer, Project &amp; Marketing teams
              </p>
            </div>
          </div>

          <div className={styles.block}>
            <h3 className={styles.c1}>Languages</h3>
            <dl className={`${styles.card} ${styles.languages}`}>
              {languages.map((l) => (
                <div key={l.name}>
                  <dt>{l.name}</dt>
                  <i aria-hidden="true" />
                  <dd className={l.tone}>{l.level}</dd>
                </div>
              ))}
            </dl>
            <div className={styles.cvRow}>
              {site.cvUrl && (
                <a className={styles.qrLink} href={site.cvUrl} download aria-label="Download CV (PDF), or scan the QR code">
                  <span className={styles.qr}>
                    <i />
                    <i />
                    <i />
                    <i />
                    <Image src={cvQr} alt="" unoptimized />
                  </span>
                  <span className={styles.scan}>Scan me to get my CV</span>
                </a>
              )}
              <DiaryButton />
            </div>
          </div>
        </div>

        <div className={styles.right}>
          <div className={styles.block}>
            <h3 className={styles.c2}>Skills</h3>
            <ul className={styles.card}>
              {skills.map((s) => (
                <li key={s}>{s}</li>
              ))}
            </ul>
          </div>

          <div className={styles.block}>
            <h3 className={styles.c3}>Tools</h3>
            <ul className={styles.tools}>
              {toolIcons.map((icon) => (
                <li key={icon.name} style={{ background: icon.bg }} title={icon.name}>
                  <span className="visually-hidden">{icon.name}</span>
                  <Logo icon={icon} />
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
