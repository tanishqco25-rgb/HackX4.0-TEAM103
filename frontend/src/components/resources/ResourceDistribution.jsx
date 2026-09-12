function ResourceDistribution({ distribution }) {
  const max = Math.max(...distribution.map((item) => item.resources));
  return <section className="rounded-md border border-slate-800 bg-[#111b24] p-4"><p className="text-[10px] font-bold tracking-[0.16em] text-slate-500">RESOURCE DISTRIBUTION</p><h2 className="mt-1 text-sm font-semibold text-slate-100">Units across response zones</h2><div className="mt-5 space-y-3">{distribution.map((item) => <div key={item.zone} className="flex items-center gap-3"><span className="w-20 text-[11px] text-slate-400">{item.zone}</span><div className="h-2 flex-1 overflow-hidden rounded-full bg-slate-800"><div className="h-full rounded-full bg-cyan-400" style={{ width: `${(item.resources / max) * 100}%` }} /></div><span className="w-8 text-right text-xs font-semibold text-slate-200">{item.resources}</span></div>)}</div></section>;
}

export default ResourceDistribution;