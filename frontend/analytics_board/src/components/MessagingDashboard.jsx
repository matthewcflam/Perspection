import React from "react";

export default function MessagingDashboard() {
  return (
    <div className="h-full w-full overflow-y-auto flex flex-col items-center p-8 bg-transparent">
      <h1 className="text-4xl font-bold mb-8 mt-8 text-white">Your Messaging Habits</h1>
      <section className="mb-6 w-full max-w-2xl bg-white/10 rounded-xl p-6 shadow-lg">
        <h2 className="text-2xl font-semibold mb-2 text-white">Message Frequency</h2>
        <p className="text-white">See how often you send and receive messages.</p>
      </section>
      <section className="mb-6 w-full max-w-2xl bg-white/10 rounded-xl p-6 shadow-lg">
        <h2 className="text-2xl font-semibold mb-2 text-white">Top Contacts</h2>
        <p className="text-white">Your most messaged friends and groups.</p>
      </section>
      <section className="mb-6 w-full max-w-2xl bg-white/10 rounded-xl p-6 shadow-lg">
        <h2 className="text-2xl font-semibold mb-2 text-white">Trends Over Time</h2>
        <p className="text-white">How your messaging habits change week to week.</p>
      </section>
      {/* Add more sections/cards as needed */}
    </div>
  );
}
