import type { Block, CaseSection as Section, DecisionNote as Note } from "@/content/types";
import { CaseBlock, isSideBySide } from "./case/CaseBlock";
import { DecisionNote } from "./DecisionNote";
import { Reveal } from "./Reveal";
import styles from "./CaseSection.module.css";

type Props = { section: Section; index: number };

function Notes({ notes }: { notes: Note[] }) {
  return (
    <div className={styles.notes}>
      {notes.map((n) => (
        <DecisionNote key={n.number} note={n} />
      ))}
    </div>
  );
}

/** A block with the decision notes that explain it: side by side on desktop, stacked below otherwise. */
function BlockWithNotes({ block, notes: all }: { block: Block; notes: Note[] }) {
  const above = all.filter((n) => n.above);
  const notes = all.filter((n) => !n.above);
  if (above.length) {
    return (
      <>
        <Notes notes={above} />
        <BlockWithNotes block={block} notes={notes} />
      </>
    );
  }
  if (!notes.length) return <CaseBlock block={block} />;
  if (isSideBySide(block)) {
    return (
      <div className={styles.withNotes}>
        <div className={styles.main}>
          <CaseBlock block={block} />
        </div>
        <Notes notes={notes} />
      </div>
    );
  }
  return (
    <>
      <CaseBlock block={block} />
      <Notes notes={notes} />
    </>
  );
}

export function CaseSection({ section, index }: Props) {
  const blocks = section.blocks ?? [];
  const notes = section.notes ?? [];
  const last = Math.max(0, blocks.length - 1);
  const notesFor = (i: number) => notes.filter((n) => (n.block ?? last) === i);
  const headingId = `${section.id}-heading`;
  const number = String(index + 2).padStart(2, "0");

  const rendered = blocks.map((b, i) => <BlockWithNotes key={i} block={b} notes={notesFor(i)} />);

  return (
    <section id={section.id} aria-labelledby={headingId} className={section.band ? styles.band : styles.section}>
      <div className="container">
        <Reveal className={styles.header}>
          <p className={styles.number} aria-hidden="true">
            {number}
          </p>
          <h2 id={headingId} className="h2">
            {section.heading}
          </h2>
          {section.body?.map((p, i) => (
            <p key={i} className={styles.body}>
              {p}
            </p>
          ))}
        </Reveal>

        {blocks.length === 0 && notes.length > 0 && <Notes notes={notes} />}

        {section.layout === "pair" && rendered.length >= 2 ? (
          <div className={styles.blocks}>
            <div className={styles.pair}>
              <div className={styles.pairMain}>{rendered[0]}</div>
              <div className={styles.pairSide}>{rendered[1]}</div>
            </div>
            {rendered.slice(2)}
          </div>
        ) : (
          blocks.length > 0 && <div className={styles.blocks}>{rendered}</div>
        )}
      </div>
    </section>
  );
}
