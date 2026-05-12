# Steffen Mark Hansen One-Pager

Single-page editorial site: split hero (photo + intro, CTA to `#kontakt`), dedicated kontakt section with form, Kunst gallery (including proces photos), Digte, and footer. Formspree lives in `ContactForm`, rendered from `KontaktSection`.

## Stack

- Vite + React + TypeScript
- Tailwind CSS v4 (via `@tailwindcss/vite`)
- Editorial theme in `src/index.css`

## Run locally

1. Install Node.js (if missing) from [nodejs.org](https://nodejs.org/).
2. In this folder, run:
   - `npm install`
   - `npm run dev`
3. Open the local URL shown by Vite.

Production build runs `scripts/optimize-images.mjs` first: it writes responsive WebP variants under `public/images/r/` and refreshes `src/imageManifest.generated.json` for `<img srcset>` (see `PublicPictureImg`). JPEG files remain the fallback `src`.

## Photos used

- `public/images/steffen-studio.jpg` (hero + Kunst spotlight)
- `public/images/steffen-studio-rope-art.jpg`, `steffen-portrait-suit.jpg` (Kunst pair)
- `public/images/steffen-gallery-*.jpg` and `public/images/process-*.jpg` (Kunst grid / lightbox)

## Project structure

- `src/` - React components and styling
- `public/images/` - image assets
- `dist/` - production build output (generated)

## Content placeholders to replace

- Footer mailto (`kontakt@example.com` - replace with the real address)
- Poem excerpts / Kunst captions as needed

## Contact form integration

Formspree via `@formspree/react` in `src/components/ContactForm.tsx`, rendered from `src/components/KontaktSection.tsx` (form id `xzdooabd`).

## Analytics

Optional GA4: set `VITE_GA_MEASUREMENT_ID` (e.g. `G-XXXXXXXXXX`) in `.env.local`; see `src/components/GoogleAnalytics.tsx`.
