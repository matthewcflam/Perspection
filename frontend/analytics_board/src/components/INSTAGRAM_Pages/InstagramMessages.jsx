import React, { useEffect, useState } from "react";
import HeroHeader from "../Not being used/HeroHeader";

import StatBlock from "../Stats/StatBlock";
import StatMetric from "../Stats/StatMetric";
import StatChart from "../Stats/StatChart";
import CurvedLoop from '../CurvedLoop';

const API_BASE = "https://alder-backend-265736855150.us-west1.run.app";

export default function MessagesDashboard() {
  const [topSenders, setTopSenders] = useState([]);
  const [topReceivers, setTopReceivers] = useState([]);
  const [messages, setMessages] = useState([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");



  // ───────────────────────────────────────────
  // FETCH DATA
  // ───────────────────────────────────────────
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
        throw new Error(body.message || `Request failed with ${res.status}`);
      }

      return res.json();
    }

    (async () => {
      try {
        const [senders, receivers, allMessages] = await Promise.all([
          fetchJSON("/meta/top5/senders"),
          fetchJSON("/meta/top5/receivers"),
          fetchJSON("/meta/messages"),
        ]);

        setTopSenders(senders);
        setTopReceivers(receivers);
        setMessages(allMessages);
      } catch (err) {
        setError(err.message || "Unknown error.");
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  // ───────────────────────────────────────────
  // LOADING / ERROR STATES
  // ───────────────────────────────────────────
  if (loading) {
    return (
      <div className="h-full w-full flex items-center justify-center text-white">
        Loading message analytics…
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

  // ───────────────────────────────────────────
  // DERIVED STATS
  // ───────────────────────────────────────────
  const today = new Date().toISOString().split("T")[0];

  const messagesSentToday = messages.filter(m =>
    (m.sender || m.from_user) === "YOU" && (m.timestamp || m.time)?.startsWith(today)
  ).length;

  const messagesReceivedToday = messages.filter(m =>
    (m.receiver || m.to_user) === "YOU" && (m.timestamp || m.time)?.startsWith(today)
  ).length;

  const mostActiveHour = (() => {
    const counts = {};
    messages.forEach((m) => {
      const ts = m.timestamp || m.time;
      if (!ts) return;
      const hour = new Date(ts).getHours();
      counts[hour] = (counts[hour] || 0) + 1;
    });

    let bestHour = "-";
    let max = 0;
    for (const [hour, count] of Object.entries(counts)) {
      if (count > max) {
        max = count;
        bestHour = `${hour}:00`;
      }
    }
    return bestHour;
  })();

  // Weekly trend (7 most recent days)
  const last7 = messages.slice(-50).map((m) => 1); // placeholder: count messages
  const trendData = last7.length ? last7 : [0, 0, 0, 0, 0, 0, 0];


  // ───────────────────────────────────────────
  // RENDER
  // ───────────────────────────────────────────
  return (
    <div className="w-full h-full overflow-y-auto">

      {/* HERO */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-bl from-yellow-400 via-purple-400 to-purple-900">
        <div style={{ width: '100%', height: '600px', position: 'relative' }}>
        </div>
      </div>
      <section className="relative w-full h-screen snap-start flex flex-col items-center justify-center text-white">
        <CurvedLoop marqueeText="Slide into my DMs" />
      </section>
      

      {/* CONTENT */}
      <section>
        <div className="min-h-screen w-full flex flex-col items-center justify-start p-8">

          <h1 className="text-4xl font-bold mb-8 mt-8 text-white" style={{ fontFamily: 'Aileron' }}>
            Message Analytics
          </h1>

          {/* SECTION 1 — Message Frequency */}
          <StatBlock
            title="Message Frequency"
            description="How often you're messaging people."
          >
            <StatMetric label="Messages Sent Today" value={messagesSentToday} />
            <StatMetric label="Messages Received Today" value={messagesReceivedToday} />
            <StatMetric label="Most Active Hour" value={mostActiveHour} />
          </StatBlock>

          {/* SECTION 2 — Top Contacts */}
          <StatBlock
            title="Top Contacts"
            description="Your most active conversation partners."
          >
            {topSenders.slice(0, 3).map((s, i) => (
              <StatMetric
                key={i}
                label={s.username || s.sender || s.user}
                value={`${s.count || s.total_messages} messages`}
              />
            ))}
          </StatBlock>

          {/* SECTION 3 — Weekly Message Trends */}
          <StatBlock
            title="Weekly Message Trends"
            description="Your message activity over 7 days."
          >
            <StatChart data={trendData} />
          </StatBlock>

        </div>
      </section>
    </div>
  );
}
