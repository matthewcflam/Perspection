// FIRST PAGE YOU OPEN AT WEBSITE LAUNCH

import React, { useState } from "react";
import BackgroundAnimation from "../components/BackgroundAnimation";
import UploadButton from "../components/UploadButton";
import myVideo from "../assets/finalPerspective.webm"
import CardSwap, { Card } from '../components/CardSwap'

const LandingPage = ({ onDone }) => {
    const [file1Loaded, setFile1Loaded] = useState(false);
    const [file2Loaded, setFile2Loaded] = useState(false);

    const checkIGDone = () => {
        if (file1Loaded) {
            onDone("instagram"); // Pass a string indicating which file
        }
    };

    const checkGoogleDone = () => {
        if (file2Loaded) {
            onDone("google"); // Pass a string indicating which file
        }
    };

    return (
        <div className="w-full min-h-screen bg-black">
            {/* SECTION 1: Headline and animation */}
            {/* <div className="h-screen"> */}
            <div className="relative w-full bg-black overflow-y-visible" style={{ minHeight: '100vh', paddingBottom: '50vh' }}>
                <div className="absolute inset-0 z-0">
                    <BackgroundAnimation />
                </div>

                <div className="absolute inset-0 flex top-2/11 justify-center z-10">
                    <h1 className="italic text-white/80 drop-shadow-lg text-center w-120" style={{ fontFamily: 'aileron' }}>
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

                {/* CardSwap positioned right underneath the text */}
                <div className="absolute w-full h-screen z-10 overflow-visible" style={{top: '55%'}}>
                    <CardSwap
                        cardDistance={60}
                        verticalDistance={70}
                        delay={5000}
                        pauseOnHover={false}
                    >
                        <Card>
                            <h3 className="relative z-10 text-white" style={{ fontFamily: 'aileron' }}>Messages</h3>
                            <div className="absolute inset-0 z-0">
                                <BackgroundAnimation />
                            </div>
                        </Card>
                        <Card>
                            <h3 className="relative z-10 text-white" style={{ fontFamily: 'aileron' }}>Followers</h3>
                            <div className="absolute inset-0 z-0">
                                <BackgroundAnimation />
                            </div>
                        </Card>
                        <Card>
                            <h3 className="relative z-10 text-white" style={{ fontFamily: 'aileron' }}>Subscriptions</h3>
                            <div className="absolute inset-0 z-0">
                                <BackgroundAnimation />
                            </div>
                        </Card>
                    </CardSwap>
                </div>

                {/* <div className="w-full h-screen flex flex-col items-center justify-center bg-black">
                    <div className="flex flex-row w-full max-w-3xl">
                        <UploadButton
                            label="Instagram Data"
                            onFinish={() => {
                                setFile1Loaded(true);
                                checkIGDone();
                            }}
                        />
                        <UploadButton
                            label="Google Data"
                            onFinish={() => {
                                setFile2Loaded(true);
                                checkGoogleDone();
                            }}
                        />
                    </div>
                </div> */}
            </div>
            {/* </div> */}

            {/* SECTION 2: Perspective video idea (not final)
            <div className="w-full h-screen bg-black overflow-hidden">
                <div className="relative w-full h-1/2 flex items-center justify-center bg-slate-900 overflow-hidden">
                    <video
                        src={myVideo}
                        autoPlay
                        muted
                        style={{ width: "100%", height: "100%", position: 'absolute', top: 0, left: 0, objectFit: "cover" }}
                    />
                </div>

            </div> */}

            {/* SECTION 3: Upload buttons */}
            <div className="w-full h-screen flex flex-col items-center justify-center bg-black">
                <div className="flex flex-row w-full max-w-3xl">
                    <UploadButton
                        label="Instagram Data"
                        onFinish={() => {
                            setFile1Loaded(true);
                            checkIGDone();
                        }}
                    />
                    <UploadButton
                        label="Google Data"
                        onFinish={() => {
                            setFile2Loaded(true);
                            checkGoogleDone();
                        }}
                    />
                </div>
            </div>
        </div>
    );
};

/* Crash Course on what each Container does (its different now):

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
