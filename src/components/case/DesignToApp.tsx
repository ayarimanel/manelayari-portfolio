"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import { prefersReducedMotionNow } from "@/lib/reducedMotion";
import wireHome from "@media/glutenia/figma/wire-home.png";
import figmaHome from "@media/glutenia/figma/home.png";
import appHome from "@media/glutenia/app/home.png";
import styles from "./DesignToApp.module.css";

const steps = ["Wireframe", "Figma design", "Real app"];
const portion = (value: number, from: number, to: number) => Math.min(1, Math.max(0, (value - from) / (to - from)));

/** As the visitor scrolls, one Glutenia screen goes from wireframe to Figma design to the real app. */
export function DesignToApp() {
  const pinRef = useRef<HTMLDivElement>(null);
  const stickyRef = useRef<HTMLDivElement>(null);
  const phoneRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const pin = pinRef.current;
    const sticky = stickyRef.current;
    const phone = phoneRef.current;
    const line = lineRef.current;
    if (!pin || !sticky || !phone || !line || prefersReducedMotionNow()) return;

    let raf = 0;
    const update = () => {
      raf = 0;
      const box = pin.getBoundingClientRect();
      const stickyTop = parseFloat(getComputedStyle(sticky).top) || 0;
      const progress = portion(-box.top + stickyTop, 0, Math.max(1, box.height - sticky.offsetHeight));
      const a = portion(progress, 0.12, 0.46);
      const b = portion(progress, 0.58, 0.92);
      phone.style.setProperty("--a", String(a));
      phone.style.setProperty("--b", String(b));

      const moving = a > 0 && a < 1 ? a : b > 0 && b < 1 ? b : -1;
      line.style.opacity = moving < 0 ? "0" : "1";
      if (moving >= 0) line.style.top = `${moving * 100}%`;
      pin.dataset.stage = b > 0.5 ? "2" : a > 0.5 ? "1" : "0";
    };
    const schedule = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    return () => {
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div ref={pinRef} className={styles.pin} data-stage="2">
      <div ref={stickyRef} className={styles.sticky}>
        <div className={styles.copy}>
          <p className={styles.line}>I design friendly apps and websites, then I build them.</p>
          <ol className={styles.steps}>
            {steps.map((step) => (
              <li key={step}>{step}</li>
            ))}
          </ol>
        </div>
        <div ref={phoneRef} className={styles.phone}>
          <Image src={wireHome} alt="" sizes="340px" />
          <Image src={figmaHome} alt="" sizes="340px" className={styles.figma} />
          <Image
            src={appHome}
            alt="The Glutenia home screen, shown going from wireframe to Figma design to the built app"
            sizes="340px"
            className={styles.app}
          />
          <div ref={lineRef} className={styles.wipe} aria-hidden="true" />
        </div>
      </div>
    </div>
  );
}
