"use client";

import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";
import { prefersReducedMotionNow } from "@/lib/reducedMotion";
import bookStyles from "./DesignBook.module.css";
import styles from "./DiaryButton.module.css";

const DesignBook = dynamic(() => import("./DesignBook").then((m) => m.DesignBook), {
  ssr: false,
  loading: () => <div className={bookStyles.placeholder} />,
});

/**
 * A little blue notebook button that opens the Design Book in a dialog, so
 * the flipbook stays one click away without making the home page longer.
 * The book's code only loads the first time the dialog opens.
 */
export function DiaryButton() {
  const dialog = useRef<HTMLDialogElement>(null);
  const [opened, setOpened] = useState(false);

  const [flipping, setFlipping] = useState(false);
  const flipTimer = useRef<number | undefined>(undefined);

  useEffect(() => () => window.clearTimeout(flipTimer.current), []);

  /** The cover swings open like a book, then the diary appears. */
  const open = () => {
    if (flipping) return;
    setOpened(true);
    if (prefersReducedMotionNow()) {
      dialog.current?.showModal();
      return;
    }
    setFlipping(true);
    flipTimer.current = window.setTimeout(() => {
      dialog.current?.showModal();
      setFlipping(false);
    }, 640);
  };
  const close = () => dialog.current?.close();

  return (
    <>
      <span className={styles.book}>
        <span className={styles.page} data-show={flipping || undefined} aria-hidden="true">
          <b>The Design Book</b>
          <span>property of Manel ♡</span>
        </span>
        <button
          type="button"
          className={styles.diary}
          data-flipping={flipping || undefined}
          onClick={open}
          aria-haspopup="dialog"
        >
          <span className={styles.tape} aria-hidden="true" />
          <span className={styles.spine} aria-hidden="true" />
          <span className={styles.text}>
            <span className={styles.title}>Open my design diary</span>
            <span className={styles.hint}>how I work, in 6 pages →</span>
          </span>
        </button>
      </span>

      <dialog
        ref={dialog}
        className={styles.dialog}
        aria-labelledby="diary-title"
        onClick={(e) => {
          if (e.target === e.currentTarget) close();
        }}
      >
        <div className={styles.panel}>
          <div className={styles.head}>
            <h2 id="diary-title" className={styles.dialogTitle}>
              How I work
            </h2>
            <button type="button" className={styles.close} onClick={close} aria-label="Close the diary">
              ✕
            </button>
          </div>
          <div className={bookStyles.slot}>{opened && <DesignBook />}</div>
        </div>
      </dialog>
    </>
  );
}
