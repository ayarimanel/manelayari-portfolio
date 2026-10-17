import { brandIcons } from "@/content/brandIcons";
import styles from "./SkillTiles.module.css";

/** Dark brand colours read as burgundy here, so every icon sits in the palette. */
const DARK = new Set(["#000000", "#0A0A0A", "#1C2024"]);

/** Simple lettered badges for tools Simple Icons doesn't include. */
function Badge({ name }: { name: string }) {
  switch (name) {
    case "Photoshop":
      return (
        <svg viewBox="0 0 24 24">
          <rect width="24" height="24" rx="5" fill="#001E36" />
          <text x="12" y="16.5" textAnchor="middle" fontSize="11" fontWeight="700" fill="#31A8FF">
            Ps
          </text>
        </svg>
      );
    case "Illustrator":
      return (
        <svg viewBox="0 0 24 24">
          <rect width="24" height="24" rx="5" fill="#330000" />
          <text x="12" y="16.5" textAnchor="middle" fontSize="11" fontWeight="700" fill="#FF9A00">
            Ai
          </text>
        </svg>
      );
    case "Canva":
      return (
        <svg viewBox="0 0 24 24">
          <circle cx="12" cy="12" r="12" fill="#00C4CC" />
          <text x="12" y="16.6" textAnchor="middle" fontSize="13" fontWeight="700" fontStyle="italic" fill="#fff">
            C
          </text>
        </svg>
      );
    case "Remotion":
      return (
        <svg viewBox="0 0 24 24">
          <rect width="24" height="24" rx="6" fill="#0B84F3" />
          <path d="M9 7.2v9.6c0 .6.6.9 1.1.6l7.4-4.8c.5-.3.5-.9 0-1.2l-7.4-4.8C9.6 6.3 9 6.6 9 7.2z" fill="#fff" />
        </svg>
      );
    default:
      return null;
  }
}

/** Skills as soft rounded tiles: a white icon chip and the tool name. */
export function SkillTiles({ items, tone }: { items: string[]; tone: "butter" | "blue" }) {
  return (
    <ul className={`${styles.tiles} ${styles[tone]}`}>
      {items.map((name) => {
        const icon = brandIcons[name];
        return (
          <li key={name}>
            <span className={styles.chip} aria-hidden="true">
              {icon ? (
                <svg viewBox="0 0 24 24">
                  <path d={icon.path} fill={DARK.has(icon.hex.toUpperCase()) ? "var(--burgundy)" : icon.hex} />
                </svg>
              ) : (
                <Badge name={name} />
              )}
            </span>
            {name}
          </li>
        );
      })}
    </ul>
  );
}
