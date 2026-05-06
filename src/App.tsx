import { useState } from "react";
import { Art, artLightboxImages } from "./components/Art";
import { Footer } from "./components/Footer";
import { Hero } from "./components/Hero";
import { KontaktSection } from "./components/KontaktSection";
import { Lightbox } from "./components/Lightbox";
import { Nav } from "./components/Nav";
import { Poems } from "./components/Poems";
import { GoogleAnalytics } from "./components/GoogleAnalytics";

function App() {
  const [activeImageIndex, setActiveImageIndex] = useState<number | null>(null);

  function openLightbox(index: number) {
    setActiveImageIndex(index);
  }

  function closeLightbox() {
    setActiveImageIndex(null);
  }

  function showNextImage() {
    if (activeImageIndex === null) return;
    setActiveImageIndex((activeImageIndex + 1) % artLightboxImages.length);
  }

  function showPreviousImage() {
    if (activeImageIndex === null) return;
    setActiveImageIndex(
      (activeImageIndex - 1 + artLightboxImages.length) % artLightboxImages.length
    );
  }

  return (
    <div className="app-shell" id="top">
      <a href="#main-content" className="skip-link">
        Spring til indhold
      </a>
      <Nav />
      <GoogleAnalytics />
      <main id="main-content" tabIndex={-1}>
        <Hero />
        <KontaktSection />
        <Art onOpenLightbox={(index) => openLightbox(index)} />
        <Poems />
      </main>
      <Footer />
      {activeImageIndex !== null ? (
        <Lightbox
          images={artLightboxImages}
          activeIndex={activeImageIndex}
          onClose={closeLightbox}
          onNext={showNextImage}
          onPrev={showPreviousImage}
        />
      ) : null}
    </div>
  );
}

export default App;
