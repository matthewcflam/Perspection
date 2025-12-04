import { useState } from "react";
import axios from "axios";

export default function GoogleSignInButton({ uploaded, setUploaded, onUploaded }) {
  const [loading, setLoading] = useState(false);

  const handleGoogleSignIn = async () => {
    console.log('Google sign-in button clicked');
    console.log('Current upload status:', uploaded);
    
    if (uploaded === true) {
      // Already signed in, go to dashboard
      console.log('Already signed in, navigating to dashboard');
      onUploaded();
      return;
    }

    console.log('Starting Google sign-in process...');
    setLoading(true);
    setUploaded("loading");

    try {
      const token = localStorage.getItem('access_token');
      console.log('Retrieved token:', token ? 'Token exists' : 'No token found');
      
      console.log('Sending request to /link endpoint...');
      console.log('Request payload:', {
        platform: "google",
        data: "ignore",
        account_name: "Google User"
      });
      
      // Call the /link endpoint with Google data
      const response = await axios.post("https://alder-backend-265736855150.us-west1.run.app/link", {
        platform: "google",
        data: ["ignore"],
        account_name: "Google User"
      }, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      console.log('Google sign-in successful!');
      console.log('Response data:', response.data);

      // Sign-in successful
      setUploaded(true);
      setLoading(false);
    } catch (error) {
      console.error('Google sign-in failed:', error);
      console.error('Error status:', error.response?.status);
      console.error('Error data:', error.response?.data);
      console.error('Error message:', error.response?.data?.message || error.message);
      alert('Google sign-in failed: ' + (error.response?.data?.message || error.message));
      setUploaded(false);
      setLoading(false);
    }
  };

  // Google icon
  const googleIcon = (
    <img 
      src="https://upload.wikimedia.org/wikipedia/commons/5/5b/YouTube_Bottom.png"
      alt="Google Icon"
      className="w-8 h-8 mb-1"
    />
  );

  // Google blue glow
  const glowClass = "shadow-[0_0_25px_4px_rgba(250,255,255,0.8)]";

  return (
    <div
      onClick={handleGoogleSignIn}
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

      {/* STATES */}
      {uploaded === false && !loading && (
        <div className="flex flex-col items-center z-10">
          {googleIcon}
          <span className="text-xl font-semibold mt-3">Sign in with Google</span>
          <span className="text-sm opacity-70 mt-1">Click to connect</span>
        </div>
      )}

      {(uploaded === "loading" || loading) && (
        <div className="text-lg text-white/80 animate-pulse z-10">
          Signing in…
        </div>
      )}

      {uploaded === true && !loading && (
        <div className="flex flex-col items-center gap-1 z-10">
          {googleIcon}
          <span className="text-xl font-bold text-green-300">
            VIEW STATISTICS
          </span>
          <span className="text-xs font-semibold uppercase tracking-wide">
            Google Data
          </span>
        </div>
      )}
    </div>
  );
}
