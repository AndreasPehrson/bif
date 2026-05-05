export function Hero() {
  return (
    <section className="hero section container">
      <div>
        <p className="eyebrow">København · Kunst / digte / workshopforløb</p>
        <h1>
          Hos mig er der <strong>ingen</strong> der fejler.
          <br />
          Lad os sammen fejre, at kreativiteten altid sejrer.
        </h1>
        <p className="lead">
          Workshops og forløb for skoler og organisationer — med fokus på
          tryghed, leg og fællesskab i den kreative proces.
        </p>
        <div className="org-strip" id="orgs">
          <p className="org-strip-title">For skoler og organisationer</p>
          <ul className="org-bullets">
            <li>Klar struktur, tryg ramme og hands-on øvelser</li>
            <li>Tilpasses målgruppe, tid og lokation</li>
            <li>Forespørgsel og planlægning via e-mail</li>
          </ul>
        </div>
        <div className="hero-cta">
          <a href="#contact" className="btn btn-primary">
            Kontakt mig
          </a>
        </div>
      </div>
      <div className="hero-artwrap">
        <div className="hero-photo-backdrop" aria-hidden="true" />
        <img
          className="hero-photo"
          src="/images/steffen-studio.jpg"
          alt="Steffen Mark Hansen med malerier foran studiefacade"
        />
      </div>
    </section>
  );
}
