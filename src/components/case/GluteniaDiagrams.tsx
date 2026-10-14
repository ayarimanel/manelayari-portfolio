import Image from "next/image";
import { Sticker } from "../Sticker";
import styles from "./Diagrams.module.css";

import glutitanHero from "@media/glutenia/mascot/glutitan-hero.png";
import thumbsUp from "@media/glutenia/mascot/glutitan-thumbs-up.png";
import stop from "@media/glutenia/mascot/glutitan-stop.png";
import thinking from "@media/glutenia/mascot/glutitan-thinking.png";
import pointingRight from "@media/glutenia/mascot/glutitan-pointing-right.png";
import pointingSelf from "@media/glutenia/mascot/glutitan-pointing-self.png";
import celebrating from "@media/glutenia/mascot/glutitan-celebrating.png";

/* ---------- The problem: a real label, decoded ---------- */
export function LabelExample() {
  return (
    <figure className={styles.labelFigure}>
      <div className={styles.label}>
        <p className={styles.labelHead}>Ingredients</p>
        <p className={styles.labelText}>
          Rice flour, sugar, <mark>wheat starch</mark>, palm oil, <mark>barley malt extract</mark>, salt, emulsifier
          (E471), <mark lang="fr">farine de blé</mark>, cocoa.
        </p>
        <p className={styles.labelTraces}>
          <mark>May contain traces of gluten.</mark>
        </p>
        <p className={styles.labelCount}>
          <strong>3</strong> hidden gluten sources in one label — plus a “may contain” warning
        </p>
      </div>
      <ul className={styles.painList}>
        <li>
          <strong>Complex labels</strong> Long ingredient lists that are hard to interpret
        </li>
        <li>
          <strong>Gluten-related terms</strong> Hard to recognise without expertise
        </li>
        <li>
          <strong>Cross-contamination</strong> “May contain traces” warnings
        </li>
        <li>
          <strong>Mixed languages</strong> Arabic, French, English, or a mix
        </li>
      </ul>
      <figcaption className={styles.caption}>
        Example label from my project presentation. Highlighted: the gluten sources a shopper has to spot.
      </figcaption>
    </figure>
  );
}

/* ---------- Who it's for ---------- */
const roles = [
  {
    name: "Customer",
    body: "Scan labels and barcodes, order products, find places, join events and earn badges.",
  },
  {
    name: "Professional",
    sub: "Shops, bakeries, restaurants",
    body: "Manage products, their establishment and orders.",
  },
  {
    name: "Administrator",
    body: "Manage users and roles, review professional requests, products, orders, establishments and events.",
  },
];
export function RoleCards() {
  return (
    <ul className={styles.roles}>
      {roles.map((r, i) => (
        <li key={r.name} className={styles.role}>
          <Sticker variant={i === 0 ? "project" : i === 1 ? "cream" : "ink"} rotate={[-2, 1, -1][i]}>
            {r.name}
          </Sticker>
          {r.sub && <p className={styles.roleSub}>{r.sub}</p>}
          <p>{r.body}</p>
        </li>
      ))}
    </ul>
  );
}

/* ---------- What already exists ---------- */
type Support = "yes" | "partial" | "no";
const apps = ["App A*", "Yuka", "Spoonful", "Find Me Gluten Free", "Glutenia"];
const features: [string, Support[]][] = [
  ["Barcode scanning", ["yes", "yes", "yes", "no", "yes"]],
  ["Gluten-free detection", ["partial", "partial", "yes", "no", "yes"]],
  ["AI ingredient-label analysis", ["no", "no", "no", "no", "yes"]],
  ["Multilingual labels", ["partial", "partial", "partial", "no", "yes"]],
  ["Gluten-free places", ["no", "no", "no", "yes", "yes"]],
  ["Ordering", ["no", "no", "no", "no", "yes"]],
  ["Community events", ["no", "no", "no", "partial", "yes"]],
  ["Gamification", ["no", "no", "no", "no", "yes"]],
];
const limits = ["Needs database", "Nutrition focus", "Products only", "Places only", "All-in-one"];
const supportText: Record<Support, string> = { yes: "Supported", partial: "Partial", no: "Not supported" };

function SupportMark({ s }: { s: Support }) {
  return (
    <span className={styles.mark} data-s={s}>
      <span aria-hidden="true" className={styles.markIcon}>
        {s === "yes" ? "●" : s === "partial" ? "◐" : "—"}
      </span>
      <span className="visually-hidden">{supportText[s]}</span>
    </span>
  );
}

export function CompetitorTable() {
  return (
    <figure className={styles.tableFigure}>
      <div className={styles.tableScroll} tabIndex={0} role="region" aria-label="Comparison table, scrolls sideways">
        <table className={styles.compTable}>
          <caption className="visually-hidden">Features of four existing apps compared with Glutenia</caption>
          <thead>
            <tr>
              <th scope="col">Feature</th>
              {apps.map((a) => (
                <th scope="col" key={a} className={a === "Glutenia" ? styles.us : undefined}>
                  {a}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {features.map(([f, row]) => (
              <tr key={f}>
                <th scope="row">{f}</th>
                {row.map((s, i) => (
                  <td key={i} className={i === 4 ? styles.us : undefined}>
                    <SupportMark s={s} />
                  </td>
                ))}
              </tr>
            ))}
            <tr className={styles.limitRow}>
              <th scope="row">Main limitation</th>
              {limits.map((l, i) => (
                <td key={l} className={i === 4 ? styles.us : undefined}>
                  {l}
                </td>
              ))}
            </tr>
          </tbody>
        </table>
      </div>
      <figcaption className={styles.caption}>
        <span className={styles.legend}>
          <span>● Supported</span> <span>◐ Partial</span> <span>— Not supported</span>
        </span>
        From my review of existing apps. *A barcode-scanning app shown only by its logo in the review.
      </figcaption>
    </figure>
  );
}

/* ---------- Structure and navigation ---------- */
const tabs = [
  { name: "Home", items: ["Scan shortcut", "Recently scanned", "XP level", "Quick access"] },
  { name: "Events", items: ["Meetups, classes, markets", "Event detail", "“I'm going”"] },
  { name: "Scan", items: ["Barcode scanner", "Label photo", "Result + flagged ingredients"], primary: true },
  { name: "Map", items: ["Store, bakery, pharmacy filters", "Place detail", "Favourites"] },
  { name: "Profile", items: ["Journey and badges", "Settings", "Privacy and security"] },
];
export function NavMap() {
  return (
    <figure className={styles.navFigure}>
      <div className={styles.navHeader}>
        <span>Header on every screen:</span> <Sticker size="sm">Notifications</Sticker>{" "}
        <Sticker size="sm" variant="project">
          Cart
        </Sticker>
      </div>
      <ol className={styles.navTabs}>
        {tabs.map((t) => (
          <li key={t.name} className={t.primary ? styles.navPrimary : undefined}>
            <span className={styles.navTab}>{t.name}</span>
            <ul>
              {t.items.map((i) => (
                <li key={i}>{i}</li>
              ))}
            </ul>
          </li>
        ))}
      </ol>
      <figcaption className={styles.caption}>The bottom bar, left to right, and what sits behind each tab.</figcaption>
    </figure>
  );
}

/* ---------- Designing the scan ---------- */
export function ScanFlow() {
  return (
    <figure className={styles.flowFigure}>
      <div className={styles.flow}>
        <div className={`${styles.node} ${styles.fStart}`}>Scan the barcode</div>
        <span className={`${styles.arrow} ${styles.a1}`} aria-hidden="true" />
        <div className={`${styles.node} ${styles.decision} ${styles.fDecision}`}>Known product?</div>
        <div className={styles.fYes}>
          <span className={styles.branch}>Yes</span>
          <div className={`${styles.node} ${styles.good}`}>Instant result from the catalog</div>
        </div>
        <div className={styles.fNo}>
          <span className={styles.branch}>No</span>
          <div className={styles.node}>Photograph the ingredient label</div>
          <span className={styles.arrow} aria-hidden="true" />
          <div className={`${styles.node} ${styles.ai}`}>AI reads the label</div>
          <span className={styles.arrow} aria-hidden="true" />
          <div className={styles.node}>Verdict + flagged ingredients</div>
        </div>
        <p className={styles.fNote}>Decision support, not medical advice</p>
      </div>
      <figcaption className={styles.caption}>The smart scan flow: barcode first, AI only when needed.</figcaption>
    </figure>
  );
}

/* ---------- Four answers, four states ---------- */
const states = [
  {
    key: "safe",
    name: "No danger",
    icon: "✓",
    title: "Seems safe",
    text: "No ingredient containing gluten was detected on this label.",
  },
  {
    key: "gluten",
    name: "Gluten detected",
    icon: "✕",
    title: "Contains gluten",
    text: "One or more ingredients on this label contain gluten.",
  },
  {
    key: "caution",
    name: "Caution",
    icon: "!",
    title: "Be careful",
    text: "The label says “may contain traces” or lists a starch of unknown source.",
  },
  {
    key: "unreadable",
    name: "Unreadable label",
    icon: "?",
    title: "Can't read the label",
    text: "No ingredient list found. The app asks for a photo of the side or back of the pack.",
  },
];
export function ResultStates() {
  return (
    <figure className={styles.statesFigure}>
      <ul className={styles.states}>
        {states.map((s) => (
          <li key={s.key} className={styles.state} data-state={s.key}>
            <span className={styles.stateIcon} aria-hidden="true">
              {s.icon}
            </span>
            <p className={styles.stateName}>{s.name}</p>
            <p className={styles.stateTitle}>“{s.title}”</p>
            <p className={styles.stateText}>{s.text}</p>
          </li>
        ))}
      </ul>
      <figcaption className={styles.caption}>
        Each state has its own colour, icon and words. Wording translated from the app&rsquo;s French result screens.
      </figcaption>
    </figure>
  );
}

/* ---------- Meet Glutitan ---------- */
const expressions = [
  { img: thumbsUp, caption: "Safe to eat", alt: "Glutitan giving a thumbs up", rot: -3 },
  { img: stop, caption: "Gluten detected", alt: "Glutitan holding up a hand to say stop", rot: 2 },
  { img: thinking, caption: "Let's double-check", alt: "Glutitan thinking, hand on chin", rot: -1 },
  { img: pointingRight, caption: "Here's a tip", alt: "Glutitan pointing to the side", rot: 3 },
  { img: pointingSelf, caption: "I've got you", alt: "Glutitan pointing at himself", rot: -2 },
  { img: celebrating, caption: "Badge unlocked", alt: "Glutitan celebrating with arms up", rot: 1 },
];
export function Glutitan() {
  return (
    <div className={styles.glutitan}>
      <div className={styles.glutitanHero}>
        <Image
          src={glutitanHero}
          alt="Glutitan, Glutenia's mascot: a round white character with a green G on his chest, a headband and a red cape, flexing"
          sizes="260px"
          style={{ width: "100%", height: "auto" }}
        />
      </div>
      <figure className={styles.expressionsFigure}>
        <ul className={styles.expressions}>
          {expressions.map((e) => (
            <li key={e.caption} className={styles.expression}>
              <Image src={e.img} alt={e.alt} sizes="140px" className={styles.expressionImg} />
              <Sticker variant="cream" rotate={e.rot}>
                {e.caption}
              </Sticker>
            </li>
          ))}
        </ul>
        <figcaption className={styles.credit}>Character concept, name and story by Manel.</figcaption>
      </figure>
    </div>
  );
}

/* ---------- Level up ---------- */
const xp = [
  ["Scan a barcode", "+5"],
  ["Scan a label", "+10"],
  ["Join an event", "+25"],
  ["Place an order", "+40"],
  ["Finish onboarding", "+50"],
];
const journey = ["Newcomer", "Explorer", "Label Reader", "Safe Eater", "Advocate"];
export function XpTable() {
  return (
    <div className={styles.xp}>
      <table className={styles.xpTable}>
        <caption className={styles.xpCaption}>Earn XP</caption>
        <thead>
          <tr>
            <th scope="col">Action</th>
            <th scope="col">XP</th>
          </tr>
        </thead>
        <tbody>
          {xp.map(([a, n]) => (
            <tr key={a}>
              <th scope="row">{a}</th>
              <td>{n}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div>
        <p className={styles.xpCaption}>The journey</p>
        <ol className={styles.journey}>
          {journey.map((j) => (
            <li key={j}>{j}</li>
          ))}
        </ol>
        <p className={styles.badgeCount}>
          <strong>19 badges</strong> to collect, from First Scan to One Year.
        </p>
      </div>
    </div>
  );
}

/* ---------- Under the hood ---------- */
export function Architecture() {
  return (
    <figure className={styles.archFigure}>
      <ol className={styles.arch}>
        <li className={styles.layer}>
          <span className={styles.layerNum}>1</span>
          <p className={styles.layerName}>Presentation</p>
          <p>React Native + Expo mobile app</p>
        </li>
        <li className={styles.link} aria-hidden="true">
          REST API
        </li>
        <li className={styles.layerRow}>
          <div className={styles.layer}>
            <span className={styles.layerNum}>2</span>
            <p className={styles.layerName}>Application</p>
            <p>Node.js + Express API · JWT · Swagger</p>
          </div>
          <span className={styles.sideLink} aria-hidden="true">
            AI calls
          </span>
          <div className={`${styles.layer} ${styles.layerAi}`}>
            <span className={styles.layerNum}>4</span>
            <p className={styles.layerName}>Artificial intelligence</p>
            <p>Gemini · Groq — ingredient-label analysis</p>
          </div>
        </li>
        <li className={styles.link} aria-hidden="true">
          Database access
        </li>
        <li className={styles.layer}>
          <span className={styles.layerNum}>3</span>
          <p className={styles.layerName}>Persistence</p>
          <p>MongoDB Atlas — users, products, orders, events, establishments</p>
        </li>
      </ol>
      <figcaption className={styles.caption}>Simplified logical architecture: four layers.</figcaption>
    </figure>
  );
}
