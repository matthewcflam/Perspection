import React, { useEffect, useRef } from "react";
import InstagramLikes from "./InstagramLikes";
import InstagramFollowers from "./InstagramFollowers";
import InstagramMessages from "./InstagramMessages";

export default function InstagramDashboardPages({ dashPage, setDashPage }) {
  const dashboards = [
    <InstagramLikes key="likes" />,
    <InstagramFollowers key="followers" />,
    <InstagramMessages key="messages" />,
  ];

  // --- Swipe tracking ---
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);

  const handleTouchStart = (e) => {
    touchStartX.current = e.changedTouches[0].clientX;
  };

  const handleTouchMove = (e) => {
    touchEndX.current = e.changedTouches[0].clientX;
  };

  const handleTouchEnd = () => {
    const dx = touchEndX.current - touchStartX.current;

    if (Math.abs(dx) < 50) return;

    if (dx < 0 && dashPage < dashboards.length - 1) {
      setDashPage(dashPage + 1); // swipe left → next page
    } else if (dx > 0 && dashPage > 0) {
      setDashPage(dashPage - 1); // swipe right → previous page
    }
  };

  // --- Arrow key navigation ---
  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === "ArrowRight") {
        setDashPage((p) => Math.min(p + 1, dashboards.length - 1));
      } else if (e.key === "ArrowLeft") {
        setDashPage((p) => Math.max(p - 1, 0));
      }
    };

    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [dashPage, dashboards.length, setDashPage]);

  return (
    <div
      className="relative w-full h-full flex overflow-x-auto snap-x snap-mandatory bg-white/10 backdrop-blur-xl shadow-2xl no-scrollbar"
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      {dashboards.map((Component, i) => (
        <div
          key={i}
          className="w-full h-full flex-shrink-0 snap-start"
          style={{ display: i === dashPage ? "block" : "none" }}
        >
          {Component}
        </div>
      ))}

      {/* Arrows for navigation */}
      {dashPage > 0 && (
        <button
          onClick={() => setDashPage((p) => Math.max(p - 1, 0))}
          className="absolute top-1/2 left-4 -translate-y-1/2 text-white text-5xl font-light hover:scale-110 transition z-50"
        >
          ‹
        </button>
      )}

      {dashPage < dashboards.length - 1 && (
        <button
          onClick={() => setDashPage((p) => Math.min(p + 1, dashboards.length - 1))}
          className="absolute top-1/2 right-4 -translate-y-1/2 text-white text-5xl font-light hover:scale-110 transition z-50"
        >
          ›
        </button>
      )}
    </div>
  );
}
