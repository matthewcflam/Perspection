// FollowersDashboard.jsx
import React, { useEffect, useState } from "react";

import HeroHeader from "../HeroHeader";
import StatBlock from "../stats/StatBlock";
import StatMetric from "../stats/StatMetric";

const API_BASE = "https://alder-backend-265736855150.us-west1.run.app";

export default function FollowersDashboard() {
  const [notFollowingBack, setNotFollowingBack] = useState([]); // [{ id, username }]
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // How many "not following back" users to show by default
  const [visibleCount, setVisibleCount] = useState(20);

  useEffect(() => {
    const token = localStorage.getItem("access_token");
    if (!token) {
      setError("No access token found. Please log in.");
      setLoading(false);
      return;
    }

    async function fetchJSON(path) {
      const res = await fetch(`${API_BASE}${path}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        throw new Error(body.message || `Request failed with status ${res.status}`);
      }

      return res.json();
    }

    (async () => {
      try {
        // ✅ Only hit this endpoint now
        const nfbData = await fetchJSON("/meta/not-following-back");
        // Expect: array of { id, username }
        setNotFollowingBack(nfbData || []);
      } catch (err) {
        setError(err.message || "Unknown error occurred");
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  if (loading) {
    return (
      <div className="h-full w-full flex items-center justify-center text-white">
        Loading follower analytics…
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

  const totalNFB = notFollowingBack.length;
  const isShowingAll = visibleCount >= totalNFB;
  const visibleList = notFollowingBack.slice(0, visibleCount);

  return (
    <div className="w-full h-full overflow-y-auto">
      {/* HERO */}
      <HeroHeader
        title={
          totalNFB > 0
            ? `You have ${totalNFB} accounts not following you back`
            : "Everyone you follow follows you back!"
        }
        subtitle="See which accounts you follow that don't follow you back."
      />

      {/* CONTENT */}
      <div className="min-h-screen w-full flex flex-col items-center justify-start p-8">
        <h1 className="text-4xl font-bold mb-8 mt-8 text-white">
          Your Followers
        </h1>

        {/* --------- OVERVIEW BLOCK (based only on not-following-back) --------- */}
        <StatBlock
          title="Follower Overview"
          description="Summary based on accounts that are not following you back."
        >
          <StatMetric
            label="Not Following You Back"
            value={totalNFB.toLocaleString()}
            trend={totalNFB > 0 ? `-${totalNFB}` : "+0"}
          />
        </StatBlock>

        {/* --------- NOT FOLLOWING BACK LIST --------- */}
        <StatBlock
          title="Not Following You Back"
          description="Accounts you follow that don't follow you back."
        >
          {totalNFB > 0 ? (
            <>
              <div className="max-h-64 w-full overflow-y-auto border border-white/10 rounded-lg">
                <ul className="divide-y divide-white/10">
                  {visibleList.map((u) => (
                    <li key={u.id} className="py-2 px-3 text-white/90">
                      {u.username}
                    </li>
                  ))}
                </ul>
              </div>

              {totalNFB > 20 && (
                <div className="mt-3 flex justify-end">
                  <button
                    onClick={() =>
                      setVisibleCount(isShowingAll ? 20 : totalNFB)
                    }
                    className="text-sm text-white/80 underline hover:text-white"
                  >
                    {isShowingAll ? "Show less" : `Show all (${totalNFB})`}
                  </button>
                </div>
              )}
            </>
          ) : (
            <p className="text-white/70">
              Everyone follows you back—nice!
            </p>
          )}
        </StatBlock>
      </div>
    </div>
  );
}
