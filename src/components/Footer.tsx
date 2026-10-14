import { site } from "@/content/site";
import styles from "./Footer.module.css";

export function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={`container ${styles.inner}`}>
        <a className="link" href={`mailto:${site.email}`}>
          {site.email}
        </a>
        {site.linkedin && (
          <a className="link" href={site.linkedin} target="_blank" rel="noopener noreferrer">
            LinkedIn <span aria-hidden="true">↗</span>
            <span className="visually-hidden"> (opens in a new tab)</span>
          </a>
        )}
        {site.cvUrl && (
          <a className="link" href={site.cvUrl} download>
            Download CV
          </a>
        )}
        <a className="link" href="#top">
          Back to top
        </a>
        <p className={styles.copy}>© 2026 {site.name}</p>
      </div>
    </footer>
  );
}
