import React, { useState } from "react";

const GoogleSlide = () => {
  const [showDetails, setShowDetails] = useState(false);

  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center bg-slate-950 px-4">
      {/* Title + subtitle */}
      <h2 className="text-3xl font-semibold text-white mb-4 text-center">
        Google Data
      </h2>
      <p className="text-gray-400 mb-8 max-w-xl text-center">
        This page will show insights built from your Google account
        (emails, calendar, drive, etc). Tap the card below to view more details.
      </p>

      {/* Clickable card that opens the pop-up */}
      <button
        onClick={() => setShowDetails(true)}
        className="w-full max-w-md text-left bg-slate-900/70 border border-slate-700 rounded-2xl p-6 hover:border-sky-500 hover:bg-slate-900 transition-colors"
      >
        <h3 className="text-xl font-semibold text-white mb-2">
          Google overview
        </h3>
        <p className="text-sm text-gray-300">
          Click here to see a pop-up with more detailed Google analytics.
        </p>
      </button>

      {/* Pop-up panel (overlay) */}
      {showDetails && (
        <div className="fixed inset-0 z-40 bg-black/60 flex items-end sm:items-center justify-center">
          <div className="w-full max-w-lg bg-slate-900 rounded-t-3xl sm:rounded-3xl p-6 shadow-xl">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-white">
                Google analytics (preview)
              </h3>
              <button
                onClick={() => setShowDetails(false)}
                className="text-gray-400 hover:text-gray-200 text-sm"
              >
                Close
              </button>
            </div>

            {/* Placeholder analytics – replace with real data later */}
            <ul className="space-y-2 text-sm text-gray-300">
              <li>• Total emails analyzed: 1,234</li>
              <li>• Top 3 contacts: Alice, Bob, Charlie</li>
              <li>• Calendar events this year: 256</li>
              <li>• Drive files scanned: 789</li>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default GoogleSlide;
