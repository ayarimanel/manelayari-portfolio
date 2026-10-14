import type { VideoSource } from "./types";

/** Builds the source set for a clip copied by scripts/prepare-assets.mjs. */
export function video(
  project: string,
  name: string,
  width: number,
  height: number,
  opts: { webm?: boolean } = {},
): VideoSource {
  const base = `/media/${project}/video/${name}`;
  return {
    mp4: `${base}.mp4`,
    webm: opts.webm === false ? undefined : `${base}.webm`,
    poster: `${base}-poster.jpg`,
    width,
    height,
  };
}
