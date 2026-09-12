import { Activity, BrainCircuit, CircleAlert, Clock3, Gauge, ShieldCheck } from "lucide-react";

const icons = [Clock3, ShieldCheck, Gauge, CircleAlert, BrainCircuit, Activity];
const labels = [["AVERAGE RESPONSE TIME", "response", "responseTrend"], ["DEMAND COVERAGE", "coverage", "coverageTrend"], ["RESOURCE UTILISATION", "utilisation", "utilisationTrend"], ["CRITICAL INCIDENTS RESOLVED", "resolved", "resolvedTrend"], ["ALLOCATION EFFICIENCY", "efficiency", "efficiencyTrend"], ["UNMET DEMAND", "unmet", "unmetTrend"]];

function AnalyticsSummary({ summary }) {
  return <section className="grid grid-cols-2 gap-3 md:grid-cols-3 xl:grid-cols-6">{labels.map(([label, key, trend], index) => { const Icon = icons[index]; const downIsGood = key === "response" || key === "unmet"; const positive = summary[trend].startsWith("↑") !== downIsGood; return <article key={label} className="rounded-md border border-slate-800 bg-[#111b24] p-3"><div className="flex items-start justify-between"><p className="text-[9px] font-bold tracking-[0.12em] text-slate-500">{label}</p><Icon size={15} className="text-cyan-300" /></div><p className="mt-3 text-xl font-semibold text-slate-100">{summary[key]}</p><p className={`mt-1 text-[10px] font-medium ${positive ? "text-emerald-300" : "text-orange-300"}`}>{summary[trend]}</p></article>; })}</section>;
}

export default AnalyticsSummary;