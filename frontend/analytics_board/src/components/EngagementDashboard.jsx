import React from "react";

export default function EngagementDashboard() {
  return (
    <div className="h-full w-full overflow-y-auto flex flex-col items-center p-8 bg-transparent">
      <h1 className="text-4xl font-bold mb-8 mt-8 text-white">Your Engagement</h1>
      <section className="mb-6 w-full max-w-2xl bg-white/10 rounded-xl p-6 shadow-lg">
        <h2 className="text-2xl font-semibold mb-2 text-white">Likes & Comments</h2>
        <p className="text-white">See your most liked posts and comments.</p>
      </section>
      <section className="mb-6 w-full max-w-2xl bg-white/10 rounded-xl p-6 shadow-lg">
        <h2 className="text-2xl font-semibold mb-2 text-white">Engagement Rate</h2>
        <p className="text-white">How engaged your audience is.</p>
      </section>
      {/* Add more sections/cards as needed */}
    </div>
  );
}
