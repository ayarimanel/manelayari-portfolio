"use client";

import { useEffect, useRef, useState } from "react";
import { preload } from "react-dom";
import { afterPageLoad } from "@/lib/afterPageLoad";
import { prefersReducedMotionNow } from "@/lib/reducedMotion";
import type { VideoSource } from "@/content/types";
import { PauseIcon, PlayIcon } from "./VideoLoop";
import styles from "./PromoFilm.module.css";

type Props = {
  video: VideoSource;
  label: string;
  /** WebVTT track describing the on-screen text. */
  captions?: string;
};

/**
 * The promo film: starts muted (and only plays while in view, after the page
 * has loaded, never under reduced motion) with a visible "Sound on" toggle.
 * After the first interaction it hands over to the browser's native controls.
 * It opens the page, so its poster loads at high priority.
 */
export function PromoFilm({ video, label, captions }: Props) {
  const ref = useRef<HTMLVideoElement>(null);
  const userPaused = useRef(false);
  const [playing, setPlaying] = useState(false);
  const [interacted, setInteracted] = useState(false);
  preload(video.poster, { as: "image", fetchPriority: "high" });

  useEffect(() => {
    const el = ref.current;
    if (!el || interacted || typeof IntersectionObserver === "undefined") return;
    let inView = false;
    const observer = new IntersectionObserver(
      ([entry]) => {
        inView = entry.isIntersecting;
        if (!inView) {
          el.pause();
          return;
        }
        afterPageLoad().then(() => {
          if (inView && !userPaused.current && !prefersReducedMotionNow()) el.play().catch(() => {});
        });
      },
      { threshold: 0.5 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [interacted]);

  function soundOn() {
    const el = ref.current;
    if (!el) return;
    el.muted = false;
    el.loop = false;
    el.currentTime = 0;
    el.play().catch(() => {});
    setInteracted(true);
  }

  function togglePlay() {
    const el = ref.current;
    if (!el) return;
    if (el.paused) {
      userPaused.current = false;
      el.play().catch(() => {});
    } else {
      userPaused.current = true;
      el.pause();
    }
  }

  return (
    <div className={styles.film}>
      <video
        ref={ref}
        className={styles.video}
        muted
        loop
        playsInline
        preload="none"
        poster={video.poster}
        width={video.width}
        height={video.height}
        controls={interacted}
        aria-label={label}
        onPlay={() => setPlaying(true)}
        onPause={() => setPlaying(false)}
      >
        {video.webm && <source src={video.webm} type="video/webm" />}
        <source src={video.mp4} type="video/mp4" />
        {captions && <track kind="captions" src={captions} srcLang="en" label="English (on-screen text)" />}
      </video>
      {!interacted && (
        <div className={styles.controls}>
          <button
            type="button"
            className={styles.round}
            onClick={togglePlay}
            aria-label={`${playing ? "Pause" : "Play"} video: ${label}`}
          >
            {playing ? <PauseIcon /> : <PlayIcon />}
          </button>
          <button type="button" className={styles.sound} onClick={soundOn}>
            <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true">
              <path d="M4 9.5h3.5L12 5.5v13l-4.5-4H4z" fill="currentColor" />
              <path
                d="M15.5 9c1.2 1.6 1.2 4.4 0 6M18.2 6.5c2.6 3 2.6 8 0 11"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
            Sound on
          </button>
        </div>
      )}
    </div>
  );
}
