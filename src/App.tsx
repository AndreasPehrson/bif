import { useState } from "react";
import { About } from "./components/About";
import { Art, artLightboxImages } from "./components/Art";
import { Footer } from "./components/Footer";
import { Hero } from "./components/Hero";
import { Lightbox, LightboxImage } from "./components/Lightbox";
import { Nav } from "./components/Nav";
import { Poems } from "./components/Poems";
import { Process, processLightboxImages } from "./components/Process";
import { Workshops } from "./components/Workshops";

function App() {
  const combinedLightboxImages: LightboxImage[] = [
    ...artLightboxImages,
    ...processLightboxImages
  ];
  const [activeImageIndex, setActiveImageIndex] = useState<number | null>(null);

  function openLightbox(index: number) {
    setActiveImageIndex(index);
  }

  function closeLightbox() {
    setActiveImageIndex(null);
  }

  function showNextImage() {
    if (activeImageIndex === null) return;
    setActiveImageIndex((activeImageIndex + 1) % combinedLightboxImages.length);
  }

  function showPreviousImage() {
    if (activeImageIndex === null) return;
    setActiveImageIndex(
      (activeImageIndex - 1 + combinedLightboxImages.length) %
        combinedLightboxImages.length
    );
  }

  return (
    <div className="app-shell" id="top">
      <Nav />
      <main>
        <Hero />
        <About />
        <Art onOpenLightbox={(index) => openLightbox(index)} />
        <Process
          onOpenLightbox={(index) => openLightbox(artLightboxImages.length + index)}
        />
        <Poems />
        <Workshops />
      </main>
      <Footer />
      {activeImageIndex !== null ? (
        <Lightbox
          images={combinedLightboxImages}
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
