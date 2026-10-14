import Image from "next/image";
import { Poppins } from "next/font/google";
import styles from "./Diagrams.module.css";
import logo from "@media/lafricaine/details/logo.png";

const poppins = Poppins({ subsets: ["latin"], weight: ["400", "700"], display: "swap" });

/* Hexes sampled from the Figma exports. */
const swatches = [
  { name: "Deep purple", hex: "#4B0082", ink: "#FFFFFF", use: "Active navigation, admin figures" },
  { name: "Purple", hex: "#9B59B6", ink: "#FFFFFF", use: "Headings and banners" },
  { name: "Gold", hex: "#D8A552", ink: "#1F1B16", use: "Buttons, footer, logo" },
];

export function Swatches() {
  return (
    <div className={styles.brand}>
      <ul className={styles.swatches}>
        {swatches.map((s) => (
          <li key={s.hex} className={styles.swatch}>
            <span className={styles.chip} style={{ background: s.hex, color: s.ink }}>
              {s.hex}
            </span>
            <p className={styles.swatchName}>{s.name}</p>
            <p className={styles.swatchUse}>{s.use}</p>
          </li>
        ))}
      </ul>
      <div className={styles.brandRow}>
        <div className={styles.typeCard}>
          <p className={styles.typeLabel}>Typeface</p>
          <p className={`${poppins.className} ${styles.typeSample}`}>Poppins</p>
          <p className={`${poppins.className} ${styles.typeSmall}`} lang="fr">
            Des livres qui éveillent l&rsquo;imagination
          </p>
        </div>
        <div className={styles.logoCard}>
          <p className={styles.typeLabel}>Logo</p>
          <Image
            src={logo}
            alt="L'Africaine de Prod Artistique logo, a gold emblem"
            sizes="96px"
            className={styles.logo}
          />
        </div>
        <div className={styles.typeCard}>
          <p className={styles.typeLabel}>Motifs</p>
          <svg viewBox="0 0 160 40" className={styles.motif} aria-hidden="true">
            <path
              d="M4 28c10-16 18-24 26-14s4 20 14 19 10-24 21-25 10 19 20 20 10-18 20-20 12 14 20 13 8-10 13-14"
              fill="none"
              stroke="#D8A552"
              strokeWidth="4"
              strokeLinecap="round"
            />
          </svg>
          <p className={styles.typeSmall}>Hand-drawn squiggles and a wavy gold footer</p>
        </div>
      </div>
    </div>
  );
}

const groups = [
  { name: "Public", kind: "list", items: ["Home", "About", "News", "Events", "Contact"] },
  { name: "Shop", kind: "path", items: ["Shop", "Product", "Order form"] },
  { name: "Admin", kind: "path", items: ["Login", "Dashboard"], children: ["Articles", "Orders", "News", "Filters"] },
] as const;

export function SiteMap() {
  return (
    <figure className={styles.siteFigure}>
      <div className={styles.siteGroups}>
        {groups.map((g) => (
          <section key={g.name} className={styles.siteGroup} aria-label={`${g.name} pages`}>
            <p className={styles.siteGroupName}>{g.name}</p>
            {g.kind === "list" ? (
              <ul className={styles.sitePages}>
                {g.items.map((i) => (
                  <li key={i}>{i}</li>
                ))}
              </ul>
            ) : (
              <ol className={styles.sitePath}>
                {g.items.map((i) => (
                  <li key={i}>{i}</li>
                ))}
                {"children" in g && (
                  <li className={styles.siteChildren}>
                    <ul className={styles.sitePages}>
                      {g.children.map((c) => (
                        <li key={c}>{c}</li>
                      ))}
                    </ul>
                  </li>
                )}
              </ol>
            )}
          </section>
        ))}
      </div>
      <figcaption className={styles.caption}>
        Site structure: three areas, with arrows showing the path through each.
      </figcaption>
    </figure>
  );
}
