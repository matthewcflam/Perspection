import React from "react";
import ShaderComponents from "./ShaderComponents";

export default function HeroHeader({ stat, title, subtitle, titleStyle }) {
  const scrollDown = () =>
    window.scrollTo({ top: window.innerHeight, behavior: "smooth" });

  return (
    <section className="relative w-full h-screen snap-start flex flex-col items-center justify-center text-white overflow-hidden">

      {/* RANDOM SHADER BACKGROUND */}
      <ShaderComponents />

      {/*GLASS BOX */}
      <div
        className="
          relative z-10 flex flex-col items-center text-center px-10 py-8
          bg-white/20 backdrop-blur-2xl border border-white/30 rounded-3xl shadow-2xl
          max-w-xl
        "
      >
        {stat && (
          <div className="text-7xl sm:text-7xl font-extrabold mb-6 tracking-tight">
            {stat}
          </div>
        )}

        <h1 className="text-3xl sm:text-4xl font-bold mb-4 leading-tight" style={{ fontFamily: 'Aileron' }}>
          {title}
        </h1>

        <p className="text-lg sm:text-xl text-white/80">
          {subtitle}
        </p>
      </div>

      {/* ↓ Scroll Arrow */}
      <button
        onClick={scrollDown}
        className="absolute bottom-10 text-6xl opacity-70 hover:opacity-100 hover:scale-125 transition-all"
      >
        ↓
      </button>
    </section>
  );
}
