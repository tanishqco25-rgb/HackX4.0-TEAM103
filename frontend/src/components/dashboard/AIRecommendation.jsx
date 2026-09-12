import { ArrowUpRight, Check, ChevronDown, Crosshair, Zap } from "lucide-react";

function AIRecommendation({ item, isDeployed, isExpanded, onDeploy, onToggle }) {
  return (
    <article className="rounded-md border border-slate-800 bg-[#111b24] p-4">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-[9px] font-bold tracking-[0.18em] text-cyan-400">RECOMMENDATION {item.id}</p>
          <h3 className="mt-2 text-sm font-semibold text-slate-100">{item.resource}</h3>
        </div>
        <Zap size={17} className="text-amber-300" />
      </div>
      <div className="mt-4 grid grid-cols-3 gap-3 border-y border-slate-800/80 py-3 text-xs">
        <div><p className="text-[10px] text-slate-500">DESTINATION</p><p className="mt-1 font-medium text-slate-200">{item.destination}</p></div>
        <div><p className="text-[10px] text-slate-500">PRIORITY</p><p className="mt-1 font-medium text-red-300">{item.priority}</p></div>
        <div><p className="text-[10px] text-slate-500">ETA</p><p className="mt-1 font-medium text-slate-200">{item.eta}</p></div>
      </div>
      <p className="mt-3 text-xs leading-5 text-slate-400"><span className="font-medium text-slate-300">Recommendation:</span> Deploy immediately.</p>
      <p className="mt-2 text-[11px] leading-5 text-slate-500"><span className="font-medium text-slate-400">Reason:</span> {item.reason}</p>
      {isExpanded && <p className="mt-2 flex items-center gap-2 text-[11px] text-emerald-300"><Crosshair size={13} /> Expected impact: {item.impact}</p>}
      <div className="mt-4 flex items-center gap-2">
        <button type="button" onClick={onDeploy} className={`flex items-center gap-1.5 rounded border px-3 py-2 text-[10px] font-bold tracking-[0.08em] transition-colors ${isDeployed ? "border-emerald-400/30 bg-emerald-400/10 text-emerald-300" : "border-cyan-400/30 bg-cyan-400/10 text-cyan-200 hover:bg-cyan-400/20"}`}>
          {isDeployed ? <Check size={13} /> : <ArrowUpRight size={13} />}{isDeployed ? "DEPLOYED" : "DEPLOY RESOURCE"}
        </button>
        <button type="button" onClick={onToggle} className="flex items-center gap-1 rounded border border-slate-700 px-3 py-2 text-[10px] font-bold tracking-[0.08em] text-slate-400 hover:bg-slate-800 hover:text-slate-200">
          VIEW ANALYSIS <ChevronDown size={13} className={isExpanded ? "rotate-180" : ""} />
        </button>
      </div>
    </article>
  );
}

export default AIRecommendation;