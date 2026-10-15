import Image from "next/image";
import type { Block, CustomBlockName, Screen } from "@/content/types";
import { PhoneFrame } from "../PhoneFrame";
import { BrowserFrame } from "../BrowserFrame";
import { VideoLoop } from "../VideoLoop";
import { CompareSlider } from "../CompareSlider";
import { PromoFilm } from "../PromoFilm";
import { Sticker } from "../Sticker";
import {
  Architecture,
  CompetitorTable,
  Glutitan,
  LabelExample,
  NavMap,
  ResultStates,
  RoleCards,
  ScanFlow,
  Sprints,
  XpTable,
} from "./GluteniaDiagrams";
import { SiteMap, Swatches } from "./LafricaineDiagrams";
import { AdminSwitcher } from "./AdminSwitcher";
import styles from "./CaseBlock.module.css";

const custom: Record<CustomBlockName, () => React.JSX.Element> = {
  labelExample: LabelExample,
  roleCards: RoleCards,
  competitorTable: CompetitorTable,
  navMap: NavMap,
  scanFlow: ScanFlow,
  resultStates: ResultStates,
  glutitan: Glutitan,
  xpTable: XpTable,
  architecture: Architecture,
  swatches: Swatches,
  siteMap: SiteMap,
  sprints: Sprints,
  adminSwitcher: AdminSwitcher,
};

/** Kinds that can sit beside their decision notes on desktop. */
export function isSideBySide(block: Block) {
  return (
    (block.kind === "phones" && block.items.length <= 2) ||
    block.kind === "browser" ||
    block.kind === "image" ||
    block.kind === "gallery" ||
    block.kind === "compare" ||
    (block.kind === "custom" && block.name === "navMap")
  );
}

function ScreenContent({ screen, sizes, preload }: { screen: Screen; sizes: string; preload?: boolean }) {
  if ("video" in screen) return <VideoLoop video={screen.video} label={screen.label} priority={preload} />;
  return <Image src={screen.image} alt={screen.alt} sizes={sizes} preload={preload} />;
}

type Props = { block: Block; preload?: boolean };

export function CaseBlock({ block, preload }: Props) {
  switch (block.kind) {
    case "phones": {
      const n = block.items.length;
      return (
        <figure className={styles.phones} data-count={n}>
          <ul className={styles.phoneRow}>
            {block.items.map((s, i) => (
              <li key={i} className={styles.phoneItem}>
                <PhoneFrame>
                  <ScreenContent screen={s} sizes="(max-width: 480px) 80vw, 280px" preload={preload && i === 0} />
                </PhoneFrame>
                {s.caption && <p className={styles.phoneCaption}>{s.caption}</p>}
              </li>
            ))}
          </ul>
          {block.caption && <figcaption className={styles.caption}>{block.caption}</figcaption>}
        </figure>
      );
    }

    case "browser":
      return (
        <figure className={styles.figure}>
          <BrowserFrame domain={block.domain} aspect={"video" in block.screen ? "16 / 10" : undefined}>
            <ScreenContent screen={block.screen} sizes="(max-width: 1240px) 100vw, 1240px" preload={preload} />
          </BrowserFrame>
          {block.caption && <figcaption className={styles.caption}>{block.caption}</figcaption>}
        </figure>
      );

    case "image":
      return (
        <figure className={styles.figure} style={block.maxWidth ? { maxWidth: block.maxWidth } : undefined}>
          <div className={block.framed ? styles.framed : undefined}>
            <Image
              src={block.image}
              alt={block.alt}
              sizes="(max-width: 1240px) 100vw, 1240px"
              preload={preload}
              style={{ width: "100%", height: "auto" }}
            />
          </div>
          {block.caption && <figcaption className={styles.caption}>{block.caption}</figcaption>}
        </figure>
      );

    case "gallery":
      return (
        <figure className={styles.figure}>
          <ul className={styles.gallery} data-columns={block.columns ?? 3}>
            {block.items.map((item) => (
              <li key={item.caption}>
                <figure>
                  {block.frame === "browser" ? (
                    <BrowserFrame domain={block.domain ?? ""}>
                      <Image src={item.image} alt={item.alt} sizes="(max-width: 768px) 100vw, 420px" />
                    </BrowserFrame>
                  ) : (
                    <div
                      className={`${styles.framed} ${block.aspect ? styles.cropped : ""}`}
                      style={block.aspect ? { aspectRatio: block.aspect } : undefined}
                    >
                      <Image
                        src={item.image}
                        alt={item.alt}
                        sizes="(max-width: 768px) 100vw, 420px"
                        style={{ width: "100%", height: block.aspect ? "100%" : "auto" }}
                      />
                    </div>
                  )}
                  <figcaption className={styles.itemCaption}>{item.caption}</figcaption>
                </figure>
              </li>
            ))}
          </ul>
          {block.caption && <figcaption className={styles.caption}>{block.caption}</figcaption>}
        </figure>
      );

    case "strip":
      return (
        <div className={styles.stripWrap}>
          <div className={styles.strip} tabIndex={0} role="region" aria-label={`${block.label} (scrolls sideways)`}>
            <ul className={styles.stripList}>
              {block.items.map((item) => (
                <li key={item.caption}>
                  <figure>
                    <div className={styles.framed}>
                      <Image
                        src={item.image}
                        alt={item.alt}
                        sizes="(max-width: 768px) 85vw, 640px"
                        style={{ width: "100%", height: "auto" }}
                      />
                    </div>
                    <figcaption className={styles.itemCaption}>{item.caption}</figcaption>
                  </figure>
                </li>
              ))}
            </ul>
          </div>
        </div>
      );

    case "compare":
      return <Compare block={block} />;

    case "compareSet":
      return (
        <ul className={styles.compareSet}>
          {block.items.map((c, i) => (
            <li key={i}>
              <Compare block={c} />
            </li>
          ))}
        </ul>
      );

    case "table":
      return (
        <div className={styles.tableScroll} tabIndex={0} role="region" aria-label={`${block.caption} (table)`}>
          <table className={styles.table}>
            <caption className={styles.tableCaption}>{block.caption}</caption>
            <thead>
              <tr>
                {block.columns.map((c) => (
                  <th key={c} scope="col">
                    {c}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {block.rows.map((r, i) => (
                <tr key={i}>
                  {r.map((cell, j) =>
                    j === 0 ? (
                      <th key={j} scope="row">
                        {cell}
                      </th>
                    ) : (
                      <td key={j}>{cell}</td>
                    ),
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );

    case "quote":
      return (
        <blockquote className={styles.quote}>
          <p>{block.text}</p>
        </blockquote>
      );

    case "stickers":
      return (
        <ul className={styles.stickers} aria-label={block.label}>
          {block.items.map((t, i) => (
            <li key={t}>
              <Sticker variant={i % 3 === 0 ? "project" : "cream"} rotate={[-2, 1, -1, 2, 0, -3][i % 6]}>
                {t}
              </Sticker>
            </li>
          ))}
        </ul>
      );

    case "film":
      return <PromoFilm video={block.video} label={block.label} captions={block.captions} />;

    case "custom": {
      const C = custom[block.name];
      return <C />;
    }
  }
}

function Compare({ block }: { block: Extract<Block, { kind: "compare" }> }) {
  if (block.frame === "phone") {
    return (
      <figure className={styles.comparePhone}>
        <PhoneFrame>
          <CompareSlider before={block.before} after={block.after} sizes="(max-width: 480px) 80vw, 300px" fill />
        </PhoneFrame>
        {block.caption && <figcaption className={styles.phoneCaption}>{block.caption}</figcaption>}
      </figure>
    );
  }
  return (
    <figure className={styles.figure}>
      <BrowserFrame domain={block.domain ?? ""}>
        <CompareSlider before={block.before} after={block.after} sizes="(max-width: 1240px) 100vw, 1240px" />
      </BrowserFrame>
      {block.caption && <figcaption className={styles.caption}>{block.caption}</figcaption>}
    </figure>
  );
}
