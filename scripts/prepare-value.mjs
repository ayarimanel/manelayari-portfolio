// Crops Manel's two Value mockups (homepage and careers) into the images used
// on the Value case study. The source files are only read.
//
//   node scripts/prepare-value.mjs
//   VALUE_SRC="D:\path\to\folder" node scripts/prepare-value.mjs
import { mkdirSync } from "node:fs";
import { join } from "node:path";
import sharp from "sharp";

const SRC = process.env.VALUE_SRC ?? "C:/Users/manel/Downloads";
const OUT = join(import.meta.dirname, "..", "public", "media", "value");
mkdirSync(OUT, { recursive: true });

// The exports are 4× (5760 px wide); everything below is in px of the 1440-wide page.
async function page(file) {
  return sharp(join(SRC, file), { limitInputPixels: false })
    .flatten({ background: "#ffffff" })
    .resize({ width: 1440 })
    .png()
    .toBuffer();
}

async function crop(buf, out, top, height) {
  await sharp(buf)
    .extract({ left: 0, top, width: 1440, height })
    .jpeg({ quality: 86, mozjpeg: true })
    .toFile(join(OUT, out));
  console.log("value/" + out);
}

const home = await page("Acceuil.png");
await crop(home, "home-top.jpg", 0, 900);
await crop(home, "home-about.jpg", 799, 472);
await crop(home, "home-solutions.jpg", 1271, 600);
await crop(home, "home-expertise.jpg", 1872, 775);
await crop(home, "home-why.jpg", 2648, 572);
await crop(home, "home-cta.jpg", 4548, 635);

const careers = await page("Carreer.png");
await crop(careers, "careers-top.jpg", 0, 900);
await crop(careers, "careers-join.jpg", 608, 832);
await crop(careers, "careers-benefits.jpg", 1440, 810);
await crop(careers, "careers-form.jpg", 2252, 894);
