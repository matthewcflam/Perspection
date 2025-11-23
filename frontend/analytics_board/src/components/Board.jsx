// src/components/Board.jsx
import React from "react";

const Board = ({ children }) => {
  return (
    <div
      className="
        w-screen h-screen
        overflow-x-scroll overflow-y-hidden
        flex
        snap-x snap-mandatory
        scroll-smooth
        [scrollbar-width:none]
        [&::-webkit-scrollbar]:hidden
      "
    >
      {React.Children.map(children, (child, index) => (
        <section
          key={index}
          className="w-screen h-screen flex-shrink-0 snap-start"
        >
          {child}
        </section>
      ))}
    </div>
  );
};

export default Board;
