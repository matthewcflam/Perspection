import React from "react";
import HeroHeader from "../HeroHeader";

import StatBlock from "../stats/StatBlock";  
import StatMetric from "../stats/StatMetric";
import StatChart from "../stats/StatChart";


export default function FollowersDashboard() {


  // ---- PLACEHOLDERS for YouTube subscription stats ----
const totalSubscriptions = 342;        // from /youtube/summary.total_subscriptions
const firstSubscribed = "2018-06-14";  // earliest date from /youtube/subscriptions



  return (
    <div className="w-full h-full overflow-y-auto">

      {/* HERO HEADER */}
      <HeroHeader
  stat={`${totalSubscriptions} Subscriptions`}
  title="Thats uh, a lot of parasocial relationships my friend..."
  subtitle={`Your first subscription was on ${firstSubscribed}!`}
 />


      {/* CONTENT BELOW — centered */}
      <div className="min-h-screen w-full flex flex-col items-center justify-center p-8 bg-transparent">

        <h1 className="text-4xl font-bold mb-8 mt-8 text-white">Your Followers</h1>

        {/* SECTION 1 — Follower Count Stats */}
        <StatBlock
          title="Follower Count"
          description="Track your follower growth over time."
        >
          <StatMetric label="Total Followers" value="1,294" />
          <StatMetric label="New Followers This Week" value="82" />
          <StatMetric label="Unfollows" value="12" />
        </StatBlock>

        {/* SECTION 2 — Top Followers */}
        <StatBlock
          title="Top Followers"
          description="See who interacts with you the most."
        >
          <StatMetric label="Justin" value="342 interactions" />
          <StatMetric label="David" value="214 interactions" />
          <StatMetric label="Mia" value="198 interactions" />
        </StatBlock>

        {/* SECTION 3 — Optional follower growth chart */}
        <StatBlock
          title="Follower Growth"
          description="Past 7 days"
        >
          <StatChart data={[4, 7, 3, 10, 5, 12, 15]} />
        </StatBlock>

      </div>
    </div>
  );
}
