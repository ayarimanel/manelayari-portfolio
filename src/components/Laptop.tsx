import Image, { type StaticImageData } from "next/image";
import styles from "./Laptop.module.css";

export type LaptopPage = { image: StaticImageData; alt: string; domain: string };

/**
 * A flat, front-view burgundy laptop. The website rises a little out of the
 * top of the screen and scrolls on its own, then swaps to the next site. Pure CSS:
 * each page fades in, scrolls top → bottom (object-position), rests and fades
 * out. Static first page under reduced motion.
 */
export function Laptop({ pages, caption }: { pages: LaptopPage[]; caption?: string }) {
  return (
    <figure className={`${styles.laptop} ${pages.length === 1 ? styles.single : ""}`}>
      <div className={styles.stage}>
        <div className={styles.device}>
          <div className={styles.lid}>
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
          </div>
          <div className={styles.base} aria-hidden="true">
            <span />
          </div>
        </div>
      </div>
      {caption && <figcaption className={styles.caption}>{caption}</figcaption>}
    </figure>
  );
}
