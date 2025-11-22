// src/components/Board.jsx
import React, { useEffect, useRef } from "react";

const Board = ({ children, activeSlide = 0 }) => {
  const scrollRef = useRef(null);

  // auto-scroll to the active slide when activeSlide changes
  useEffect(() => {
    const container = scrollRef.current;
    if (!container) return;
    const width = container.clientWidth;
    container.scrollTo({
      left: activeSlide * width,
      behavior: "smooth",
    });
  }, [activeSlide]);

  const scrollByOne = (dir) => {
    const container = scrollRef.current;
    if (!container) return;
    const width = container.clientWidth;
    container.scrollBy({
      left: dir === "next" ? width : -width,
      behavior: "smooth",
    });
  };

  return (
    <section className="min-h-screen w-screen flex justify-center items-center px-4 py-8">
      {/* Inner container keeps content centered and not too wide */}
      <div className="relative flex items-center w-full max-w-6xl gap-4">
        {/* Left arrow */}
        <button
          type="button"
          onClick={() => scrollByOne("prev")}
          className="hidden md:flex items-center justify-center rounded-full bg-white/20 text-white text-3xl w-10 h-10"
        >
          ‹
        </button>

        {/* Scrollable horizontal strip */}
        <div
          ref={scrollRef}
          className="flex w-full overflow-x-auto scroll-smooth snap-x snap-mandatory border border-white/30 rounded-lg bg-slate-900/80"
        >
          {React.Children.map(children, (child, index) => (
            <div
              key={index}
              className="snap-start shrink-0 w-full h-full px-4 py-8"
            >
              {child}
            </div>
          ))}
        </div>

        {/* Right arrow */}
        <button
          type="button"
          onClick={() => scrollByOne("next")}
          className="hidden md:flex items-center justify-center rounded-full bg-white/20 text-white text-3xl w-10 h-10"
        >
          ›
        </button>
      </div>
    </section>
  );
};

export default Board;
