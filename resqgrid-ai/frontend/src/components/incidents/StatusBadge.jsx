const styles = {
  "Response Required": "border-red-400/25 bg-red-400/10 text-red-300",
  Responding: "border-cyan-400/25 bg-cyan-400/10 text-cyan-300",
  Monitoring: "border-amber-400/25 bg-amber-400/10 text-amber-300",
  Contained: "border-emerald-400/25 bg-emerald-400/10 text-emerald-300",
  Resolved: "border-slate-600 bg-slate-800/70 text-slate-400",
};

function StatusBadge({ status }) {
  return <span className={`inline-flex whitespace-nowrap rounded border px-2 py-1 text-[10px] font-medium ${styles[status]}`}>{status}</span>;
}

export default StatusBadge;