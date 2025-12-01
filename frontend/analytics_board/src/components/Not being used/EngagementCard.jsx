import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription
} from "@heroui/react";

export default function EngagementCard() {
  const rows = Array.from({ length: 16 }).map(
    (_, i) => `Engagement metric ${i + 1}`
  );

  return (
    <Card className="w-full h-full bg-zinc-900 text-white p-8 flex flex-col overflow-hidden">
      <CardHeader className="p-0 flex-col">
        <CardTitle className="text-3xl font-bold">Engagement Panel</CardTitle>
        <CardDescription>Your Statistics!</CardDescription>
      </CardHeader>

      <div className="flex-1 overflow-y-scroll min-h-0 mt-4 space-y-4 pr-2">
        {rows.map((r, i) => (
          <div key={i} className="bg-zinc-800 p-4 rounded-xl text-lg">
            {r}
          </div>
        ))}
      </div>
    </Card>
  );
}
