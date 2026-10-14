import type { DecisionNote as Note } from "@/content/types";
import styles from "./DecisionNote.module.css";

/** Numbered design decision: tomato number sticker, one-line title, 2–3 sentences. */
export function DecisionNote({ note }: { note: Note }) {
  return (
    <div className={styles.note}>
      <span className={styles.number} aria-hidden="true">
        {note.number}
      </span>
      <div>
        <h3 className={styles.title}>
          <span className="visually-hidden">Decision {note.number}: </span>
          {note.title}
        </h3>
        <p className={styles.body}>{note.body}</p>
      </div>
    </div>
  );
}
