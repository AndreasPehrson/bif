import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

/**
 * GitHub Actions always sets GITHUB_REPOSITORY=owner/repo. Use it so `base` is correct
 * even if VITE_BASE_PATH is missing from the environment (fixes `/images/` vs `/repo/images/`).
 */
function resolveBase() {
  const explicit = process.env.VITE_BASE_PATH;
  if (explicit != null && explicit !== "") {
    let b = explicit;
    if (!b.startsWith("/")) b = `/${b}`;
    if (!b.endsWith("/")) b = `${b}/`;
    return b;
  }

  const full = process.env.GITHUB_REPOSITORY;
  if (full) {
    const [owner, repo] = full.split("/");
    if (repo && owner && repo.toLowerCase() === `${owner.toLowerCase()}.github.io`) {
      return "/";
    }
    if (repo) {
      return `/${repo}/`;
    }
  }

  return "/";
}

export default defineConfig({
  base: resolveBase(),
  plugins: [react(), tailwindcss()]
});
