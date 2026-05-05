import { LightboxImage } from "./Lightbox";
import { PublicPictureImg } from "./PublicPictureImg";

const processImages = [
  {
    src: "/images/process-outdoor-table.jpg",
    alt: "Udendørs arbejdsbord med maleri og materialer",
    caption: "Udendørs maleri på picnicbord"
  },
  {
    src: "/images/process-courtyard-spray.jpg",
    alt: "Spraymaling og studiofacade med teksten KUNST",
    caption: "Spray og stemning på væggen"
  },
  {
    src: "/images/process-pink-canvas.jpg",
    alt: "Pink og neongrønt lærred i arbejde",
    caption: "Farve, form og nærvær"
  },
  {
    src: "/images/process-hand-canvas.jpg",
    alt: "Spraytest på mørkt lærred med håndmotiv",
    caption: "Materiale og tilfældighed"
  }
];

const extraProcessImages = [
  {
    src: "/images/steffen-gallery-09.jpg",
    alt: "Publikum i cafe under oplæsning eller præsentation",
    caption: "Oplæsning i cafe-rum"
  },
  {
    src: "/images/steffen-gallery-10.jpg",
    alt: "Vernissage i vinbutik med værker på væggen",
    caption: "Vernissage i vinbutik"
  },
  {
    src: "/images/steffen-gallery-11.jpg",
    alt: "Maleri på staffeli med to figur-silhuetter i gennemgang",
    caption: "Figurer på staffeli"
  },
  {
    src: "/images/steffen-gallery-12.jpg",
    alt: "Rødt maleri på staffeli med sorte stregformer i atelier",
    caption: "Rødt lærred i atelier"
  },
  {
    src: "/images/steffen-gallery-13.jpg",
    alt: "Orange maleri med dryp hængt op mod murstensvæg",
    caption: "Orange dryp mod mur"
  },
  {
    src: "/images/steffen-gallery-14.jpg",
    alt: "Spraydåse i forgrunden og snore i gårdrum ved atelier",
    caption: "Spray og snore i gården"
  },
  {
    src: "/images/steffen-gallery-15.jpg",
    alt: "Mørkt lærred med snore og røde trekantformer",
    caption: "Snoreværk på mørk bund"
  },
  {
    src: "/images/steffen-gallery-16.jpg",
    alt: "Udendørs arbejdsbord med lærred, maling og skygger",
    caption: "Udendørs arbejdsbord"
  },
  {
    src: "/images/steffen-gallery-17.jpg",
    alt: "Publikum til fernisering i vinbutik med værker på væggen",
    caption: "Fernisering med publikum"
  }
];

const allProcessImages = [...processImages, ...extraProcessImages];

export const processLightboxImages: LightboxImage[] = allProcessImages.map((item) => ({
  src: item.src,
  alt: item.alt,
  caption: item.caption
}));

type ProcessProps = {
  onOpenLightbox: (index: number) => void;
};

export function Process({ onOpenLightbox }: ProcessProps) {
  return (
    <section className="section container" id="process">
      <h2>Proces</h2>
      <p className="section-intro">
        Små glimt fra mit arbejde bag kulissen - spray, farver og hænder i
        bevægelse.
      </p>
      <div className="process-strip">
        {allProcessImages.map((item, index) => (
          <figure key={item.src} className="process-card">
            <button
              type="button"
              className="image-button"
              onClick={() => onOpenLightbox(index)}
              aria-label={`Åbn billede: ${item.caption}`}
            >
              <PublicPictureImg
                src={item.src}
                alt={item.alt}
                loading="lazy"
              />
            </button>
            <figcaption>{item.caption}</figcaption>
          </figure>
        ))}
      </div>
    </section>
  );
}
