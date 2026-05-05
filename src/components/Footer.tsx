export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="site-footer">
      <div className="container footer-inner">
        <p className="footer-eyebrow">Kunst · Forløb · Aarhus</p>
        <p className="footer-name">Steffen Mark Hansen</p>
        <p className="footer-meta">
          {year} · Aarhus
        </p>
        <nav className="footer-links" aria-label="Footer">
          <a
            href="https://www.instagram.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="footer-link"
          >
            Instagram
          </a>
          <a href="#contact" className="footer-link">
            Kontakt
          </a>
        </nav>
      </div>
    </footer>
  );
}
