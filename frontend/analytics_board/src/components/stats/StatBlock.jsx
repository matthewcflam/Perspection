export default function StatBlock({ title, description, children }) {
  return (
    <section className="mb-6 w-full max-w-2xl bg-black/20 backdrop-blur-md rounded-xl p-6 shadow-lg border border-white/60">
      <h2 className="text-2xl font-semibold mb-1 text-white" style={{ fontFamily: 'Aileron' }}>{title}</h2>

      {description && (
        <p className="text-white/70 mb-4" style={{ fontFamily: 'Aileron' }}>{description}</p>
      )}

      {children}
    </section>
  );
}
