import { useState, useEffect, useRef } from "react";

// Components
import RotatingText from "./components/RotatingText";
import GlobalBackground from "./components/GlobalBackground";

import OpenDashboardButton from "./components/OpenDashboardButton";
import GoogleButton from "./components/GoogleButton";
import InstagramButton from "./components/InstagramButton";

import StatCard from "./components/StatCard";
import ActivityCard from "./components/ActivityCard";
import EngagementCard from "./components/EngagementCard";

import CloseDashboardButton from "./components/CloseDashboardButton";
import Stepper, { Step } from "./components/Stepper";

import LightRays from './components/LightRays';
import DashboardPages from "./components/DashboardPages";


export default function App() {
  // Mode: "main" (landing + login) OR "dashboard"
  const [mode, setMode] = useState("main");

  // Scroll container for landing + login
  const scrollContainerRef = useRef(null);
  const prevModeRef = useRef(mode);

  // Dashboard page index: 0 = Stat, 1 = Activity, 2 = Engagement
  const [dashPage, setDashPage] = useState(0);
  const dashScrollRef = useRef(null);
  // For Stepper → fade out → buttons fade in
  const [showButtonsAfterStepper, setShowButtonsAfterStepper] = useState(false);
  const [showButtons, setShowButtons] = useState(false);


  // Smooth scroll between landing (index 0) and login (index 1)
  const scrollToSection = (index) => {
    const el = scrollContainerRef.current;
    if (!el) return;
    const height = el.clientHeight;
    el.scrollTo({ top: index * height, behavior: "smooth" });
  };

  // When leaving dashboard → return to login page instantly
  useEffect(() => {
    if (mode === "main" && prevModeRef.current === "dashboard") {
      requestAnimationFrame(() => {
        const el = scrollContainerRef.current;
        if (!el) return;
        const height = el.clientHeight;
        el.scrollTo({ top: height, behavior: "auto" });
      });
    }
    prevModeRef.current = mode;
  }, [mode]);

  // Dashboard reacts to page index changes
  useEffect(() => {
    if (mode !== "dashboard") return;

    const el = dashScrollRef.current;
    if (!el) return;

    const width = el.clientWidth;
    el.scrollTo({ left: dashPage * width, behavior: "smooth" });
  }, [dashPage, mode]);

  // Dashboard keyboard controls
  useEffect(() => {
    if (mode !== "dashboard") return;

    const handleKey = (e) => {
      if (e.key === "Escape") {
        setMode("main");
      } else if (e.key === "ArrowLeft") {
        setDashPage((p) => Math.max(p - 1, 0));
      } else if (e.key === "ArrowRight") {
        setDashPage((p) => Math.min(p + 1, 2));
      }
    };

    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [mode]);

  return (
    <div className="relative w-full h-screen overflow-hidden">

      {/* GLOBAL BACKGROUND - Only show in main mode */}
      {mode === "main" && (
        <div className="absolute inset-0 -z-10 bg-black">
          <GlobalBackground />
        </div>
      )}

      {/* =====================================================
          MODE: MAIN (LANDING + SIGN-IN)
      ====================================================== */}
      {mode === "main" && (
        <div
          ref={scrollContainerRef}
          className="relative w-full h-full overflow-y-scroll snap-proximity no-scrollbar"
          style={{
            scrollBehavior: 'smooth',
            scrollSnapStop: 'normal'
          }}
        >
          {/* ---------- LANDING PAGE ---------- */}
          <section className="relative w-full h-screen snap-start flex flex-col items-center justify-center text-white gap-10">

            {/* Landing Text with Glass/Shimmer */}
            <div className="flex flex-row items-center justify-center gap-3 text-5xl sm:text-6xl font-bold">
              <span>Perspective.</span>

              {/* <div className="
                relative inline-flex justify-center items-center
                min-w-[300px] px-4 py-1 rounded-xl
                bg-white/10 backdrop-blur-md border border-white/20
                overflow-hidden
              ">
                <div className="absolute inset-0 shimmer-pointer-events-none"></div>

                <RotatingText
                  texts={["statistics", "followers", "messages", "reach", "history"]}
                  mainClassName="text-5xl sm:text-6xl font-bold text-white"
                  staggerDuration={0.08}
                  rotationInterval={3000}
                  initial={{ y: "100%" }}
                  animate={{ y: 0 }}
                  exit={{ y: "-100%" }}
                  splitLevelClassName="overflow-hidden"
                />
              </div>*/}
            </div>

            {/* Down Arrow */}
            <button
              onClick={() => scrollToSection(1)}
              className="text-6xl animate-bounce hover:scale-125 transition"
            >
              ↓
            </button>
          </section>



          {/* ---------- SIGN-IN PAGE ---------- */}
          <section className="
                  relative w-full h-screen snap-start 
                  flex flex-col items-center justify-center 
                  text-white
                ">

            <div className="flex flex-col items-center justify-center">

              {/* STEPPER */}
              <div
                className={`
                        w-[350px] sm:w-[600px]
                        transition-opacity duration-600
                        flex justify-center
                        ${showButtonsAfterStepper ? "opacity-0 pointer-events-none" : "opacity-100"}
                      `}
              >
                <div className="
                        w-full rounded-4xl p-6
                        bg-white/10 backdrop-blur-xl border border-white/20 shadow-xl
                      ">
                  <Stepper
                    initialStep={1}
                    onFinalStepCompleted={() => {
                      setShowButtonsAfterStepper(true);
                      setTimeout(() => setShowButtons(true), 700);
                    }}
                  >
                    <Step>
                      <h2 className="text-xl font-bold mb-2">Welcome!</h2>
                      <p>This short guide explains what our analytics app does.</p>
                    </Step>

                    <Step>
                      <h2 className="text-xl font-bold mb-2">Track Stats</h2>
                      <p>We analyze your followers, activity, and engagement.</p>
                    </Step>

                    <Step>
                      <h2 className="text-xl font-bold mb-2">See Trends</h2>
                      <p>Just upload your data!</p>
                    </Step>

                    <Step>
                      <h2 className="text-xl font-bold mb-2">Get Started</h2>
                      <p>Now you're ready to explore your dashboard!</p>
                    </Step>
                  </Stepper>
                </div>
              </div>

              {/* BUTTONS */}
              <div
                className={`
                        -mt-28 flex flex-col gap-6 w-[300px]
                        transition-opacity duration-700
                        ${showButtons ? "opacity-100" : "opacity-0 pointer-events-none"}
                      `}
              >
                <OpenDashboardButton
                  onOpen={() => {
                    setDashPage(0);
                    setMode("dashboard");
                  }}
                />

                <OpenDashboardButton
                  onOpen={() => {
                    setDashPage(0);
                    setMode("dashboard");
                  }}
                />

                <GoogleButton onPress={() => console.log("Google login")} />
                <InstagramButton onPress={() => console.log("Instagram login")} />
              </div>

            </div>
          </section>
        </div>
      )}

      {/* =====================================================
          MODE: DEMO DASHBOARD
      ====================================================== */}
      {mode === "dashboard" && (
        <div className="relative w-full h-full bg-gray-900">
          {/* Dashboard Background - separate from main */}
          <div className="absolute inset-0 -z-10 bg-gradient-to-br from-gray-900 via-gray-800 to-black"></div>
          
          {/* Close button */}
          <button 
            className="absolute top-4 right-4 z-50 text-white/80 hover:text-white transition"
            onClick={() => setMode("main")}
          >
            ✕ Close
          </button>
          
          <div className="relative z-10 w-full h-full flex flex-col items-center justify-center px-4">
            <DashboardPages dashPage={dashPage} setDashPage={setDashPage} />
          </div>
        </div>
      )}
      
      {/* =====================================================
          MODE: INSTAGRAM DASHBOARD
      ====================================================== */}
      {mode === "Instagram" && (
        <div className="relative w-full h-full bg-gray-900">
          {/* Dashboard Background - separate from main */}
          <div className="absolute inset-0 -z-10 bg-gradient-to-br from-gray-900 via-gray-800 to-black"></div>
          
          {/* Close button */}
          <button 
            className="absolute top-4 right-4 z-50 text-white/80 hover:text-white transition"
            onClick={() => setMode("main")}
          >
            ✕ Close
          </button>
          
          <div className="relative z-10 w-full h-full flex flex-col items-center justify-center px-4">
            <DashboardPages dashPage={dashPage} setDashPage={setDashPage} />
          </div>
        </div>
      )}

      {/* =====================================================
          MODE: INSTAGRAM STATS
      ====================================================== */}

      {mode === "InstagramStats" && (
        <div className="relative w-full h-full bg-gray-900">
          {/* Dashboard Background - separate from main */}
          <div className="absolute inset-0 -z-10 bg-gradient-to-br from-gray-900 via-gray-800 to-black"></div>
          
          {/* Close button */}
          <button 
            className="absolute top-4 right-4 z-50 text-white/80 hover:text-white transition"
            onClick={() => setMode("main")}
          >
            ✕ Close
          </button>
          
          <div className="relative z-10 w-full h-full flex flex-col items-center justify-center px-4">
            <DashboardPages dashPage={dashPage} setDashPage={setDashPage} />
          </div>
        </div>
      )}

    </div>
  );
}
