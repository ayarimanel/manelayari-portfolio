"use client";

import { useEffect, useRef, useState } from "react";
import styles from "./CopyEmailButton.module.css";

type Props = { email: string };

/** Shows the email; clicking copies it and announces the result. A separate mailto link sits next to it. */
export function CopyEmailButton({ email }: Props) {
  const [status, setStatus] = useState<"idle" | "copied" | "failed">("idle");
  const timer = useRef<number | undefined>(undefined);

  useEffect(() => () => window.clearTimeout(timer.current), []);

  async function copy() {
    try {
      await navigator.clipboard.writeText(email);
      setStatus("copied");
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
        <span className={styles.hint} aria-hidden="true">
          {status === "copied" ? "Copied" : "Copy"}
        </span>
        <span className="visually-hidden">— copy email address</span>
      </button>
      <a className="btn" href={`mailto:${email}`}>
        Send an email
      </a>
      <p className={styles.status} aria-live="polite" role="status">
        {status === "copied" && "Email copied"}
        {status === "failed" && "Couldn't copy — select the address to copy it."}
      </p>
    </div>
  );
}
