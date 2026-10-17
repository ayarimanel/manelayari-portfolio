import Image, { type StaticImageData } from "next/image";
import styles from "./Laptop.module.css";

export type LaptopPage = { image: StaticImageData; alt: string; domain: string };

/**
 * A burgundy laptop in 3D. On load it sits closed at an angle, the lid opens,
 * then it turns to face the visitor and settles; the website then fades in,
 * rising a little out of the top of the screen, and scrolls on its own (with
 * several pages it swaps between them). Pure CSS; under reduced motion it is
 * simply open and still.
 */
export function Laptop({ pages, caption }: { pages: LaptopPage[]; caption?: string }) {
  return (
    <figure className={`${styles.laptop} ${pages.length === 1 ? styles.single : ""}`}>
      <div className={styles.stage}>
        <div className={styles.ground} aria-hidden="true" />
        <div className={styles.device}>
          {/* Keyboard deck, hinged at the bottom of the lid */}
          <div className={styles.deck} aria-hidden="true">
            <div className={styles.keys} />
            <div className={styles.pad} />
            <div className={styles.lip}>
              <span />
            </div>
          </div>

          <div className={styles.lid}>
            {/* Back of the lid: what you see while the laptop is closed */}
            <div className={styles.shell} aria-hidden="true">
              <span className={styles.mark}>M</span>
            </div>
            <div className={styles.face}>
              <div className={styles.screen} />
              <div className={styles.window}>
                {pages.map((p, i) => (
                  <div key={p.domain} className={styles.page} style={{ "--i": i } as React.CSSProperties}>
                    <div className={styles.bar} aria-hidden="true">
                      <span />
                      <span />
                      <span />
                      <em>{p.domain}</em>
                    </div>
                    <Image
                      src={p.image}
                      alt={p.alt}
                      sizes="(max-width: 767px) 85vw, 600px"
                      className={styles.shot}
                      priority={i === 0}
                    />
                  </div>
                ))}
              </div>
              <div className={styles.glare} aria-hidden="true" />
            </div>
          </div>
        </div>
      </div>
      {caption && <figcaption className={styles.caption}>{caption}</figcaption>}
    </figure>
  );
}
