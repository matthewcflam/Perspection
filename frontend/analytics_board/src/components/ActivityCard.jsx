import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription
} from "@heroui/react";

export default function ActivityCard() {
  const items = Array.from({ length: 20 }).map(
    (_, i) => `Activity item #${i + 1}`
  );

  return (
    
    <Card className="w-full h-full bg-zinc-900 text-white p-8 flex flex-col overflow-hidden">
      <CardHeader className="p-0 flex-col">
        <CardTitle className="text-3xl font-bold">Activity Overview</CardTitle>
        <CardDescription>Your Statistics!</CardDescription>
      </CardHeader>

      <div className="flex-1 overflow-y-scroll min-h-0 mt-4 space-y-4 pr-2">
        {items.map((item, i) => (
          <div key={i} className="bg-zinc-800 p-4 rounded-xl text-lg">
            {item}
          </div>
        ))}
      </div>
    </Card>

    
  );
}
