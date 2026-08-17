import sharp from "sharp";

const source = "public/images/pag-2026.jpg";
const destination = "public/images/pag-2026-round.png";
const image = sharp(source);
const metadata = await image.metadata();

if (!metadata.width || !metadata.height || metadata.width !== metadata.height) {
  throw new Error("Das PAG-Motiv muss quadratisch sein.");
}

const size = metadata.width;
const mask = Buffer.from(`
  <svg width="${size}" height="${size}" viewBox="0 0 ${size} ${size}">
    <circle cx="${size / 2}" cy="${size / 2}" r="${size / 2}" fill="white" />
  </svg>
`);

await image
  .ensureAlpha()
  .composite([{ input: mask, blend: "dest-in" }])
  .png()
  .toFile(destination);

console.log(`Rundes Originalmotiv gespeichert: ${destination}`);
