// import { useState } from "react";
// import Board from "./components/Board";
// import WelcomePage from "./components/WelcomePage";
// import InstagramUpload from "./components/InstagramUpload";

// const App = () => {
//   const [instaData, setInstaData] = useState(null);

//   const handleUploadComplete = (data) => {
//     setInstaData(data);
//     console.log("Uploaded folder data:", data);
//     // later you can show a 3rd page with charts, etc.
//   };

//   return (
//     <Board>
//       {/* PAGE 1: Welcome */}
//       <WelcomePage />

//       {/* PAGE 2: Upload */}
//       <InstagramUpload onUploadComplete={handleUploadComplete} />

//       {/* PAGE 3: Placeholder for analytics / “Upload complete” */}
//       <div className="min-h-screen flex items-center justify-center bg-slate-950 text-white">
//         {instaData ? (
//           <h1 className="text-3xl">Upload complete ✓ (analytics coming here)</h1>
//         ) : (
//           <p className="text-gray-500">
//             Upload data first (swipe back ← to the upload page)
//           </p>
//         )}
//       </div>
//     </Board>
//   );
// };

// export default App;

// import { useState } from "react";
// import Board from "./components/Board";
// import WelcomePage from "./src/pages/WelcomePage";
// import GoogleSlide from "./src/pages/GoogleSlide";
// import InstagramUpload from "./pages/InstagramUpload";
// import AnimatedWelcome from "./components/AnimatedWelcome";

// const App = () => {
//   const [instaAnalytics, setInstaAnalytics] = useState(null);

//   const handleInstaUploadComplete = (files) => {
//     // TODO: replace with real parsing of Instagram export
//     console.log("Instagram files:", files);

//     const fakeStats = {
//       totalMessages: 9876,
//       uniqueChats: 42,
//     };

//     setInstaAnalytics(fakeStats);
//   };

// const handleInstaUploadComplete = async (files) => {
//   console.log("Uploading", files.length, "files to backend…");

//   const formData = new FormData();

//   for (const file of files) {
//     // Preserve folder structure
//     const relPath = file.webkitRelativePath || file.name;
//     formData.append("files", file, relPath);
//   }

//   const res = await fetch("/api/upload/instagram", { // TODO: This is the backend path, replace with current implementation
//     method: "POST",
//     body: formData,
//   });

//   if (!res.ok) {
//     console.error("Upload failed!");
//     return;
//   }

//   const data = await res.json();   // expects { stats: {...} }
//   console.log("Received stats from backend:", data.stats);

//   setInstaAnalytics(data.stats);
// };
import React, { useState, useEffect, useRef } from 'react';

//YOU ONLY NEED TO IMPORT THE PAGES
import LandingPage from './pages/LandingPage';
import MainPage from './pages/MainPage';
import whitefullscreenIcon from './assets/finalwhiteFS.png';


const App = () => {
  const appRef = useRef(null);
  const [stage, setStage] = useState("landing");
  // 'landing' | 'loading-expand' | 'main'

  const handleFinishedProcessing = () => {
    // Trigger fullscreen expand → then load main page
    setStage("loading-expand");

    setTimeout(() => {
      setStage("main");
    }, 1200); // match your framer-motion animation duration
  };


  //   return (
  //     <>
  //       <div className='w-full h-screen relative flex justify-center items-center bg-black'>
  //         {stage === "landing" && ( 
  //           // INITIAL STAGE = LANDING 
  //           <LandingPage onDone={handleFinishedProcessing} />
  //         )}

  //         {stage === "loading-expand" && (
  //           <div className="fixed inset-0 flex items-center justify-center bg-black z-[9999]">
  //             {/* Fullscreen expand animation component */}
  //           </div>
  //         )}

  //         {stage === "main" && <MainPage />}
  //       </div>
  //     </>
  //   );
  // };

  return (
    <div ref={appRef} className="w-full h-screen bg-black flex items-center justify-center relative">
      
      {/* fullscreen button */}
      <button
        onClick={() => {
          if (appRef.current) {
            if (document.fullscreenElement) {
              document.exitFullscreen();
            } else {
              appRef.current.requestFullscreen();
            }
          }
        }}
        className="absolute top-4 right-4 z-50 px-3 py-2 text-white rounded-lg hover:bg-black/40 transition"
      >
        <img
          src={whitefullscreenIcon}
          className="h-7 w-7 object-contain"
        />
      </button>

      {stage === "landing" && (
        // INITIAL STAGE = LANDING 
        <LandingPage onDone={handleFinishedProcessing} />
      )}

      {stage === "loading-expand" && (
        <div className="fixed inset-0 flex items-center justify-center bg-black z-[9999]">
          {/* Fullscreen expand animation component */}
        </div>
      )}

      {stage === "main" && <MainPage />}
    </div>
  );
};

export default App;