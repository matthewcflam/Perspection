// InstagramLikes.jsx
import React, { useEffect, useState } from "react";

// Back end base URL (e.g. Cloud Run URL)
// In Vite: VITE_API_BASE_URL="https://your-cloud-run-url.a.run.app"
const API_BASE = "https://alder-backend-265736855150.us-west1.run.app";

export default function InstagramLikes() {
  const [likedUsers, setLikedUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("access_token");
    if (!token) {
      setError("No access token found. Please log in.");
      setLoading(false);
      return;
    }

    async function fetchLikedUsers() {
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
          throw new Error(body.message || `Request failed with status ${res.status}`);
        }

        const data = await res.json();
        // data is an array of MetaLikedSchema:
        // { id, liked_name, number_likes }
        setLikedUsers(data);
      } catch (err) {
        setError(err.message || "Unknown error");
      } finally {
        setLoading(false);
      }
    }

    fetchLikedUsers();
  }, []);

  if (loading) {
    return (
      <div className="h-full w-full flex items-center justify-center text-white">
        Loading liked posts analytics…
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

  return (
    <div className="h-full w-full overflow-y-auto flex flex-col items-center p-8 bg-transparent">
      {/* ---------- Hero / Landing Section ---------- */}
      <section className="relative w-full h-screen snap-start flex flex-col items-center justify-center text-white gap-10">
        <div
          className="relative w-full bg-black overflow-y-visible"
          style={{ minHeight: "100vh", paddingBottom: "50vh" }}
        ></div>

        {/* Main heading */}
        <div className="absolute inset-0 flex top-1/4 justify-center z-10">
          <h1
            className="text-6xl font-bold text-white drop-shadow-lg text-center"
            style={{ fontFamily: "Aileron" }}
          >
            Your Most Liked Accounts
          </h1>
        </div>

        {/* Divider */}
        <div className="absolute inset-0 flex top-[35%] justify-center z-10">
          <div className="w-24 h-px bg-white mb-4" />
        </div>

        {/* Subheading */}
        <div className="absolute inset-0 flex top-1/2 justify-center z-10">
          <h2
            className="text-2xl text-white/80 drop-shadow-lg text-center w-120"
            style={{ fontFamily: "aileron" }}
          >
            See whose content you engage with the most.
          </h2>
        </div>
      </section>

      {/* ---------- Top Liked Accounts Card ---------- */}
      <h1 className="text-4xl font-bold mb-8 mt-8 text-white">
        Accounts You Like the Most
      </h1>

      <section className="mb-6 w-full max-w-2xl bg-white/10 rounded-xl p-6 shadow-lg">
        <h2 className="text-2xl font-semibold mb-4 text-white">
          Top Accounts by Number of Likes
        </h2>

        {likedUsers.length > 0 ? (
          <ul className="divide-y divide-white/10">
            {likedUsers.map((u) => (
              <li
                key={u.id}
                className="py-3 flex justify-between text-white/90"
              >
                {/* Backend: liked_name, number_likes */}
                <span className="font-medium">{u.liked_name}</span>
                <span className="text-sm text-white/60">
                  {u.number_likes} likes
                </span>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-white/70">
            No liked post data found for your account yet.
          </p>
        )}
      </section>
    </div>
  );
}
