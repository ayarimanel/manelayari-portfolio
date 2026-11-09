"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { prefersReducedMotionNow } from "@/lib/reducedMotion";
import styles from "./CopyEmailButton.module.css";

function starBurst(parent: HTMLElement) {
  const count = 14;
  for (let i = 0; i < count; i += 1) {
    const star = document.createElement("span");
    star.className = styles.star;
    star.textContent = "✶";
    parent.appendChild(star);
    const angle = (i / count) * Math.PI * 2 + Math.random() * 0.4;
    const reach = 60 + Math.random() * 70;
    star
      .animate(
        [
          { transform: "translate(-50%, -50%) scale(0.3)", opacity: 1 },
          {
            transform: `translate(calc(-50% + ${Math.cos(angle) * reach}px), calc(-50% + ${Math.sin(angle) * reach * 0.75}px)) scale(1.1) rotate(160deg)`,
            opacity: 0,
          },
        ],
        { duration: 720, easing: "cubic-bezier(0.22, 1, 0.36, 1)" },
      )
      .finished.then(() => star.remove());
  }
}

type Props = {
  email: string;
  /** Extra actions shown after the address, e.g. "Send an email" and "Download CV". */
  children?: ReactNode;
};

/** Shows the email; clicking copies it and announces the result. */
export function CopyEmailButton({ email, children }: Props) {
  const [status, setStatus] = useState<"idle" | "copied" | "failed">("idle");
  const timer = useRef<number | undefined>(undefined);
  const burst = useRef<HTMLSpanElement>(null);

  useEffect(() => () => window.clearTimeout(timer.current), []);

  async function copy() {
    try {
      await navigator.clipboard.writeText(email);
      setStatus("copied");
      if (burst.current && !prefersReducedMotionNow()) starBurst(burst.current);
    } catch {
      setStatus("failed");
    }
    window.clearTimeout(timer.current);
    timer.current = window.setTimeout(() => setStatus("idle"), 3000);
  }

  return (
    <div className={styles.wrap}>
      <button type="button" className={`btn btn-ink ${styles.copy}`} onClick={copy}>
        <span className={styles.email}>{email}</span>
        <span className={styles.hint} data-copied={status === "copied" || undefined} aria-hidden="true">
          {status === "copied" ? "Copied!" : "Copy"}
        </span>
        <span ref={burst} className={styles.burst} aria-hidden="true" />
        <span className="visually-hidden">— copy email address</span>
      </button>
      {children}
      <p className={styles.status} aria-live="polite" role="status">
        {status === "copied" && "Email copied"}
        {status === "failed" && "Couldn't copy — select the address to copy it."}
      </p>
    </div>
  );
}
