import { useState, useRef } from "react";

export default function UploadBox({ label, onUploaded }) {
  const [status, setStatus] = useState("idle");
  const fileInputRef = useRef(null);

  const handleFileSelect = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    simulateUpload();
  };

  const simulateUpload = () => {
    setStatus("loading");
    setTimeout(() => {
      setStatus("done");
    }, 900);
  };

  return (
    <div
      onClick={() => {
        if (status === "done") {
          onUploaded(); // clicking "VIEW STATISTICS"
        } else {
          fileInputRef.current?.click();
        }
      }}
      className={`
        w-64 h-64 cursor-pointer rounded-3xl border-2 border-white/40
        flex items-center justify-center text-center p-6
        transition-all duration-300 relative
        bg-white/30 backdrop-blur-md
        hover:bg-white/40
      `}
    >
      {/* dotted inner border */}
      <div
        className="
          absolute inset-[6px] rounded-2xl 
          border-2 border-dotted border-white/60
          pointer-events-none
        "
      ></div>

      <input
        ref={fileInputRef}
        type="file"
        className="hidden"
        onChange={handleFileSelect}
      />

      {/* CONTENT STATES */}
      {status === "idle" && (
        <div className="flex flex-col items-center gap-2 z-10">
          <span className="text-xl font-semibold">{label}</span>
          <span className="text-sm opacity-70">Click or drag to upload</span>
        </div>
      )}

      {status === "loading" && (
        <div className="text-lg text-white/80 animate-pulse z-10">
          Uploading…
        </div>
      )}

      {status === "done" && (
        <div className="flex flex-col items-center gap-2 z-10">
          <span className="text-2xl font-bold text-green-300">
            VIEW
          </span>
          <span className="text-sm font-semibold uppercase tracking-wide">
            {label} Statistics
          </span>
        </div>
      )}
    </div>
  );
}
