import React from "react";
import HeroHeader from "../HeroHeader";

import StatBlock from "../stats/StatBlock";
import StatMetric from "../stats/StatMetric";
import StatChart from "../stats/StatChart";

export default function LikesDashboard() {
  return (
    <div className="w-full h-full overflow-y-auto">

      {/* HERO */}
      <HeroHeader
        title="Your posts got 1,200 likes this week!"
        subtitle="Your content is blowing up!"
      />

      {/* CONTENT */}
      <div className="min-h-screen w-full flex flex-col items-center justify-center p-8">

        <h1 className="text-4xl font-bold mb-8 mt-8 text-white">
          Your Likes
        </h1>

        {/* SECTION 1 — Most Liked Posts */}
        <StatBlock
          title="Most Liked Posts"
          description="Your strongest performing content."
        >
          <StatMetric label="Top Photo" value="342 likes" />
          <StatMetric label="Top Reel" value="510 likes" />
          <StatMetric label="Top Carousel" value="198 likes" />
        </StatBlock>

        {/* SECTION 2 — Daily Like Activity */}
        <StatBlock
          title="Daily Like Activity"
          description="Likes received throughout the last 7 days."
        >
          <StatChart data={[12, 22, 14, 30, 18, 40, 55]} />
        </StatBlock>

        {/* SECTION 3 — Top Engagers */}
        <StatBlock
          title="Top Engagers"
          description="Who likes your posts the most."
        >
          <StatMetric label="Justin" value="89 likes" />
          <StatMetric label="Mia" value="63 likes" />
          <StatMetric label="David" value="50 likes" />
        </StatBlock>

      </div>
    </div>
  );
}
