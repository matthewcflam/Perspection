import React, { useState } from "react";
import StatsPopupBoard from "./StatsPopupBoard";

const InstagramUpload = ({ onUploadComplete, analytics }) => {
  const [showStatsPopup, setShowStatsPopup] = useState(false);

  const handleFolderChange = (e) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;
    onUploadComplete?.(files);
  };

  // Define the internal pages for Insta stats
  const instaPages = [
    {
      id: "overview",
      content: (
        <div className="space-y-2 text-sm text-gray-300">
          <p className="font-semibold text-gray-100">Instagram overview</p>
          <ul className="list-disc list-inside">
            <li>Total messages: {analytics?.totalMessages ?? "—"}</li>
            <li>Unique chats: {analytics?.uniqueChats ?? "—"}</li>
          </ul> 
        </div>
      ),
    },
    {
      id: "top-chats",
      content: (
        <div className="space-y-2 text-sm text-gray-300">
          <p className="font-semibold text-gray-100">Top chats</p>
          <ul className="list-disc list-inside">
            <li>Friend A — 1,234 messages</li>
            <li>Friend B — 987 messages</li>
            <li>Friend C — 543 messages</li>
          </ul>
        </div>
      ),
    },
    {
      id: "time-heatmap",
      content: (
        <div className="space-y-2 text-sm text-gray-300">
          <p className="font-semibold text-gray-100">Activity over time</p>
          <p>
            (To be determined.)
          </p>
        </div>
      ),
    },
  ];

  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center bg-slate-950 px-4">
      <h2 className="text-3xl font-semibold text-white mb-4 text-center">
        Instagram Data
      </h2>
      <p className="text-gray-300 mb-8 max-w-2xl mx-auto text-center">
        Select the <strong>root folder</strong> of your Instagram export
        (the folder that contains <em>messages</em>, <em>connections</em>, etc).
        Everything is processed locally on your device.
      </p>

      {/* Upload box */}
      <div className="w-full max-w-md border border-dashed border-gray-600 rounded-2xl p-8 flex flex-col items-center gap-4 mb-10">
        <p className="text-gray-400 text-center">
          Drag a folder here or click to select
        </p>

        <input
          id="insta-folder-input"
          type="file"
          webkitdirectory="true"
          directory="true"
          className="hidden"
          onChange={handleFolderChange}
        />

        <label
          htmlFor="insta-folder-input"
          className="cursor-pointer px-4 py-2 rounded-lg bg-sky-500 hover:bg-sky-600 text-white font-medium"
        >
          Choose Instagram folder
        </label>
      </div>

      {/* Simple inline summary */}
      {analytics ? (
        <>
          <div className="w-full max-w-3xl bg-slate-900/70 rounded-2xl p-6 text-gray-100 mb-4">
            <h3 className="text-xl font-semibold mb-2">Quick summary</h3>
            <p className="text-sm text-gray-300">
              Messages: {analytics.totalMessages ?? "—"} · Chats:{" "}
              {analytics.uniqueChats ?? "—"}
            </p>
          </div>

          <button
            onClick={() => setShowStatsPopup(true)}
            className="px-4 py-2 rounded-full bg-sky-500 hover:bg-sky-600 text-white text-sm"
          >
            View detailed stats
          </button>
        </>
      ) : (
        <p className="text-xs text-gray-500">
          Upload a folder to see Instagram analytics here.
        </p>
      )}

      {showStatsPopup && (
        <StatsPopupBoard
          title="Instagram analytics"
          pages={instaPages}
          onClose={() => setShowStatsPopup(false)}
        />
      )}
    </div>
  );
};

export default InstagramUpload;