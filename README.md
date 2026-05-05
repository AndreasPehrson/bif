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

## Photos used

- `public/images/steffen-studio.jpg` (hero + featured art tile)
- `public/images/steffen-street.jpg` (workshops section backdrop)

## Content placeholders to replace

- Hero intro text
- About paragraph
- Art captions / additional images
- Poem excerpts
- Workshop offering copy
- Footer social links and email

## Contact form integration

The current form uses a placeholder submit handler (`preventDefault`, console log, success message). Replace it with Formspree/Web3Forms/custom endpoint in `src/components/Contact.tsx`.
