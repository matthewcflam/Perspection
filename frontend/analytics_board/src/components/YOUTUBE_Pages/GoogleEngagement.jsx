import React from "react";
import HeroHeader from "../HeroHeader";

import StatBlock from "../stats/StatBlock";
import StatMetric from "../stats/StatMetric";
import StatChart from "../stats/StatChart";

export default function EngagementDashboard() {
  return (
    <div className="w-full h-full overflow-y-auto">

      {/* HERO HEADER */}
      <HeroHeader
        title="You texted Justin 100 times last night."
        subtitle="Are you guys gay?"
      />

      {/* CONTENT BELOW — centered */}
      <div className="min-h-screen w-full flex flex-col items-center justify-center p-8 bg-transparent">

        <h1 className="text-4xl font-bold mb-8 mt-8 text-white">
          Your Engagement
        </h1>

        {/* SECTION 1 — Likes & Comments */}
        <StatBlock
          title="Likes & Comments"
          description="Your most liked posts and comment interactions."
        >
          <StatMetric label="Total Likes (This Week)" value="1,204" />
          <StatMetric label="Total Comments (This Week)" value="349" />
          <StatMetric label="Most Liked Post" value="147 likes" />
        </StatBlock>

        {/* SECTION 2 — Engagement Rate */}
        <StatBlock
          title="Engagement Rate"
          description="How your audience responds to your content."
        >
          <StatMetric label="Overall Engagement Rate" value="8.4%" />
          <StatMetric label="Best Performing Day" value="Saturday" />
        </StatBlock>

        {/* SECTION 3 — Engagement Trend Chart */}
        <StatBlock
          title="Engagement Trend"
          description="Engagement over the last 7 days"
        >
          <StatChart data={[12, 15, 10, 18, 20, 22, 25]} />
        </StatBlock>

      </div>
    </div>
  );
}
