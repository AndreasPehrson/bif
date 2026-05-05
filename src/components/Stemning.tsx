/**
 * Full-bleed mood section: street photo + terracotta overlay (same visual as the old bottom band).
 */
export function Stemning() {
  return (
    <section className="stemning section section-feature" id="stemning">
      <div className="stemning-bg" aria-hidden="true" />
      <div className="container stemning-content">
        <p className="eyebrow">Ude i byen</p>
        <h2>Stemning</h2>
        <p className="lead">
          Samarbejder og projekter aftales fra gang til gang. Skriv gerne, hvis du vil tale om
          et rum eller en idé.
        </p>
        <a href="#contact" className="btn btn-ghost stemning-cta">
          Skriv til mig
        </a>
      </div>
    </section>
  );
}
