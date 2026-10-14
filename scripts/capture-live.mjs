// Screenshots the live L'Africaine homepage (above the fold only) for the
// Figma-vs-live comparison.  node scripts/capture-live.mjs
import { chromium } from "@playwright/test";
import { join } from "node:path";

const out = join(import.meta.dirname, "..", "public", "media", "lafricaine", "live-home.png");
const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
await page.goto("https://editionapa.tn/home", { waitUntil: "networkidle", timeout: 60000 });
await page.waitForTimeout(2500);
await page.screenshot({ path: out, clip: { x: 0, y: 0, width: 1440, height: 900 } });
await browser.close();
console.log("Saved", out);
