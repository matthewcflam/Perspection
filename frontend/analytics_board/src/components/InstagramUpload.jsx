import { useState } from "react";
import { Upload } from "lucide-react"; // nice clean icon

const InstagramUpload = ({ onUploadComplete }) => {
  const [loading, setLoading] = useState(false);

  const handleFolderUpload = async (event) => {
    const files = Array.from(event.target.files || []);
    if (!files.length) return;

    setLoading(true);

    try {
      // You will eventually parse folder contents here
      const result = { files };
      onUploadComplete(result);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="h-screen w-full flex flex-col items-center justify-center text-white text-center px-4">
      <h1 className="text-4xl font-bold mb-4">Upload your Instagram export</h1>

      <p className="text-gray-300 mb-10 max-w-2xl">
        Select the <strong>root folder</strong> of your Instagram export  
        (the folder that contains <em>messages</em>, <em>connections</em>, etc).  
        Everything is processed locally on your device.
      </p>

      {/* Upload area */}
      <label className="group flex flex-col items-center justify-center border-2 border-gray-600 border-dashed rounded-xl p-10 w-[380px] h-[320px] cursor-pointer hover:border-gray-300 transition">
        
        {/* Upload icon */}
        <Upload className="w-24 h-24 text-gray-400 group-hover:text-white transition" />

        <span className="mt-6 text-lg text-gray-300 group-hover:text-white">
          Click to upload folder
        </span>

        {/* Hidden input */}
        <input
          type="file"
          multiple
          webkitdirectory="true"
          directory="true"
          className="hidden"
          onChange={handleFolderUpload}
        />
      </label>

      {loading && <p className="mt-6 text-sm text-gray-400">Processing…</p>}
    </div>
  );
};

export default InstagramUpload;
