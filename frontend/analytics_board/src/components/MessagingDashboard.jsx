import React, { useState } from "react";


export default function MessagingDashboard() {
  return (

    <div className="h-full w-full overflow-y-auto flex flex-col items-center p-8 bg-transparent">

      <section className="relative w-full h-screen snap-start flex flex-col items-center justify-center text-white gap-10">

        {/* Landing Text with Glass/Shimmer */}
        <div className="flex flex-row items-center justify-center gap-3 text-5xl sm:text-6xl font-bold">
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

      <h1 className="text-4xl font-bold mb-8 mt-8 text-white">Your Messaging Habits</h1>
      <section className="mb-6 w-full max-w-2xl bg-white/10 rounded-xl p-6 shadow-lg">
        <h2 className="text-2xl font-semibold mb-2 text-white">Message Frequency</h2>
        <p className="text-white">See how often you send and receive messages.</p>
      </section>
      <section className="mb-6 w-full max-w-2xl bg-white/10 rounded-xl p-6 shadow-lg">
        <h2 className="text-2xl font-semibold mb-2 text-white">Top Contacts</h2>
        <p className="text-white">Your most messaged friends and groups.</p>
      </section>
      <section className="mb-6 w-full max-w-2xl bg-white/10 rounded-xl p-6 shadow-lg">
        <h2 className="text-2xl font-semibold mb-2 text-white">Trends Over Time</h2>
        <p className="text-white">How your messaging habits change week to week.</p>
      </section>
      {/* Add more sections/cards as needed */}

    </div>
  );
};

