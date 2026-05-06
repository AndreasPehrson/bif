# Steffen Mark Hansen One-Pager

Single-page site for Steffen Mark Hansen: art gallery, process, poems, a mood section, and a contact form anchored in the hero.

## Stack

- Vite + React + TypeScript
- Tailwind CSS v4 (via `@tailwindcss/vite`)
- Custom warm visual theme in `src/index.css`

## Run locally

1. Install Node.js (if missing) from [nodejs.org](https://nodejs.org/).
2. In this folder, run:
   - `npm install`
   - `npm run dev`
3. Open the local URL shown by Vite.

After replacing `public/images/steffen-street.jpg`, run `npm run optimize-images` to regenerate `public/images/steffen-street.webp` (used by the CSS background `image-set(...)` for faster loads). Other images are served as JPEG from `<img>` tags.

## Photos used

- `public/images/steffen-studio.jpg` (hero + featured art tile)
- `public/images/steffen-street.jpg` + `public/images/steffen-street.webp` (full-bleed mood backdrop)
- `public/images/steffen-gallery-*.jpg` (gallery grid)
- `public/images/process-*.jpg` (process section)

## Project structure

- `src/` - React components and styling
- `public/images/` - all site image assets served by Vite
- `dist/` - production build output (generated)

## Content placeholders to replace

- Hero intro text
- About paragraph
- Art captions / additional images
- Poem excerpts
- Stemning section copy
- Footer social links (Instagram URL)

## Contact form integration

The contact form is wired to Formspree via `@formspree/react` in `src/components/ContactForm.tsx` (embedded in `src/components/Hero.tsx`).
