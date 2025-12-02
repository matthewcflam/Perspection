import { useRef } from "react";
import axios from "axios";

export default function UploadBox({
  label,
  provider,         // "google" or "instagram"
  uploaded,         // false | "loading" | true
  setUploaded,      // setter passed from App.jsx
  onUploaded        // callback for VIEW STATISTICS click
}) {
  const fileInputRef = useRef(null);

  // Upload icon (SVG)
  const uploadIcon = (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="white"
      viewBox="0 0 24 24"
      className="w-10 h-10 opacity-90 mb-2"
    >
      <path d="M12 16c-.55 0-1-.45-1-1V9.83l-1.59 1.58a.996.996 0 11-1.41-1.41l3.3-3.29c.39-.39 1.03-.39 1.42 0l3.3 3.29a.996.996 0 11-1.41 1.41L13 9.83V15c0 .55-.45 1-1 1zm8-4c-.55 0-1 .45-1 1v5H5v-5c0-.55-.45-1-1-1s-1 .45-1 1v6c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2v-6c0-.55-.45-1-1-1z"/>
    </svg>
  );

  // Full-color Google / Instagram icons
  const providerIcon =
  provider === "google" ? (
    <img 
        src="https://upload.wikimedia.org/wikipedia/commons/5/5b/YouTube_Bottom.png"
      alt="Google Icon"
      className="w-8 h-8 mb-1"
    />
  ) : (
    <img 
      src="https://upload.wikimedia.org/wikipedia/commons/a/a5/Instagram_icon.png"
      alt="Instagram Icon"
      className="w-9 h-9 mb-1 rounded-lg"
    />
  );


  // GIANT glow tint around the box
  const glowClass =
    provider === "google"
      ? "shadow-[0_0_25px_4px_rgba(250,255,255,0.8)]" // Google blue glow
      : "shadow-[0_0_25px_4px_rgba(225,48,108,0.8)]"; // Instagram pink-purple glow


  //=======================================================
  //    File -> InstagramExportUploader -> linked_socials
  //=======================================================
  const handleFileSelect = async (e) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    setUploaded("loading");

    try {
      if (provider === "instagram") {
        // Parse Instagram folder
        const fileList = Array.from(files);
        const jsonFiles = fileList.filter((file) =>
          file.name.toLowerCase().endsWith(".json")
        );

        if (jsonFiles.length === 0) {
          alert("No JSON files found in the selected folder.");
          setUploaded(false);
          return;
        }

        // Parse all JSON files into a list of raw JSON contents
        const dataList = await Promise.all(
          jsonFiles.map(async (file) => {
            const text = await file.text();
            return JSON.parse(text);
          })
        );

        // Send to backend (array of JSON contents expected by InstagramParser)
        const token = localStorage.getItem('access_token');
        await axios.post('https://alder-backend-265736855150.us-west1.run.app/link', {
          platform: "meta",
          data: dataList,
          account_name: "InstagramUser"
        }, {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        });

        // Upload successful
        setUploaded(true);
      } else if (provider == "google"){
        // Google - send to backend
        console.log('Google upload initiated');
        console.log('Token:', localStorage.getItem('access_token'));
        
        const token = localStorage.getItem('access_token');
        const response = await axios.post('https://alder-backend-265736855150.us-west1.run.app/link', {
          platform: "google",
          data: {},
          account_name: "Google User"
        }, {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        });

        console.log('Google upload response:', response.data);

        // Upload successful
        setUploaded(true);
      }
    } catch (error) {
      console.error('Upload failed:', error);
      alert('Upload failed: ' + (error.response?.data?.message || error.message));
      setUploaded(false);
    }
  };

//========== FILE UPLOAD DONE ===============

  const handleClick = () => {
    if (uploaded === true) {
      onUploaded();
    } else {
      fileInputRef.current?.click();
    }
  };

  return (
    <div
      onClick={handleClick}
      className={`
        w-64 h-64 cursor-pointer rounded-3xl border-2 border-white/40
        flex flex-col items-center justify-center text-center p-6
        transition-all duration-300 relative
        bg-white/30 backdrop-blur-lg
        hover:bg-white/40

        ${glowClass}
      `}
    >

      {/* dotted inner border */}
      <div
        className="
          absolute inset-[6px] rounded-2xl
          border-2 border-dotted border-white/70
          pointer-events-none
        "
      ></div>

      {/* hidden file input */}
      <input
        ref={fileInputRef}
        type="file"
        className="hidden"
        onChange={handleFileSelect}
        {...(provider === "instagram" ? {
          webkitdirectory: "true",
          directory: "true",
          multiple: true
        } : {})}
      />

      {/* STATES */}
      {uploaded === false && (
        <div className="flex flex-col items-center z-10">
          {uploadIcon}
          {providerIcon}
          <span className="text-xl font-semibold mt-1">{label}</span>
          <span className="text-sm opacity-70">Click or drag to upload</span>
        </div>
      )}

      {uploaded === "loading" && (
        <div className="text-lg text-white/80 animate-pulse z-10">
          Uploading…
        </div>
      )}

      {uploaded === true && (
        <div className="flex flex-col items-center gap-1 z-10">
          {providerIcon}
          <span
  className={`
    text-xl font-bold 
    ${
      provider === "instagram"
        ? "text-pink-400"
        : "text-green-300"
    }
  `}
>
  VIEW STATISTICS
</span>

          <span className="text-xs font-semibold uppercase tracking-wide">
            {label}
          </span>
        </div>
      )}
    </div>
  );
}