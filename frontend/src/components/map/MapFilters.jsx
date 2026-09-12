const filters = ["ALL", "INCIDENTS", "RESOURCES", "SHELTERS", "ROUTES"];

function MapFilters({ activeFilter, onChange }) {
  return <div className="absolute right-3 top-3 z-1000 flex flex-wrap justify-end gap-1 rounded border border-slate-700/80 bg-[#0d151c]/95 p-1 shadow-lg">{filters.map((filter) => <button key={filter} type="button" onClick={() => onChange(filter)} className={`rounded px-2 py-1.5 text-[9px] font-bold tracking-[0.08em] ${activeFilter === filter ? "bg-cyan-400/15 text-cyan-200" : "text-slate-500 hover:text-slate-200"}`}>{filter}</button>)}</div>;
}

export default MapFilters;