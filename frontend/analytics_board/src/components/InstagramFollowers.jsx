// InstagramFollowers.jsx
import React, { useEffect, useState } from "react";

const API_BASE = "https://alder-backend-265736855150.us-west1.run.app";

export default function InstagramFollowers() {
  const [metrics, setMetrics] = useState(null);              // followers & following
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
        const [metricsData, nfbData] = await Promise.all([
          fetchJSON("/meta/all_meta_metrics"),
          fetchJSON("/meta/not-following-back"),
        ]);

        setMetrics(metricsData);
        setNotFollowingBack(nfbData); // array of { id, username }
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
    <div className="h-full w-full overflow-y-auto flex flex-col items-center p-8 bg-transparent">
      <h1 className="text-4xl font-bold mb-8 mt-8 text-white">Your Followers</h1>

      {/* ---------- Follower Count ---------- */}
      <section className="mb-6 w-full max-w-2xl bg-white/10 rounded-xl p-6 shadow-lg">
        <h2 className="text-2xl font-semibold mb-3 text-white">Follower Count</h2>

        {metrics ? (
          <div className="text-white space-y-1">
            <p>
              Followers:{" "}
              <span className="font-semibold">{metrics.followers}</span>
            </p>
            <p>
              Following:{" "}
              <span className="font-semibold">{metrics.following}</span>
            </p>
          </div>
        ) : (
          <p className="text-white/70">No follower data found.</p>
        )}
      </section>

      {/* ---------- Not Following Back (with count + truncation) ---------- */}
      <section className="mb-6 w-full max-w-2xl bg-white/10 rounded-xl p-6 shadow-lg">
        <div className="flex items-baseline justify-between mb-3">
          <h2 className="text-2xl font-semibold text-white">
            Not Following You Back
            {totalNFB > 0 && (
              <span className="text-lg text-white/70 ml-2">
                ({totalNFB})
              </span>
            )}
          </h2>
        </div>

        {totalNFB > 0 ? (
          <>
            {/* Scrollable list area so it doesn't blow up the layout */}
            <div className="max-h-64 overflow-y-auto border border-white/10 rounded-lg">
              <ul className="divide-y divide-white/10">
                {visibleList.map((u) => (
                  <li key={u.id} className="py-2 px-3 text-white/90">
                    {u.username}
                  </li>
                ))}
              </ul>
            </div>

            {/* Show more / less controls */}
            {totalNFB > 20 && (
              <div className="mt-3 flex justify-end">
                <button
                  onClick={() =>
                    setVisibleCount(isShowingAll ? 20 : totalNFB)
                  }
                  className="text-sm text-white/80 underline hover:text-white"
                >
                  {isShowingAll
                    ? "Show less"
                    : `Show all (${totalNFB})`}
                </button>
              </div>
            )}
          </>
        ) : (
          <p className="text-white/70">Everyone follows you back—nice!</p>
        )}
      </section>
    </div>
  );
}
