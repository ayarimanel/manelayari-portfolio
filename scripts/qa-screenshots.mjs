// Full-page screenshots of every page at the four QA viewports.
//   node scripts/qa-screenshots.mjs [baseUrl]
// Videos are shown with their posters; reveal animations are settled first.
import { chromium } from "@playwright/test";
import { mkdirSync } from "node:fs";
import { join } from "node:path";
import sharp from "sharp";

// Capture tall pages in clipped chunks and stitch them: a single huge capture
// can fail on machines with little free memory.
async function fullPageShot(page, file, width) {
  const height = await page.evaluate(() => document.documentElement.scrollHeight);
  const chunk = 3000;
  const parts = [];
  for (let y = 0; y < height; y += chunk) {
    const h = Math.min(chunk, height - y);
    parts.push({
      input: await page.screenshot({ fullPage: true, clip: { x: 0, y, width, height: h } }),
      top: y,
      left: 0,
    });
  }
  await sharp({ create: { width, height, channels: 3, background: "#FFF1E2" } })
    .composite(parts)
    .png()
    .toFile(file);
}

const base = process.argv[2] ?? "http://localhost:3000";
const outDir = join(import.meta.dirname, "..", "qa-screenshots");
mkdirSync(outDir, { recursive: true });

const pages = [
  ["home", "/"],
  ["about", "/about"],
  ["glutenia", "/work/glutenia"],
  ["lafricaine", "/work/lafricaine"],
  ["value", "/work/value"],
  ["404", "/this-page-does-not-exist"],
];
const viewports = [
  [375, 812],
  [768, 1024],
  [1280, 800],
  [1440, 900],
];
const only = process.env.ONLY?.split(",");
const widths = process.env.WIDTHS?.split(",").map(Number);

const browser = await chromium.launch();
for (const [w, h] of viewports) {
  if (widths && !widths.includes(w)) continue;
  const context = await browser.newContext({ viewport: { width: w, height: h }, reducedMotion: "reduce" });
  const page = await context.newPage();
  for (const [name, path] of pages) {
    if (only && !only.includes(name)) continue;
    await page.goto(base + path, { waitUntil: "networkidle" });
    // Scroll through so lazy images load and every reveal fires.
    await page.evaluate(async () => {
      for (let y = 0; y < document.body.scrollHeight; y += 600) {
        window.scrollTo(0, y);
        await new Promise((r) => setTimeout(r, 60));
      }
      window.scrollTo(0, 0);
    });
    await page.waitForLoadState("networkidle");
    await page.waitForTimeout(300);
    const overflow = await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth);
    if (overflow > 0) console.warn(`! ${name} @${w}: horizontal overflow ${overflow}px`);
    await fullPageShot(page, join(outDir, `${name}-${w}x${h}.png`), w);
    console.log(`${name}-${w}x${h}.png`);
  }
  await context.close();
}
await browser.close();
