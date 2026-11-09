"use client";

import Image, { type StaticImageData } from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { usePrefersReducedMotion } from "@/lib/reducedMotion";
import gluteniaResult from "@media/glutenia/app/ai-result-gluten.png";
import gluteniaMap from "@media/glutenia/app/map-live.png";
import gluteniaBadges from "@media/glutenia/app/badges.png";
import gluteniaEvents from "@media/glutenia/app/events.png";
import gluteniaJourney from "@media/glutenia/app/journey.png";
import gluteniaCatalog from "@media/glutenia/app/catalog.png";
import gluteniaHome from "@media/glutenia/app/home.png";
import lafricaineLive from "@media/lafricaine/live-home.png";
import lafricaineAbout from "@media/lafricaine/pages/about.jpg";
import lafricaineOrderForm from "@media/lafricaine/video/03-order-form-scroll-poster.jpg";
import lafricaineContact from "@media/lafricaine/pages/contact.jpg";
import lafricaineNews from "@media/lafricaine/pages/news.jpg";
import lafricaineEvent from "@media/lafricaine/pages/event.jpg";
import lafricaineFigmaHome from "@media/lafricaine/figma-home-top.jpg";
import styles from "./HeroDesk.module.css";

type Mode = "app" | "web";

/** Each list is seven long: three either side of the center, the outer pair hidden while they wrap around. */
const SCREENS: Record<Mode, StaticImageData[]> = {
  app: [
    gluteniaResult,
    gluteniaMap,
    gluteniaBadges,
    gluteniaEvents,
    gluteniaJourney,
    gluteniaCatalog,
    gluteniaHome,
  ],
  // Public pages only: no admin screens, and the shop mockups contain placeholder book covers.
  web: [
    lafricaineLive,
    lafricaineAbout,
    lafricaineNews,
    lafricaineEvent,
    lafricaineOrderForm,
    lafricaineContact,
    lafricaineFigmaHome,
  ],
};

const PROJECT = {
  app: {
    href: "/work/glutenia",
    label: "Open the Glutenia case study",
    note: "Glutenia: designed and built by me",
  },
  web: {
    href: "/work/lafricaine",
    label: "Open the L'Africaine de Prod Artistique case study",
    note: "L’Africaine: designed in Figma, now live",
  },
};

const STEP_MS = 1500;

/** Position relative to the center, from -3 to 3. A rising step moves every screen left, so new ones enter from the right. */
function offset(index: number, step: number, length: number) {
  return ((((index - step + 3) % length) + length) % length) - 3;
}

function Track({ mode, active, step }: { mode: Mode; active: boolean; step: number }) {
  const screens = SCREENS[mode];
  return (
    <div className={`${styles.track} ${styles[mode]}`} data-on={active} inert={!active}>
      {screens.map((src, i) => (
        <div key={i} className={styles.slide} data-o={offset(i, step, screens.length)}>
          {mode === "app" ? (
            <div className={styles.phone}>
              <div className={styles.screen}>
                <Image src={src} alt="" sizes="(max-width: 767px) 130px, 230px" preload={i === 0} />
              </div>
            </div>
          ) : (
            <div className={styles.laptop}>
              <div className={styles.lid}>
                <div className={styles.screen}>
                  <Image src={src} alt="" sizes="(max-width: 767px) 260px, 480px" />
                </div>
              </div>
              <div className={styles.base} />
            </div>
          )}
        </div>
      ))}
      <Link href={PROJECT[mode].href} className={styles.open} aria-label={PROJECT[mode].label} />
    </div>
  );
}

/**
 * Hero art: real screens sliding through the center, biggest in the middle and
 * dimmer towards the edges. The switch flips between the Glutenia app on phones
 * and the L'Africaine website on laptops.
 */
export function HeroDesk() {
  const reducedMotion = usePrefersReducedMotion();
  const [mode, setMode] = useState<Mode>("app");
  const [step, setStep] = useState(0);
  const [toggled, setToggled] = useState(false);
  const stageRef = useRef<HTMLDivElement>(null);
  const held = useRef(false);
  const onScreen = useRef(true);

  const playing = !reducedMotion;
  const web = mode === "web";

  useEffect(() => {
    const stage = stageRef.current;
    if (!stage) return;
    const observer = new IntersectionObserver(([entry]) => {
      onScreen.current = entry.isIntersecting;
    });
    observer.observe(stage);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!playing) return;
    const timer = window.setInterval(() => {
      if (!held.current && onScreen.current && !document.hidden) setStep((s) => s + 1);
    }, STEP_MS);
    return () => window.clearInterval(timer);
  }, [playing]);

  const flip = () => {
    setMode(web ? "app" : "web");
    setStep(0);
    setToggled(true);
  };

  return (
    <div className={styles.desk}>
      <div
        ref={stageRef}
        className={styles.stage}
        onMouseEnter={() => {
          held.current = true;
        }}
        onMouseLeave={() => {
          held.current = false;
        }}
        onFocus={() => {
          held.current = true;
        }}
        onBlur={() => {
          held.current = false;
        }}
      >
        <Track mode="app" active={!web} step={step} />
        <Track mode="web" active={web} step={step} />
      </div>

      <div className={styles.controls}>
        <button
          type="button"
          role="switch"
          aria-checked={web}
          aria-label="Show the L'Africaine website instead of the Glutenia app"
          className={styles.toggle}
          onClick={flip}
        >
          <span className={styles.knob} aria-hidden="true" />
          <span className={styles.option} data-on={!web} aria-hidden="true">
            <svg viewBox="0 0 24 24">
              <rect x="7" y="2.5" width="10" height="19" rx="2.5" />
              <path d="M11 18.5h2" />
            </svg>
            App
          </span>
          <span className={styles.option} data-on={web} aria-hidden="true">
            <svg viewBox="0 0 24 24">
              <rect x="4.5" y="5" width="15" height="10.5" rx="1.5" />
              <path d="M2.5 19h19" />
            </svg>
            Website
          </span>
        </button>

        {!toggled && (
          <span className={styles.hint} aria-hidden="true">
            <svg viewBox="0 0 48 24">
              <path d="M44 16C32 21 18 19 6 8m0 0 1 10M6 8l10-1" />
            </svg>
            flip me
          </span>
        )}
      </div>

      <p className={styles.note} aria-live="polite">
        {PROJECT[mode].note}
      </p>
    </div>
  );
}
