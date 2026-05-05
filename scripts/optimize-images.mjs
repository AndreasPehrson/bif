/**
 * Builds a .webp next to each JPEG in public/images/
 * Only writes WebP when it is smaller than the source JPEG (same basename).
 */

import { readdir, stat, writeFile, unlink } from "node:fs/promises";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const __dirname = dirname(fileURLToPath(import.meta.url));
const imagesDir = join(__dirname, "..", "public", "images");

/** Longest edge caps; first match wins with the highest usable quality at that cap. */
const CAPS_PX = [
  4096, 2048, 1600, 1400, 1200, 1100, 1000, 900, 840, 780, 720, 640, 560, 480, 400, 320
];
const QUALITIES = [];
for (let q = 82; q >= 28; q -= 3) QUALITIES.push(q);

async function encodeWebpBuffer(inputPath, capPx, quality) {
  let pipeline = sharp(inputPath).rotate();
  if (capPx < 4096) {
    pipeline = pipeline.resize(capPx, capPx, { fit: "inside", withoutEnlargement: true });
  }
  return pipeline.webp({ quality, effort: 5 }).toBuffer();
}

async function writeSmallerWebp(inputPath, outputPath) {
  const jpegSize = (await stat(inputPath)).size;

  for (const capPx of CAPS_PX) {
    for (const quality of QUALITIES) {
      const buf = await encodeWebpBuffer(inputPath, capPx, quality);
      if (buf.length < jpegSize) {
        await writeFile(outputPath, buf);
        return { jpegSize, webpSize: buf.length, capPx, quality };
      }
    }
  }

  await unlink(outputPath).catch(() => {});
  return null;
}

const entries = await readdir(imagesDir, { withFileTypes: true });
const jpegs = entries.filter((e) => e.isFile() && /\.jpe?g$/i.test(e.name)).map((e) => e.name);

let skipped = 0;
for (const name of jpegs) {
  const inputPath = join(imagesDir, name);
  const outName = name.replace(/\.jpe?g$/i, ".webp");
  const outputPath = join(imagesDir, outName);
  const meta = await sharp(inputPath).metadata();
  const result = await writeSmallerWebp(inputPath, outputPath);
  if (!result) {
    skipped += 1;
    console.warn(
      `[optimize-images] no WebP smaller than JPEG, skipped: ${name} (${meta.width}×${meta.height})`
    );
    continue;
  }
  const saved = (((result.jpegSize - result.webpSize) / result.jpegSize) * 100).toFixed(1);
  console.log(
    `${name} (${meta.width}×${meta.height}) cap≤${result.capPx}px q${result.quality}: ` +
      `${(result.jpegSize / 1024).toFixed(1)}KB → ${(result.webpSize / 1024).toFixed(1)}KB (${saved}% smaller)`
  );
}

if (skipped) {
  console.warn(
    `\n[optimize-images] Skipped ${skipped} file(s); add PublicPictureImg fallback or extend CAPS_PX/QUALITIES.`
  );
}
