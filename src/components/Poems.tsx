export function Poems() {
  return (
    <section
      className="section poems-section"
      id="digte"
      aria-labelledby="digte-heading"
    >
      <div className="container poems-inner">
        <header className="poems-header">
          <h2 id="digte-heading" className="section-heading">
            Digte
          </h2>
          <p className="section-intro poems-intro">
            Korte uddrag fra digte. 
          </p>
        </header>
        <div className="poems-stack">
          <blockquote className="pullquote">
            <p>
              &ldquo;Havde det da bare været på grund af løgne. Det havde været meget bedre
              end, at vores selvværd ikke tillod os at se hinanden nøgne.&rdquo;
            </p>
          </blockquote>
          <blockquote className="pullquote">
            <p>
              &ldquo;Ved det ene bord er der bølgeskvulp i glassene med det lokale
              bryg. Både humøret og øllet er TOP.&rdquo;
            </p>
          </blockquote>
          <blockquote className="pullquote">
            <p>
              &ldquo;De har nok hele tiden vidst, at flugten fra mord til nord, fra syd
              til fryd, fra rig høst til øst, kilometervis på hest - aldrig ville give
              dem en redningsvest.&rdquo;
            </p>
          </blockquote>
        </div>
      </div>
    </section>
  );
}
