export default function StatChart({ data }) {
  const maxValue = Math.max(...data);

  return (
    <div className="mt-4 w-full h-32 flex items-end gap-2">
      {data.map((v, i) => (
        <div
          key={i}
          className="flex-1 bg-blue-400/70 rounded-md"
          style={{ height: `${(v / maxValue) * 100}%` }}
        />
      ))}
    </div>
  );
}
