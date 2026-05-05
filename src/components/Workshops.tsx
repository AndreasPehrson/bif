const offerings = [
  {
    title: "Farveleg og samarbejde",
    outcomes:
      "Deltagere skaber sammen — udtrykker sig med farver og bygger tryghed i gruppen.",
    logistics:
      "Varighed: 90–120 min · gruppe: ca. 12–24 · lokation: hos jer eller aftalt lokale"
  },
  {
    title: "Ord, stemme og lærred",
    outcomes:
      "Korte skrive- og taleøvelser koblet til billedligt arbejde — perfekt til klasser og teams.",
    logistics:
      "Varighed: 2–3 timer · gruppe: ca. 10–20 · materiale: kan medbringes"
  },
  {
    title: "Fælles udtryk (væg / proces)",
    outcomes:
      "Et fælles udtryk vokser frem over tid — godt til institutionsforløb og projektuger.",
    logistics:
      "Format: forløb eller heldags · gruppe: efter aftale · kan kombineres med opsamling"
  }
];

export function Workshops() {
  return (
    <section className="workshops section" id="workshops">
      <div className="workshops-bg" aria-hidden="true" />
      <div className="container workshops-content">
        <p className="eyebrow">Fremhævet</p>
        <h2>Workshops med Steffen</h2>
        <p className="lead">
          Workshopforløb til skoler og organisationer — med klare rammer,
          plads til leg og konkrete udbytter for gruppen.
        </p>
        <div className="workshop-cards">
          {offerings.map((offering) => (
            <article key={offering.title}>
              <h3>{offering.title}</h3>
              <p className="workshop-outcome">{offering.outcomes}</p>
              <p className="workshop-logistics">{offering.logistics}</p>
              <a href="#contact" className="text-link">
                Send forespørgsel
              </a>
            </article>
          ))}
        </div>
        <a href="#contact" className="btn btn-primary">
          Forespørg workshop til jeres institution
        </a>
      </div>
    </section>
  );
}
