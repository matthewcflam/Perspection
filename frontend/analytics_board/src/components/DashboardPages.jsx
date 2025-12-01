import React from "react";
import MessagingDashboard from "./MessagingDashboard";
import FollowersDashboard from "./FollowersDashboard";
import EngagementDashboard from "./EngagementDashboard";

export default function DashboardPages({ dashPage, setDashPage }) {
  const dashboards = [
    <MessagingDashboard key="messaging" />,
    <FollowersDashboard key="followers" />,
    <EngagementDashboard key="engagement" />,
  ];

  return (
    <div className="relative w-full h-full flex overflow-x-auto snap-x snap-mandatory bg-white/10 backdrop-blur-xl shadow-2xl no-scrollbar">
      {dashboards.map((Component, i) => (
        <div
          key={i}
          className="w-full h-full flex-shrink-0 snap-start"
          style={{ display: i === dashPage ? "block" : "none" }}
        >
          {Component}
        </div>
      ))}
      {/* Arrows for navigation */}
      {dashPage > 0 && (
        <button
          onClick={() => setDashPage((p) => Math.max(p - 1, 0))}
          className="absolute top-1/2 left-4 -translate-y-1/2 text-white text-5xl font-light hover:scale-110 transition z-50"
        >
          ‹
        </button>
      )}
      {dashPage < dashboards.length - 1 && (
        <button
          onClick={() => setDashPage((p) => Math.min(p + 1, dashboards.length - 1))}
          className="absolute top-1/2 right-4 -translate-y-1/2 text-white text-5xl font-light hover:scale-110 transition z-50"
        >
          ›
        </button>
      )}
    </div>
  );
}
