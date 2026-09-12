const styles = {
  Critical: "border-red-400/30 bg-red-400/10 text-red-300",
  High: "border-orange-400/30 bg-orange-400/10 text-orange-300",
  Medium: "border-amber-400/30 bg-amber-400/10 text-amber-300",
  Low: "border-slate-600 bg-slate-800/70 text-slate-300",
};

function SeverityBadge({ severity }) {
  return <span className={`inline-flex items-center gap-1.5 rounded border px-2 py-1 text-[10px] font-bold tracking-[0.08em] ${styles[severity]}`}><i className={`h-1.5 w-1.5 rounded-full ${severity === "Critical" ? "bg-red-400" : severity === "High" ? "bg-orange-400" : severity === "Medium" ? "bg-amber-400" : "bg-slate-400"}`} />{severity.toUpperCase()}</span>;
}

export default SeverityBadge;