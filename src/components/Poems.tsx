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
            Korte uddrag fra skitsebog og scene - linjer der må stå stille og alligevel bevæge
            sig.
          </p>
        </header>
        <div className="poems-stack">
          <blockquote className="pullquote">
            <p>&ldquo;Vi bar farverne ind i rummet, og rummet svarede igen.&rdquo;</p>
          </blockquote>
          <blockquote className="pullquote">
            <p>&ldquo;Når stemmen tør stå stille, begynder linjen at bevæge sig.&rdquo;</p>
          </blockquote>
          <blockquote className="pullquote">
            <p>&ldquo;Ordene blev til spor - ikke for at forklare, men for at blive set.&rdquo;</p>
          </blockquote>
        </div>
      </div>
    </section>
  );
}
