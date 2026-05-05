import { useEffect, useRef } from "react";

declare global {
  interface Window {
    dataLayer: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

function pagePath() {
  return (
    window.location.pathname + window.location.search + window.location.hash
  );
}

/**
 * GA4 via gtag.js. Set `VITE_GA_MEASUREMENT_ID` (e.g. `G-XXXXXXXXXX`) in `.env.local`
 * or pass `secrets.GA_MEASUREMENT_ID` in GitHub Actions for production builds.
 */
export function GoogleAnalytics() {
  const ready = useRef(false);

  useEffect(() => {
    const raw = import.meta.env.VITE_GA_MEASUREMENT_ID?.trim();
    if (!raw || !/^G-[A-Z0-9]+$/i.test(raw)) return;
    if (ready.current || document.getElementById("ga-gtag-inline")) return;
    ready.current = true;

    const external = document.createElement("script");
    external.id = "ga-gtag-src";
    external.async = true;
    external.src = `https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(raw)}`;

    const inline = document.createElement("script");
    inline.id = "ga-gtag-inline";
    inline.textContent = `
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      window.gtag = gtag;
      gtag('js', new Date());
      gtag('config', '${raw}', {
        page_path: window.location.pathname + window.location.search + window.location.hash
      });
    `;

    document.head.appendChild(external);
    document.head.appendChild(inline);

    const onHash = () => {
      window.gtag?.("config", raw, { page_path: pagePath() });
    };
    window.addEventListener("hashchange", onHash);

    return () => {
      window.removeEventListener("hashchange", onHash);
      external.remove();
      inline.remove();
      ready.current = false;
    };
  }, []);

  return null;
}
