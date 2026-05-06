const navItems = [
  { href: "#kunst", label: "Kunst" },
  { href: "#digte", label: "Digte" },
  { href: "#kontakt", label: "Kontakt" }
];

export function Nav() {
  return (
    <header className="site-nav">
      <div className="container nav-inner">
        <a href="#top" className="wordmark">
          Steffen Mark Hansen
        </a>
        <nav aria-label="Primær">
          <ul className="nav-list">
            {navItems.map((item) => (
              <li key={item.href}>
                <a href={item.href}>{item.label}</a>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  );
}
