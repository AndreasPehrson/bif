import { About } from "./components/About";
import { Art } from "./components/Art";
import { Contact } from "./components/Contact";
import { Footer } from "./components/Footer";
import { Hero } from "./components/Hero";
import { Nav } from "./components/Nav";
import { Poems } from "./components/Poems";
import { Process } from "./components/Process";
import { Workshops } from "./components/Workshops";

function App() {
  return (
    <div className="app-shell" id="top">
      <Nav />
      <main>
        <Hero />
        <About />
        <Art />
        <Process />
        <Poems />
        <Workshops />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}

export default App;
