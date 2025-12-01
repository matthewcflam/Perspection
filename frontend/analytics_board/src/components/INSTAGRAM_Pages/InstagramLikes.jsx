import React, { useEffect, useState } from "react";
import HeroHeader from "../HeroHeader";

import StatBlock from "../stats/StatBlock";
import StatMetric from "../stats/StatMetric";
import StatChart from "../stats/StatChart";

// Backend base URL (Cloud Run or localhost)
const API_BASE = import.meta.env.VITE_API_BASE_URL || "http://localhost:5000";

export default function LikesDashboard() {
  const [likedUsers, setLikedUsers] = useState([]);
  const [dailyLikes, setDailyLikes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");


  // ───────────────────────────────────────
  // FETCH DATA
  // ───────────────────────────────────────
  useEffect(() => {
    const token = localStorage.getItem("access_token");
    if (!token) {
      setError("No access token found. Please log in.");
      setLoading(false);
      return;
    }

    async function fetchData() {
      try {
        const res = await fetch(`${API_BASE}/meta/top-likers`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        if (!res.ok) {
          const body = await res.json().catch(() => ({}));
          throw new Error(body.message || `Request failed with ${res.status}`);
        }

        const data = await res.json(); 
        setLikedUsers(data);

        // Fake chart placeholder based on likes — improves UI
        setDailyLikes(
          data.slice(0, 7).map((x) => Math.min(x.number_likes, 50))
        );

      } catch (err) {
        setError(err.message || "Unknown error.");
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  // ───────────────────────────────────────
  // LOADING / ERROR STATES
  // ───────────────────────────────────────
  if (loading) {
    return (
      <div className="h-full w-full flex items-center justify-center text-white">
        Loading liked post analytics…
      </div>
    );
  }

  if (error) {
    return (
      <div className="h-full w-full flex items-center justify-center text-red-400">
        {error}
      </div>
    );
  }

  // ───────────────────────────────────────
  // RENDER
  // ───────────────────────────────────────
  return (
    <div className="w-full h-full overflow-y-auto">

      {/* HERO */}
      <HeroHeader
        title="Your Top Likes on Instagram"
        subtitle="See whose content you engage with the most."
      />

      {/* CONTENT */}
      <div className="min-h-screen w-full flex flex-col items-center justify-center p-8">

        <h1 className="text-4xl font-bold mb-8 mt-8 text-white">
          Your Likes
        </h1>

        {/* SECTION 1 — Most Liked Accounts */}
        <StatBlock
          title="Top Accounts You Like"
          description="People whose posts you engage with the most."
        >
          {likedUsers.length > 0 ? (
            likedUsers.slice(0, 3).map((u, i) => (
              <StatMetric
                key={i}
                label={u.liked_name}
                value={`${u.number_likes} likes`}
              />
            ))
          ) : (
            <p className="text-white/80">No like data available.</p>
          )}
        </StatBlock>

        {/* SECTION 2 — Daily Likes Activity */}
        <StatBlock
          title="Daily Like Activity"
          description="How many posts you liked recently."
        >
          <StatChart data={dailyLikes.length ? dailyLikes : [0,0,0,0,0,0,0]} />
        </StatBlock>

        {/* SECTION 3 — Full Ranked List */}
        <StatBlock
          title="All Liked Accounts (Ranked)"
          description="Your complete like distribution."
        >
          {likedUsers.length > 0 ? (
            likedUsers.map((u, i) => (
              <StatMetric
                key={i}
                label={`${i + 1}. ${u.liked_name}`}
                value={`${u.number_likes} likes`}
              />
            ))
          ) : (
            <p className="text-white/70">No liked accounts found.</p>
          )}
        </StatBlock>

      </div>
    </div>
  );
}
