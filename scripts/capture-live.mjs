// Screenshots live sites (above the fold only) for the mockup-vs-live
// comparisons.  node scripts/capture-live.mjs
import { chromium } from "@playwright/test";
import { mkdirSync } from "node:fs";
import { dirname, join } from "node:path";

const media = join(import.meta.dirname, "..", "public", "media");
const shots = [
  ["https://editionapa.tn/home", "lafricaine/live-home.png"],
  ["https://value.com.tn/", "value/live-home.png"],
  ["https://value.com.tn/join-us/", "value/live-careers.png"],
];

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
for (const [url, file] of shots) {
  const out = join(media, file);
  mkdirSync(dirname(out), { recursive: true });
  await page.goto(url, { waitUntil: "networkidle", timeout: 60000 });
  await page.waitForTimeout(2500);
  await page.screenshot({ path: out, clip: { x: 0, y: 0, width: 1440, height: 900 } });
  console.log("Saved", out);
}
await browser.close();
