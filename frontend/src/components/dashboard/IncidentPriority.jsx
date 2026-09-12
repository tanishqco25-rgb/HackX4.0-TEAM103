import { ChevronRight, MapPin } from "lucide-react";

const severityStyles = {
  CRITICAL: "border-red-400/25 bg-red-400/10 text-red-300",
  HIGH: "border-orange-400/25 bg-orange-400/10 text-orange-300",
  MEDIUM: "border-yellow-400/25 bg-yellow-400/10 text-yellow-300",
};

function IncidentPriority({ incident, onSelect }) {
  return (
    <button type="button" onClick={() => onSelect(incident)} className="group grid w-full grid-cols-[auto_1fr_auto] items-center gap-3 border-b border-slate-800/80 px-4 py-3 text-left last:border-0 hover:bg-slate-800/30">
      <span className={`h-2 w-2 rounded-full ${incident.severity === "CRITICAL" ? "bg-red-400" : incident.severity === "HIGH" ? "bg-orange-400" : "bg-yellow-400"}`} />
      <span className="min-w-0">
        <span className="flex items-center gap-2 text-xs font-semibold text-slate-200">
          {incident.id}<span className="truncate font-normal text-slate-500">{incident.location}</span>
        </span>
        <span className="mt-1 flex items-center gap-1 truncate text-[11px] text-slate-500"><MapPin size={11} />{incident.resources}</span>
      </span>
      <span className="flex items-center gap-2">
        <span className={`hidden rounded border px-2 py-1 text-[9px] font-bold tracking-[0.1em] sm:inline ${severityStyles[incident.severity]}`}>{incident.severity}</span>
        <ChevronRight size={15} className="text-slate-600 transition-colors group-hover:text-cyan-300" />
      </span>
    </button>
  );
}

export default IncidentPriority;