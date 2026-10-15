"use client";

import { Caveat } from "next/font/google";
import { useEffect, useRef, useState, type ComponentType, type KeyboardEvent, type TouchEvent } from "react";
import { usePrefersReducedMotion } from "@/lib/reducedMotion";
import { PageCover } from "./PageCover";
import { PageProblem } from "./PageProblem";
import { PageSketch } from "./PageSketch";
import { PageDesign } from "./PageDesign";
import { PageBuild } from "./PageBuild";
import { PageLaunch } from "./PageLaunch";
import { PageSchool } from "./PageSchool";
import { PageWork } from "./PageWork";
import { PageTools } from "./PageTools";
import { RansomTitle } from "./Decor";
import styles from "./DesignBook.module.css";

const caveat = Caveat({ subsets: ["latin"], weight: ["700"], variable: "--font-caveat", display: "swap" });

const PAGES: { title: string; text: string; tint: string; Scene: ComponentType }[] = [
  {
    title: "The Design Book",
    text: "The cover of my design book: how I work in five steps, then a few pages about me.",
    tint: styles.tintDeep,
    Scene: PageCover,
  },
  {
    title: "The problem",
    text: "First I look for what confuses people: here, two users stare at their phones, full of questions.",
    tint: "",
    Scene: PageProblem,
  },
  {
    title: "Sketch",
    text: "Then I sketch the user flow on grid paper: three screens linked by arrows, pinned to the page.",
    tint: styles.tintCream,
    Scene: PageSketch,
  },
  {
    title: "Design",
    text: "Next I design the screens: UI cards are dragged into a phone wireframe and snap into place.",
    tint: styles.tintLight,
    Scene: PageDesign,
  },
  {
    title: "Build",
    text: "Then I build it: hands type on a orange laptop while code snippets fly out.",
    tint: "",
    Scene: PageBuild,
  },
  {
    title: "Launch",
    text: "Finally it ships: the L'Africaine homepage mockup unrolls out of a laptop screen and scrolls.",
    tint: styles.tintCream,
    Scene: PageLaunch,
  },
  {
    title: "Class of 2026",
    text: "My ID card: Licence en Informatique (GLSI), Faculté des Sciences de Tunis, class of 2026, with a gold Mention Très Bien seal, and a photo of me and a friend on the day, in a camera frame.",
    tint: styles.tintLight,
    Scene: PageSchool,
  },
  {
    title: "Experience",
    text: "Typed on a typewriter: RedStart Tunisie, 2026, Glutenia, designed and built solo. Optima Junior Entreprise, 2025, client websites and marketing visuals. An iced coffee sits beside it.",
    tint: "",
    Scene: PageWork,
  },
  {
    title: "My toolbox",
    text: "A pencil case holding Figma, Photoshop and Illustrator; code labels for React Native, Next.js, Node.js and MongoDB; and a ticket listing my languages: Arabic (native), French (fluent), English (C1).",
    tint: styles.tintCream,
    Scene: PageTools,
  },
];

export function DesignBook() {
  const reduced = usePrefersReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const touchX = useRef<number | null>(null);
  const [page, setPage] = useState(0);
  const [dir, setDir] = useState<"next" | "prev" | null>(null);
  const [take, setTake] = useState(0);
  const [inView, setInView] = useState(false);
  const [tabVisible, setTabVisible] = useState(true);
  const [cover, setCover] = useState<"closed" | "opening" | "open">("closed");
  const opened = reduced || cover === "open";

  // Scenes wait (paused on their first frame) until the book is on screen.
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(([entry]) => setInView(entry.isIntersecting), { threshold: 0.35 });
    observer.observe(el);
    const onVisibility = () => setTabVisible(document.visibilityState === "visible");
    document.addEventListener("visibilitychange", onVisibility);
    return () => {
      observer.disconnect();
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, []);

  // The closed diary opens by itself shortly after it scrolls into view (once).
  const open = (focusBook = false) => {
    if (cover !== "closed") return;
    setCover("opening");
    window.setTimeout(() => {
      setCover("open");
      setTake((t) => t + 1);
      if (focusBook) ref.current?.focus();
    }, 900);
  };
  useEffect(() => {
    if (reduced || cover !== "closed" || !inView) return;
    const id = window.setTimeout(() => open(), 600);
    return () => window.clearTimeout(id);
  });

  const go = (to: number) => {
    if (!opened) return;
    if (to < 0 || to >= PAGES.length || to === page) return;
    setDir(to > page ? "next" : "prev");
    setPage(to);
    setTake((t) => t + 1);
  };

  const onKeyDown = (e: KeyboardEvent) => {
    if (e.key === "ArrowRight") {
      e.preventDefault();
      go(page + 1);
    } else if (e.key === "ArrowLeft") {
      e.preventDefault();
      go(page - 1);
    }
  };

  const onTouchStart = (e: TouchEvent) => {
    touchX.current = e.touches[0].clientX;
  };
  const onTouchEnd = (e: TouchEvent) => {
    if (touchX.current === null) return;
    const dx = e.changedTouches[0].clientX - touchX.current;
    touchX.current = null;
    if (Math.abs(dx) > 50) go(page + (dx < 0 ? 1 : -1));
  };

  const { Scene, title, text, tint } = PAGES[page];
  const turn = dir === "next" ? styles.turnNext : dir === "prev" ? styles.turnPrev : "";
  const motion = reduced ? styles.still : !opened || !inView || !tabVisible ? styles.paused : "";
  const state = opened ? "" : cover === "opening" ? styles.opening : styles.closed;

  return (
    <div
      ref={ref}
      role="region"
      aria-roledescription="flipbook"
      aria-label="The Design Book, how I work"
      tabIndex={0}
      className={`${styles.book} ${caveat.variable} ${motion} ${state}`}
      onKeyDown={onKeyDown}
    >
      <div className={styles.bookBox}>
      <div className={styles.stage} onTouchStart={onTouchStart} onTouchEnd={onTouchEnd}>
        <div key={`${page}-${take}`} className={`${styles.sheet} ${tint} ${turn}`}>
          <p className="visually-hidden">{text}</p>
          <div className={styles.scene}>
            <Scene />
          </div>
          <span className={styles.spine} aria-hidden="true" />
        </div>
        <span className={styles.ribbon} aria-hidden="true" />
      </div>
      {!opened && (
        <button type="button" className={styles.closedCover} aria-label="Open the Design Book" onClick={() => open(true)}>
          <span className={styles.coverContent} aria-hidden="true">
            <RansomTitle as="span" text="The Design Book" delay={0} />
            <span className={`${styles.hand} ${styles.tapHint}`}>tap to open ♡</span>
          </span>
        </button>
      )}
      </div>

      <p className="visually-hidden" aria-live="polite">
        Page {page + 1} of {PAGES.length}: {title}
      </p>

      <div className={styles.controls}>
        <button
          type="button"
          className={styles.navBtn}
          aria-label="Previous page"
          disabled={page === 0}
          onClick={() => go(page - 1)}
        >
          ←
        </button>
        <ol className={styles.dots}>
          {PAGES.map((p, i) => (
            <li key={p.title}>
              <button
                type="button"
                className={styles.dot}
                aria-label={`Page ${i + 1}: ${p.title}`}
                aria-current={i === page}
                onClick={() => go(i)}
              />
            </li>
          ))}
        </ol>
        <button
          type="button"
          className={styles.navBtn}
          aria-label="Next page"
          disabled={page === PAGES.length - 1}
          onClick={() => go(page + 1)}
        >
          →
        </button>
        <button
          type="button"
          className={styles.replayBtn}
          aria-label="Replay"
          onClick={() => {
            setDir(null);
            setTake((t) => t + 1);
          }}
        >
          ↻<span className={styles.replayText}> Replay</span>
        </button>
      </div>
    </div>
  );
}
