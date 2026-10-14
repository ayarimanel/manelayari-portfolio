// Lists the outermost elements that stick out past the viewport's right edge.
//   node scripts/find-overflow.mjs /work/glutenia 375
import { chromium } from "@playwright/test";

const [path = "/", width = "375"] = process.argv.slice(2);
const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: Number(width), height: 800 } });
await page.goto("http://localhost:3000" + path, { waitUntil: "networkidle" });
const found = await page.evaluate(() => {
  const vw = document.documentElement.clientWidth;
  const out = [];
  for (const el of document.querySelectorAll("body *")) {
    const r = el.getBoundingClientRect();
    if (r.right > vw + 1 && r.width > 0) {
      const parentOver = el.parentElement && el.parentElement.getBoundingClientRect().right > vw + 1;
      if (!parentOver)
        out.push(
          `${el.tagName.toLowerCase()}.${String(el.className).slice(0, 60)} right=${Math.round(r.right)} w=${Math.round(r.width)}`,
        );
    }
  }
  return out.slice(0, 15);
});
console.log(found.join("\n") || "no overflow");
await browser.close();
