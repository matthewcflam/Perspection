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
  const [stage, setStage] = useState("landing"); //in this line of code, stage is the current value, setStage wil update it
  // 'landing' | 'loading-expand' | 'main'
  const [loadedFileType, setLoadedFileType] = useState(null);

  const handleFinishedProcessing = (fileType) => {
    // Trigger fullscreen expand → then load main page
    setLoadedFileType(fileType);
    setStage("loading-expand");

    //if IG is loaded, load mainIG page
    //if Google is loaded, load mainGoogle page
    setTimeout(() => {
      if(fileType === "instagram"){
        setStage("mainIG");
      } else if(fileType === "google"){
        setStage("mainGoogle");
      }
    }, 1200);
  };
  

  return (   
    <div ref={appRef} className="w-full min-h-screen relative">
      
      {/* fullscreen button that doesn't completely work */}
      {/* <button
        onClick={() => {
          if (appRef.current) {
            if (document.fullscreenElement) {
              document.exitFullscreen();
            } else {
              appRef.current.requestFullscreen();
            }
          }
        }}
        className="fixed top-4 right-4 z-50 px-3 py-2 text-white rounded-lg hover:bg-black/40 transition"
      >
        <img
          src={whitefullscreenIcon}
          className="h-7 w-7 object-contain"
        />
      </button> */}

      {/* we control flow of the website based on state */}
      {stage === "landing" && (
        // INITIAL STAGE = LANDING 
        <LandingPage onDone={handleFinishedProcessing} />
      )}

      {stage === "loading-expand" && (
        <div className="fixed inset-0 flex items-center justify-center bg-black z-[9999]">
          {/* Fullscreen expand animation component */}
        </div>
      )}

      {stage === "mainIG" && <MainPage type="instagram" />}
      {stage === "mainGoogle" && <MainPage type="google" />}
    </div>
  );
};

export default App;

// State flow for the app:
// User clicks button
//   ↓
// UploadButton: handleClick() → file input opens
//   ↓
// User selects file → handleFileChange()
//   ↓
// UploadButton: setLoading(true) → shows spinner
//   ↓
// UploadButton: setTimeout(1000ms) → onFinish() called
//   ↓
// LandingPage: setFile1Loaded(true) or setFile2Loaded(true)
//   ↓
// LandingPage: checkIGDone() or checkGoogleDone()
//   ↓
// LandingPage: onDone() → calls App.handleFinishedProcessing()
//   ↓
// App: setStage("loading-expand") → shows loading screen
//   ↓
// App: setTimeout(1200ms) → setStage("mainIG") or setStage("mainGoogle")
//   ↓
// MainPage: Renders!