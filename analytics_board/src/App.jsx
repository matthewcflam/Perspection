import { useState } from "react";
import NavBar from "./components/NavBar";
import Board from "./components/Board";

import InstagramUpload from "./components/InstagramUpload";
import InstagramMessages from "./components/InstagramMessages";
import InstagramLikes from "./components/InstagramLikes";
import InstagramFollow from "./components/InstagramFollow";

const App = () => {
  const [instaData, setInstaData] = useState(null);
  const [activeSlide, setActiveSlide] = useState(0);

  const handleUploadComplete = (data) => {
    setInstaData(data);
    setActiveSlide(1);       // jump to slide 2 once upload is done
  };

  return (
    <div className="min-h-screen w-screen overflow-x-hidden antialiased bg-slate-950">
      {/* background image, stays behind everything */}
      <div className="bg-image fixed inset-0 bg-cover bg-fixed bg-center -z-10" />

      {/* navbar on top */}
      <header className="sticky top-0 z-20">
        <NavBar />
      </header>

      {/* main content: your board(s) */}
      <main className="relative z-10">
        {/* ===== INSTAGRAM BOARD ===== */}
        <Board activeSlide={activeSlide}>
          {/* Slide 1: upload – always visible */}
          <section className="h-full w-full flex items-center justify-center">
            <InstagramUpload onUploadComplete={handleUploadComplete} />
          </section>

          {/* Slide 2: only after data is ready */}
          {instaData && (
            <section className="h-full w-full flex items-center justify-center">
              <InstagramMessages data={instaData} />
            </section>
          )}

          {/* Slide 3: also only after data is ready */}
          {instaData && (
            <section className="h-full w-full flex items-center justify-center">
              <InstagramLikes data={instaData} />
            </section>
          )}
        </Board>

        {/* Later you can stack more boards here:
           <Board>...</Board>
           <Board>...</Board>
        */}
      </main>
    </div>
  );
};

export default App;
