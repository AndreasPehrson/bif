type WorkshopFact = { label: string; value: string };

type Offering = {
  title: string;
  outcomes: string;
  facts: WorkshopFact[];
};

const offerings: Offering[] = [
  {
    title: "Farveleg og samarbejde",
    outcomes:
      "Deltagere skaber sammen - udtrykker sig med farver og bygger tryghed i gruppen.",
    facts: [
      { label: "Varighed", value: "90-120 min" },
      { label: "Gruppe", value: "ca. 12-24" },
      { label: "Sted", value: "Hos jer eller aftalt lokale" }
    ]
  },
  {
    title: "Ord, stemme og lærred",
    outcomes:
      "Korte skrive- og taleøvelser koblet til billedligt arbejde - perfekt til klasser og teams.",
    facts: [
      { label: "Varighed", value: "2-3 timer" },
      { label: "Gruppe", value: "ca. 10-20" },
      { label: "Materiale", value: "Kan medbringes" }
    ]
  },
  {
    title: "Fælles udtryk (væg / proces)",
    outcomes:
      "Et fælles udtryk vokser frem over tid - godt til institutionsforløb og projektuger.",
    facts: [
      { label: "Format", value: "Forløb eller heldags" },
      { label: "Gruppe", value: "Efter aftale" },
      { label: "Ekstra", value: "Kan kombineres med opsamling" }
    ]
  }
];

export function Workshops() {
  return (
    <section className="workshops section section-feature" id="workshops">
      <div className="workshops-bg" aria-hidden="true" />
      <div className="container workshops-content">
        <p className="eyebrow">Fremhævet</p>
        <h2>Workshops med mig</h2>
        <p className="lead">
          Mine workshopforløb til skoler og organisationer - med klare rammer,
          plads til leg og konkrete udbytter for gruppen.
        </p>
        <div className="workshop-cards">
          {offerings.map((offering) => (
            <article key={offering.title}>
              <h3>{offering.title}</h3>
              <p className="workshop-outcome">{offering.outcomes}</p>
              <dl className="workshop-facts">
                {offering.facts.map((fact) => (
                  <div key={fact.label} className="workshop-fact">
                    <dt>{fact.label}</dt>
                    <dd>{fact.value}</dd>
                  </div>
                ))}
              </dl>
            </article>
          ))}
        </div>
        <a href="#contact" className="btn btn-ghost workshops-cta">
          Skriv til mig
        </a>
        <p className="workshops-note">Svar typisk inden for 1-2 hverdage.</p>
      </div>
    </section>
  );
}
