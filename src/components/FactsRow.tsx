import type { Fact } from "@/content/types";
import styles from "./FactsRow.module.css";

/** Role · Context · Timeline · Tools — 4 columns desktop, 2 tablet, stacked mobile. */
export function FactsRow({ facts }: { facts: Fact[] }) {
  return (
    <dl className={styles.facts}>
      {facts.map((f) => (
        <div key={f.label} className={styles.fact}>
          <dt>{f.label}</dt>
          <dd>
            {f.value}
            {f.href && (
              <>
                <br />
                <a className={styles.live} href={f.href} target="_blank" rel="noopener">
                  <span className={styles.dot} aria-hidden="true" />
                  {f.linkLabel ?? f.href}
                  <span aria-hidden="true">↗</span>
                  <span className="visually-hidden"> (opens in a new tab)</span>
                </a>
                {f.linkNote && <span className={styles.linkNote}>{f.linkNote}</span>}
              </>
            )}
          </dd>
        </div>
      ))}
    </dl>
  );
}
