import type { CSSProperties } from "react";

export type DoodleName = "star" | "squiggle" | "arrow" | "underline" | "circle" | "flow" | "pencil" | "code";

type Props = {
  name: DoodleName;
  /** Any CSS colour; defaults to tomato. */
  color?: string;
  /** Fill colour for closed shapes (star). */
  fill?: string;
  className?: string;
  style?: CSSProperties;
  width?: number | string;
};

const VIEWBOX: Record<DoodleName, string> = {
  star: "0 0 64 64",
  squiggle: "0 0 120 40",
  arrow: "0 0 100 60",
  underline: "0 0 200 16",
  circle: "0 0 120 80",
  flow: "0 0 64 64",
  pencil: "0 0 64 64",
  code: "0 0 64 64",
};

const PATHS: Record<DoodleName, string[]> = {
  star: [
    "M32 5.5c1.6 7.9 3.4 14.6 6.3 18.9 6.1.6 12.6 1.1 19.2 2.6-5 4.6-10 8.6-14.6 12.5 1.7 6.6 3.4 13 4.4 19.1-6.2-3.3-11.4-6.6-15.9-9.6-5.4 3.4-10.6 6.8-16.3 9.8 1.5-6.6 2.9-12.9 4.6-19.2C14.9 35.5 10.2 31.6 6 27.2c6.4-1.3 13-2.1 19.3-2.9C27.9 18.5 29.7 12 32 5.5z",
  ],
  squiggle: ["M3 28c8-14 15-22 21-14s3 20 11 19 9-22 18-24 9 17 17 19 9-17 17-19 11 13 17 12 7-10 11-14"],
  arrow: ["M4 46c16-20 40-33 80-25", "M72 9.5l14.5 11.8-15.8 8.4"],
  underline: ["M3 10.5c30-5.2 60-6.4 92-4.3s66 2.4 102-4.6"],
  circle: [
    "M62 6.5C34 4.6 7.2 16 5.3 38c-2 22.4 26 36 58 35.6 30-.3 52.3-14 51.6-34.3C114.3 18 92 4.2 56 9.3c-12 1.8-21.6 5.8-27.8 11",
  ],
  flow: [
    "M7 9.5c7-.6 14-.4 21 .3.4 5 .3 10-.2 15.2-7 .4-14 .3-20.6-.2C6.8 19.6 6.7 14.6 7 9.5z",
    "M36.2 39.3c7-.5 13.8-.3 20.6.2.4 5.2.3 10.2-.2 15.1-7 .5-14 .4-20.5-.1-.4-5-.3-10.1.1-15.2z",
    "M18 26c-.6 9.6 3 15.3 15 17.6",
    "M28.6 39.4l5 4.4-6 3.2",
  ],
  pencil: [
    "M10.5 53.5l3.8-13.2 27-27.1c3-3 6.8-3.1 9.4-.4 2.7 2.7 2.6 6.4-.4 9.4L23.3 49.6z",
    "M14.6 40.5l8.7 9",
    "M37.3 17.2l9.4 9.3",
  ],
  code: ["M21 17.5L7.5 31.3 21 45", "M43 17.5l13.5 13.8L43 45", "M36.5 10.5l-8.6 43"],
};

/** Hand-drawn-looking doodles. Always decorative. */
export function Doodle({ name, color = "var(--tomato)", fill = "none", className, style, width }: Props) {
  return (
    <svg
      viewBox={VIEWBOX[name]}
      className={className}
      style={{ width, height: "auto", overflow: "visible", ...style }}
      aria-hidden="true"
      focusable="false"
    >
      {PATHS[name].map((d, i) => (
        <path
          key={i}
          d={d}
          fill={i === 0 ? fill : "none"}
          stroke={color}
          strokeWidth={2.5}
          strokeLinecap="round"
          strokeLinejoin="round"
          vectorEffect="non-scaling-stroke"
        />
      ))}
    </svg>
  );
}
