import { useState } from "react";
import { assetUrl } from "../assetUrl";
import type { LightboxImage } from "./Lightbox";
import { PublicPictureImg } from "./PublicPictureImg";

type GalleryItem = {
  src: string;
  alt: string;
  title: string;
  meta: string;
};

const featuredWork: GalleryItem = {
  src: assetUrl("/images/steffen-studio.jpg"),
  alt: "Jeg i gårdrum med tre malerier i stærke farver",
  title: "Tre lærreder i gården",
  meta: "2026 · Maleri · blandet teknik"
};

const works: GalleryItem[] = [
  {
    src: assetUrl("/images/steffen-studio-rope-art.jpg"),
    alt: "Jeg holder mørkerødt lærred med figur lavet af reb",
    title: "Spray og sejlgarn",
    meta: "2025 · Lærred · Spray og sejlgarn"
  },
  {
    src: assetUrl("/images/steffen-portrait-suit.jpg"),
    alt: "Jeg i turkis jakkesæt foran stenmur med armene slået ud",
    title: "Bryllupsportræt",
    meta: "2026 · Foto · portræt"
  }
];

const extraArtWorks: GalleryItem[] = [
  {
    src: assetUrl("/images/steffen-gallery-01.jpg"),
    alt: "Spraydåser, olietuber og pensler lagt klar på stol i atelier",
    title: "Materialer før opstart",
    meta: "2024 · Foto · atelier"
  },
  {
    src: assetUrl("/images/steffen-gallery-02.jpg"),
    alt: "Så længe jeg går så meget op i hvad andre tænker, slipper jeg aldrig fri af mine lænker",
    title: "To figurer i gårdrummet",
    meta: "2025 · Maleri · figurmotiv"
  },
  {
    src: assetUrl("/images/steffen-gallery-03.jpg"),
    alt: "Pink lærred med to små figurmotiver foran murstensvæg",
    title: "Nedtrykt menneske med tung rygsæk og selvlysende hoveder",
    meta: "2025 · Maleri · akryl og spray · solgt"
  },
  {
    src: assetUrl("/images/steffen-gallery-04.jpg"),
    alt: "Arbejdsbord med spraytest og lærred med håndmotiv i baggrunden",
    title: "Spraytest",
    meta: "2025 · Foto · proces"
  },
  {
    src: assetUrl("/images/steffen-gallery-05.jpg"),
    alt: "Lærred med teksten Velkommen til bryllupsfest og rød snorform",
    title: "Velkommen til bryllupsfest",
    meta: "2026 · Maleri · tekst og snor"
  },
  {
    src: assetUrl("/images/steffen-gallery-06.jpg"),
    alt: "Lyst lærred med ordet ALIVE og malet blomst med dryp",
    title: "ALIVE med blomst",
    meta: "2025 · Maleri · tekstværk"
  },
  {
    src: assetUrl("/images/steffen-gallery-07.jpg"),
    alt: "Atelierrum fyldt med værker, skitser og materialer på vægge og gulv",
    title: "Atelieret i fuld opstilling",
    meta: "2025 · Foto · atelier"
  },
  {
    src: assetUrl("/images/steffen-gallery-08.jpg"),
    alt: "Jeg læser op ved mikrofon foran bogreol og publikum",
    title: "Oplæsning i Løves bogcafe",
    meta: "2025 · Foto · oplæsning"
  }
];

/** Former standalone Proces section - merged into Kunst grid + lightbox */
const processWorks: GalleryItem[] = [
  {
    src: assetUrl("/images/process-outdoor-table.jpg"),
    alt: "Udendørs arbejdsbord med maleri og materialer",
    title: "Udendørs maleri på picnicbord",
    meta: "Proces · foto"
  },
  {
    src: assetUrl("/images/process-courtyard-spray.jpg"),
    alt: "Spraymaling og studiofacade med teksten KUNST",
    title: "Spray og stemning på væggen",
    meta: "Proces · dokumentation"
  },
  {
    src: assetUrl("/images/process-pink-canvas.jpg"),
    alt: "Pink og neongrønt lærred i arbejde",
    title: "Farve, form og nærvær",
    meta: "Proces · maleri"
  },
  {
    src: assetUrl("/images/steffen-gallery-09.jpg"),
    alt: "Publikum i cafe under oplæsning eller præsentation",
    title: "Oplæsning i Løves bogcafe",
    meta: "Proces · foto"
  },
  {
    src: assetUrl("/images/steffen-gallery-10.jpg"),
    alt: "Fernisering i Risskov med værker på væggen",
    title: "Fernisering i Risskov",
    meta: "Proces · foto"
  },
  {
    src: assetUrl("/images/steffen-gallery-11.jpg"),
    alt: "Maleri på staffeli med to figur-silhuetter i gennemgang",
    title: "Figurer på staffeli",
    meta: "Proces · maleri"
  },
  {
    src: assetUrl("/images/steffen-gallery-12.jpg"),
    alt: "Rødt maleri på staffeli med sorte stregformer i atelier",
    title: "Rødt lærred i atelier",
    meta: "Proces · maleri"
  },
  {
    src: assetUrl("/images/steffen-gallery-13.jpg"),
    alt: "Orange maleri med dryp hængt op mod murstensvæg",
    title: "Orange dryp mod mur",
    meta: "Proces · maleri"
  },
  {
    src: assetUrl("/images/steffen-gallery-15.jpg"),
    alt: "Mørkt lærred med snore og røde trekantformer",
    title: "Snoreværk på mørk bund",
    meta: "Proces · maleri"
  },
  {
    src: assetUrl("/images/steffen-gallery-16.jpg"),
    alt: "Udendørs arbejdsbord med lærred, maling og skygger",
    title: "Udendørs arbejdsbord",
    meta: "Proces · foto"
  },
  {
    src: assetUrl("/images/steffen-gallery-17.jpg"),
    alt: "Publikum til fernisering i vinbutik med værker på væggen",
    title: "Fernisering med publikum",
    meta: "Proces · foto"
  }
];

const mergedGridExtras: GalleryItem[] = [...extraArtWorks, ...processWorks];

const allGalleryForLightbox: GalleryItem[] = [
  featuredWork,
  ...works,
  ...mergedGridExtras
];

export const artLightboxImages: LightboxImage[] = allGalleryForLightbox.map((item) => ({
  src: item.src,
  alt: item.alt,
  caption: `${item.title} · ${item.meta}`
}));

type ArtProps = {
  onOpenLightbox: (index: number) => void;
};

function Caption({ title, meta }: { title: string; meta: string }) {
  return (
    <div className="caption">
      <span className="caption-line caption-line--title">{title}</span>
      <span className="caption-line">{meta}</span>
    </div>
  );
}

export function Art({ onOpenLightbox }: ArtProps) {
  const [showMore, setShowMore] = useState(false);
  const initialExtraCount = 6;
  const visibleExtras = showMore
    ? mergedGridExtras
    : mergedGridExtras.slice(0, initialExtraCount);

  const extrasStartIndex = 1 + works.length;

  return (
    <section
      className="section art-section"
      id="kunst"
      aria-labelledby="kunst-heading"
    >
      <div className="container art-inner">
        <header className="art-header">
          <h2 id="kunst-heading" className="section-heading">
            Kunst
          </h2>
          <p className="section-intro art-intro">
            Mine udvalgte værker og portrætter - og glimt fra proces og rum omkring dem.
          </p>
        </header>

        <div className="art-layout">
          <article className="art-spotlight">
            <button
              type="button"
              className="image-button"
              onClick={() => onOpenLightbox(0)}
              aria-label={`Åbn billede: ${featuredWork.title}`}
            >
              <div className="editorial-frame editorial-frame--spotlight">
                <PublicPictureImg
                  src={featuredWork.src}
                  alt={featuredWork.alt}
                  layout="artHero"
                  loading="lazy"
                />
              </div>
            </button>
            <Caption title={featuredWork.title} meta={featuredWork.meta} />
          </article>

          <div className="art-pair">
            {works.map((item, index) => (
              <article key={item.src} className="editorial-grid-item">
                <button
                  type="button"
                  className="image-button"
                  onClick={() => onOpenLightbox(index + 1)}
                  aria-label={`Åbn billede: ${item.title}`}
                >
                  <div className="editorial-frame editorial-frame--pair">
                    <PublicPictureImg
                      src={item.src}
                      alt={item.alt}
                      layout="pair"
                      loading="lazy"
                    />
                  </div>
                </button>
                <Caption title={item.title} meta={item.meta} />
              </article>
            ))}
          </div>

          <div className="editorial-grid">
            {visibleExtras.map((item, index) => {
              const lightboxIndex = extrasStartIndex + index;
              return (
                <article key={item.src} className="editorial-grid-item">
                  <button
                    type="button"
                    className="image-button"
                    onClick={() => onOpenLightbox(lightboxIndex)}
                    aria-label={`Åbn billede: ${item.title}`}
                  >
                    <div className="editorial-frame editorial-frame--tile">
                      <PublicPictureImg
                        src={item.src}
                        alt={item.alt}
                        layout="tile"
                        loading="lazy"
                      />
                    </div>
                  </button>
                  <Caption title={item.title} meta={item.meta} />
                </article>
              );
            })}
          </div>

          {mergedGridExtras.length > initialExtraCount ? (
            <div className="art-more">
              <button
                type="button"
                className="btn-text"
                onClick={() => setShowMore((value) => !value)}
              >
                {showMore ? "Vis færre billeder" : "Vis flere billeder"}
              </button>
            </div>
          ) : null}
        </div>
      </div>
    </section>
  );
}
