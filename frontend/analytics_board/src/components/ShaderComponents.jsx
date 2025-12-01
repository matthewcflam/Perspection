import React, { useMemo } from "react";
import Dither from "./Dither";
import ColorBends from "./ColorBends";
import PrismaticBurst from "./PrismaticBurst";
import Iridescence from "./Iridescence";
import LiquidChrome from "./LiquidChrome"; 

// Pick a random item from array
function pick(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

export default function ShaderComponents() {
  // Pick 1 shader ON MOUNT ONLY
  const selected = useMemo(
    () =>
      pick([
        <Dither key="dither" />,

        <ColorBends
          key="colorbends"
          colors={[
            "#ff0040",
            "#ffa500",
            "#ffff00",
            "#00ff90",
            "#00c0ff",
            "#8000ff",
          ]}
        />,

        <PrismaticBurst
          key="burst"
          colors={[
            "#ff1a75",
            "#ff8000",
            "#fff500",
            "#00ffaa",
            "#00aaff",
            "#c300ff",
          ]}
        />,

        <Iridescence key="iridescence" color={[1, 1, 1]} speed={1.2} />,

        <LiquidChrome
          key="chrome"           // 👈 NEW SHADER
          baseColor={[0.4, 0.4, 0.5]}
          speed={0.25}
          amplitude={0.5}
          frequencyX={3}
          frequencyY={2}
          interactive={true}
        />,
      ]),
    []
  );

  return (
    <div
      className="absolute inset-0 w-full h-full -z-10"
      style={{
        opacity: 0.50, // so it doesnt burn your eyes
      }}
    >
      {selected}
    </div>
  );
}
