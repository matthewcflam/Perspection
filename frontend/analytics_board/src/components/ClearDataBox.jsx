import React from "react";
import axios from "axios";

export default function ClearDataBox({ onCleared }) {
  const handleClear = async () => {
    const confirmClear = window.confirm(
      "Clear ALL your linked data? This cannot be undone."
    );
    if (!confirmClear) return;

    try {
      const token = localStorage.getItem("access_token");

      await axios.delete(
        "https://alder-backend-265736855150.us-west1.run.app/meta/unlink",
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json"
          }
        }
      );

      onCleared && onCleared();
      alert("Your data has been cleared.");
    } catch (err) {
      console.error(err);
      alert("Failed to clear data.");
    }
  };

  return (
    <button
      onClick={handleClear}
      className="
        absolute bottom-6 right-6 z-50
        px-4 py-2
        text-sm font-semibold
        rounded-xl
        text-red-300
        bg-red-500/20 backdrop-blur-md
        border border-red-400/40
        hover:bg-red-500/30 hover:text-red-200
        transition-all
        shadow-[0_0_12px_2px_rgba(255,60,60,0.4)]
      "
    >
      Clear Data
    </button>
  );
}
