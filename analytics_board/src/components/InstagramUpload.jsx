import { useState } from "react";

const InstagramUpload = ({ onUploadComplete }) => {
  const [loading, setLoading] = useState(false);

  const handleChange = async (event) => {
    const files = Array.from(event.target.files || []);
    if (!files.length) return;

    setLoading(true);
    try {
      // TODO: parse your Instagram folder here
      // For now just pass the file list back up:
      const result = { files }; 

      onUploadComplete(result);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center gap-4">
      <h1 className="text-2xl font-semibold mb-2">
        Upload your Instagram export
      </h1>
      <label className="cursor-pointer border px-4 py-2 rounded-lg bg-white/10">
        <span>Select folder / files</span>
        <input
          type="file"
          multiple
          // for folder upload in Chromium: uncomment:
          // webkitdirectory="true"
          // directory="true"
          className="hidden"
          onChange={handleChange}
        />
      </label>
      {loading && <p className="text-sm opacity-70">Processing…</p>}
    </div>
  );
};

export default InstagramUpload;