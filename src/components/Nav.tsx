const navItems = [
  { href: "#about", label: "Om" },
  { href: "#art", label: "Kunst" },
  { href: "#process", label: "Proces" },
  { href: "#poems", label: "Digte" },
  { href: "#workshops", label: "Workshops" },
  { href: "#contact", label: "Kontakt" }
];

export function Nav() {
  return (
    <header className="site-nav">
      <div className="container nav-inner">
        <a href="#top" className="wordmark">
          Steffen Mark Hansen
        </a>
        <nav>
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
