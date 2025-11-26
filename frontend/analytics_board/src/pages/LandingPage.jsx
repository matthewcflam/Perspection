// FIRST PAGE YOU OPEN AT WEBSITE LAUNCH

import React, { useState } from "react";
import BackgroundAnimation from "../components/BackgroundAnimation";
import UploadButton from "../components/UploadButton";
import myVideo from "../assets/finalPerspective.webm"

const LandingPage = ({ onDone }) => {
    const [file1Loaded, setFile1Loaded] = useState(false);
    const [file2Loaded, setFile2Loaded] = useState(false);

    const checkAllDone = () => {
        if (file1Loaded && file2Loaded) {
            onDone();
        }
    };

    return (
        <div className="w-full">
            
            {/* <div className="w-full h-screen flex items-center justify-center bg-slate-900" > 
                <h1 className="text-6xl font-bold text-white drop-shadow-lg" style={{ fontFamily: 'Aileron' }}>
                        Perspective
                    </h1>
            </div> */}

            {/* HERO SECTION - Full viewport */}
            <div className="relative w-full h-screen overflow-hidden">
                <BackgroundAnimation />

                {/* Container for Headline and Upload Buttons */}
                <div className="absolute inset-0 flex flex-col items-center justify-center space-y-8">

                    <h1 className="text-6xl font-bold text-white drop-shadow-lg" style={{ fontFamily: 'Aileron' }}>
                        Put a spotlight on your data.
                    </h1>

                    {/* Container to put buttons side-by-side */}
                    <div className="flex flex-row gap-8">
                        {/* Instagram Upload Button */}
                        <UploadButton
                            label="Instagram Data"
                            onFinish={() => {
                                setFile1Loaded(true);
                                checkAllDone();
                            }}
                        />
                        {/* Google Upload Button */}
                        <UploadButton
                            label="Google Data"
                            onFinish={() => {
                                setFile2Loaded(true);
                                checkAllDone();
                            }}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

/* Crash Course on what each Container does:

Container 1 (contains everything)
- w-full: full width for all children

Container 2 (everything on homepage)
- relative: children can move and be outside the page
- w-full: full width of the screen
- h-screen: 1 screen's height
- overflow-hidden: cuts any content outside of the bounds of container

Container 3 (Text and Upload Buttons)
- absolute: content must be inside this container
- inset-0: Container 3 completely covers Container 2
- flex-col: Arranges text and buttons vertically
- items-center: everything is centered horizontally on the page
- justify-center: everything is centered vertically on the page
- space-y-8: vertical spaces between each child
*/

export default LandingPage;
