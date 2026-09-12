import { Activity, CheckCircle2, Siren, TimerReset } from "lucide-react";

const metrics = [
  ["TOTAL INCIDENTS", "27", "Active operational queue", Activity, "text-cyan-300"],
  ["CRITICAL", "6", "Immediate attention", Siren, "text-red-300"],
  ["RESPONSE REQUIRED", "11", "Awaiting assignment", TimerReset, "text-orange-300"],
  ["RESOLVED TODAY", "8", "Closed since 00:00", CheckCircle2, "text-emerald-300"],
];

function IncidentSummary() {
  return <section className="grid grid-cols-2 gap-3 xl:grid-cols-4">{metrics.map(([label, value, detail, Icon, tone]) => <article key={label} className="flex items-center gap-3 rounded-md border border-slate-800 bg-[#111b24] px-4 py-3"><span className={`flex h-8 w-8 shrink-0 items-center justify-center rounded border border-current/20 bg-current/10 ${tone}`}><Icon size={16} /></span><div className="min-w-0"><p className="text-[10px] font-bold tracking-[0.14em] text-slate-500">{label}</p><div className="mt-1 flex items-baseline gap-2"><p className="text-xl font-semibold text-slate-100">{value}</p><p className="hidden truncate text-[10px] text-slate-500 sm:block">{detail}</p></div></div></article>)}</section>;
}

export default IncidentSummary;