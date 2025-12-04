import { useState, useEffect, useRef } from "react";

// Components
import RotatingText from "./components/RotatingText";
import DarkVeil from "./components/DarkVeil";
import UploadBox from "./components/UploadBox";
import Stepper, { Step } from "./components/Stepper";
import LoginPage from "./components/LoginPage";
import CreateAccountPage from "./components/CreateAccountPage";
import InstagramDashboardPages from "./components/INSTAGRAM_Pages/InstagramDashboardPages";
import StatsButtonBox from "./components/StatsButtonBox";
import ClearDataBox from "./components/ClearDataBox";



export default function App() {
  const [mode, setMode] = useState("main"); 
  const scrollContainerRef = useRef(null);
  const prevModeRef = useRef(mode);

  const [dashPage, setDashPage] = useState(0);
  const dashScrollRef = useRef(null);

  const [setupPage, setSetupPage] = useState("stepper");
  const [instagramUploaded, setInstagramUploaded] = useState(false);

  const scrollToSection = (index) => {
    const el = scrollContainerRef.current;
    if (!el) return;
    const height = el.clientHeight;
    el.scrollTo({ top: index * height, behavior: "smooth" });
  };

  useEffect(() => {
    if (mode === "main" && prevModeRef.current.includes("dashboard")) {
      requestAnimationFrame(() => {
        const el = scrollContainerRef.current;
        if (!el) return;
        const height = el.clientHeight;
        el.scrollTo({ top: height, behavior: "auto" });
      });
    }
    prevModeRef.current = mode;
  }, [mode]);

  return (
    <div className="relative w-full h-screen overflow-hidden">

      {/* GLOBAL LOGO */}
      <div className="fixed top-6 left-8 z-50 flex items-center gap-3">
        <img 
          src="/favicon.png" 
          alt="Perspection Logo" 
          className="w-8 h-8"
        />
        <h1
          className="text-xl font-bold text-white tracking-wide"
          style={{ fontFamily: 'Aileron' }}
        >
          Perspection
        </h1>
      </div>

      {/* BACKGROUND (only main) */}
      {mode === "main" && (
        <div className="absolute inset-0 -z-10 bg-black">
          <div style={{ width: '100%', height: '600px', position: 'relative' }}>
            <DarkVeil speed={2.0} hueshift={250} />
          </div>
        </div>
      )}

      {/* ===========================
            MODE: MAIN (Landing + Login)
      ============================ */}
      {mode === "main" && (
        <div
          ref={scrollContainerRef}
          className="relative w-full h-full overflow-y-scroll no-scrollbar"
          style={{ scrollBehavior: 'smooth' }}
        >

          {/* LANDING PAGE */}
          <section className="relative w-full h-screen snap-start flex flex-col items-center justify-center text-white">

            <div className="absolute inset-0 flex top-2/11 justify-center z-10">
              <h1 className="italic text-white/80 text-xl drop-shadow-lg">
                "The #1 app for data insights" — Wired
              </h1>
            </div>

            <div className="absolute inset-0 flex top-1/4 justify-center z-10">
              <h1 className="text-6xl font-bold text-white drop-shadow-lg" style={{ fontFamily: 'Aileron' }}>
                See who your real friends are.
              </h1>
            </div>

            <div className="absolute inset-0 flex top-18/40 justify-center z-10">
              <div className="w-24 h-px bg-white mb-4"></div>
            </div>

            <div className="absolute inset-0 flex top-1/2 justify-center z-10">
              <h1 className="text-2xl text-white/80 drop-shadow-lg text-center w-120">
                View your followers, messages, likes, and more.
              </h1>
            </div>

            <div className="absolute inset-0 flex top-4/5 justify-center z-10">
              <button
                onClick={() => scrollToSection(1)}
                className="text-6xl animate-bounce hover:scale-125 transition text-white"
              >
                ↓
              </button>
            </div>

          </section>

          {/* SIGN-IN / STEPS / UPLOAD PAGE */}
          <section className="relative w-full h-screen snap-start flex items-center justify-center text-white">

            <div className="relative w-full h-full flex items-center justify-center text-center">

              {/* STEPPER */}
              <div
                className={`
                  absolute inset-0 flex items-center justify-center
                  transition-opacity duration-700
                  ${setupPage === "stepper" ? "opacity-100" : "opacity-0 pointer-events-none"}
                `}
              >
                <div className="w-[350px] sm:w-[600px] rounded-4xl p-6 bg-white/10 backdrop-blur-xl border border-white/20 shadow-xl">
                  <Stepper
                    initialStep={1}
                    onFinalStepCompleted={() =>
                      setTimeout(() => setSetupPage("login"), 700)
                    }
                  >
                    <Step>
                      <h2 className="text-xl font-bold mb-2">Welcome!</h2>
                      <p>This short guide explains what this app does.</p>
                    </Step>

                    <Step>
                      <h2 className="text-xl font-bold mb-2">Learn About Yourself</h2>
                      <p>We analyze your Instagram data — messages, likes, interactions, and more.</p>
                    </Step>

                    <Step>
                      <h2 className="text-xl font-bold mb-2">How it Works</h2>
                      <p>Just upload your Instagram Data Download folder.</p>
                    </Step>

                    <Step>
                      <h2 className="text-xl font-bold mb-2">Get Started!</h2>
                      <p>Let’s begin.</p>
                    </Step>
                  </Stepper>
                </div>
              </div>

              {/* LOGIN */}
              <div
                className={`
                  absolute inset-0 flex items-center justify-center
                  transition-opacity duration-700
                  ${setupPage === "login" ? "opacity-100" : "opacity-0 pointer-events-none"}
                `}
              >
                <LoginPage
                  onLoginSuccess={() => setSetupPage("upload")}
                  onCreateAccountClick={() => setSetupPage("createaccount")}
                />
              </div>

              {/* CREATE ACCOUNT */}
              <div
                className={`
                  absolute inset-0 flex items-center justify-center
                  transition-opacity duration-700
                  ${setupPage === "createaccount" ? "opacity-100" : "opacity-0 pointer-events-none"}
                `}
              >
                <CreateAccountPage
                  onAccountCreated={() => setSetupPage("upload")}
                  onBackToLogin={() => setSetupPage("login")}
                />
              </div>

              {/* UPLOAD + SEE STATS */}
              <div
                className={`
                  absolute inset-0 flex flex-col items-center justify-center gap-10
                  transition-opacity duration-700
                  ${setupPage === "upload" ? "opacity-100" : "opacity-0 pointer-events-none"}
                `}
              >
                <h1 className="text-5xl sm:text-6xl font-bold mb-8">Upload your data</h1>

                <div className="flex flex-row gap-12 mt-4">
                  
                  {/* Instagram Upload */}
                  <UploadBox
                    label="Instagram Data"
                    uploaded={instagramUploaded}
                    setUploaded={setInstagramUploaded}
                    onUploaded={() => {
                      setDashPage(0);
                      setMode("instagramdashboard");
                    }}
                  />

                  {/* Direct Stats Button */}
                  <StatsButtonBox
                    onClick={() => {
                      setDashPage(0);
                      setMode("instagramdashboard");
                    }}
                  />

                  <ClearDataBox
  onCleared={() => {
    setInstagramUploaded(false);
    setGoogleUploaded(false); // safe even if unused
  }}
/>


                </div>
              </div>

            </div>
          </section>
        </div>
      )}

      {/* ===========================
            INSTAGRAM DASHBOARD MODE
      ============================ */}
      {mode === "instagramdashboard" && (
        <div className="relative w-full h-full bg-gray-900">

          <button
            className="absolute top-4 right-6 z-50 text-white/80 hover:text-white transition"
            onClick={() => setMode("main")}
          >
            ✕
          </button>

          <InstagramDashboardPages
            dashPage={dashPage}
            setDashPage={setDashPage}
          />
        </div>
      )}



    </div>
  );
}
