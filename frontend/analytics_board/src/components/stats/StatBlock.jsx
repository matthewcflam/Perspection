export default function StatBlock({ title, description, children }) {
  return (
    <section className="mb-6 w-full max-w-2xl bg-white/10 rounded-xl p-6 shadow-lg">
      <h2 className="text-2xl font-semibold mb-1 text-white">{title}</h2>

      {description && (
        <p className="text-white/70 mb-4">{description}</p>
      )}

      {children}
    </section>
  );
}
