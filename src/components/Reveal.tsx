"use client";

import type { CSSProperties, ElementType, ReactNode } from "react";
import { useInView } from "@/lib/useInView";

type Props = {
  as?: ElementType;
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
  /** Fade up on entry. Set false to only expose data-inview (e.g. the phone fan). */
  reveal?: boolean;
  threshold?: number;
  id?: string;
};

/** Marks an element with data-inview once 15 % of it is visible. CSS does the rest. */
export function Reveal({ as: Tag = "div", children, className, style, reveal = true, threshold = 0.15, id }: Props) {
  const [ref, inView] = useInView<HTMLElement>({ threshold });
  return (
    <Tag
      ref={ref}
      id={id}
      className={className}
      style={style}
      data-reveal={reveal ? "" : undefined}
      data-inview={inView ? "true" : "false"}
    >
      {children}
    </Tag>
  );
}
