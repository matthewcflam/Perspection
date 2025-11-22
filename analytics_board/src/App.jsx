import { useState } from "react";
import InstagramUpload from "./components/InstagramUpload";

const App = () => {
  const [instaData, setInstaData] = useState(null);

  const handleUploadComplete = (data) => {
    setInstaData(data);
    console.log("Uploaded folder data:", data);
  };

  return (
    <div className="min-h-screen w-screen overflow-hidden bg-slate-950">
      {!instaData ? (
        <InstagramUpload onUploadComplete={handleUploadComplete} />
      ) : (
        <div className="h-screen flex items-center justify-center text-white">
          <h1 className="text-3xl">Upload complete ✓</h1>
        </div>
      )}
    </div>
  );
};

export default App;
