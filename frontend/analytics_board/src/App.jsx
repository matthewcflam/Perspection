import { useState, useEffect, useRef } from "react";

// Components
import RotatingText from "./components/RotatingText";
import GlobalBackground from "./components/GlobalBackground";


import Stepper, { Step } from "./components/Stepper";

import GoogleDashboardPages from "./components/YOUTUBE_Pages/GoogleDashboardPages";
import InstagramDashboardPages from "./components/INSTAGRAM_Pages/InstagramDashboardPages";
import UploadBox from "./components/UploadBox";
import DarkVeil from "./components/DarkVeil";



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

  const [googleUploaded, setGoogleUploaded] = useState(false);
  const [instagramUploaded, setInstagramUploaded] = useState(false);



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


  useEffect(() => {
    if (mode === "googledashboard" || mode === "instagramdashboard") {
      const el = dashScrollRef.current;
      if (!el) return;

      // Reset scroll position inside the dashboard vertical area
      el.scrollTo({ top: 0, behavior: "auto" });
    }
  }, [dashPage]);













  return (
    <div className="relative w-full h-screen overflow-hidden">

      {/* GLOBAL BACKGROUND - Only show in main mode */}
      {mode === "main" && (
        <div className="absolute inset-0 -z-10 bg-black">
          <div style={{ width: '100%', height: '600px', position: 'relative' }}>
            <DarkVeil speed={2.0} hueshift={250} />
          </div>
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
              {/* <span>Perspective.</span> */}

              {/* <div className="
                relative inline-flex justify-center items-center
                min-w-[300px] px-4 py-1 rounded-xl
                bg-white/10 backdrop-blur-md border border-white/20
                overflow-hidden
              ">
                <div className="absolute inset-0 shimmer-pointer-events-none"></div>

                <RotatingText
                  texts={["STATISTICS", "FOLLOWERS", "MESSAGES", "REACH", "HISTORY"]}
                  mainClassName="text-5xl sm:text-6xl font-bold text-white"
                  staggerDuration={0.08}
                  rotationInterval={3000}
                  initial={{ y: "100%" }}
                  animate={{ y: 0 }}
                  exit={{ y: "-100%" }}
                  splitLevelClassName="overflow-hidden"
                />
              </div>*/}

              <div className="relative w-full bg-black overflow-y-visible" style={{ minHeight: '100vh', paddingBottom: '50vh' }}></div>

              <div className="absolute inset-0 flex top-2/11 justify-center z-10">
                <h1 className="italic text-white/80 text-xl drop-shadow-lg text-center w-120" style={{ fontFamily: 'aileron' }}>
                  "The #1 app for data insights" - Wired
                </h1>
              </div>

              <div className="absolute inset-0 flex top-1/4 justify-center z-10">
                <h1 className="text-6xl font-bold text-white drop-shadow-lg text-center" style={{ fontFamily: 'Aileron' }}>
                  See who your real friends are.
                </h1>
              </div>

              <div className="absolute inset-0 flex top-18/40 justify-center z-10">
                <div className="w-24 h-px bg-white mb-4"></div>
              </div>

              <div className="absolute inset-0 flex top-1/2 justify-center z-10">
                <h1 className="text-2xl text-white/80 drop-shadow-lg text-center w-120" style={{ fontFamily: 'aileron' }}>
                  View your follower count, unsubscribe from spam, and rule the world.
                </h1>
              </div>

              {/* Down Arrow - positioned higher up */}
              <div className="absolute inset-0 flex top-4/5 justify-center z-10">
                <button
                  onClick={() => scrollToSection(1)}
                  className="text-6xl animate-bounce hover:scale-125 transition text-white"
                >
                  ↓
                </button>
              </div>
            </div>

          </section>



























          {/* ---------- SIGN-IN PAGE ---------- */}
          <section
            className="
    relative w-full h-screen snap-start
    flex flex-col items-center justify-center
    text-white
    text-center
  "
          >
            <div className="relative w-full h-full flex items-center justify-center text-center">

              {/* ===================================================
        PART 1 — STEPPER (centered absolute)
    =================================================== */}
              <div
                className={`
        absolute inset-0 flex items-center justify-center
        transition-opacity duration-600
        ${showButtonsAfterStepper ? "opacity-0 pointer-events-none" : "opacity-100"}
      `}
              >
                <div className="
        w-[350px] sm:w-[600px]
        rounded-4xl p-6
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
                      <p>Upload your data to explore your analytics.</p>
                    </Step>

                    <Step>
                      <h2 className="text-xl font-bold mb-2">Get Started</h2>
                      <p>You're ready to continue.</p>
                    </Step>
                  </Stepper>
                </div>
              </div>


              {/* ===================================================
        PART 2 — UPLOAD UI (centered absolute)
    =================================================== */}
              <div
                className={`
        absolute inset-0 flex flex-col items-center justify-center
        transition-opacity duration-700
        ${showButtons ? "opacity-100" : "opacity-0 pointer-events-none"}
      `}
              >
                <h1 className="text-5xl sm:text-6xl font-bold mb-12">
                  Upload your data
                </h1>

                <div className="flex flex-row gap-12 mt-4">

                  <UploadBox
                    label="Google Data"
                    provider="google"
                    uploaded={googleUploaded}
                    setUploaded={setGoogleUploaded}
                    onUploaded={() => {
                      setDashPage(0);
                      setMode("googledashboard");
                    }}
                  />

                  <UploadBox
                    label="Instagram Data"
                    provider="instagram"
                    uploaded={instagramUploaded}
                    setUploaded={setInstagramUploaded}
                    onUploaded={() => {
                      setDashPage(0);
                      setMode("instagramdashboard"); // lowercase
                    }}
                  />

                </div>
              </div>

            </div>
          </section>



















          {/*end MODE: MAIN*/}
        </div>
      )}


      {/* =====================================================
          MODE: GOOGLE DASHBOARD
      ====================================================== */}
      {mode === "googledashboard" && (
        <div className="relative w-full h-full bg-gray-900">
          {/* Dashboard Background - separate from main */}
          <div className="absolute inset-0 -z-10 bg-gradient-to-br from-gray-900 via-gray-800 to-black"></div>

          {/* Close button */}
          <button
            className="absolute top-4 right-6 z-50 text-white/80 hover:text-white transition"
            onClick={() => setMode("main")}
          >
            ✕
          </button>

          <div className="relative z-10 w-full h-full flex flex-col items-center justify-center">
            <GoogleDashboardPages dashPage={dashPage} setDashPage={setDashPage} />
          </div>
        </div>
      )}

      {/* =====================================================
          MODE: INSTAGRAM DASHBOARD
      ====================================================== */}
      {mode === "instagramdashboard" && (
        <div className="relative w-full h-full bg-gray-900">
          {/* Dashboard Background - separate from main */}
          <div className="absolute inset-0 -z-10 bg-gradient-to-br from-gray-900 via-gray-800 to-black"></div>

          {/* Close button */}
          <button
            className="absolute top-4 right-6 z-50 text-white/80 hover:text-white transition"
            onClick={() => setMode("main")}
          >
            ✕
          </button>

          <div className="relative z-10 w-full h-full flex flex-col items-center justify-center">
            <InstagramDashboardPages dashPage={dashPage} setDashPage={setDashPage} />
          </div>
        </div>
      )}


    </div>
  );
}
