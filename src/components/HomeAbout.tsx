"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import { site } from "@/content/site";
import { usePrefersReducedMotion } from "@/lib/reducedMotion";
import face from "../../public/media/about/manel-face.png";
import thinking from "../../public/media/about/manel-thinking.png";
import idea from "../../public/media/about/manel-idea.png";
import waving from "../../public/media/about/manel-cartoon.png";
import styles from "./HomeAbout.module.css";

const Handles = () => (
  <>
    <i />
    <i />
    <i />
    <i />
  </>
);

const wait = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

/** About block: illustrated frames in the style of a design file, with a cursor that clicks between them. */
export function HomeAbout() {
  const reducedMotion = usePrefersReducedMotion();
  const stageRef = useRef<HTMLElement>(null);
  const cursorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const stage = stageRef.current;
    const cursor = cursorRef.current;
    if (!stage || !cursor || reducedMotion) return;

    let stopped = false;
    let visible = false;
    let hovering = false;
    const observer = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
    });
    observer.observe(stage);
    const enter = (e: PointerEvent) => {
      if (e.pointerType === "mouse") hovering = true;
    };
    const leave = (e: PointerEvent) => {
      if (e.pointerType === "mouse") hovering = false;
    };
    stage.addEventListener("pointerenter", enter);
    stage.addEventListener("pointerleave", leave);

    const targets = Array.from(stage.querySelectorAll<HTMLElement>("[data-target]"));
    const canvas = targets[0].parentElement as HTMLElement;

    // Visitors who have not reached this block yet find the frames out of
    // place, and the cursor drags each one home the first time it is seen.
    const scattered = canvas.getBoundingClientRect().top > window.innerHeight;
    const scale = canvas.clientWidth;
    const offsets = [
      { x: 0.22 * scale, y: 0.26 * scale, r: -14 },
      { x: -0.28 * scale, y: 0.3 * scale, r: 12 },
      { x: 0.2 * scale, y: -0.26 * scale, r: -9 },
      { x: -0.2 * scale, y: -0.3 * scale, r: 10 },
    ];
    let seen = false;
    const canvasObserver = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        seen = true;
        canvasObserver.disconnect();
      },
      { threshold: 0.45 },
    );
    if (scattered) {
      targets.forEach((target, i) => {
        target.style.translate = `${offsets[i].x}px ${offsets[i].y}px`;
        target.style.rotate = `${offsets[i].r}deg`;
      });
      canvasObserver.observe(canvas);
    }

    const easing = "cubic-bezier(0.22, 1, 0.36, 1)";
    const at = (x: number, y: number) => `translate(${x}px, ${y}px)`;
    const glide = (from: string, to: string, duration: number) => {
      const move = cursor.animate([{ transform: from }, { transform: to }], { duration, easing, fill: "forwards" });
      return move.finished.then(() => {
        cursor.style.transform = to;
        move.cancel();
      });
    };
    const intro = async () => {
      cursor.style.transition = "none";
      cursor.style.opacity = "1";
      const a = stage.getBoundingClientRect();
      const box = canvas.getBoundingClientRect();
      let from = at(box.left - a.left + box.width * 0.5, box.top - a.top + box.height);
      cursor.style.transform = from;
      await wait(250);
      for (let i = 0; i < targets.length && !stopped; i += 1) {
        const target = targets[i];
        const b = target.getBoundingClientRect();
        const x = b.left - a.left + b.width / 2;
        const y = b.top - a.top + b.height / 2;
        const grab = at(x, y);
        await glide(from, grab, 460);
        target.dataset.on = "true";
        await wait(120);
        const drop = at(x - offsets[i].x, y - offsets[i].y);
        const settle = target.animate(
          { translate: [target.style.translate, "0px 0px"], rotate: [target.style.rotate, "0deg"] },
          { duration: 640, easing, fill: "forwards" },
        );
        await Promise.all([glide(grab, drop, 640), settle.finished]);
        target.style.translate = "";
        target.style.rotate = "";
        settle.cancel();
        delete target.dataset.on;
        from = drop;
        await wait(100);
      }
      void cursor.offsetWidth; // lock in the position before the normal glide returns
      cursor.style.transition = "";
    };

    const run = async () => {
      if (scattered) {
        while (!stopped && !seen) await wait(150);
        if (stopped) return;
        await intro();
      }
      for (let i = 0; !stopped; i = (i + 1) % targets.length) {
        while (!stopped && (!visible || hovering || document.hidden)) await wait(200);
        if (stopped) return;
        const target = targets[i];
        const a = stage.getBoundingClientRect();
        const b = target.getBoundingClientRect();
        const x = b.left - a.left + b.width * 0.6;
        const y = b.top - a.top + b.height * 0.6;
        cursor.style.opacity = "1";
        cursor.style.transform = `translate(${x}px, ${y}px)`;
        await wait(900);
        cursor.dataset.press = "true";
        await wait(130);
        delete cursor.dataset.press;
        target.dataset.on = "true";
        await wait(1100);
        delete target.dataset.on;
      }
    };
    run();

    return () => {
      stopped = true;
      observer.disconnect();
      canvasObserver.disconnect();
      for (const target of targets) {
        target.style.translate = "";
        target.style.rotate = "";
      }
      cursor.style.transition = "";
      stage.removeEventListener("pointerenter", enter);
      stage.removeEventListener("pointerleave", leave);
    };
  }, [reducedMotion]);

  return (
    <section id="about" ref={stageRef} className={styles.about} aria-labelledby="about-heading">
      <div className={styles.inner}>
        <h2 id="about-heading" className={styles.title}>
          <span>
            ABOUT <em>ME</em>
          </span>
          <span className={`${styles.frame} ${styles.mini}`} aria-hidden="true">
            <Handles />
            <Image src={face} alt="" sizes="72px" />
          </span>
          <small aria-hidden="true">MANEL AYARI</small>
        </h2>

        <div className={styles.grid}>
          <div className={styles.canvas}>
            <div className={`${styles.frame} ${styles.f1}`} data-target>
              <Handles />
              <Image src={thinking} alt="Illustration of Manel thinking" sizes="170px" />
            </div>
            <div className={`${styles.frame} ${styles.f2}`} data-target>
              <Handles />
              <Image src={idea} alt="Illustration of Manel with an idea" sizes="170px" />
            </div>
            <p className={styles.bubble}>
              I design it first,
              <br />
              then I build it.
            </p>
            <div className={`${styles.frame} ${styles.f3}`} data-target>
              <Handles />
              <Image src={waving} alt="Illustration of Manel waving" sizes="170px" />
            </div>
            <span className={styles.pill} aria-hidden="true">
              Manel
            </span>
            <a
              className={`${styles.frame} ${styles.f4}`}
              href={site.github}
              target="_blank"
              rel="noopener"
              aria-label="Manel's GitHub profile, @ayarimanel (opens in a new tab)"
              data-target
            >
              <Handles />
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <path
                  fill="currentColor"
                  d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"
                />
              </svg>
              <span className={styles.gh}>my code lives here &#8599;</span>
            </a>
          </div>

          <div className={styles.card}>
            <p>
              As a Computer Science graduate, I bring <b>a designer&rsquo;s eye and a developer&rsquo;s logic</b> to
              every interface. I map users and flows first, then design high-fidelity mockups and prototypes in Figma
              that stay clear and friendly.
            </p>
            <p>
              I love turning <b>stressful everyday tasks</b> into calm, simple screens. Because I also code with React
              Native and Next.js, <b>I know what developers need</b>, and I am ready to <b>join a product team</b> as a
              UX/UI, Product or Full-Stack designer.
            </p>
          </div>
        </div>
      </div>
      <div ref={cursorRef} className={styles.cursor} aria-hidden="true">
        <svg viewBox="0 0 24 24">
          <path fill="#bf40fa" stroke="#040607" strokeWidth="1.5" strokeLinejoin="round" d="M3 2l18 8-7.5 2.5L10 20z" />
        </svg>
        <span className={styles.cursorTag}>Manel</span>
      </div>
    </section>
  );
}
