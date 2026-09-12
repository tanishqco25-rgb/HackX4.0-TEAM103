const legendItems = [
  ["bg-red-400", "Critical incident"], ["bg-orange-400", "High priority"], ["bg-cyan-300", "Response unit"], ["bg-emerald-400", "Shelter / facility"], ["bg-slate-400", "Blocked road"],
];

function MapLegend() {
  return <div className="absolute bottom-3 left-3 z-1000 rounded border border-slate-700/80 bg-[#0d151c]/95 px-3 py-2 shadow-lg"><div className="grid grid-cols-2 gap-x-3 gap-y-1.5">{legendItems.map(([color, label]) => <span key={label} className="flex items-center gap-1.5 text-[9px] text-slate-300"><i className={`h-2 w-2 rounded-full ${color}`} />{label}</span>)}</div></div>;
}

export default MapLegend;