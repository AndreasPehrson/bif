import type { ImgHTMLAttributes } from "react";
import { assetUrl } from "../assetUrl";
import manifestJson from "../imageManifest.generated.json";

type ManifestEntry = { variants: { path: string; w: number }[] };
const manifest = manifestJson as Record<string, ManifestEntry>;

export type PictureLayout =
  | "heroColumn"
  | "artHero"
  | "heroMain"
  | "pair"
  | "feed"
  | "tile";

const LAYOUT_SIZES: Record<PictureLayout, string> = {
  /** Hero grid: image column ~half of `.container` on desktop */
  heroColumn:
    "(min-width: 901px) min(520px, 48vw), (min-width: 560px) min(720px, 94vw), calc(100vw - 2rem)",
  /** Art spotlight: full content width */
  artHero: "(min-width: 768px) min(1100px, calc(100vw - 2rem)), calc(100vw - 2rem)",
  /** Landing hero: single tall editorial photo */
  heroMain: "(min-width: 768px) min(720px, 90vw), calc(100vw - 2rem)",
  /** Two-up pair under spotlight */
  pair:
    "(min-width: 768px) calc((min(1100px, 100vw - 2rem) - 1.75rem) / 2), calc(100vw - 2rem)",
  /** Single-column feed cards */
  feed: "(min-width: 768px) min(1100px, calc(100vw - 2rem)), calc(100vw - 2rem)",
  /** Three-column editorial grid (~⅓ container) */
  tile:
    "(min-width: 900px) min(360px, 33vw), (min-width: 640px) min(480px, 48vw), calc(100vw - 2rem)"
};

function manifestKeyFromSrc(src: string): string | undefined {
  const base = import.meta.env.BASE_URL.replace(/\/$/, "");
  let path = src;
  if (base && path.startsWith(base)) path = path.slice(base.length);
  path = path.replace(/^\//, "");
  const m = /^images\/([^/]+)$/i.exec(path);
  if (!m) return undefined;
  const file = m[1];
  const stem = file.replace(/\.jpe?g$/i, "");
  return `${stem.toLowerCase()}.jpg`;
}

type PublicPictureImgProps = Omit<
  ImgHTMLAttributes<HTMLImageElement>,
  "src" | "fetchPriority" | "sizes"
> & {
  src: string;
  fetchPriority?: "high" | "low" | "auto";
  /** Used with generated `srcset` when `sizes` is not passed explicitly */
  layout?: PictureLayout;
  sizes?: string;
};

/**
 * JPEG `src` stays as the fallback; when `npm run optimize-images` has been run,
 * responsive WebP variants are wired via `src/imageManifest.generated.json`.
 */
export function PublicPictureImg({
  src,
  alt,
  decoding = "async",
  fetchPriority,
  layout = "feed",
  sizes: sizesProp,
  ...rest
}: PublicPictureImgProps) {
  const key = manifestKeyFromSrc(src);
  const entry = key ? manifest[key] : undefined;
  const srcSet =
    entry?.variants?.length ?
      entry.variants.map((v) => `${assetUrl(`/${v.path}`)} ${v.w}w`).join(", ")
    : undefined;

  const sizes = sizesProp ?? LAYOUT_SIZES[layout];

  return (
    <img
      src={src}
      alt={alt}
      decoding={decoding}
      {...(srcSet ? { srcSet, sizes } : {})}
      {...(fetchPriority != null ? { fetchpriority: fetchPriority } : {})}
      {...rest}
    />
  );
}
