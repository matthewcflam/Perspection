// InstagramLikes.jsx
import React, { useEffect, useState } from "react";

import HeroHeader from "../HeroHeader";
import StatBlock from "../stats/StatBlock";
import StatMetric from "../stats/StatMetric";
import StatChart from "../stats/StatChart";
import DarkVeil from "../DarkVeil";
import BubbleMenu from '../BubbleMenu'

// Back end base URL (e.g. Cloud Run URL)
const API_BASE = "https://alder-backend-265736855150.us-west1.run.app";

export default function InstagramLikes() {
  const [likedUsers, setLikedUsers] = useState([]);   // [{ id, liked_name, number_likes }]
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
          throw new Error(
            body.message || `Request failed with status ${res.status}`
          );
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

  // ----- Derived metrics for stat blocks -----
  const totalAccounts = likedUsers.length;
  const totalLikes = likedUsers.reduce(
    (sum, u) => sum + (u.number_likes ?? 0),
    0
  );

  const topAccount = likedUsers[0]?.liked_name ?? null;
  const topAccountLikes = likedUsers[0]?.number_likes ?? null;

  // For chart: just take top N accounts' like counts (e.g. top 7)
  const chartData = likedUsers
    .slice(0, 7)
    .map((u) => u.number_likes ?? 0);

    const items = [
    {
      label: 'You',
      href: '#',
      ariaLabel: 'Home',
      rotation: -8,
      hoverStyles: { bgColor: '#3b82f6', textColor: '#ffffff' }
    },
    {
      label: 'liked',
      href: '#',
      ariaLabel: 'About',
      rotation: 8,
      hoverStyles: { bgColor: '#10b981', textColor: '#ffffff' }
    },
    {
      label: 'so',
      href: '#',
      ariaLabel: 'Projects',
      rotation: 8,
      hoverStyles: { bgColor: '#f59e0b', textColor: '#ffffff' }
    },
    {
      label: 'many',
      href: '#',
      ariaLabel: 'Blog',
      rotation: 8,
      hoverStyles: { bgColor: '#ef4444', textColor: '#ffffff' }
    },
    {
      label: 'posts!',
      href: '#',
      ariaLabel: 'Contact',
      rotation: -8,
      hoverStyles: { bgColor: '#8b5cf6', textColor: '#ffffff' }
    }
  ];

  return (
    <div className="w-full h-full overflow-y-auto">
      {/* HERO */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-br from-purple-600 via-pink-500 to-orange-500">
        <div style={{ width: '100%', height: '600px', position: 'relative' }}>
        </div>
      </div>
      <section className="relative w-full h-screen snap-start flex flex-col items-center justify-center text-white">

        {/* <div className="absolute inset-0 flex top-2/5 justify-center z-10">
          <h1 className="text-6xl font-bold text-white drop-shadow-lg" style={{ fontFamily: 'Aileron' }}>
            You liked {totalLikes.toLocaleString()} posts!
          </h1>
        </div>

        <div className="absolute inset-0 flex top-3/5 justify-center z-10">
          <h1 className="text-2xl text-white/80 drop-shadow-lg text-center w-120">
            Quit being a fan.
          </h1>
        </div> */}

        <BubbleMenu
          logo={<span style={{ fontWeight: 700 }}>RB</span>}
          items={items}
          menuAriaLabel="Toggle navigation"
          menuBg="#ffffff"
          menuContentColor="#fffffff"
          useFixedPosition={false}
          animationEase="back.out(1.5)"
          animationDuration={0.5}
          staggerDelay={0.12}
        />
      </section>



      {/* CONTENT */}
      <section>
        <div className="min-h-screen w-full flex flex-col items-center justify-start p-8">
          <h1 className="text-4xl font-bold mb-8 mt-8 text-white" style={{ fontFamily: 'Aileron' }}>
            Likes Analytics
          </h1>

          {/* -------- Likes Overview -------- */}
          <StatBlock
            title="Likes Overview"
            description="A high-level summary of the accounts you like the most."
          >
            <StatMetric
              label="Total Liked Accounts"
              value={totalAccounts.toLocaleString()}
            />
            <StatMetric
              label="Total Likes Given"
              value={totalLikes.toLocaleString()}
            />
            {topAccount && (
              <StatMetric
                label="Top Liked Account"
                value={topAccount}
                trend={
                  topAccountLikes != null
                    ? `${topAccountLikes} likes`
                    : undefined
                }
              />
            )}
          </StatBlock>

          {/* -------- Top Liked Accounts (your existing list, just inside StatBlock) -------- */}
          <StatBlock
            title="Top Accounts by Number of Likes"
            description="These are the accounts whose posts you like the most."
          >
            {likedUsers.length > 0 ? (
              <ul className="divide-y divide-white/10 w-full" style={{ fontFamily: 'Aileron' }}>
                {likedUsers.map((u) => (
                  <li
                    key={u.id}
                    className="py-3 flex justify-between text-white/90"
                  >
                    <span className="font-medium">{u.liked_name}</span>
                    <span className="text-sm text-white/60">
                      {u.number_likes} likes
                    </span>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-white/70" style={{ fontFamily: 'Aileron' }}>
                No liked post data found for your account yet.
              </p>
            )}
          </StatBlock>
        </div>
      </section>
    </div>
  );
}