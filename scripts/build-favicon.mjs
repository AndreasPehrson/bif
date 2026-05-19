/**
 * Build favicon assets from the bird logo PDF.
 * Requires: pip install pymupdf (PyMuPDF)
 *
 * Usage: node scripts/build-favicon.mjs [path-to.pdf]
 */
import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { spawnSync } from "node:child_process";
import sharp from "sharp";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const repoRoot = path.resolve(__dirname, "..");
const defaultPdf = path.join(
  process.env.USERPROFILE ?? "",
  "Downloads",
  "fugl hvid.pdf"
);
const pdfPath = process.argv[2] ? path.resolve(process.argv[2]) : defaultPdf;
const outDir = path.join(repoRoot, "public");
const tmpPng = path.join(__dirname, "_favicon-source.png");

const INK = { r: 44, g: 40, b: 43 }; // --color-ink
/** Strip @STEF_E_LI band — text starts ~66% down the artwork. */
const CROP_HEIGHT_RATIO = 0.6;
const STROKE_THRESHOLD = 32;

function renderPdfWithPython() {
  const py = `
import fitz
doc = fitz.open(${JSON.stringify(pdfPath.replace(/\\/g, "/"))})
page = doc[0]
pix = page.get_pixmap(matrix=fitz.Matrix(4, 4), alpha=True)
pix.save(${JSON.stringify(tmpPng.replace(/\\/g, "/"))})
print(pix.width, pix.height)
`;
  const r = spawnSync("python", ["-c", py], { encoding: "utf8" });
  if (r.status !== 0) {
    console.error(r.stderr || r.stdout);
    throw new Error("Failed to render PDF (install PyMuPDF: pip install pymupdf)");
  }
}

async function rasterToBirdPng() {
  const { data, info } = await sharp(tmpPng)
    .ensureAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });

  const { width, height } = info;
  const cropH = Math.floor(height * CROP_HEIGHT_RATIO);

  let minX = width;
  let minY = height;
  let maxX = 0;
  let maxY = 0;

  const out = Buffer.alloc(width * cropH * 4, 0);

  for (let y = 0; y < cropH; y++) {
    for (let x = 0; x < width; x++) {
      const i = (y * width + x) * 4;
      const lum = data[i] + data[i + 1] + data[i + 2];
      if (lum > STROKE_THRESHOLD) {
        const o = (y * width + x) * 4;
        out[o] = INK.r;
        out[o + 1] = INK.g;
        out[o + 2] = INK.b;
        out[o + 3] = 255;
        if (x < minX) minX = x;
        if (y < minY) minY = y;
        if (x > maxX) maxX = x;
        if (y > maxY) maxY = y;
      }
    }
  }

  if (maxX <= minX) throw new Error("No logo strokes found in PDF render");

  const pad = Math.round(Math.max(maxX - minX, maxY - minY) * 0.12);
  minX = Math.max(0, minX - pad);
  minY = Math.max(0, minY - pad);
  maxX = Math.min(width - 1, maxX + pad);
  maxY = Math.min(cropH - 1, maxY + pad);

  const cropW = maxX - minX + 1;
  const cropH2 = maxY - minY + 1;
  const cropped = Buffer.alloc(cropW * cropH2 * 4, 0);

  for (let y = 0; y < cropH2; y++) {
    for (let x = 0; x < cropW; x++) {
      const si = ((minY + y) * width + (minX + x)) * 4;
      const di = (y * cropW + x) * 4;
      cropped[di] = out[si];
      cropped[di + 1] = out[si + 1];
      cropped[di + 2] = out[si + 2];
      cropped[di + 3] = out[si + 3];
    }
  }

  let sumX = 0;
  let sumY = 0;
  let n = 0;
  for (let y = 0; y < cropH2; y++) {
    for (let x = 0; x < cropW; x++) {
      if (cropped[(y * cropW + x) * 4 + 3] > 0) {
        sumX += x;
        sumY += y;
        n++;
      }
    }
  }
  const centroidX = sumX / n;
  const centroidY = sumY / n;

  const side = Math.max(cropW, cropH2);
  const square = Buffer.alloc(side * side * 4, 0);
  const offX = Math.round(side / 2 - centroidX);
  const offY = Math.round(side / 2 - centroidY);

  for (let y = 0; y < cropH2; y++) {
    for (let x = 0; x < cropW; x++) {
      const si = (y * cropW + x) * 4;
      const dx = offX + x;
      const dy = offY + y;
      if (dx < 0 || dy < 0 || dx >= side || dy >= side) continue;
      const di = (dy * side + dx) * 4;
      square[di] = cropped[si];
      square[di + 1] = cropped[si + 1];
      square[di + 2] = cropped[si + 2];
      square[di + 3] = cropped[si + 3];
    }
  }

  return sharp(square, {
    raw: { width: side, height: side, channels: 4 }
  })
    .png()
    .toBuffer();
}

async function writeOutputs(squarePng) {
  await fs.mkdir(outDir, { recursive: true });

  const sizes = [
    ["favicon-16.png", 16],
    ["favicon-32.png", 32],
    ["favicon-48.png", 48],
    ["apple-touch-icon.png", 180],
    ["favicon-512.png", 512]
  ];

  for (const [name, size] of sizes) {
    await sharp(squarePng)
      .resize(size, size, { fit: "contain", background: { r: 0, g: 0, b: 0, alpha: 0 } })
      .png()
      .toFile(path.join(outDir, name));
  }

  const b64 = (await sharp(squarePng).resize(32, 32).png().toBuffer()).toString("base64");
  const svg = `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 32 32">
  <image width="32" height="32" xlink:href="data:image/png;base64,${b64}"/>
</svg>`;
  await fs.writeFile(path.join(outDir, "favicon.svg"), svg);

  // Legacy alias
  await fs.copyFile(path.join(outDir, "favicon-32.png"), path.join(outDir, "favicon.png"));
}

async function main() {
  try {
    await fs.access(pdfPath);
  } catch {
    console.error(`PDF not found: ${pdfPath}`);
    process.exit(1);
  }

  console.log("Rendering PDF…");
  renderPdfWithPython();

  console.log("Processing logo (crop text, center)…");
  const squarePng = await rasterToBirdPng();

  console.log("Writing public/favicon* …");
  await writeOutputs(squarePng);

  await fs.unlink(tmpPng).catch(() => {});
  console.log("Done.");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
