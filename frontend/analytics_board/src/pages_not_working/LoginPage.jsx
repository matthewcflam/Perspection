import GlobalBackground from "../../components/GlobalBackground";
import OpenDashboardButton from "../components/OpenDashboardButton";
import GoogleButton from "../components/GoogleButton";
import InstagramButton from "../components/InstagramButton";
import { useNavigate } from "react-router-dom";

export default function LoginPage() {
  const nav = useNavigate();

  return (
    <div className="relative w-full h-screen flex flex-col items-center justify-center text-white">
      <div className="absolute inset-0 -z-10">
        <GlobalBackground />
      </div>

      <div className="flex flex-col gap-4 w-[300px]">
        <OpenDashboardButton onOpen={() => nav("/dashboard")} />
        <GoogleButton />
        <InstagramButton />
      </div>
    </div>
  );
}
