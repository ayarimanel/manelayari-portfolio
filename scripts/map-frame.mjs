// The map screenshot in app-screens was captured before the map tiles loaded,
// and the map clip's first frame is blank too. This takes a frame from the
// clip once the map and its pins are showing, for the poster and still screens.
//
//   node scripts/map-frame.mjs   (after prepare-assets.mjs)
import { chromium } from "@playwright/test";
import { writeFileSync } from "node:fs";
import { join } from "node:path";
import { pathToFileURL } from "node:url";
import sharp from "sharp";

const AT_SECONDS = 0.8;
const media = join(import.meta.dirname, "..", "public", "media", "glutenia");
const clip = pathToFileURL(join(media, "video", "05-map-places.webm")).href;

// Lets the page read pixels from a local file without tainting the canvas.
const browser = await chromium.launch({ args: ["--allow-file-access-from-files"] });
const page = await browser.newPage();
await page.goto(pathToFileURL(media).href);
const dataUrl = await page.evaluate(
  async ({ src, at }) => {
    const v = document.createElement("video");
    v.src = src;
    v.muted = true;
    await new Promise((r, j) => ((v.onloadeddata = r), (v.onerror = j)));
    v.currentTime = at;
    await new Promise((r) => (v.onseeked = r));
    const c = document.createElement("canvas");
    c.width = v.videoWidth;
    c.height = v.videoHeight;
    c.getContext("2d").drawImage(v, 0, 0);
    return c.toDataURL("image/png");
  },
  { src: clip, at: AT_SECONDS },
);
await browser.close();

const frame = Buffer.from(dataUrl.split(",")[1], "base64");
writeFileSync(join(media, "app", "map-live.png"), frame);
await sharp(frame)
  .jpeg({ quality: 82, mozjpeg: true })
  .toFile(join(media, "video", "05-map-places-poster-app.jpg"));
console.log("Map frame saved: app/map-live.png and video/05-map-places-poster-app.jpg");
