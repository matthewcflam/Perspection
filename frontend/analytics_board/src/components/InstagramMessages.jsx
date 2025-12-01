// MessagesDashboard.jsx
import React, { useEffect, useState } from "react";

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
        const [
          sendersData,
          receiversData,
          messagesData,
        ] = await Promise.all([
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

  return (
    <div className="h-full w-full overflow-y-auto flex flex-col items-center p-8 bg-transparent">
      <h1 className="text-4xl font-bold mb-8 mt-8 text-white">
        Messaging Analytics
      </h1>

      {/* -------- Top message senders -------- */}
      <section className="mb-6 w-full max-w-2xl bg-white/10 rounded-xl p-6 shadow-lg">
        <h2 className="text-2xl font-semibold mb-2 text-white">Top Message Senders</h2>
        {topSenders && topSenders.length > 0 ? (
          <ul className="divide-y divide-white/10">
            {topSenders.map((s, idx) => (
              <li key={idx} className="py-2 flex justify-between text-white/90">
                <span>{s.username || s.sender || s.user}</span>
                <span className="text-sm text-white/60">
                  {s.count || s.message_count || s.total_messages} msgs
                </span>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-white/70">No sender data available yet.</p>
        )}
      </section>

      {/* -------- Top message receivers -------- */}
      <section className="mb-6 w-full max-w-2xl bg-white/10 rounded-xl p-6 shadow-lg">
        <h2 className="text-2xl font-semibold mb-2 text-white">Top Message Receivers</h2>
        {topReceivers && topReceivers.length > 0 ? (
          <ul className="divide-y divide-white/10">
            {topReceivers.map((r, idx) => (
              <li key={idx} className="py-2 flex justify-between text-white/90">
                <span>{r.username || r.receiver || r.user}</span>
                <span className="text-sm text-white/60">
                  {r.count || r.message_count || r.total_messages} msgs
                </span>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-white/70">No receiver data available yet.</p>
        )}
      </section>

      {/* -------- Full messages table -------- */}
      <section className="mb-6 w-full max-w-4xl bg-white/10 rounded-xl p-6 shadow-lg">
        <h2 className="text-2xl font-semibold mb-2 text-white">Message History</h2>
        {messages && messages.length > 0 ? (
          <div className="max-h-96 overflow-y-auto">
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
                    <td className="py-2 pr-4">{m.sender || m.from_user}</td>
                    <td className="py-2 pr-4">{m.receiver || m.to_user}</td>
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
      </section>
    </div>
  );
}