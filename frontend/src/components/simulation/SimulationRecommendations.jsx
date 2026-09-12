import { ArrowRight, Lightbulb } from "lucide-react";

function SimulationRecommendations({ recommendations }) {
  return <section className="rounded-md border border-slate-800 bg-[#111b24] p-4"><div className="flex items-center justify-between"><div><p className="text-[10px] font-bold tracking-[0.16em] text-amber-300">SIMULATED AI RECOMMENDATIONS</p><h2 className="mt-1 text-sm font-semibold text-slate-100">Response plan for this scenario</h2></div><Lightbulb size={16} className="text-amber-300" /></div><div className="mt-3 space-y-2">{recommendations.map((recommendation) => <article key={recommendation.title} className="border-l-2 border-cyan-400/60 bg-slate-900/40 px-3 py-3"><div className="flex items-start gap-2"><ArrowRight size={15} className="mt-0.5 shrink-0 text-cyan-300" /><div><p className="text-xs font-semibold text-slate-200">{recommendation.title}</p><p className="mt-1 text-[11px] leading-5 text-slate-500">{recommendation.reason}</p><p className="mt-2 text-[10px] font-semibold text-emerald-300">Expected impact: {recommendation.impact}</p></div></div></article>)}</div></section>;
}

export default SimulationRecommendations;