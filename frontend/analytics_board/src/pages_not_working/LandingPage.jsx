import RotatingText from "../components/RotatingText";
import GlobalBackground from "../components/GlobalBackground";
import { Link } from "react-router-dom";

export default function LandingPage() {
  return (
    <div className="relative w-full h-screen text-white flex flex-col items-center justify-center">
      <div className="absolute inset-0 -z-10">
        <GlobalBackground />
      </div>

      <div className="text-6xl font-bold flex gap-3">
        <span>Learn about your</span>
        <RotatingText
          texts={["Stats", "Followers", "Growth", "Reach", "Impressions"]}
        />
      </div>

      <Link
        to="/login"
        className="text-5xl mt-10 animate-bounce hover:scale-110 transition"
      >
        ↓
      </Link>
    </div>
  );
}
