export function Footer() {
  return (
    <footer className="site-footer">
      <div className="container footer-inner">
        <p className="tag">STEFE LI</p>
        <p>Steffen Mark Hansen</p>
        <p>{new Date().getFullYear()}</p>
        <p className="footer-links">
          <a href="#">Instagram</a>
          <a href="mailto:hello@example.com">E-mail</a>
        </p>
      </div>
    </footer>
  );
}
