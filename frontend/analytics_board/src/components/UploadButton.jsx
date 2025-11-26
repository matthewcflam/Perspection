import React, { useState, useRef } from "react";
import SpotlightCard from './SpotlightCard';

const UploadButton = ({ label, onFinish }) => {
  const [loading, setLoading] = useState(false);
  const inputRef = useRef();

  const handleClick = () => {
    inputRef.current.click();
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setLoading(true);

    // simulate processing OR call API
    setTimeout(() => {
      onFinish();
    }, 1000);
  };

  return (
    <>
      <input
        type="file"
        ref={inputRef}
        className="hidden"
        onChange={handleFileChange}
      />
        <div>
        <button
            onClick={handleClick}
            disabled={loading}
        >

            {
            loading ? (<div className="animate-spin h-6 w-6 border-4 border-white border-t-transparent rounded-full" />) : 
                (<SpotlightCard className="h-50 w-60 text-2xl text-white drop-shadow-lg flex items-center justify-center bg-white/5" style={{ fontFamily: 'Aileron' }}spotlightColor="rgba(128, 0, 128, 1)">
                    {label}
                </SpotlightCard>)
            }
            
        </button>
        </div>
    </>
  );
};

export default UploadButton;
