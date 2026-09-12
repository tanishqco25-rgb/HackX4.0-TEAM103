const tones = { cyan: "text-cyan-300", orange: "text-orange-300", red: "text-red-300", green: "text-emerald-300" };

function ResponseSummary({ items }) {
  return (
    <section className="grid grid-cols-2 gap-3 lg:grid-cols-4">
      {items.map((item) => <article key={item.label} className="rounded-md border border-slate-800 bg-[#111b24] p-4"><p className="text-[9px] font-bold tracking-[0.14em] text-slate-500">{item.label}</p><p className={`mt-3 text-sm font-semibold ${tones[item.tone]}`}>{item.value}</p><p className="mt-1 text-[11px] text-slate-500">{item.detail}</p></article>)}
    </section>
  );
}

export default ResponseSummary;