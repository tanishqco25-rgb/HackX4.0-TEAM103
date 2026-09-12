import { Lightbulb } from "lucide-react";

function KeyInsights({ insights }) { return <section className="rounded-md border border-slate-800 bg-[#111b24] p-4"><div className="flex items-center gap-2"><Lightbulb size={16} className="text-amber-300" /><div><p className="text-[10px] font-bold tracking-[0.16em] text-amber-300">KEY RESPONSE INSIGHTS</p><h2 className="mt-1 text-sm font-semibold text-slate-100">Signals for the next operational decision</h2></div></div><div className="mt-3 space-y-2">{insights.map((insight, index) => <p key={insight} className="flex gap-3 border-l-2 border-slate-700 px-3 py-2 text-xs leading-5 text-slate-400"><b className="text-cyan-300">0{index + 1}</b>{insight}</p>)}</div></section>; }

export default KeyInsights;