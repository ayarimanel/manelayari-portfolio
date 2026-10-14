import { site } from "@/content/site";
import { CopyEmailButton } from "./CopyEmailButton";
import { Doodle } from "./Doodle";
import styles from "./ContactBlock.module.css";

export function ContactBlock() {
  return (
    <section id="contact" className={`container ${styles.section}`} aria-labelledby="contact-heading">
      <div className={styles.panel}>
        <Doodle name="star" color="var(--ink)" fill="var(--cream)" className={`doodle-tablet ${styles.star}`} />
        <h2 id="contact-heading" className="display">
          Let&rsquo;s work together.
        </h2>
        <CopyEmailButton email={site.email}>
          <a
            className="btn"
            href={`https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(site.email)}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            Open in Gmail <span className="visually-hidden">(opens in a new tab)</span>
          </a>
          {site.cvUrl && (
            <a className="btn" href={site.cvUrl} download>
              Download CV <span className="visually-hidden">(PDF)</span>
            </a>
          )}
        </CopyEmailButton>
      </div>
    </section>
  );
}
