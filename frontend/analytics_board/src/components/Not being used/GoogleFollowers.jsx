import React from "react";

export default function GoogleFollowers() {
  return (
    <div className="h-full w-full overflow-y-auto flex flex-col items-center p-8 bg-transparent">
      <h1 className="text-4xl font-bold mb-8 mt-8 text-white">Your Followers</h1>
      <section className="mb-6 w-full max-w-2xl bg-white/10 rounded-xl p-6 shadow-lg">
        <h2 className="text-2xl font-semibold mb-2 text-white">Follower Count</h2>
        <p className="text-white">Track your follower growth over time.</p>
      </section>
      <section className="mb-6 w-full max-w-2xl bg-white/10 rounded-xl p-6 shadow-lg">
        <h2 className="text-2xl font-semibold mb-2 text-white">Top Followers</h2>
        <p className="text-white">See who interacts with you the most.</p>
      </section>
      {/* Add more sections/cards as needed */}
    </div>
  );
}
