import type { ImgHTMLAttributes } from "react";

type PublicPictureImgProps = Omit<
  ImgHTMLAttributes<HTMLImageElement>,
  "src" | "fetchPriority"
> & {
  src: string;
  fetchPriority?: "high" | "low" | "auto";
};

/**
 * Single <img> for predictable layout on GitHub Pages (simple `src=` paths).
 *
 * Note: `npm run optimize-images` only generates `.webp` for CSS `image-set(...)`
 * backgrounds (see `src/index.css`), not for these `<img>` tags.
 */
export function PublicPictureImg({
  src,
  alt,
  decoding = "async",
  fetchPriority,
  ...rest
}: PublicPictureImgProps) {
  return (
    <img
      src={src}
      alt={alt}
      decoding={decoding}
      {...(fetchPriority != null ? { fetchpriority: fetchPriority } : {})}
      {...rest}
    />
  );
}
