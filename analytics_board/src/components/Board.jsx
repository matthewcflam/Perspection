import React, { useRef } from "react";

const Board = ({ children }) => {
  const scrollRef = useRef(null);

  const scroll = (dir) => {
    const container = scrollRef.current;
    if (!container) return;

    const width = container.clientWidth; // one full “page”
    container.scrollBy({
      left: dir === "next" ? width : -width,
      behavior: "smooth",
    });
  };

  return (
    <section className="min-h-screen flex flex-col justify-center px-4 py-12">
      <div className="relative flex items-center gap-4">
        {/* Left arrow */}
        <button
          type="button"
          onClick={() => scroll("prev")}
          className="hidden md:flex items-center justify-center rounded-full bg-black/50 text-white text-3xl w-10 h-10"
        >
        </button>

        {/* Horizontal strip */}
        <div
          ref={scrollRef}
          className="flex overflow-x-auto scroll-smooth snap-x snap-mandatory w-full"
        >
          {React.Children.map(children, (child, i) => (
            <div
              key={i}
              className="snap-start shrink-0 w-full px-2"
            >
              {child}
            </div>
          ))}
        </div>

        {/* Right arrow */}
        <button
          type="button"
          onClick={() => scroll("next")}
          className="hidden md:flex items-center justify-center rounded-full bg-black/50 text-white text-3xl w-10 h-10"
        >
        </button>
      </div>
    </section>
  );
};

export default Board;