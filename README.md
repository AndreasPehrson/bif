# Steffen Mark Hansen One-Pager

Single-page portfolio site focused on promoting workshops, with sections for art, poems, and a contact form.

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

After adding or replacing JPEGs in `public/images/`, run `npm run optimize-images` to regenerate matching `.webp` files (used by the site for faster loads).

## Photos used

- `public/images/steffen-studio.jpg` (hero + featured art tile)
- `public/images/steffen-street.jpg` (workshops section backdrop)
- Additional process/art images are also stored in `public/images/`

## Project structure

- `src/` - React components and styling
- `public/images/` - all site image assets served by Vite
- `dist/` - production build output (generated)

## Content placeholders to replace

- Hero intro text
- About paragraph
- Art captions / additional images
- Poem excerpts
- Workshop offering copy
- Footer social links and email

## Contact form integration

The contact form is wired to Formspree via `@formspree/react` in `src/components/Contact.tsx`.
