export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="site-footer">
      <div className="container footer-inner">
        <p className="wordmark-xl">Steffen Mark Hansen</p>
        <p className="footer-tag">
          Maleri, tekst og fællesskab i Aarhus - med plads til leg og tryghed.
        </p>
        <nav className="footer-links" aria-label="Footer">
          <a href="#kontakt" className="footer-link">
            E-mail
          </a>
          <a
            href="https://www.instagram.com/stef_e_li/"
            target="_blank"
            rel="noopener noreferrer"
            className="footer-link"
          >
            Instagram
          </a>
          <a href="#kontakt" className="footer-link">
            Kontakt
          </a>
        </nav>
        <p className="footer-meta">{year} · Aarhus</p>
      </div>
    </footer>
  );
}
