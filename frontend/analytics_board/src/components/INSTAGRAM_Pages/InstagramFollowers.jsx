import React from "react";
import HeroHeader from "../HeroHeader";

import StatBlock from "../stats/StatBlock";
import StatMetric from "../stats/StatMetric";
import StatChart from "../stats/StatChart";

export default function FollowersDashboard() {
  return (
    <div className="w-full h-full overflow-y-auto">

      {/* HERO */}
      <HeroHeader
        title="You gained 100 followers last week!"
        subtitle="You're famous!"
      />

      {/* CONTENT */}
      <div className="min-h-screen w-full flex flex-col items-center justify-center p-8">

        <h1 className="text-4xl font-bold mb-8 mt-8 text-white">
          Your Followers
        </h1>

        {/* SECTION 1 — Follower Count */}
        <StatBlock
          title="Follower Count"
          description="Track your follower growth over time."
        >
          <StatMetric label="Total Followers" value="6,129" />
          <StatMetric label="New This Week" value="100" />
          <StatMetric label="Unfollows" value="12" />
        </StatBlock>

        {/* SECTION 2 — Top Followers */}
        <StatBlock
          title="Top Followers"
          description="People who engage with you the most."
        >
          <StatMetric label="Justin" value="342 interactions" />
          <StatMetric label="Mia" value="198 interactions" />
          <StatMetric label="David" value="214 interactions" />
        </StatBlock>

        {/* SECTION 3 — Follower Growth Chart */}
        <StatBlock
          title="Follower Growth (7 Days)"
          description="Daily new follower trends."
        >
          <StatChart data={[6, 10, 4, 20, 12, 18, 30]} />
        </StatBlock>

      </div>
    </div>
  );
}
