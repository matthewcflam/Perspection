import React from "react";
import HeroHeader from "../HeroHeader";

import StatMetric from "../stats/StatMetric";
import StatChart from "../stats/StatChart";
import StatSection from "../stats/StatBlock";



export default function GoogleViewsDashboard() {

   // ---- PLACEHOLDERS for YouTube Account Age data ----
  const accountAgeDays = 1287;  // CHANGE TO API LATER
  const accountAgeYears = (accountAgeDays / 365).toFixed(1);

  return (
    <div className="w-full h-full overflow-y-auto">

      {/* HERO HEADER — now using account age */}
      <HeroHeader
        stat={`${accountAgeDays} Days`}
        title="You've been on YouTube for a long time buddy."
        subtitle={`That's about ${accountAgeYears} years of watching, liking, and eating alone!`}
      />

      {/* CONTENT BELOW — centered */}
      <div className="min-h-screen w-full flex flex-col items-center justify-center p-8 bg-transparent">

        <h1 className="text-4xl font-bold mb-8 mt-8 text-white">
          Your Messaging Habits
        </h1>

        {/* SECTION 1 — Message Frequency */}
        <StatSection
          title="Message Frequency"
          description="See how often you send and receive messages."
        >
          <StatMetric label="Messages Sent Today" value="142" />
          <StatMetric label="Messages Received Today" value="127" />
          <StatMetric label="Most Active Hour" value="9 PM" />
        </StatSection>

        {/* SECTION 2 — Top Contacts */}
        <StatSection
          title="Top Contacts"
          description="Your most messaged friends and groups."
        >
          <StatMetric label="Justin" value="459 messages" />
          <StatMetric label="David" value="231 messages" />
          <StatMetric label="Mia" value="198 messages" />
        </StatSection>

        {/* SECTION 3 — Trends Over Time with a Chart */}
        <StatSection
          title="Trends Over Time"
          description="Your messaging activity over the last week"
        >
          <StatChart data={[84, 102, 75, 120, 140, 160, 180]} />
        </StatSection>

      </div>
    </div>
  );
}
