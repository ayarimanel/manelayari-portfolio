import type { Metadata } from "next";
import Link from "next/link";
import { Sticker } from "@/components/Sticker";
import { Doodle } from "@/components/Doodle";
import styles from "./not-found.module.css";

export const metadata: Metadata = {
  title: "Page not found",
  robots: { index: false },
};

export default function NotFound() {
  return (
    <section className={`container ${styles.wrap}`} aria-labelledby="nf-title">
      <Sticker variant="tomato" rotate={-4} size="lg">
        404
      </Sticker>
      <h1 id="nf-title" className="display">
        This page wandered off.
      </h1>
      <div className={styles.back}>
        <Doodle name="arrow" color="var(--tomato)" className={styles.arrow} />
        <Link href="/#work" className="btn btn-ink">
          Back to my work
        </Link>
      </div>
    </section>
  );
}
