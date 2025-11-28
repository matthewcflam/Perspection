import React, { useState } from "react";
import StatsPopupBoard from "./StatsPopupBoard";

const GoogleSlide = () => {
  const [showDetails, setShowDetails] = useState(false);

  // These are the internal pages of the Google stats pop-up
  const googlePages = [
    {
      id: "drive",
      content: (
        <div className="space-y-2 text-sm text-gray-300">
          <p className="font-semibold text-gray-100">Overview snapshot</p>
          <ul className="list-disc list-inside">
            <li>Files written: 1,234</li>
            <li>Words per file: 400</li>
            <li>Days used this year: 256</li>
          </ul>
        </div>
      ),
    },
    {
      id: "gmail",
      content: (
        <div className="space-y-2 text-sm text-gray-300">
          <p className="font-semibold text-gray-100">Email analytics</p>
          <ul className="list-disc list-inside">
            <li>Emails sent last 30 days: 321</li>
            <li>Most active day: Tuesday</li>
            <li>Average emails/day: 10.7</li>
          </ul>
        </div>
      ),
    },
    {
      id: "youtube",
      content: (
        <div className="space-y-2 text-sm text-gray-300">
          <p className="font-semibold text-gray-100">Calendar analytics</p>
          <ul className="list-disc list-inside">
            <li>Subscribers: 42</li>
            <li>Average time spent: 45 min</li>
            <li>Videos watched: 34</li>
          </ul>
        </div>
      ),
    },
  ];

  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center bg-slate-950 px-4">
      <h2 className="text-3xl font-semibold text-white mb-4 text-center">
        Google Data
      </h2>
      <p className="text-gray-400 mb-8 max-w-xl text-center">
        This page will show insights built from your Google account. Tap the card
        below to open a multi-page stats view.
      </p>

      {/* Clickable card that opens the board-like pop-up */}
      <button
        onClick={() => setShowDetails(true)}
        className="w-full max-w-md text-left bg-slate-900/70 border border-slate-700 rounded-2xl p-6 hover:border-sky-500 hover:bg-slate-900 transition-colors"
      >
        <h3 className="text-xl font-semibold text-white mb-2">
          Open Google analytics
        </h3>
        <p className="text-sm text-gray-300">
          Press to open, then use Next / Back to move through different stats pages.
        </p>
      </button>

      {showDetails && (
        <StatsPopupBoard
          title="Google analytics"
          pages={googlePages}
          onClose={() => setShowDetails(false)}
        />
      )}
    </div>
  );
};

export default GoogleSlide;