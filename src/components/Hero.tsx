import { ContactForm } from "./ContactForm";
import { PublicPictureImg } from "./PublicPictureImg";

export function Hero() {
  return (
    <section className="hero section container">
      <div className="hero-copy">
        <p className="eyebrow">Aarhus · Kunst / digte / workshopforløb</p>
        <h1>
          Hos mig er der <strong>ingen</strong> der fejler.
          <br />
          Lad os sammen fejre, at kreativiteten altid sejrer.
        </h1>
        <p className="lead">
          Jeg tilbyder workshops og forløb for skoler og organisationer - med
          fokus på tryghed, leg og fællesskab i den kreative proces.
        </p>
        <div className="hero-contact" id="contact">
          <div className="hero-contact-inner">
            <header className="hero-contact-header">
              <p className="hero-contact-kicker">Kontakt</p>
              <h2 className="hero-contact-title">Skriv til mig</h2>
              <p className="hero-contact-intro">
                Skriv en besked, så vender jeg tilbage på e-mail.
              </p>
            </header>
            <ContactForm
              className="contact-form contact-form--hero"
              messageRows={4}
              variant="hero"
            />
          </div>
        </div>
      </div>
      <div className="hero-artwrap">
        <div className="hero-photo-backdrop" aria-hidden="true" />
        <PublicPictureImg
          className="hero-photo"
          src="/images/steffen-studio.jpg"
          alt="Jeg med malerier foran studiefacade"
          width={1536}
          height={2048}
          fetchPriority="high"
        />
      </div>
    </section>
  );
}
