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
import SpotlightCard from './components/SpotlightCard';
import Aurora from './components/Aurora';


export default function App() {
  const [mode, setMode] = useState("main");
  const scrollContainerRef = useRef(null);
  const prevModeRef = useRef(mode);

  const [dashPage, setDashPage] = useState(0);
  const dashScrollRef = useRef(null);

  const [setupPage, setSetupPage] = useState("login");
  const [instagramUploaded, setInstagramUploaded] = useState(false);
  const [showArrow, setShowArrow] = useState(true);
  const [showLoginButton, setShowLoginButton] = useState(true);
  const [hasLoggedIn, setHasLoggedIn] = useState(false);

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

  useEffect(() => {
    const handleScroll = () => {
      const el = scrollContainerRef.current;
      if (!el) return;
      if (el.scrollTop > 10) {
        setShowArrow(false);
      }

      // Hide login button when scrolled to section 4 (login page)
      const height = el.clientHeight;
      const currentSection = Math.round(el.scrollTop / height);
      if (currentSection == 4) {
        setShowLoginButton(false);
      } else {
        setShowLoginButton(true);
      }
    };

    const el = scrollContainerRef.current;
    if (el) {
      el.addEventListener('scroll', handleScroll);
      return () => el.removeEventListener('scroll', handleScroll);
    }
  }, [mode]);

  return (
    <div className="relative w-full h-screen overflow-hidden">

      {/* GLOBAL LOGO */}
      <button 
        onClick={() => {
          setMode("main");
          setTimeout(() => {
            scrollToSection(0);
          }, 100);
        }}
        className="fixed top-6 left-8 z-50 flex items-center gap-3 hover:opacity-80 transition-opacity cursor-pointer"
      >
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
      </button>

      {/* LOGIN BUTTON */}
      <button
        onClick={() => scrollToSection(5)}
        className={`fixed top-6 right-8 z-50 px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/30 text-white font-semibold hover:bg-white/20 transition-all duration-500 shadow-[0_0_15px_rgba(255,255,255,0.3)] hover:shadow-[0_0_25px_rgba(255,255,255,0.5)] ${(showLoginButton && !hasLoggedIn) ? 'opacity-100' : 'opacity-0 pointer-events-none'
          }`}
      >
        Login
      </button>

      {/* BACKGROUND (only main) */}
      {mode === "main" && (
        <div className="absolute inset-0 -z-10 bg-black">
          <div style={{ width: '100%', height: '600px', position: 'relative' }}>
            <DarkVeil speed={2.0} hueShift={0} />
          </div>
          {/* <img src="wallpaperfinal.webp"/> */}
        </div>
      )}

      {/* {mode === "main" && (
        <div className="absolute inset-0 -z-10" style={{ backgroundColor: '#221d34' }}>
        </div>
      )} */}

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
           {/* WALLPAPER */}
          <section className="relative w-full h-screen snap-start flex flex-col items-center justify-center text-white">
            {/* <div className="absolute inset-0 -z-10" style={{ backgroundColor: '#221d34' }}>
            <img src="wallpaperpromise.jpg"/>
          </div> */}
        
            <div className="absolute inset-0 flex top-3/12 justify-center z-10">
              <h1 className="italic text-white/80 text-xl drop-shadow-lg">
                "The #1 app for data insights" — Wired
              </h1>
            </div>

            <div className="absolute inset-0 flex top-2/6 justify-center z-10">
              <h1 className="text-6xl font-bold text-white drop-shadow-lg" style={{ fontFamily: 'Aileron' }}>
                See who your real friends are.
              </h1>
            </div>

            {/* <div className="absolute inset-0 flex top-11/20 justify-center z-10">
              <div className="w-24 h-px bg-white mb-4"></div>
            </div> */}

            <div className="absolute inset-0 flex top-2/4 justify-center z-10">
              <h1 className="text-2xl text-white/80 drop-shadow-lg text-center w-120">
                View your followers, messages, likes, and more.
              </h1>
            </div>

            {/* <div className="absolute inset-0 flex top-4/5 justify-center z-10">
              <button
                onClick={() => scrollToSection(1)}
                className={`text-4xl animate-subtle-bounce hover:scale-120 transition-all duration-400 text-white font-light ${showArrow ? 'opacity-80' : 'opacity-0 pointer-events-none'
                  }`}
              >
                ↓
              </button>
            </div> */}

          </section>

          {/* IMAGE SHOWCASE SECTION */}
          <section className="relative w-full h-screen snap-start flex items-center justify-center text-white">
            <SpotlightCard className="w-[1180px] h-[750px] -translate-y-20 rounded-3xl bg-gradient-to-br from-purple-300/30 via-orange-300 to-pink-500/40 backdrop-blur-xl border border-white/30 shadow-2xl p-8 flex items-center justify-center" spotlightColor="rgba(255, 255, 120, 0.8)">
              <div className="relative w-full h-full rounded-2xl border border-white/20 flex items-center justify-center overflow-hidden">
                <div className="absolute inset-0 bg-white/5 rounded-2xl"></div>
                <img src="Liked.png" className="relative rounded-2xl w-full h-full object-cover opacity-30 mix-blend-normal"></img>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="bg-black/60 backdrop-blur-md border border-white/20 rounded-2xl px-8 py-6 shadow-xl text-center">
                    <h2 className="text-3xl font-bold text-white mb-2" style={{ fontFamily: 'Aileron' }}>Put a spotlight on your data</h2>
                    <p className="text-white/80 text-lg">- and see everything in one place.</p>
                  </div>
                </div>
              </div>
            </SpotlightCard>
          </section>

          {/* TUTORIAL SECTION - 4 STACKED STEPS */}
          <section className="relative w-full min-h-screen snap-start flex flex-col items-center justify-center text-white py-20 gap-8">

            <h2 className="text-6xl font-bold text-white mb-8" style={{ fontFamily: 'Aileron' }}>Perspection in 3 steps</h2>

              {/* Step 1 */}
              <div className="w-[1100px] flex items-center gap-8">
                <div className="flex-1">
                  <h3 className="text-4xl font-bold text-white mb-3" style={{ fontFamily: 'Aileron' }}>
                    Step 1
                  </h3>

                  <p className="text-white/80 text-xl mb-3" style={{ fontFamily: 'Aileron' }}>
                    Go to the Instagram Accounts Center.
                  </p>

                  {/* BUTTON GOES HERE */}
                  <div
                    onClick={() => window.open("https://accountscenter.instagram.com/info_and_permissions", "_blank")}
                    className="
                      mt-1 w-40 h-10 cursor-pointer rounded-2xl border-2 border-white/40
                      flex items-center justify-center
                      transition-all duration-300
                      bg-white/20 backdrop-blur-md hover:bg-white/30
                    "
                  >
                    <span className="text-white font-medium text-xs" style={{ fontFamily: 'Aileron' }}>
                      Open Accounts Center
                    </span>
                  </div>
                </div>

                <div className="w-[600px] h-[340px] rounded-3xl bg-white/10 backdrop-blur-xl border border-white/30 shadow-xl p-4">
                  <div className="w-full h-full bg-white/5 rounded-2xl border border-white/20 overflow-hidden">
                    <img src="AccountCenter.png" className="rounded-2xl w-full h-full object-cover opacity-80" />
                  </div>
                </div>
              </div>

            


            {/* Step 2 */}
            <div className="w-[1100px] flex items-center gap-8">
              <div className="flex-1">
                <h3 className="text-4xl font-bold text-white mb-3" style={{ fontFamily: 'Aileron' }}>Step 2</h3>
                <p className="text-white/80 text-xl" style={{ fontFamily: 'Aileron' }}>Export your information to your device as a JSON file.</p>
              </div>
              <div className="w-[600px] h-[340px] rounded-3xl bg-white/10 backdrop-blur-xl border border-white/30 shadow-xl p-4">
                <div className="w-full h-full bg-white/5 rounded-2xl border border-white/20 overflow-hidden">
                  <img src="export.png" className="rounded-2xl w-full h-full object-cover opacity-80"></img>
                </div>
              </div>
            </div>

            {/* Step 3 */}
            <div className="w-[1100px] flex items-center gap-8">
              <div className="flex-1">
                <h3 className="text-4xl font-bold text-white mb-3" style={{ fontFamily: 'Aileron' }}>Step 3</h3>
                <p className="text-white/80 text-xl" style={{ fontFamily: 'Aileron' }}>Choose between your Likes, Following, and Messages folders to Upload!</p>
              </div>
              <div className="w-[600px] h-[340px] rounded-3xl bg-white/10 backdrop-blur-xl border border-white/30 shadow-xl p-4">
                <div className="w-full h-full bg-white/5 rounded-2xl border border-white/20 overflow-hidden">
                  <img src="folders.png" className="rounded-2xl w-full h-full object-cover opacity-80"></img>
                </div>
              </div>
            </div>

          </section>

          {/* SIGN-IN / STEPS / UPLOAD PAGE */}
          <section
            className="relative w-full h-screen snap-start flex items-center justify-center text-white"
            onMouseEnter={() => setShowLoginButton(false)}
            onMouseLeave={() => setShowLoginButton(true)}
          >

            {/* STEPPER */}
            {/* <div
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
                      <h2 className="text-xl font-bold mb-2">Welcome to Perspection.</h2>
                      <p>This short guide explains how to use our app.</p>
                    </Step>

                    <Step>
                      <h2 className="text-xl font-bold mb-2">Learn About Yourself</h2>
                      <p>We take your uploaded Instagram data and synthesize it for you. Learn about
                        your likes, messages, and more!
                      </p>
                    </Step>

                    <Step>
                      <h2 className="text-xl font-bold mb-2">How to Get Your Instagram Data</h2>
                      <p>Go to the Instagram Accounts Center. Export your information to your device as a JSON file.
                      </p>
                    </Step>

                    <Step>
                      <h2 className="text-xl font-bold mb-2">What Data to Upload</h2>
                      <p>Choose between your Likes, Following, and Messages JSON files to Upload!</p>
                    </Step>
                  </Stepper>
                </div>
              </div> */}

            <div className="relative w-full h-full flex items-center justify-center text-center">

              {/* LOGIN */}
              <div
                className={`
                  absolute inset-0 flex items-center justify-center
                  transition-opacity duration-700
                  ${setupPage === "login" ? "opacity-100" : "opacity-0 pointer-events-none"}
                `}
              >
                <LoginPage
                  onLoginSuccess={() => {
                    setSetupPage("upload");
                    setHasLoggedIn(true);
                  }}
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
                  onAccountCreated={() => {
                    setSetupPage("upload");
                    setHasLoggedIn(true);
                  }}
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
            onClick={() => {
              setMode("main");
              setTimeout(() => {
                scrollToSection(5);
              }, 100);
            }}
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
