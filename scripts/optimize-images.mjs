/**
 * Image pipeline for `public/images/`:
 *
 * 1) Selected JPEGs → sibling `.webp` when smaller than JPEG (CSS `image-set(...)`).
 * 2) Every root JPEG → responsive WebP variants in `public/images/r/` plus
 *    `src/imageManifest.generated.json` for `<img srcset>` (see `PublicPictureImg`).
 */

import { mkdir, readdir, stat, unlink, writeFile } from "node:fs/promises";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const __dirname = dirname(fileURLToPath(import.meta.url));
const imagesDir = join(__dirname, "..", "public", "images");
const manifestPath = join(__dirname, "..", "src", "imageManifest.generated.json");
const responsiveDir = join(imagesDir, "r");

/** Only these JPEGs get a sibling `.webp` (CSS backgrounds). */
const WEBP_TARGETS = new Set(["steffen-street.jpg"]);

/** Longest-edge caps for CSS WebP pass (must beat JPEG size). */
const CSS_CAPS_PX = [
  4096, 2048, 1600, 1400, 1200, 1100, 1000, 900, 840, 780, 720, 640, 560, 480, 400, 320
];
const QUALITIES = [];
for (let q = 82; q >= 28; q -= 3) QUALITIES.push(q);

/** Square box edge caps for responsive `<img srcset>` derivatives. */
const RESPONSIVE_CAPS = [480, 640, 800, 1024, 1280, 1600];

/** JPEGs to skip for `images/r/` (none right now; hero uses steffen-street with srcset). */
const SKIP_RESPONSIVE = new Set();

async function pathExists(p) {
  try {
    await stat(p);
    return true;
  } catch {
    return false;
  }
}

async function encodeCssWebpBuffer(inputPath, capPx, quality) {
  let pipeline = sharp(inputPath).rotate();
  if (capPx < 4096) {
    pipeline = pipeline.resize(capPx, capPx, { fit: "inside", withoutEnlargement: true });
  }
  return pipeline.webp({ quality, effort: 5 }).toBuffer();
}

async function writeSmallerCssWebp(inputPath, outputPath) {
  const jpegSize = (await stat(inputPath)).size;

  for (const capPx of CSS_CAPS_PX) {
    for (const quality of QUALITIES) {
      const buf = await encodeCssWebpBuffer(inputPath, capPx, quality);
      if (buf.length < jpegSize) {
        await writeFile(outputPath, buf);
        return { jpegSize, webpSize: buf.length, capPx, quality };
      }
    }
  }

  await unlink(outputPath).catch(() => {});
  return null;
}

function manifestKeyFromFilename(filename) {
  const stem = filename.replace(/\.jpe?g$/i, "");
  return `${stem.toLowerCase()}.jpg`;
}

async function writeEmptyManifest(message) {
  await writeFile(manifestPath, "{}\n");
  if (message) console.warn(`[optimize-images] ${message}`);
}

async function buildResponsiveVariants() {
  const manifest = {};

  if (!(await pathExists(imagesDir))) {
    await writeEmptyManifest("public/images not found; wrote empty image manifest.");
    return;
  }

  await mkdir(responsiveDir, { recursive: true });

  const entries = await readdir(imagesDir, { withFileTypes: true });
  const rootJpegs = entries.filter(
    (e) =>
      e.isFile() &&
      /\.jpe?g$/i.test(e.name) &&
      !e.name.startsWith(".") &&
      !SKIP_RESPONSIVE.has(e.name)
  );

  for (const ent of rootJpegs) {
    const name = ent.name;
    const inputPath = join(imagesDir, name);
    const stem = name.replace(/\.jpe?g$/i, "");
    const metaIn = await sharp(inputPath).metadata();
    if (!metaIn.width || !metaIn.height) {
      console.warn(`[optimize-images] skip unreadable image: ${name}`);
      continue;
    }

    const variants = [];
    const seenWidths = new Set();

    for (const cap of RESPONSIVE_CAPS) {
      const buf = await sharp(inputPath)
        .rotate()
        .resize({
          width: cap,
          height: cap,
          fit: "inside",
          withoutEnlargement: true
        })
        .webp({ quality: 82, effort: 4 })
        .toBuffer();

      const metaOut = await sharp(buf).metadata();
      const w = metaOut.width ?? 0;
      if (!w || seenWidths.has(w)) continue;
      seenWidths.add(w);

      const outName = `${stem}-i${cap}.webp`;
      await writeFile(join(responsiveDir, outName), buf);
      variants.push({ path: `images/r/${outName}`, w });
    }

    variants.sort((a, b) => a.w - b.w);

    const key = manifestKeyFromFilename(name);
    manifest[key] = { variants };

    console.log(
      `[optimize-images] responsive: ${name} → ${variants.length} variant(s) (${metaIn.width}×${metaIn.height})`
    );
  }

  await writeFile(manifestPath, `${JSON.stringify(manifest, null, 2)}\n`);
}

/* --- CSS WebP (street banner etc.) --- */

let cssSkipped = 0;
if (await pathExists(imagesDir)) {
  const entries = await readdir(imagesDir, { withFileTypes: true });
  const cssTargets = entries
    .filter((e) => e.isFile() && /\.jpe?g$/i.test(e.name))
    .map((e) => e.name)
    .filter((name) => WEBP_TARGETS.has(name));

  for (const name of cssTargets) {
    const inputPath = join(imagesDir, name);
    const outName = name.replace(/\.jpe?g$/i, ".webp");
    const outputPath = join(imagesDir, outName);
    const meta = await sharp(inputPath).metadata();
    const result = await writeSmallerCssWebp(inputPath, outputPath);
    if (!result) {
      cssSkipped += 1;
      console.warn(
        `[optimize-images] CSS WebP not smaller than JPEG, skipped: ${name} (${meta.width}×${meta.height})`
      );
      continue;
    }
    const saved = (((result.jpegSize - result.webpSize) / result.jpegSize) * 100).toFixed(1);
    console.log(
      `[optimize-images] CSS WebP: ${name} (${meta.width}×${meta.height}) cap≤${result.capPx}px q${result.quality}: ` +
        `${(result.jpegSize / 1024).toFixed(1)}KB → ${(result.webpSize / 1024).toFixed(1)}KB (${saved}% smaller)`
    );
  }

  if (cssSkipped) {
    console.warn(
      `[optimize-images] CSS WebP skipped ${cssSkipped} file(s); extend CSS_CAPS_PX/QUALITIES if needed.`
    );
  }
}

await buildResponsiveVariants();
