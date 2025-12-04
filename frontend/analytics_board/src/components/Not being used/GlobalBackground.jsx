import { useState, useEffect } from "react";
import Dither from "../Dither";

export default function GlobalBackground() {
  const [color, setColor] = useState([0.3, 0.2, 0.1]);
  const [amp, setAmp] = useState(0.25);      // animated wave amplitude
  const [freq, setFreq] = useState(5);       // animated wave frequency
  const [t, setT] = useState(0);

  useEffect(() => {
    // update every ~16ms (~60fps)
    const interval = setInterval(() => {
      setT((prev) => prev + 0.015);
    }, 16);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const min = 0.2;
    const max = 0.3;

    const osc = (offset) =>
      min + (max - min) * (0.5 + 0.5 * Math.sin(t + offset));

    // smoothly animated wave colors
    setColor([osc(0), osc(1.3), osc(2.1)]);

    // smoothly animate wave amplitude (0.2 → 0.4)
    setAmp(0.2 + 0.2 * (0.5 + 0.5 * Math.sin(t * 0.7)));

    // smoothly animate wave frequency (4 → 7)
    setFreq(4 + 3 * (0.5 + 0.5 * Math.sin(t * 0.45 + 2)));
  }, [t]);

  return (
    <Dither
      waveColor={color}
      waveAmplitude={amp}   // 🔥 dynamic
      waveFrequency={3}  // 🔥 dynamic
      waveSpeed={0.13}
      colorNum={2.7}
      disableAnimation={false}
      enableMouseInteraction={true}
      mouseRadius={0.2}
    />
  );
}
