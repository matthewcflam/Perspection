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