/// <reference types="vite/client" />

interface ImportMetaEnv {
  /** GA4 measurement ID, e.g. G-XXXXXXXXXX */
  readonly VITE_GA_MEASUREMENT_ID?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
