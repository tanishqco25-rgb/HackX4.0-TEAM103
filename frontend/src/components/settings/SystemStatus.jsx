import { CheckCircle2, RefreshCw } from "lucide-react";

const colors = { green: "text-emerald-300", amber: "text-amber-300", cyan: "text-cyan-300" };

function SystemStatus({ items, refreshing, lastRefresh, onRefresh }) {
  return <section className="rounded-md border border-slate-800 bg-[#111b24] p-4"><div className="flex items-center justify-between border-b border-slate-800/80 pb-4"><div><p className="text-[10px] font-bold tracking-[0.16em] text-emerald-300">DATA & SYSTEM STATUS</p><h2 className="mt-1 text-sm font-semibold text-slate-100">Command center health</h2></div><button type="button" disabled={refreshing} onClick={onRefresh} className="flex items-center gap-2 rounded border border-slate-700 px-3 py-2 text-[10px] font-bold text-slate-400 hover:bg-slate-800 disabled:opacity-60"><RefreshCw size={13} className={refreshing ? "animate-spin" : ""} />{refreshing ? "CHECKING..." : "REFRESH STATUS"}</button></div><div className="mt-3 grid gap-x-6 sm:grid-cols-2">{items.map(([label, value, tone]) => <div key={label} className="flex items-center justify-between border-b border-slate-800/70 py-3"><span className="text-xs text-slate-400">{label}</span><span className={`flex items-center gap-1.5 text-[11px] font-medium ${colors[tone]}`}><CheckCircle2 size={13} />{value}</span></div>)}</div><p className="mt-3 text-[10px] text-slate-500">Last data refresh: <span className="text-slate-300">{lastRefresh}</span></p></section>;
}

export default SystemStatus;