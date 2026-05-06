import { ContactForm } from "./ContactForm";

export function KontaktSection() {
  return (
    <section className="kontakt-section" id="kontakt" aria-labelledby="kontakt-heading">
      <div className="container kontakt-inner">
        <header className="kontakt-header">
          <p className="contact-kicker">Kontakt</p>
          <h2 id="kontakt-heading" className="kontakt-headline">
            Skriv til mig - jeg læser det <em>selv</em>
          </h2>
        </header>
        <div
          className="trust-lines"
          role="region"
          aria-label="Praktisk om henvendelser og svartid"
        >
          <p>
            <strong>Steffen Mark Hansen</strong> - det er mig, der læser og svarer, når du skriver
            her. Ingen mellemled.
          </p>
          <p>
            Skriv gerne, også med en løs idé eller et enkelt spørgsmål. Vi kan tage den
            uforpligtende først.
          </p>
          <p>
            Jeg svarer som regel inden for et par hverdage på mail. Hjemmebase er Aarhus -
            samarbejder gerne landet rundt.
          </p>
        </div>
        <div className="contact-panel">
          <ContactForm />
        </div>
      </div>
    </section>
  );
}
