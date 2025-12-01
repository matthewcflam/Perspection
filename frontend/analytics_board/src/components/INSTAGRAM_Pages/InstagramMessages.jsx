import React from "react";
import HeroHeader from "../HeroHeader";

import StatBlock from "../stats/StatBlock";
import StatMetric from "../stats/StatMetric";
import StatChart from "../stats/StatChart";

export default function MessagesDashboard() {
  return (
    <div className="w-full h-full overflow-y-auto">

      {/* HERO */}
      <HeroHeader
        title="You sent over 1,000 messages this week!"
        subtitle="You really love talking."
      />

      {/* CONTENT */}
      <div className="min-h-screen w-full flex flex-col items-center justify-center p-8">

        <h1 className="text-4xl font-bold mb-8 mt-8 text-white">
          Your Messages
        </h1>

        {/* SECTION 1 — Message Frequency */}
        <StatBlock
          title="Message Frequency"
          description="How often you're messaging people."
        >
          <StatMetric label="Messages Sent Today" value="142" />
          <StatMetric label="Messages Received Today" value="127" />
          <StatMetric label="Most Active Hour" value="9 PM" />
        </StatBlock>

        {/* SECTION 2 — Top Contacts */}
        <StatBlock
          title="Top Contacts"
          description="Your most active conversation partners."
        >
          <StatMetric label="Justin" value="459 messages" />
          <StatMetric label="Mia" value="231 messages" />
          <StatMetric label="David" value="198 messages" />
        </StatBlock>

        {/* SECTION 3 — Weekly Message Trends */}
        <StatBlock
          title="Weekly Message Trends"
          description="Your message activity over 7 days."
        >
          <StatChart data={[84, 102, 75, 120, 140, 160, 180]} />
        </StatBlock>

      </div>
    </div>
  );
}
