"use client";

import { useEffect, useRef } from "react";
import { prefersReducedMotionNow } from "@/lib/reducedMotion";
import styles from "./CatCompanion.module.css";

const BED_KEY = "cat-in-bed";
const NAP_AFTER = 3000;
const WAKE_LABEL = "Wake the cat";
const BED_LABEL = "Send cat to bed";

const wait = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));
const clamp = (value: number, min: number, max: number) => Math.min(max, Math.max(min, value));

function readInBed() {
  try {
    return window.localStorage.getItem(BED_KEY) === "1";
  } catch {
    return false;
  }
}
function storeInBed(inBed: boolean) {
  try {
    window.localStorage.setItem(BED_KEY, inBed ? "1" : "0");
  } catch {
    // Private browsing: the choice just lasts for this visit.
  }
}

/**
 * A quiet cat that jumps to whichever section the visitor is on, then naps.
 * Clicking her makes her say "mrrp!" without waking her. Spots she can sit on
 * are marked in the page with data-cat-perch.
 */
export function CatCompanion() {
  const petRef = useRef<HTMLDivElement>(null);
  const flipRef = useRef<HTMLDivElement>(null);
  const squashRef = useRef<HTMLDivElement>(null);
  const catRef = useRef<SVGSVGElement>(null);
  const lookRef = useRef<SVGGElement>(null);
  const saidRef = useRef<HTMLSpanElement>(null);
  const bedRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const pet = petRef.current;
    const flip = flipRef.current;
    const squash = squashRef.current;
    const cat = catRef.current;
    const look = lookRef.current;
    const said = saidRef.current;
    const bed = bedRef.current;
    if (!pet || !flip || !squash || !cat || !look || !said || !bed) return;

    // Some spots only suit one screen size (data-cat-only="small" or "large").
    const size = window.innerWidth < 768 ? "small" : "large";
    const perches = Array.from(document.querySelectorAll<HTMLElement>("[data-cat-perch]")).filter(
      (perch) => !perch.dataset.catOnly || perch.dataset.catOnly === size,
    );
    if (!perches.length) return;

    const still = prefersReducedMotionNow();
    const me = { x: 0, y: 0, dir: 1 };
    let token = 0;
    let inBed = readInBed();
    let saidTimer = 0;

    const setPose = (pose: "sit" | "air" | "sleep") => {
      cat.dataset.pose = pose;
    };
    const place = () => {
      pet.style.transform = `translate(${me.x - pet.offsetWidth / 2}px, ${me.y - pet.offsetHeight}px)`;
      flip.style.transform = `scaleX(${me.dir})`;
    };
    const point = (perch: HTMLElement) => {
      const box = perch.getBoundingClientRect();
      return {
        x: box.left + window.scrollX + box.width * (Number(perch.dataset.catX) || 0.5),
        y: box.top + window.scrollY + 2,
      };
    };
    const headerBottom = () => Math.max(0, document.querySelector("header")?.getBoundingClientRect().bottom ?? 0);
    const pageWidth = () => document.documentElement.clientWidth;

    /** The perch in whichever section fills most of the screen. */
    const pick = () => {
      let best = perches[0];
      let most = -Infinity;
      for (const perch of perches) {
        const box = (perch.closest("section") ?? perch).getBoundingClientRect();
        const seen = Math.min(box.bottom, window.innerHeight) - Math.max(box.top, headerBottom());
        if (seen > most) {
          most = seen;
          best = perch;
        }
      }
      return best;
    };

    /** If the page has scrolled away from her, she comes in from the side instead of flying across it. */
    const comeIn = () => {
      const top = me.y - pet.offsetHeight - window.scrollY;
      if (top < window.innerHeight && me.y - window.scrollY > headerBottom()) return;
      me.x = Math.random() < 0.5 ? -pet.offsetWidth : pageWidth() + pet.offsetWidth;
      me.y = window.scrollY + window.innerHeight * (0.45 + Math.random() * 0.25);
      place();
    };

    const leap = async (toX: number, toY: number, tk: number) => {
      const fromX = me.x;
      const fromY = me.y;
      const distance = Math.hypot(toX - fromX, toY - fromY);
      if (distance < 4 || still) {
        me.x = toX;
        me.y = toY;
        place();
        return;
      }
      me.dir = toX >= fromX ? 1 : -1;
      place();
      setPose("sit");
      await squash.animate([{ transform: "none" }, { transform: "scale(1.14, 0.78)" }], { duration: 130, easing: "ease-out" }).finished;
      if (tk !== token) return;
      setPose("air");
      const duration = clamp(380 + distance * 0.55, 420, 1000);
      const arc = clamp(distance * 0.28 + 50, 70, 190);
      const start = performance.now();
      await new Promise<void>((done) => {
        const step = (now: number) => {
          if (tk !== token) return done();
          const q = clamp((now - start) / duration, 0, 1);
          me.x = fromX + (toX - fromX) * q;
          me.y = fromY + (toY - fromY) * q - arc * 4 * q * (1 - q);
          place();
          if (q < 1) requestAnimationFrame(step);
          else done();
        };
        requestAnimationFrame(step);
      });
      if (tk !== token) return;
      setPose("sit");
      squash.animate(
        [{ transform: "scale(1.2, 0.72)" }, { transform: "scale(0.94, 1.08)" }, { transform: "none" }],
        { duration: 300, easing: "ease-out" },
      );
    };

    const follow = async (tk: number, startPerch: HTMLElement) => {
      let perch = startPerch;
      let landed = performance.now();
      while (tk === token) {
        const next = pick();
        if (next !== perch) {
          perch = next;
          comeIn();
          const target = point(perch);
          await leap(target.x, target.y, tk);
          if (tk !== token) return;
          landed = performance.now();
        } else {
          // Stay on the perch when images load and the layout shifts.
          const target = point(perch);
          if (Math.abs(target.x - me.x) > 2 || Math.abs(target.y - me.y) > 2) {
            me.x = target.x;
            me.y = target.y;
            place();
          }
          if (performance.now() - landed > NAP_AFTER && cat.dataset.pose !== "sleep") setPose("sleep");
        }
        await wait(200);
      }
    };

    const start = () => {
      token += 1;
      setPose("sit");
      const perch = pick();
      const target = point(perch);
      if (still) {
        me.x = target.x;
        me.y = target.y;
        place();
        return;
      }
      void follow(token, perch);
    };

    const sendToBed = async () => {
      inBed = true;
      storeInBed(true);
      bed.textContent = WAKE_LABEL;
      token += 1;
      const tk = token;
      await leap(pageWidth() + pet.offsetWidth, window.scrollY + window.innerHeight * 0.75, tk);
      if (tk === token) pet.hidden = true;
    };
    const wakeUp = () => {
      inBed = false;
      storeInBed(false);
      bed.textContent = BED_LABEL;
      pet.hidden = false;
      me.x = pageWidth() + pet.offsetWidth;
      me.y = window.scrollY + window.innerHeight * 0.7;
      place();
      start();
    };
    const onBed = () => {
      if (inBed) wakeUp();
      else void sendToBed();
    };

    const onPet = () => {
      said.textContent = "mrrp!";
      said.hidden = false;
      window.clearTimeout(saidTimer);
      saidTimer = window.setTimeout(() => {
        said.hidden = true;
      }, 1300);
      if (still) return;
      squash.animate(
        [{ transform: "none" }, { transform: "translateY(-16px) scale(1.06)" }, { transform: "none" }],
        { duration: 340, easing: "ease-out" },
      );
      for (let i = 0; i < 6; i += 1) {
        const heart = document.createElement("span");
        heart.className = styles.heart;
        heart.textContent = "♥";
        pet.appendChild(heart);
        const angle = -Math.PI / 2 + (i - 2.5) * 0.42;
        const reach = 44 + Math.random() * 38;
        heart
          .animate(
            [
              { transform: "translate(-50%, -50%) scale(0.5)", opacity: 1 },
              {
                transform: `translate(calc(-50% + ${Math.cos(angle) * reach}px), calc(-50% + ${Math.sin(angle) * reach}px)) scale(1.15)`,
                opacity: 0,
              },
            ],
            { duration: 780, easing: "cubic-bezier(0.22, 1, 0.36, 1)" },
          )
          .finished.then(() => heart.remove());
      }
    };

    /** Her eyes follow the mouse. */
    const onPointer = (event: PointerEvent) => {
      if (still) return;
      const box = pet.getBoundingClientRect();
      const dx = event.clientX - (box.left + box.width / 2);
      const dy = event.clientY - (box.top + box.height * 0.4);
      const distance = Math.hypot(dx, dy) || 1;
      const reach = 2.6 * Math.min(1, distance / 120);
      look.setAttribute("transform", `translate(${((dx / distance) * reach * me.dir).toFixed(2)} ${((dy / distance) * reach).toFixed(2)})`);
    };

    /** The bed button rides above the footer instead of covering its links. */
    const liftBed = () => {
      const footerTop = document.querySelector("footer")?.getBoundingClientRect().top ?? window.innerHeight;
      bed.style.translate = `0 ${-Math.max(0, window.innerHeight - footerTop)}px`;
    };

    const catButton = pet.querySelector("button");
    catButton?.addEventListener("click", onPet);
    bed.addEventListener("click", onBed);
    window.addEventListener("pointermove", onPointer, { passive: true });
    window.addEventListener("scroll", liftBed, { passive: true });
    window.addEventListener("resize", liftBed);

    liftBed();
    const first = point(pick());
    me.x = first.x;
    me.y = first.y;
    place();
    pet.dataset.ready = "true";
    bed.dataset.ready = "true";
    if (inBed) {
      pet.hidden = true;
      bed.textContent = WAKE_LABEL;
    } else {
      start();
    }

    return () => {
      token += 1;
      window.clearTimeout(saidTimer);
      catButton?.removeEventListener("click", onPet);
      bed.removeEventListener("click", onBed);
      window.removeEventListener("pointermove", onPointer);
      window.removeEventListener("scroll", liftBed);
      window.removeEventListener("resize", liftBed);
    };
  }, []);

  return (
    <>
      <div ref={petRef} className={styles.pet}>
        <span ref={saidRef} className={styles.said} aria-live="polite" hidden />
        <div ref={flipRef} className={styles.fill}>
          <div ref={squashRef} className={`${styles.fill} ${styles.squash}`}>
            <button type="button" className={styles.button} aria-label="Pet the cat">
              <svg ref={catRef} className={styles.cat} viewBox="0 0 140 120" data-pose="sit" aria-hidden="true">
                <defs>
                  <linearGradient id="cat-iris" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0" stopColor="#36199c" />
                    <stop offset="1" stopColor="#d98cff" />
                  </linearGradient>
                </defs>
                <g className={styles.tail}>
                  <path d="M96 100C130 104 134 70 118 56" fill="none" stroke="#1b0e22" strokeWidth="17" strokeLinecap="round" />
                  <path d="M96 100C130 104 134 70 118 56" fill="none" stroke="#f6f1ff" strokeWidth="12" strokeLinecap="round" />
                  <path d="M125 76C126 68 123 61 118 56" fill="none" stroke="#c4b4f0" strokeWidth="12" strokeLinecap="round" />
                </g>
                <g stroke="#1b0e22" strokeWidth="2.5" strokeLinejoin="round">
                  <g className={styles.sit} fill="#f6f1ff">
                    <ellipse cx="70" cy="92" rx="27" ry="25" />
                    <ellipse cx="59" cy="113" rx="10" ry="6.5" />
                    <ellipse cx="81" cy="113" rx="10" ry="6.5" />
                  </g>
                  <g className={styles.air} fill="#f6f1ff">
                    <rect x="24" y="92" width="13" height="27" rx="6.5" transform="rotate(38 30 92)" />
                    <rect x="40" y="94" width="13" height="25" rx="6.5" transform="rotate(26 46 94)" />
                    <rect x="88" y="92" width="13" height="26" rx="6.5" transform="rotate(-34 94 92)" />
                    <rect x="102" y="88" width="13" height="27" rx="6.5" transform="rotate(-46 108 88)" />
                    <ellipse cx="66" cy="84" rx="42" ry="20" />
                  </g>
                  <g className={styles.loaf} fill="#f6f1ff">
                    <ellipse cx="74" cy="96" rx="48" ry="23" />
                  </g>
                  <g className={styles.head}>
                    <path d="M38 44L32 6 66 24Z" fill="#f6f1ff" />
                    <g className={styles.earRight}>
                      <path d="M102 44L108 6 74 24Z" fill="#c4b4f0" />
                      <path d="M99 33L103 16 86 25Z" fill="#f2a8d8" stroke="none" />
                    </g>
                    <path d="M41 33L37 16 54 25Z" fill="#f2a8d8" stroke="none" />
                    <ellipse cx="70" cy="50" rx="42" ry="33" fill="#f6f1ff" />
                    <path d="M86 20C100 24 110 36 111 49 102 52 90 46 85 36Z" fill="#c4b4f0" stroke="none" />
                    <g stroke="none">
                      <ellipse cx="38" cy="62" rx="8" ry="4.5" fill="#f2a8d8" opacity="0.75" />
                      <ellipse cx="102" cy="62" rx="8" ry="4.5" fill="#f2a8d8" opacity="0.75" />
                      <g className={styles.eyes}>
                        <ellipse cx="52" cy="51" rx="11.5" ry="14" fill="#1b0e22" />
                        <ellipse cx="88" cy="51" rx="11.5" ry="14" fill="#1b0e22" />
                        <g ref={lookRef}>
                          <ellipse cx="52" cy="54" rx="8" ry="10" fill="url(#cat-iris)" />
                          <ellipse cx="88" cy="54" rx="8" ry="10" fill="url(#cat-iris)" />
                          <circle cx="48" cy="45.5" r="4.4" fill="#fff" />
                          <circle cx="84" cy="45.5" r="4.4" fill="#fff" />
                          <circle cx="56" cy="58" r="2" fill="#fff" />
                          <circle cx="92" cy="58" r="2" fill="#fff" />
                        </g>
                      </g>
                      <path d="M67 63H73L70 66.5Z" fill="#e879b8" />
                    </g>
                    <g fill="none" strokeWidth="2.2" strokeLinecap="round">
                      <path className={styles.shut} d="M42 54Q52 62 62 54" />
                      <path className={styles.shut} d="M78 54Q88 62 98 54" />
                      <path d="M70 66.5Q66 73 61 69M70 66.5Q74 73 79 69" />
                      <path d="M26 54L12 50M26 62L11 63M114 54L128 50M114 62L129 63" strokeWidth="1.8" />
                    </g>
                  </g>
                  <g className={styles.sit}>
                    <path d="M50 80Q70 90 90 80" fill="none" stroke="#bf40fa" strokeWidth="6" strokeLinecap="round" />
                    <circle cx="70" cy="89" r="5" fill="#e3d9fc" strokeWidth="2" />
                  </g>
                </g>
                <g className={styles.zz}>
                  <text x="108" y="30">
                    z
                  </text>
                  <text x="120" y="20">
                    z
                  </text>
                </g>
              </svg>
            </button>
          </div>
        </div>
      </div>
      <button ref={bedRef} type="button" className={styles.bed}>
        {BED_LABEL}
      </button>
    </>
  );
}
