"use client";

import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";
import styles from "./DesignBook.module.css";

const DesignBook = dynamic(() => import("./DesignBook").then((m) => m.DesignBook), {
  ssr: false,
  loading: () => <div className={styles.placeholder} />,
});

/** "How I work" section: the flipbook's code only loads when the section nears the viewport. */
export function DesignBookLazy() {
  const ref = useRef<HTMLDivElement>(null);
  const [load, setLoad] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setLoad(true);
          observer.disconnect();
        }
      },
      { rootMargin: "400px 0px" },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section className={`container ${styles.section}`} aria-labelledby="design-book-title">
      <h2 id="design-book-title" className={`h2 ${styles.heading}`}>
        How I work
      </h2>
      <div ref={ref} className={styles.slot}>
        {load ? <DesignBook /> : <div className={styles.placeholder} />}
      </div>
    </section>
  );
}
