import { useState, useRef, useEffect } from "react";
import GlobalBackground from "../components/GlobalBackground";

import StatCard from "../components/StatCard";
import ActivityCard from "../components/ActivityCard";
import EngagementCard from "../components/EngagementCard";
import CloseDashboardButton from "../components/CloseDashboardButton";

import { useNavigate } from "react-router-dom";

export default function DashboardPage() {
  const nav = useNavigate();
  const [page, setPage] = useState(0);
  const scrollRef = useRef(null);

  // keep horizontal scrolling working
  useEffect(() => {
    if (!scrollRef.current) return;
    const width = scrollRef.current.clientWidth;
    scrollRef.current.scrollTo({
      left: page * width,
      behavior: "smooth",
    });
  }, [page]);

  return (
    <div className="relative w-full h-screen flex flex-col items-center justify-center">
      <div className="absolute inset-0 -z-10">
        <GlobalBackground />
      </div>

      {/* Close Dashboard */}
      <button className="absolute top-4 right-4" onClick={() => nav("/login")}>
        <CloseDashboardButton />
      </button>

      <h1 className="text-5xl text-white mb-6 font-bold">Your Statistics!</h1>

      <div
        ref={scrollRef}
        className="relative w-full max-w-5xl h-[75vh] flex overflow-x-auto snap-x snap-mandatory scrollbar-hide rounded-3xl bg-white/10 backdrop-blur-xl border border-white/20 shadow-xl"
      >
        <div className="w-full h-full flex-shrink-0 snap-start p-6">
          <StatCard />
        </div>

        <div className="w-full h-full flex-shrink-0 snap-start p-6">
          <ActivityCard />
        </div>

        <div className="w-full h-full flex-shrink-0 snap-start p-6">
          <EngagementCard />
        </div>
      </div>

      {/* Page dots */}
      <div className="flex gap-3 mt-4">
        {[0, 1, 2].map((i) => (
          <button
            key={i}
            onClick={() => setPage(i)}
            className={`rounded-full ${
              page === i ? "w-3 h-3 bg-white scale-125" : "w-2 h-2 bg-white/40"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
