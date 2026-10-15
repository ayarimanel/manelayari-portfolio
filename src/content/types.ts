import type { StaticImageData } from "next/image";

export type VideoSource = {
  mp4: string;
  webm?: string;
  poster: string;
  width: number;
  height: number;
};

export type Theme = "glutenia" | "lafricaine" | "value";

/** One screen shown in a phone: a still image or a looping clip. */
export type Screen =
  { image: StaticImageData; alt: string; caption?: string } | { video: VideoSource; label: string; caption?: string; autoplay?: boolean };

/** Content blocks a case-study section can contain. */
export type Block =
  | { kind: "phones"; items: Screen[]; caption?: string }
  | { kind: "browser"; screen: Screen; domain: string; caption?: string }
  | { kind: "image"; image: StaticImageData; alt: string; caption?: string; maxWidth?: number; framed?: boolean }
  | {
      kind: "gallery";
      items: { image: StaticImageData; alt: string; caption: string }[];
      frame: "browser" | "card";
      domain?: string;
      columns?: 2 | 3;
      /** Crop every item to the same ratio, e.g. "4 / 3". */
      aspect?: string;
      caption?: string;
    }
  | {
      kind: "strip";
      items: { image: StaticImageData; alt: string; caption: string }[];
      label: string;
    }
  | {
      kind: "compare";
      before: { image: StaticImageData; label: string; alt: string };
      after: { image: StaticImageData; label: string; alt: string };
      frame: "phone" | "browser";
      domain?: string;
      caption?: string;
    }
  | { kind: "compareSet"; items: Extract<Block, { kind: "compare" }>[] }
  | { kind: "table"; caption: string; columns: string[]; rows: string[][] }
  | { kind: "quote"; text: string }
  | { kind: "stickers"; label: string; items: string[] }
  | { kind: "film"; video: VideoSource; label: string; captions?: string }
  | { kind: "custom"; name: CustomBlockName };

/** Bespoke, hand-built diagrams and modules (see components/case/custom). */
export type CustomBlockName =
  | "labelExample"
  | "roleCards"
  | "competitorTable"
  | "navMap"
  | "scanFlow"
  | "resultStates"
  | "glutitan"
  | "xpTable"
  | "architecture"
  | "swatches"
  | "siteMap"
  | "sprints"
  | "adminSwitcher";

export type DecisionNote = {
  number: number;
  title: string;
  body: string;
  /** Index of the block this note explains (defaults to the section's last block). */
  block?: number;
};

export type CaseSection = {
  id: string;
  eyebrow?: string;
  heading: string;
  body?: string[];
  blocks?: Block[];
  notes?: DecisionNote[];
  /** "pair" shows the first two blocks side by side on desktop. */
  layout?: "stack" | "pair";
  /** Paint the section on the project's panel colour. */
  band?: boolean;
};

export type Fact = { label: string; value: string; href?: string; linkLabel?: string };

type CardImage = { image: StaticImageData; alt: string };

/** What sticks out of the top of the home folder. */
export type CardVisual =
  | { kind: "phones"; screens: [CardImage, CardImage, CardImage]; mascot?: CardImage }
  | { kind: "sheets"; front: CardImage; back?: CardImage; domain: string };

export type Project = {
  slug: string;
  title: string;
  theme: Theme;
  /** Home card label, e.g. "Academic project · Mobile app · Design + build". */
  cardLabel: string;
  /** Case-study hero label, e.g. "Academic project · 01 Mobile app". */
  heroLabel: { number: string; text: string };
  summary: string;
  lead: string;
  metaDescription: string;
  readingTime: string;
  cardStickers: string[];
  /** Folder tab on the home page: a short name and what kind of work it is. */
  cardTab: { title: string; kind: string };
  /** Handwritten sticky note on the folder: the one thing to remember. */
  cardNote: string;
  cardVisual: CardVisual;
  hero: Block;
  facts: Fact[];
  sections: CaseSection[];
  credits: string[];
  /** Live site linked after the credits. */
  live?: { href: string; label: string };
  next: string;
  ogImage: string;
};
