import type { ImgHTMLAttributes } from "react";

type PublicPictureImgProps = Omit<
  ImgHTMLAttributes<HTMLImageElement>,
  "src" | "fetchPriority"
> & {
  src: string;
  fetchPriority?: "high" | "low" | "auto";
};

/**
 * Single <img> for predictable layout (no <picture> / missing .webp on host issues).
 * Run `npm run optimize-images` to shrink JPEGs in place when you add new photos.
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
