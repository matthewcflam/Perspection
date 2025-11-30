import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription
} from "@heroui/react";

export default function StatCard() {
  const rows = Array.from({ length: 20 }).map(
    (_, i) => `Clash Royale Trophies Earned ${i + 1}`
  );

  return (
    <Card
      className="
        w-full h-full 
        bg-white/10 backdrop-blur-md 
        border border-white/10 
        text-white p-8 
        flex flex-col overflow-hidden
      "
    >
      <CardHeader className="p-0 flex-col">
        <CardTitle className="text-4xl md:text-5xl font-extrabold tracking-wide">
         Followers
        </CardTitle>
      </CardHeader>

      {/* Scrollable content */}
      <div className="flex-1 overflow-y-scroll min-h-0 mt-6 space-y-4 pr-2">
        {rows.map((row, i) => (
          <div
            key={i}
            className="bg-white/10 backdrop-blur-sm border border-white/10 p-4 rounded-xl text-lg"
          >
            {row}
          </div>
        ))}
      </div>
    </Card>
  );
}
