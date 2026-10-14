// Cuts Manel's cartoon portrait out of its flat white background.
// Only near-white pixels connected to the image edge are removed (flood fill),
// so the white sticker border and everything inside the drawing stay intact.
// Pixels on the cut line get partial transparency for a smooth edge.
//
//   node scripts/prepare-portrait.mjs [source]
import { mkdirSync } from "node:fs";
import { dirname, join } from "node:path";
import sharp from "sharp";

const SRC = process.argv[2] ?? "C:/Users/manel/Downloads/sticker_cartoon.jpeg";
const OUT = join(import.meta.dirname, "..", "public", "media", "about", "manel-cartoon.png");
const NEAR_WHITE = 246; // every channel at or above this counts as background

const { data, info } = await sharp(SRC).removeAlpha().raw().toBuffer({ resolveWithObject: true });
const { width: w, height: h } = info;
const minAt = (p) => Math.min(data[p * 3], data[p * 3 + 1], data[p * 3 + 2]);

// Flood fill from every edge pixel through near-white pixels.
const bg = new Uint8Array(w * h);
const stack = [];
for (let x = 0; x < w; x++) stack.push(x, (h - 1) * w + x);
for (let y = 0; y < h; y++) stack.push(y * w, y * w + w - 1);
while (stack.length) {
  const p = stack.pop();
  if (bg[p] || minAt(p) < NEAR_WHITE) continue;
  bg[p] = 1;
  const x = p % w;
  if (x > 0) stack.push(p - 1);
  if (x < w - 1) stack.push(p + 1);
  if (p >= w) stack.push(p - w);
  if (p < w * (h - 1)) stack.push(p + w);
}

// Alpha: background is transparent; pixels touching it fade by how light they are.
const rgba = Buffer.alloc(w * h * 4);
for (let p = 0; p < w * h; p++) {
  rgba[p * 4] = data[p * 3];
  rgba[p * 4 + 1] = data[p * 3 + 1];
  rgba[p * 4 + 2] = data[p * 3 + 2];
  let a = 255;
  if (bg[p]) a = 0;
  else {
    const x = p % w;
    const touches = (x > 0 && bg[p - 1]) || (x < w - 1 && bg[p + 1]) || (p >= w && bg[p - w]) || bg[p + w];
    if (touches) a = Math.min(255, Math.round(((255 - minAt(p)) / 40) * 255));
  }
  rgba[p * 4 + 3] = a;
}

mkdirSync(dirname(OUT), { recursive: true });
const cut = await sharp(rgba, { raw: { width: w, height: h, channels: 4 } })
  .png()
  .toBuffer();
// Trim the transparent margins, keeping a few pixels of breathing room.
const trimmed = await sharp(cut).trim({ threshold: 1 }).toBuffer({ resolveWithObject: true });
await sharp(trimmed.data)
  .extend({ top: 4, bottom: 4, left: 4, right: 4, background: { r: 0, g: 0, b: 0, alpha: 0 } })
  .png({ compressionLevel: 9 })
  .toFile(OUT);

const meta = await sharp(OUT).metadata();
console.log(`Saved ${OUT} (${meta.width}x${meta.height})`);
