// MessagesDashboard.jsx
import React, { useEffect, useState } from "react";

import HeroHeader from "../HeroHeader";
import StatBlock from "../stats/StatBlock";
import StatMetric from "../stats/StatMetric";
import StatChart from "../stats/StatChart";

// VITE_API_BASE_URL="https://meta-api-abc123-uc.a.run.app"
const API_BASE = "https://alder-backend-265736855150.us-west1.run.app";

export default function MessagesDashboard() {
  const [topSenders, setTopSenders] = useState([]);
  const [topReceivers, setTopReceivers] = useState([]);
  const [messages, setMessages] = useState([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

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
        const [sendersData, receiversData, messagesData] = await Promise.all([
          fetchJSON("/meta/top5/senders"),
          fetchJSON("/meta/top5/receivers"),
          fetchJSON("/meta/messages"),
        ]);

        setTopSenders(sendersData);
        setTopReceivers(receiversData);
        setMessages(messagesData);
      } catch (err) {
        setError(err.message || "Unknown error");
      } finally {
        setLoading(false);
      }
    })();
  }, []);

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

  // -------- Derived metrics for stat blocks --------
  const totalMessages = messages.length;
  const distinctTopSenders = topSenders.length;
  const distinctTopReceivers = topReceivers.length;

  const topSenderName =
    topSenders[0]?.username || topSenders[0]?.sender || topSenders[0]?.user;
  const topSenderCount =
    topSenders[0]?.count ||
    topSenders[0]?.message_count ||
    topSenders[0]?.total_messages;

  const topReceiverName =
    topReceivers[0]?.username || topReceivers[0]?.receiver || topReceivers[0]?.user;
  const topReceiverCount =
    topReceivers[0]?.count ||
    topReceivers[0]?.message_count ||
    topReceivers[0]?.total_messages;

  // For chart: message counts of top senders
  const senderChartData = topSenders.map(
    (s) => s.count || s.message_count || s.total_messages || 0
  );

  return (
    <div className="w-full h-full overflow-y-auto">
      {/* HERO */}
      <HeroHeader
        title="Messaging Analytics"
        subtitle="See who you talk to the most and how your conversations flow."
      />

      {/* CONTENT */}
      <div className="min-h-screen w-full flex flex-col items-center justify-start p-8">
        <h1 className="text-4xl font-bold mb-8 mt-8 text-white">
          DM & Message Insights
        </h1>

        {/* -------- Messaging Overview -------- */}
        <StatBlock
          title="Messaging Overview"
          description="A quick snapshot of your messaging activity."
        >
          <StatMetric
            label="Total Messages"
            value={totalMessages.toLocaleString()}
          />
          <StatMetric
            label="Top Senders (Shown)"
            value={distinctTopSenders.toString()}
          />
          <StatMetric
            label="Top Receivers (Shown)"
            value={distinctTopReceivers.toString()}
          />
          {topSenderName && (
            <StatMetric
              label="Most Frequent Sender"
              value={topSenderName}
              trend={
                topSenderCount != null ? `${topSenderCount} msgs` : undefined
              }
            />
          )}
        </StatBlock>

        {/* -------- Top Message Senders -------- */}
        <StatBlock
          title="Top Message Senders"
          description="People who send you the most messages."
        >
          {topSenders && topSenders.length > 0 ? (
            <ul className="divide-y divide-white/10 w-full">
              {topSenders.map((s, idx) => (
                <li
                  key={idx}
                  className="py-2 flex justify-between text-white/90"
                >
                  <span>{s.username || s.sender || s.user}</span>
                  <span className="text-sm text-white/60">
                    {(s.count ||
                      s.message_count ||
                      s.total_messages ||
                      0) + " msgs"}
                  </span>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-white/70">No sender data available yet.</p>
          )}
        </StatBlock>

        {/* -------- Top Message Receivers -------- */}
        <StatBlock
          title="Top Message Receivers"
          description="People you send the most messages to."
        >
          {topReceivers && topReceivers.length > 0 ? (
            <ul className="divide-y divide-white/10 w-full">
              {topReceivers.map((r, idx) => (
                <li
                  key={idx}
                  className="py-2 flex justify-between text-white/90"
                >
                  <span>{r.username || r.receiver || r.user}</span>
                  <span className="text-sm text-white/60">
                    {(r.count ||
                      r.message_count ||
                      r.total_messages ||
                      0) + " msgs"}
                  </span>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-white/70">No receiver data available yet.</p>
          )}
        </StatBlock>

        {/* -------- Message Volume Chart (Top Senders) -------- */}
        <StatBlock
          title="Message Volume (Top Senders)"
          description="Relative message counts for your top senders."
        >
          <StatChart data={senderChartData.length ? senderChartData : [0]} />
        </StatBlock>

        {/* -------- Full messages table -------- */}
        <StatBlock
          title="Message History"
          description="A scrollable view of your recent messages."
        >
          {messages && messages.length > 0 ? (
            <div className="max-h-96 overflow-y-auto w-full">
              <table className="w-full text-left text-sm text-white/90">
                <thead className="border-b border-white/20 text-white/70">
                  <tr>
                    <th className="py-2 pr-4">From</th>
                    <th className="py-2 pr-4">To</th>
                    <th className="py-2 pr-4">Message</th>
                    <th className="py-2">Time</th>
                  </tr>
                </thead>
                <tbody>
                  {messages.map((m, idx) => (
                    <tr key={idx} className="border-b border-white/10">
                      <td className="py-2 pr-4">
                        {m.sender || m.from_user}
                      </td>
                      <td className="py-2 pr-4">
                        {m.receiver || m.to_user}
                      </td>
                      <td className="py-2 pr-4 max-w-xs truncate">
                        {m.text || m.message || m.content}
                      </td>
                      <td className="py-2 text-xs text-white/60">
                        {m.timestamp || m.time}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <p className="text-white/70">No messages available.</p>
          )}
        </StatBlock>
      </div>
    </div>
  );
}