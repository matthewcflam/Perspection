import React from "react";

export default function HeroHeader({ title, subtitle }) {
  // low opacity, always present, no scroll logic
  const ARROW_OPACITY = 0.35;  // adjust 0 → 1
  const ARROW_VERTICAL_POSITION = "60%"; // move higher so it disappears once you scroll

  const scrollDown = () => {
    window.scrollTo({
      top: window.innerHeight,
      behavior: "smooth",
    });
  };

  return (
    <section className="relative w-full h-screen snap-start flex flex-col items-center justify-center text-white gap-10">
      {/* Bounce keyframes */}
      <style>{`
        @keyframes bounceArrow {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(12px); }
        }
      `}</style>

      <div className="flex flex-row items-center justify-center gap-3 text-5xl sm:text-6xl font-bold">
        
        {/* BG filler */}
        <div
          className="relative w-full bg-black overflow-y-visible"
          style={{ minHeight: "100vh", paddingBottom: "50vh" }}
        ></div>

        {/* Title */}
        <div className="absolute inset-0 flex top-1/4 justify-center z-10">
          <h1
            className="text-6xl font-bold text-white drop-shadow-lg text-center"
            style={{ fontFamily: "Aileron" }}
          >
            {title}
          </h1>
        </div>

        {/* Divider */}
        <div className="absolute inset-0 flex top-[45%] justify-center z-10">
          <div className="w-24 h-px bg-white mb-4"></div>
        </div>

        {/* Subtitle */}
        <div className="absolute inset-0 flex top-1/2 justify-center z-10">
          <h1
            className="text-2xl text-white/80 drop-shadow-lg text-center w-120"
            style={{ fontFamily: "Aileron" }}
          >
            {subtitle}
          </h1>
        </div>

        {/* Down Arrow – low opacity + bounce */}
        <div
          className="absolute inset-0 flex justify-center z-10"
          style={{ top: ARROW_VERTICAL_POSITION }}
        >
          <button
            onClick={scrollDown}
            className="text-6xl text-white hover:scale-125 transition-transform duration-300"
            style={{
              opacity: ARROW_OPACITY,
              animation: "bounceArrow 1.3s infinite ease-in-out",
            }}
          >
            ↓
          </button>
        </div>
      </div>
    </section>
  );
}
