import { useEffect } from "react";

export type LightboxImage = {
  src: string;
  alt: string;
  caption?: string;
};

type LightboxProps = {
  images: LightboxImage[];
  activeIndex: number;
  onClose: () => void;
  onNext: () => void;
  onPrev: () => void;
};

export function Lightbox({
  images,
  activeIndex,
  onClose,
  onNext,
  onPrev
}: LightboxProps) {
  const activeImage = images[activeIndex];

  useEffect(() => {
    function handleKeydown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        onClose();
      } else if (event.key === "ArrowRight") {
        onNext();
      } else if (event.key === "ArrowLeft") {
        onPrev();
      }
    }

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeydown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeydown);
    };
  }, [onClose, onNext, onPrev]);

  if (!activeImage) return null;

  return (
    <div className="lightbox" role="dialog" aria-modal="true" aria-label="Billedvisning">
      <button
        type="button"
        className="lightbox-backdrop"
        aria-label="Luk billedvisning"
        onClick={onClose}
      />
      <div className="lightbox-panel">
        <button type="button" className="lightbox-close" aria-label="Luk billedvisning" onClick={onClose}>
          ×
        </button>
        <button
          type="button"
          className="lightbox-nav lightbox-nav-prev"
          aria-label="Forrige billede"
          onClick={onPrev}
        >
          ‹
        </button>
        <figure className="lightbox-figure">
          <img
            src={activeImage.src}
            alt={activeImage.alt}
            decoding="async"
          />
          {activeImage.caption ? <figcaption>{activeImage.caption}</figcaption> : null}
        </figure>
        <button
          type="button"
          className="lightbox-nav lightbox-nav-next"
          aria-label="Næste billede"
          onClick={onNext}
        >
          ›
        </button>
      </div>
    </div>
  );
}
