"use client";

import Image from "next/image";
import { useEffect, useId, useRef, useState, type CSSProperties, type ReactNode } from "react";
import thinkingImg from "@media/about/manel-thinking.png";
import ideaImg from "@media/about/manel-idea.png";
import { usePrefersReducedMotion } from "@/lib/reducedMotion";
import styles from "./HeroAvatar.module.css";

/*
 * Home hero portrait: Manel thinks, the sticker shakes like it's being peeled,
 * she gets the idea and her tools fly out around the frame.
 * thinking → shaking → idea → tools → idle. CSS does the motion; this only
 * flips data-phase on a timeline. She thinks for 1.2 s; the whole intro lands in about 2.3 s.
 */
type Phase = "thinking" | "shaking" | "idea" | "tools" | "idle";

const SHAKE_AT = 1200;
const SWAP_AT = 1650; // the shake runs 450 ms
const TOOLS_AT = 1670; // 70 ms stagger, 300 ms flight: the 5th tool lands at 2250 ms
const IDLE_AT = 2270;

/* Colours sampled from the cartoon, plus the site's cream and Glutenia green. */
const C = {
  line: "#2B211C",
  tee: "#EF562D",
  teeShade: "#C9401C",
  blue: "#5385F6",
  blueShade: "#3A67D4",
  blueTint: "#A9C2FB",
  peach: "#FCC49F",
  peachShade: "#EBA57F",
  cream: "#FFF1E2",
  creamDeep: "#FFE3C7",
  creamShade: "#F2CDA6",
  green: "#8BC34A",
  greenShade: "#6E9F33",
  white: "#FFFFFF",
};

/** Four-point sparkle like the one next to the cartoon. */
function Sparkle({ x, y, s = 6 }: { x: number; y: number; s?: number }) {
  const q = s * 0.18;
  return (
    <path
      d={`M${x} ${y - s}Q${x + q} ${y - q} ${x + s} ${y}Q${x + q} ${y + q} ${x} ${y + s}Q${x - q} ${y + q} ${x - s} ${y}Q${x - q} ${y - q} ${x} ${y - s}Z`}
      fill={C.blue}
      stroke="none"
    />
  );
}

const line = { stroke: C.line, strokeWidth: 2.5 } as const;
const flat = { stroke: "none" } as const;
const shine = { stroke: C.white, strokeWidth: 2.2, fill: "none" } as const;

const art: Record<string, ReactNode> = {
  pen: (
    <>
      <path d="M8 52Q20 38 32 49T56 44" fill="none" {...line} />
      <path d="M21 53L43 45" {...line} strokeWidth={1.6} />
      <circle cx="21" cy="53" r="2.4" fill={C.blue} {...line} strokeWidth={1.6} />
      <circle cx="43" cy="45" r="2.4" fill={C.blue} {...line} strokeWidth={1.6} />
      <path d="M24 12H40L45 25L32 42L19 25Z" fill={C.tee} {...line} />
      <path d="M32 12H40L45 25L32 42Z" fill={C.teeShade} {...flat} />
      <path d="M24 12H40L45 25L32 42L19 25Z" fill="none" {...line} />
      <rect x="22" y="5" width="20" height="7" rx="2" fill={C.creamDeep} {...line} />
      <path d="M32 42V30" {...line} strokeWidth={2} />
      <circle cx="32" cy="27" r="2.6" fill={C.line} stroke="none" />
      <path d="M24.5 17L22.5 23" {...shine} />
      {[
        [8, 52],
        [32, 48],
        [56, 44],
      ].map(([x, y]) => (
        <rect key={x} x={x - 3.5} y={y - 3.5} width="7" height="7" rx="1" fill={C.white} {...line} strokeWidth={2} />
      ))}
      <Sparkle x={53} y={13} />
    </>
  ),
  palette: (
    <>
      <path
        d="M32 8C46 8 57 18 57 30C57 38 50 40 45 38C40 36 36 40 38 45C40 51 36 56 30 56C17 56 7 45 7 32C7 18 18 8 32 8Z"
        fill={C.creamDeep}
        {...line}
      />
      <path d="M9.5 39C13 48 21 54 30 54C34 54 37 52 37.5 49C28 50 16 46 9.5 39Z" fill={C.creamShade} {...flat} />
      <path
        d="M32 8C46 8 57 18 57 30C57 38 50 40 45 38C40 36 36 40 38 45C40 51 36 56 30 56C17 56 7 45 7 32C7 18 18 8 32 8Z"
        fill="none"
        {...line}
      />
      <circle cx="20" cy="22" r="4.6" fill={C.tee} {...line} strokeWidth={2} />
      <circle cx="32" cy="17" r="4.6" fill={C.blue} {...line} strokeWidth={2} />
      <circle cx="44" cy="22" r="4.6" fill={C.green} {...line} strokeWidth={2} />
      <circle cx="17" cy="35" r="4.6" fill={C.peach} {...line} strokeWidth={2} />
      <path d="M13 20Q16 14 22 11.5" {...shine} />
    </>
  ),
  cursor: (
    <>
      <path d="M17 7V49L27.5 39.5L34.5 55L42 51.5L35 36.5H49Z" fill={C.blue} {...line} />
      <path d="M17 7L49 36.5H35L42 51.5L38.5 53.2L31 36.5Z" fill={C.blueShade} {...flat} />
      <path d="M17 7V49L27.5 39.5L34.5 55L42 51.5L35 36.5H49Z" fill="none" {...line} />
      <path d="M21.5 17V30" {...shine} />
    </>
  ),
  phone: (
    <>
      <rect x="17" y="5" width="30" height="54" rx="7" fill={C.tee} {...line} />
      <path d="M40 6.3H40Q45.7 6.3 45.7 12V52Q45.7 57.7 40 57.7Z" fill={C.teeShade} {...flat} />
      <rect x="17" y="5" width="30" height="54" rx="7" fill="none" {...line} />
      <rect x="21" y="12" width="22" height="40" rx="2.5" fill={C.cream} {...line} strokeWidth={2} />
      <path d="M29 8.5H35" {...line} strokeWidth={2} />
      <rect x="24" y="15.5" width="16" height="10" rx="1.5" fill="none" {...line} strokeWidth={1.4} />
      <path d="M24 15.5L40 25.5M40 15.5L24 25.5" {...line} strokeWidth={1.2} />
      <path d="M24 30H40M24 34.5H35" {...line} strokeWidth={1.6} />
      <rect x="24" y="41" width="16" height="6" rx="3" fill={C.blue} {...line} strokeWidth={1.4} />
      <path d="M20 14V24" {...shine} strokeWidth={1.8} />
      <Sparkle x={54} y={14} />
    </>
  ),
  code: (
    <>
      <rect x="5" y="13" width="54" height="38" rx="10" fill={C.green} {...line} />
      <path d="M6.3 40H57.7V41Q57.7 49.7 49 49.7H15Q6.3 49.7 6.3 41Z" fill={C.greenShade} {...flat} />
      <rect x="5" y="13" width="54" height="38" rx="10" fill="none" {...line} />
      <path d="M22 24L14 32L22 40M35.5 22L28.5 42M42 24L50 32L42 40" fill="none" stroke={C.line} strokeWidth={7} />
      <path d="M22 24L14 32L22 40M35.5 22L28.5 42M42 24L50 32L42 40" fill="none" stroke={C.white} strokeWidth={3} />
    </>
  ),
};

type Tool = {
  id: keyof typeof art;
  /** Centre, as a % of the hero art box. */
  x: number;
  y: number;
  /** Resting tilt in degrees, fixed per tool. */
  r: number;
  /** Float duration and delay, seconds. */
  fd: number;
  fdl: number;
};

const tools: Tool[] = [
  { id: "pen", x: 6, y: 15, r: -8, fd: 3.4, fdl: 0 },
  { id: "palette", x: 95, y: 38, r: 6, fd: 4.2, fdl: 0.6 },
  { id: "cursor", x: 5, y: 50, r: -4, fd: 3.8, fdl: 1.1 },
  { id: "phone", x: 95, y: 63, r: 5, fd: 4.8, fdl: 0.3 },
  { id: "code", x: 7, y: 84, r: 7, fd: 3.1, fdl: 0.9 },
];

export function HeroAvatar() {
  const filterId = useId();
  const reduced = usePrefersReducedMotion();
  const [state, setState] = useState<Phase>("thinking");
  const [run, setRun] = useState(0);
  const [inView, setInView] = useState(true);
  const [tabHidden, setTabHidden] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const thinkRef = useRef<HTMLImageElement>(null);

  const phase: Phase = reduced ? "idle" : state;
  const swapped = phase === "idea" || phase === "tools" || phase === "idle";

  // Timeline. The first run waits for the portrait so it never plays to an empty frame.
  useEffect(() => {
    if (reduced) return;
    const timers: number[] = [];
    const start = () => {
      timers.push(
        window.setTimeout(() => setState("shaking"), SHAKE_AT),
        window.setTimeout(() => setState("idea"), SWAP_AT),
        window.setTimeout(() => setState("tools"), TOOLS_AT),
        window.setTimeout(() => setState("idle"), IDLE_AT),
      );
    };
    const img = thinkRef.current;
    const waitForImage = run === 0 && img && !img.complete;
    if (waitForImage) img.addEventListener("load", start, { once: true });
    else start();
    return () => {
      timers.forEach(clearTimeout);
      img?.removeEventListener("load", start);
    };
  }, [run, reduced]);

  // Pause the idle float when the hero is offscreen or the tab is hidden.
  useEffect(() => {
    const el = rootRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(([entry]) => setInView(entry.isIntersecting));
    observer.observe(el);
    const onVisibility = () => setTabHidden(document.hidden);
    document.addEventListener("visibilitychange", onVisibility);
    return () => {
      observer.disconnect();
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, []);

  const replay = () => {
    if (reduced) return;
    setState("thinking");
    setRun((n) => n + 1);
  };

  return (
    <div
      ref={rootRef}
      className={styles.stage}
      data-phase={phase}
      data-swapped={swapped}
      data-paused={!inView || tabHidden}
    >
      <svg className={styles.defs} aria-hidden="true" focusable="false">
        {/* Die-cut paper: the shape grown by ~4 units with round corners, then a soft offset shadow. */}
        <filter id={filterId} x="-30%" y="-30%" width="160%" height="160%" colorInterpolationFilters="sRGB">
          <feMorphology in="SourceAlpha" operator="dilate" radius="3" result="grown" />
          <feGaussianBlur in="grown" stdDeviation="1.4" result="soft" />
          <feComponentTransfer in="soft" result="cut">
            <feFuncA type="linear" slope="4" intercept="-1" />
          </feComponentTransfer>
          <feFlood floodColor="#fff" />
          <feComposite operator="in" in2="cut" result="paper" />
          <feDropShadow in="paper" dx="1" dy="2" stdDeviation="1.5" floodColor={C.line} floodOpacity="0.24" />
          <feMerge>
            <feMergeNode />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </svg>

      <ul className={styles.tools} aria-hidden="true">
        {tools.map((t, i) => (
          <li
            key={t.id}
            className={styles.tool}
            style={
              {
                "--x": t.x,
                "--y": t.y,
                "--r": `${t.r}deg`,
                "--i": i,
                "--fd": `${t.fd}s`,
                "--fdl": `${t.fdl}s`,
              } as CSSProperties
            }
          >
            <span className={styles.toolTilt}>
              <svg viewBox="0 0 64 64" focusable="false">
                <g filter={`url(#${filterId})`} strokeLinecap="round" strokeLinejoin="round">
                  {art[t.id]}
                </g>
              </svg>
            </span>
          </li>
        ))}
      </ul>

      <div className={styles.sticker}>
        <div className={styles.tilt}>
          <div className={styles.pose}>
            <svg className={styles.spark} viewBox="-50 -50 100 100" aria-hidden="true" focusable="false">
              {Array.from({ length: 8 }, (_, k) => (
                <path key={k} d="M0 -30V-46" transform={`rotate(${k * 45 + 22.5})`} />
              ))}
            </svg>
            <Image
              ref={thinkRef}
              src={thinkingImg}
              alt={swapped ? "" : "Illustrated portrait of Manel thinking"}
              aria-hidden={swapped || undefined}
              sizes="(max-width: 767px) 330px, (max-width: 1023px) 420px, 525px"
              preload
              className={`${styles.img} ${styles.thinkImg}`}
            />
            <Image
              src={ideaImg}
              alt={swapped ? "Illustrated portrait of Manel smiling with an idea" : ""}
              aria-hidden={!swapped || undefined}
              sizes="(max-width: 767px) 330px, (max-width: 1023px) 420px, 525px"
              loading="eager"
              className={`${styles.img} ${styles.ideaImg}`}
            />
            <svg className={styles.thought} viewBox="0 0 80 64" aria-hidden="true" focusable="false">
              <g filter={`url(#${filterId})`} strokeLinecap="round" strokeLinejoin="round">
                <circle cx="8" cy="56" r="3.2" fill={C.white} stroke={C.line} strokeWidth={2} />
                <circle cx="20" cy="47" r="4.4" fill={C.white} stroke={C.line} strokeWidth={2} />
                <circle cx="34" cy="38" r="5.6" fill={C.white} stroke={C.line} strokeWidth={2.2} />
                <path d="M50 16C49.5 7 67 5 67.5 14C68 21 59 21.5 59.5 30" fill="none" stroke={C.line} strokeWidth={8} />
                <path d="M50 16C49.5 7 67 5 67.5 14C68 21 59 21.5 59.5 30" fill="none" stroke={C.tee} strokeWidth={3.6} />
                <circle cx="59.8" cy="39" r="3.6" fill={C.tee} stroke={C.line} strokeWidth={2.2} />
              </g>
            </svg>
          </div>
        </div>
        <button type="button" className={styles.replay} aria-label="Replay animation" onClick={replay} />
      </div>
    </div>
  );
}
