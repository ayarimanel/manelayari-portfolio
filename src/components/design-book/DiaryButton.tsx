"use client";

import dynamic from "next/dynamic";
import { useRef, useState } from "react";
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

  const open = () => {
    setOpened(true);
    dialog.current?.showModal();
  };
  const close = () => dialog.current?.close();

  return (
    <>
      <button type="button" className={styles.diary} onClick={open} aria-haspopup="dialog">
        <span className={styles.tape} aria-hidden="true" />
        <span className={styles.spine} aria-hidden="true" />
        <span className={styles.text}>
          <span className={styles.title}>Open my design diary</span>
          <span className={styles.hint}>how I work, in 5 pages →</span>
        </span>
      </button>

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
