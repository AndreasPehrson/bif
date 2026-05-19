import { assetUrl } from "../assetUrl";
import { PublicPictureImg } from "./PublicPictureImg";

export function Hero() {
  return (
    <section className="top-split-section" aria-labelledby="hero-heading">
      <div className="container">
        <div className="hero-split-grid">
          <div className="hero-split-media">
            <div className="hero-split-tilt">
              <div className="editorial-frame editorial-frame--hero-split">
                <PublicPictureImg
                  src={assetUrl("/images/steffen-street.jpg")}
                  alt="Steffen i port med malerier foran murstensfacade i sollys"
                  width={1536}
                  height={2048}
                  layout="heroColumn"
                  fetchPriority="high"
                  loading="eager"
                />
              </div>
            </div>
          </div>

          <div className="hero-split-content">
            <h1 id="hero-heading" className="display-hero">
              Hos mig er der <strong>ingen</strong> der fejler.
              <br />
              Lad os sammen fejre, at kreativiteten altid sejrer.
            </h1>
            <p className="lead-editorial">
              Jeg arbejder med maleri, tekst og fællesskab - i rum, hvor tryghed og leg må få
              plads i den kreative proces.
            </p>
            <p className="lead-editorial">
              Jeg tilbyder også kreative workshops til skoler, institutioner og andre som søger sparring i den kreative verden. 
            </p>
            <p className="hero-cta">
              <a href="#kontakt" className="link-quiet hero-cta-link">
                Kontakt mig<span className="visually-hidden"> (spring til kontakt)</span>
              </a>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
