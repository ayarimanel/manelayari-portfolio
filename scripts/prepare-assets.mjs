// Copies Manel's source assets into public/media with clean names and
// generates the crops used on the site. The source folder is only read.
//
//   node scripts/prepare-assets.mjs
//   PORTFOLIO_SRC="D:\path\to\PORTFOLLIO" node scripts/prepare-assets.mjs
import { copyFileSync, mkdirSync, existsSync } from "node:fs";
import { join, dirname } from "node:path";
import sharp from "sharp";

const SRC = process.env.PORTFOLIO_SRC ?? "C:/Users/manel/OneDrive/Desktop/PORTFOLLIO";
const LOGO_SRC =
  process.env.GLUTENIA_LOGO ?? "C:/Users/manel/OneDrive/Desktop/Projects/glutenia/glutenia-mobile/assets/logo.png";
const OUT = join(import.meta.dirname, "..", "public", "media");
const PA = join(SRC, "portfolio-assets");

function ensure(file) {
  mkdirSync(dirname(file), { recursive: true });
}
function copy(from, to) {
  const dest = join(OUT, to);
  ensure(dest);
  copyFileSync(from, dest);
}

// --- Glutenia -------------------------------------------------------------
const gVideos = [
  "01-barcode-scan",
  "02-ai-label-scan",
  "03-shop-browse",
  "04-cart-checkout",
  "05-map-places",
  "06-events",
  "07-journey-badges",
];
for (const v of gVideos) {
  for (const ext of [".mp4", ".webm", "-poster.jpg"]) {
    copy(join(PA, "videos/glutenia", v + ext), `glutenia/video/${v}${ext}`);
  }
}
for (const f of [
  "promo-landscape.mp4",
  "promo-landscape-poster.jpg",
  "promo-vertical.mp4",
  "promo-vertical-poster.jpg",
]) {
  copy(join(PA, "videos/glutenia", f), `glutenia/video/${f}`);
}

for (const m of ["hero", "thumbs-up", "stop", "thinking", "pointing-right", "pointing-self", "celebrating"]) {
  copy(join(PA, "mascot", `glutitan-${m}.png`), `glutenia/mascot/glutitan-${m}.png`);
}

for (const s of [
  "home",
  "barcode-scan",
  "ai-result-gluten",
  "ai-flagged-ingredients",
  "catalog",
  "product",
  "cart",
  "order-placed",
  "place-detail",
  "events",
  "event-detail",
  "journey",
  "badges",
]) {
  copy(join(PA, "app-screens", `${s}.png`), `glutenia/app/${s}.png`);
}

for (const s of ["23-sprint1-auth-screens", "27-sprint2-scan-shop-screens", "31-sprint3-community-admin-screens"]) {
  copy(join(PA, "deck-slides", `${s}.jpg`), `glutenia/deck/${s}.jpg`);
}

// The map clip opens on a blank map frame; scripts/map-frame.mjs makes its poster.

if (existsSync(LOGO_SRC)) copy(LOGO_SRC, "glutenia/glutenia-logo.png");
else console.warn("! Glutenia logo not found at", LOGO_SRC);

// Figma frames cropped to the built app's screen ratio (1080×2184) so the
// compare slider lines up. Transparent rounded corners are flattened on white.
async function figmaPhone(name, out) {
  const file = join(SRC, name);
  const { width } = await sharp(file).metadata();
  const h = Math.round((width * 2184) / 1080);
  const dest = join(OUT, out);
  ensure(dest);
  await sharp(file)
    .extract({ left: 0, top: 0, width, height: h })
    .flatten({ background: "#ffffff" })
    .resize(1080, 2184)
    .png({ compressionLevel: 9 })
    .toFile(dest);
}
await figmaPhone("Page d'Accueil.png", "glutenia/figma/home.png");
await figmaPhone("products.png", "glutenia/figma/products.png");
await figmaPhone("Page Carte Collaborative (Map).png", "glutenia/figma/map.png");

// --- L'Africaine ----------------------------------------------------------
for (const v of ["01-home-scroll", "02-shop-to-product-scroll", "03-order-form-scroll", "04-admin-states"]) {
  for (const ext of [".mp4", ".webm", "-poster.jpg"]) {
    copy(join(PA, "videos/lafricaine", v + ext), `lafricaine/video/${v}${ext}`);
  }
}

async function crop(name, out, region, width) {
  const dest = join(OUT, out);
  ensure(dest);
  let img = sharp(join(SRC, name));
  if (region) img = img.extract(region);
  img = img.flatten({ background: "#ffffff" });
  if (width) img = img.resize({ width });
  await (out.endsWith(".jpg") ? img.jpeg({ quality: 88, mozjpeg: true }) : img.png({ compressionLevel: 9 })).toFile(
    dest,
  );
}

await crop("Dashboard admin (Principal).png", "lafricaine/admin/dashboard.png");

// Admin states grid: all normalised to the top 1440×951 of each frame.
const adminTop = { left: 0, top: 0, width: 1440, height: 951 };
const adminFrames = [
  ["Dashboard admin (Gestion des articles).png", "articles-list.png"],
  ["Dashboard admin (Gestion des articles) (Ajout).png", "articles-add.png"],
  ["Dashboard admin (Gestion des articles)(suppression).png", "articles-delete.png"],
  ["Dashboard admin (Gestion des commandes) (Modification) 1.png", "orders-edit.png"],
  ["Dashboard admin (Gestion des actualités) (Modification).png", "news-edit.png"],
  ["Dashboard admin (Gestion des filtres) (Ajout).png", "filters-add.png"],
];
for (const [src, out] of adminFrames) {
  await crop(src, `lafricaine/admin/${out}`, adminTop);
}

// Design-detail close-ups from the homepage mockup (coordinates in px of the 1440-wide export).
await crop("Accueil.jpg", "lafricaine/details/hero-headline-cta.jpg", { left: 60, top: 230, width: 700, height: 430 });
await crop("Accueil.jpg", "lafricaine/details/hero-photo.jpg", { left: 820, top: 150, width: 540, height: 580 });
await crop("Accueil.jpg", "lafricaine/details/banner-squiggles.jpg", { left: 10, top: 2340, width: 770, height: 510 });
await crop("Accueil.jpg", "lafricaine/details/wave-footer.jpg", { left: 0, top: 3440, width: 760, height: 479 });

// The publisher's logo, as it appears in the mockup header.
await crop("Accueil.jpg", "lafricaine/details/logo.png", { left: 56, top: 4, width: 116, height: 108 });

// Figma homepage, above the fold, for the Figma-vs-live comparison.
await crop("Accueil.jpg", "lafricaine/figma-home-top.jpg", { left: 0, top: 0, width: 1440, height: 900 });

console.log("Assets prepared in", OUT);
