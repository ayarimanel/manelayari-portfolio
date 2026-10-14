// Renders the 1200×630 social share images and the icons from real assets.
//   node scripts/make-og.mjs
import { chromium } from "@playwright/test";
import { mkdirSync } from "node:fs";
import { join } from "node:path";
import sharp from "sharp";

const root = join(import.meta.dirname, "..");
const media = (p) => join(root, "public", "media", p);
const out = (p) => join(root, "public", p);
mkdirSync(out("og"), { recursive: true });

async function dataUri(file, width) {
  const buf = await sharp(file).resize({ width }).png().toBuffer();
  return `data:image/png;base64,${buf.toString("base64")}`;
}

const fonts = `<link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,700;12..96,800&family=Instrument+Sans:wght@400;600&display=block" rel="stylesheet">`;

const base = `
*{box-sizing:border-box;margin:0}
body{width:1200px;height:630px;overflow:hidden;font-family:'Instrument Sans',sans-serif;color:#1F1B16;background:#FFF1E2}
.wrap{position:relative;width:1200px;height:630px;padding:64px 72px;display:flex;gap:48px;align-items:center}
.text{flex:1;min-width:0}
.kicker{font-weight:600;font-size:24px;color:#5E554B;margin-bottom:18px}
h1{font-family:'Bricolage Grotesque',sans-serif;font-weight:800;letter-spacing:-0.02em;line-height:.95}
p.line{font-size:30px;line-height:1.35;margin-top:22px;max-width:620px}
.sticker{display:inline-block;padding:9px 18px;border:2px solid #1F1B16;border-radius:999px;font-weight:600;font-size:22px;box-shadow:3px 3px 0 #1F1B16;margin:26px 10px 0 0}
.phone{width:230px;padding:9px;background:#1F1B16;border-radius:38px;box-shadow:6px 6px 0 rgba(31,27,22,.2);flex-shrink:0}
.phone .scr{aspect-ratio:9/19.5;border-radius:30px;overflow:hidden;background:#fff}
.phone img{width:100%;height:100%;object-fit:cover;object-position:top}
.browser{width:520px;border:2px solid #1F1B16;border-radius:12px;overflow:hidden;background:#fff;box-shadow:6px 6px 0 #1F1B16;flex-shrink:0}
.bar{display:flex;align-items:center;gap:8px;padding:9px 12px;background:#FFE3C7;border-bottom:2px solid #1F1B16}
.bar i{width:11px;height:11px;border-radius:50%;border:1.5px solid #1F1B16;background:#FFF1E2}.bar i:first-child{background:#F2542D}
.bar span{flex:1;text-align:center;font-size:14px;color:#5E554B;background:#FFF1E2;border-radius:999px;padding:2px 0;margin-left:10px;border:1px solid #5E554B}
.browser img{display:block;width:100%}
.name{position:absolute;left:72px;bottom:44px;font-family:'Bricolage Grotesque';font-weight:700;font-size:26px}
`;

const phone = (src) => `<div class="phone"><div class="scr"><img src="${src}"></div></div>`;
const browser = (src, domain = "editionapa.tn") =>
  `<div class="browser"><div class="bar"><i></i><i></i><i></i><span>${domain}</span></div><img src="${src}"></div>`;

const pages = {
  home: async () => `
    <div class="wrap"><div class="text">
      <h1 style="font-size:120px;color:#F2542D">Hi, I'm Manel.</h1>
      <p class="line">UX/UI designer. I design friendly apps and websites, then build them.</p>
      <span class="sticker" style="background:#1F1B16;color:#FFF1E2;transform:rotate(-3deg)">Figma</span>
      <span class="sticker" style="background:#2F6BFF;color:#fff;transform:rotate(2deg)">React Native</span>
    </div>${phone(await dataUri(media("glutenia/app/home.png"), 460))}</div>`,
  about: async () => `
    <div class="wrap"><div class="text">
      <p class="kicker">About</p>
      <h1 style="font-size:104px">Manel Ayari</h1>
      <p class="line">UX/UI designer and Computer Science graduate, based in Bardo, Tunis.</p>
      <span class="sticker" style="background:#F2542D">Open to work</span>
    </div>${phone(await dataUri(media("glutenia/app/badges.png"), 460))}</div>`,
  glutenia: async () => `
    <div class="wrap" style="background:#E7F3D9"><div class="text">
      <p class="kicker" style="color:#3F6E14">Case study · Mobile app · Design + build</p>
      <h1 style="font-size:120px">Glutenia</h1>
      <p class="line">A mobile app that helps people living gluten-free check products, shop safely and find gluten-free places.</p>
    </div>${phone(await dataUri(media("glutenia/app/ai-result-gluten.png"), 460))}
    <div class="name">Manel Ayari</div></div>`,
  lafricaine: async () => `
    <div class="wrap" style="background:#E9DDF7"><div class="text">
      <p class="kicker" style="color:#4B1D7A">Case study · Website · Live</p>
      <h1 style="font-size:76px">L'Africaine de Prod Artistique</h1>
      <p class="line" style="font-size:26px">Website, shop and admin back-office for a children's book publisher.</p>
    </div>${browser(await dataUri(media("lafricaine/live-home.png"), 1040))}
    <div class="name">Manel Ayari</div></div>`,
  value: async () => `
    <div class="wrap" style="background:#DCEDF1"><div class="text">
      <p class="kicker" style="color:#275B6A">Case study · Website redesign · Project lead</p>
      <h1 style="font-size:120px">Value</h1>
      <p class="line" style="font-size:26px">Redesign mockups for a Tunisian consulting, AI and data company.</p>
    </div>${browser(await dataUri(media("value/home-top.jpg"), 1040), "value.com.tn")}
    <div class="name">Manel Ayari</div></div>`,
};

const browserApp = await chromium.launch();
const page = await browserApp.newPage({ viewport: { width: 1200, height: 630 } });
for (const [name, html] of Object.entries(pages)) {
  await page.setContent(
    `<!doctype html><html><head>${fonts}<style>${base}</style></head><body>${await html()}</body></html>`,
    {
      waitUntil: "networkidle",
    },
  );
  await page.evaluate(() => document.fonts.ready);
  await page.screenshot({ path: out(`og/${name}.png`) });
  console.log("og/" + name + ".png");
}

// Icons: the "MA" sticker mark.
const icon = (size) => `<!doctype html><html><head>${fonts}<style>
*{margin:0}body{width:${size}px;height:${size}px;display:grid;place-items:center;background:transparent}
.s{width:${size * 0.9}px;height:${size * 0.9}px;border-radius:50%;background:#F2542D;border:${size * 0.04}px solid #1F1B16;
display:grid;place-items:center;font-family:'Bricolage Grotesque';font-weight:800;font-size:${size * 0.42}px;letter-spacing:-0.04em;color:#1F1B16;transform:rotate(-6deg)}
</style></head><body><div class="s">MA</div></body></html>`;
for (const [file, size, bg] of [
  ["icon.png", 512, false],
  ["apple-touch-icon.png", 180, true],
]) {
  const p = await browserApp.newPage({ viewport: { width: size, height: size } });
  await p.setContent(icon(size), { waitUntil: "networkidle" });
  await p.evaluate(() => document.fonts.ready);
  if (bg) await p.evaluate(() => (document.body.style.background = "#FFF1E2"));
  await p.screenshot({ path: out(file), omitBackground: !bg });
  await p.close();
  console.log(file);
}
await browserApp.close();
