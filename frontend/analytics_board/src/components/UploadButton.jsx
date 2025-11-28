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
        <div className="w-1/2">
        <button
            onClick={handleClick}
            disabled={loading}
            className="w-full h-full"
        >

            {
            loading ? 
                (<SpotlightCard 
                    className="h-screen w-full text-2xl text-white flex items-center justify-center" 
                    style={{ fontFamily: 'Aileron' }}
                    spotlightColor="rgba(250, 240, 197, 1)">
                    <div className="text-xl flex flex-col items-center justify-center w-full h-full" style={{ fontFamily: 'Aileron' }}>
                        Loading
                        <div className="animate-spin h-6 w-6 border-4 border-white border-t-transparent rounded-full mt-4" />
                    </div>
                </SpotlightCard>)
                : 
                (<SpotlightCard 
                    className="h-50 w-full text-2xl text-white flex items-center justify-center bg-white/5" 
                    style={{ fontFamily: 'Aileron' }}
                    spotlightColor="rgba(250, 240, 197, 1)">
                    {label}
                </SpotlightCard>)
            }
            
        </button>
        </div>
    </>
  );
};

export default UploadButton;