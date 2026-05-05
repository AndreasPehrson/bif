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

export function Process() {
  return (
    <section className="section container" id="process">
      <h2>Proces</h2>
      <p className="section-intro">
        Små glimt fra arbejdet bag kulissen — spray, farver og hænder i bevægelse.
      </p>
      <div className="process-strip">
        {processImages.map((item) => (
          <figure key={item.src} className="process-card">
            <img src={item.src} alt={item.alt} loading="lazy" />
            <figcaption>{item.caption}</figcaption>
          </figure>
        ))}
      </div>
    </section>
  );
}
