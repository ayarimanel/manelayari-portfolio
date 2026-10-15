"use client";

import { useEffect, useRef, useState } from "react";
import { preload } from "react-dom";
import { afterPageLoad } from "@/lib/afterPageLoad";
import { prefersReducedMotionNow } from "@/lib/reducedMotion";
import type { VideoSource } from "@/content/types";
import styles from "./VideoLoop.module.css";

type Props = {
  video: VideoSource;
  /** Describes the clip, e.g. "Scanning a barcode in Glutenia". */
  label: string;
  className?: string;
  /** Where the pause button sits while the clip plays. */
  controlPosition?: "bottom-right" | "bottom-left";
  /** First screen of the page: load the poster right away, at high priority. */
  priority?: boolean;
  /** Play by itself while at least a quarter of it is on screen (never under reduced motion). */
  autoplay?: boolean;
};

/**
 * Silent looping clip. By default it waits to be played (poster + big play
 * button); with `autoplay` it plays while a quarter is on screen. Either way it pauses
 * once it scrolls out of view. The poster loads once the clip is near the screen.
 */
export function VideoLoop({ video, label, className, controlPosition = "bottom-right", priority, autoplay }: Props) {
  const ref = useRef<HTMLVideoElement>(null);
  const userPaused = useRef(false);
  const [playing, setPlaying] = useState(false);
  const [showPoster, setShowPoster] = useState(!!priority);
  if (priority) preload(video.poster, { as: "image", fetchPriority: "high" });

  useEffect(() => {
    const el = ref.current;
    if (!el || typeof IntersectionObserver === "undefined") return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting || entry.intersectionRatio < 0.25) {
          el.pause();
          return;
        }
        if (!autoplay || userPaused.current || prefersReducedMotionNow()) return;
        afterPageLoad().then(() => el.play().catch(() => {}));
      },
      { threshold: [0, 0.25] },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [autoplay]);

  useEffect(() => {
    const el = ref.current;
    if (showPoster || !el) return;
    const observer = new IntersectionObserver(([entry]) => entry.isIntersecting && setShowPoster(true), {
      rootMargin: "100% 0px",
    });
    observer.observe(el);
    return () => observer.disconnect();
  }, [showPoster]);

  function toggle() {
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
    <div className={[styles.wrap, className].filter(Boolean).join(" ")}>
      <video
        ref={ref}
        className={styles.video}
        muted
        playsInline
        loop
        preload="none"
        poster={showPoster ? video.poster : undefined}
        width={video.width}
        height={video.height}
        aria-label={label}
        onClick={toggle}
        onPlay={() => setPlaying(true)}
        onPause={() => setPlaying(false)}
      >
        {video.webm && <source src={video.webm} type="video/webm" />}
        <source src={video.mp4} type="video/mp4" />
      </video>
      {playing ? (
        <button
          type="button"
          className={`${styles.control} ${styles[controlPosition]}`}
          onClick={toggle}
          aria-label={`Pause video: ${label}`}
        >
          <PauseIcon />
        </button>
      ) : (
        <button type="button" className={styles.play} onClick={toggle} aria-label={`Play video: ${label}`}>
          <PlayIcon />
          <span aria-hidden="true">Play</span>
        </button>
      )}
    </div>
  );
}

export function PlayIcon() {
  return (
    <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true">
      <path d="M7 4.5v15l12.5-7.5z" fill="currentColor" />
    </svg>
  );
}
export function PauseIcon() {
  return (
    <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true">
      <path d="M6.5 4.5h4v15h-4zM13.5 4.5h4v15h-4z" fill="currentColor" />
    </svg>
  );
}
