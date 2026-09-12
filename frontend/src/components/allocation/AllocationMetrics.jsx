import { ArrowDownRight, CircleAlert, Crosshair, Target } from "lucide-react";

function AllocationMetrics({ metrics }) {
  const items = [["RESOURCES OPTIMISED", metrics.resourcesOptimised, "units matched", Crosshair, "text-cyan-300"], ["CRITICAL GAPS", metrics.criticalGaps, "after optimisation", CircleAlert, "text-red-300"], ["ESTIMATED RESPONSE REDUCTION", `${metrics.responseReduction}%`, "faster arrival", ArrowDownRight, "text-emerald-300"], ["DEMAND COVERAGE", `${metrics.coverage}%`, "priority demand served", Target, "text-blue-300"]];
  return <section className="grid grid-cols-2 gap-3 xl:grid-cols-4">{items.map(([label, value, detail, Icon, tone]) => <article key={label} className="rounded-md border border-slate-800 bg-[#111b24] p-3"><div className="flex items-center justify-between"><p className="text-[10px] font-bold tracking-[0.14em] text-slate-500">{label}</p><Icon size={16} className={tone} /></div><div className="mt-2 flex items-baseline gap-2"><p className="text-2xl font-semibold text-slate-100">{value}</p><p className="text-[10px] text-slate-500">{detail}</p></div></article>)}</section>;
}

export default AllocationMetrics;