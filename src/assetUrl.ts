/** Prefix public-folder paths with Vite `base` (required for GitHub Pages project sites). */
export function assetUrl(path: string): string {
  const base = import.meta.env.BASE_URL;
  const p = path.replace(/^\/+/, "");
  return base + p;
}
