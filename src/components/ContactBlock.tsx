import { site } from "@/content/site";
import { CopyEmailButton } from "./CopyEmailButton";
import { Doodle } from "./Doodle";
import styles from "./ContactBlock.module.css";

export function ContactBlock() {
  return (
    <section className={`container ${styles.section}`} aria-labelledby="contact-heading">
      <div className={styles.panel}>
        <Doodle name="star" color="var(--ink)" fill="var(--cream)" className={`doodle-tablet ${styles.star}`} />
        <h2 id="contact-heading" className="display">
          Let&rsquo;s work together.
        </h2>
        <CopyEmailButton email={site.email}>
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
