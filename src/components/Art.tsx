import { assetUrl } from "../assetUrl";
import { LightboxImage } from "./Lightbox";
import { PublicPictureImg } from "./PublicPictureImg";

const featuredWork = {
  src: assetUrl("/images/steffen-studio.jpg"),
  alt: "Jeg i gårdrum med tre malerier i stærke farver",
  title: "Tre lærreder i gården",
  meta: "2024 · Maleri · blandet teknik"
};

const works = [
  {
    src: assetUrl("/images/steffen-studio-rope-art.jpg"),
    alt: "Jeg holder mørkerødt lærred med figur lavet af reb",
    title: "Rebfigur på bordeaux bund",
    meta: "2024 · Lærred · reb og spray"
  },
  {
    src: assetUrl("/images/steffen-portrait-suit.jpg"),
    alt: "Jeg i turkis jakkesæt foran stenmur med armene slået ud",
    title: "Portræt ved stenmuren",
    meta: "2023 · Foto · portræt"
  }
];

const extraArtWorks = [
  {
    src: assetUrl("/images/steffen-gallery-01.jpg"),
    alt: "Spraydåser, olietuber og pensler lagt klar på stol i atelier",
    title: "Materialer før opstart",
    meta: "2024 · Foto · atelier"
  },
  {
    src: assetUrl("/images/steffen-gallery-02.jpg"),
    alt: "Maleri med to figurer på staffeli midt i brostensgård",
    title: "To figurer i gårdrummet",
    meta: "2024 · Maleri · figurmotiv"
  },
  {
    src: assetUrl("/images/steffen-gallery-03.jpg"),
    alt: "Pink lærred med to små figurmotiver foran murstensvæg",
    title: "Pink felt med to figurer",
    meta: "2024 · Maleri · akryl og spray"
  },
  {
    src: assetUrl("/images/steffen-gallery-04.jpg"),
    alt: "Arbejdsbord med spraytest og lærred med håndmotiv i baggrunden",
    title: "Spraytest ved håndmotiv",
    meta: "2024 · Foto · proces"
  },
  {
    src: assetUrl("/images/steffen-gallery-05.jpg"),
    alt: "Lærred med teksten Velkommen til bryllupsfest og rød snorform",
    title: "Velkommen til bryllupsfest",
    meta: "2024 · Maleri · tekst og snor"
  },
  {
    src: assetUrl("/images/steffen-gallery-06.jpg"),
    alt: "Lyst lærred med ordet ALIVE og malet blomst med dryp",
    title: "ALIVE med blomst",
    meta: "2024 · Maleri · tekstværk"
  },
  {
    src: assetUrl("/images/steffen-gallery-07.jpg"),
    alt: "Atelierrum fyldt med værker, skitser og materialer på vægge og gulv",
    title: "Atelieret i fuld opstilling",
    meta: "2024 · Foto · atelier"
  },
  {
    src: assetUrl("/images/steffen-gallery-08.jpg"),
    alt: "Jeg læser op ved mikrofon foran bogreol og publikum",
    title: "Oplæsning i bogcafe",
    meta: "2024 · Foto · oplæsning"
  }
];

const allArtWorks = [...works, ...extraArtWorks];

export const artLightboxImages: LightboxImage[] = [featuredWork, ...allArtWorks].map((item) => ({
  src: item.src,
  alt: item.alt,
  caption: `${item.title} · ${item.meta}`
}));

type ArtProps = {
  onOpenLightbox: (index: number) => void;
};

export function Art({ onOpenLightbox }: ArtProps) {
  return (
    <section className="section container" id="art">
      <h2>Kunst</h2>
      <p className="section-intro">
        Mine udvalgte værker og portrætter - korte linjer, klar stemning.
      </p>
      <div className="art-grid">
        <article className="art-feature">
          <button
            type="button"
            className="image-button"
            onClick={() => onOpenLightbox(0)}
            aria-label={`Åbn billede: ${featuredWork.title}`}
          >
            <PublicPictureImg
              src={featuredWork.src}
              alt={featuredWork.alt}
              loading="lazy"
            />
          </button>
          <div className="work-meta">
            <p className="work-title">{featuredWork.title}</p>
            <p className="work-details">{featuredWork.meta}</p>
          </div>
        </article>
        {allArtWorks.map((item, index) => (
          <article key={item.src} className="work-card">
            <button
              type="button"
              className="image-button"
              onClick={() => onOpenLightbox(index + 1)}
              aria-label={`Åbn billede: ${item.title}`}
            >
              <PublicPictureImg
                src={item.src}
                alt={item.alt}
                loading="lazy"
              />
            </button>
            <div className="work-meta">
              <p className="work-title">{item.title}</p>
              <p className="work-details">{item.meta}</p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
