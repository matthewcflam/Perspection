// StatsButtonBox.jsx
import React from "react";

export default function StatsButtonBox({ onClick }) {
  return (
    <div
      onClick={onClick}
      className="
        relative w-64 h-64 cursor-pointer rounded-3xl 
        border-2 border-white/40   /* same outer border as UploadBox */
        bg-white/30 backdrop-blur-lg 
        shadow-lg flex flex-col items-center justify-center text-center p-6
        transition-all duration-300 hover:bg-white/40 overflow-hidden
      "
    >

      {/* shiny sweep animation */}
      <div
        className="
          absolute inset-0 z-10
          before:content-[''] before:absolute before:top-0 before:left-[-150%]
          before:w-[120%] before:h-full
          before:bg-gradient-to-r before:from-transparent before:via-white/20 before:to-transparent
          before:skew-x-12 before:animate-shimmer
          pointer-events-none
        "
      ></div>

      {/* <span className="text-3xl font-bold text-gray-200 drop-shadow-lg z-20">
        Run the numbers.
      </span>

      <span className="text-xs mt-4 text-gray-300/70 tracking-wide z-20">
        (Click here to see your data!)
      </span> */}
    
    <div className="flex flex-col items-center z-10">
        <img src="favicon.png" className="w-20 h-20 mb-2"/>
          <>
            <span className="text-xl font-semibold mt-1">Finally. Perspection.</span>
            <span className="text-sm opacity-70">
              Click here to see your data
            </span>
          </>
      </div> 

    </div>
  );
}
