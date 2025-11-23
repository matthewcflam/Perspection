import React, { useState } from "react";

const StatsPopupBoard = ({ title, pages, onClose }) => {
  const [index, setIndex] = useState(0);
  const total = pages.length;
  const current = pages[index];

  const handlePanelClick = (e) => {
    e.stopPropagation(); // don't close when clicking inside

    const rect = e.currentTarget.getBoundingClientRect();
    const clickX = e.clientX - rect.left;

    // LEFT 1/3 = previous
    if (clickX < rect.width * 0.33) {
      if (index > 0) setIndex(index - 1);
      return;
    }

    // RIGHT 2/3 = next
    if (clickX > rect.width * 0.33) {
      if (index < total - 1) setIndex(index + 1);
      return;
    }
  };

  return (
    // click on overlay closes
    <div
      className="fixed inset-0 z-40 bg-black/60 flex items-center justify-center"
      onClick={onClose}
    >
      {/* POPUP PANEL */}
      <div
        className="relative w-full max-w-[1400px] h-[700px] bg-slate-900 rounded-3xl p-10 shadow-2xl overflow-y-auto cursor-pointer"
        onClick={handlePanelClick}
      >
        {/* Header text (give a little right padding so it doesn't clash with X) */}
        <div className="mb-4 pr-10">
          <h3 className="text-lg font-semibold text-white">{title}</h3>
          <p className="text-xs text-gray-400">
            Page {index + 1} of {total}
          </p>
        </div>

        {/* X button in the top-right corner */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            onClose();
          }}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-200 text-lg leading-none px-2"
          aria-label="Close"
        >
          ×
        </button>

        {/* Page content */}
        <div className="mb-6">
          {current.content}
        </div>

        {/* Dots pinned to the very bottom center */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2">
          <div className="flex gap-1">
            {pages.map((_, i) => (
              <span
                key={i}
                className={`h-2 w-2 rounded-full ${
                  i === index ? "bg-sky-500" : "bg-slate-600"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default StatsPopupBoard;