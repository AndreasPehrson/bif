const featuredWork = {
  src: "/images/steffen-studio.jpg",
  alt: "Steffen med tre malerier foran studiefacade",
  title: "Tre stykker i sollys",
  meta: "2024 · Maleri · blandet teknik"
};

const works = [
  {
    src: "/images/steffen-studio-rope-art.jpg",
    alt: "Steffen holder et stort lærred med reb og spray-gradient",
    title: "Reb-figur i gradient",
    meta: "2024 · Lærred · reb og spray"
  },
  {
    src: "/images/steffen-portrait-suit.jpg",
    alt: "Steffen i grøn jakkesæt foran stenmur",
    title: "Portræt (studie)",
    meta: "2023 · Foto · portræt"
  }
];

export function Art() {
  return (
    <section className="section container" id="art">
      <h2>Kunst</h2>
      <p className="section-intro">
        Udvalgte værker og portrætter — korte linjer, klar stemning.
      </p>
      <div className="art-grid">
        <article className="art-feature">
          <img src={featuredWork.src} alt={featuredWork.alt} />
          <div className="work-meta">
            <p className="work-title">{featuredWork.title}</p>
            <p className="work-details">{featuredWork.meta}</p>
          </div>
        </article>
        {works.map((item) => (
          <article key={item.src} className="work-card">
            <img src={item.src} alt={item.alt} loading="lazy" />
            <div className="work-meta">
              <p className="work-title">{item.title}</p>
              <p className="work-details">{item.meta}</p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
