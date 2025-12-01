export default function StatMetric({ label, value }) {
  return (
    <div className="flex items-center justify-between py-2">
      <p className="text-white/80">{label}</p>

      <div className="flex flex-col items-end">
        <p className="text-xl font-bold text-white">{value}</p>
      </div>
    </div>
  );
}
