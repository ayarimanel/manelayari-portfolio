"use client";

import { useEffect, useRef, useState } from "react";
import { preload } from "react-dom";
import { afterPageLoad } from "@/lib/afterPageLoad";
import { prefersReducedMotionNow, usePrefersReducedMotion } from "@/lib/reducedMotion";
import type { VideoSource } from "@/content/types";
import styles from "./VideoLoop.module.css";

type Props = {
  video: VideoSource;
  /** Describes the clip, e.g. "Scanning a barcode in Glutenia". */
  label: string;
  className?: string;
  /** Where the play/pause button sits. */
  controlPosition?: "bottom-right" | "bottom-left";
  /** First screen of the page: load the poster right away, at high priority. */
  priority?: boolean;
};

/**
 * Silent looping clip. Plays only while at least half of it is visible (and
 * after the page has loaded), never autoplays under reduced motion, and always
 * has a pause/play button. The poster loads once the clip is near the screen.
 */
export function VideoLoop({ video, label, className, controlPosition = "bottom-right", priority }: Props) {
  const ref = useRef<HTMLVideoElement>(null);
  const userPaused = useRef(false);
  const [playing, setPlaying] = useState(false);
  const [showPoster, setShowPoster] = useState(!!priority);
  const reduced = usePrefersReducedMotion();
  if (priority) preload(video.poster, { as: "image", fetchPriority: "high" });

  useEffect(() => {
    const el = ref.current;
    if (!el || typeof IntersectionObserver === "undefined") return;
    let inView = false;
    const observer = new IntersectionObserver(
      ([entry]) => {
        inView = entry.isIntersecting;
        if (!inView) {
          el.pause();
          return;
        }
        afterPageLoad().then(() => {
          // Read the media query live: the hook's value is still `false` during hydration.
          const noAutoplay = reduced || prefersReducedMotionNow();
          if (inView && !userPaused.current && !noAutoplay) el.play().catch(() => {});
        });
      },
      { threshold: 0.5 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [reduced]);

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
        onPlay={() => setPlaying(true)}
        onPause={() => setPlaying(false)}
      >
        {video.webm && <source src={video.webm} type="video/webm" />}
        <source src={video.mp4} type="video/mp4" />
      </video>
      <button
        type="button"
        className={`${styles.control} ${styles[controlPosition]}`}
        onClick={toggle}
        aria-label={`${playing ? "Pause" : "Play"} video: ${label}`}
      >
        {playing ? <PauseIcon /> : <PlayIcon />}
      </button>
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
