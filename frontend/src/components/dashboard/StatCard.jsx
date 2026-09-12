import { Activity, AlertTriangle, Boxes, Clock3, Truck, TrendingDown } from "lucide-react";

const icons = { activity: Activity, alert: AlertTriangle, boxes: Boxes, truck: Truck, clock: Clock3, trend: TrendingDown };
const tones = {
  red: "border-red-400/20 bg-red-400/[0.04] text-red-300",
  orange: "border-orange-400/20 bg-orange-400/[0.04] text-orange-300",
  cyan: "border-cyan-400/20 bg-cyan-400/[0.04] text-cyan-300",
  blue: "border-blue-400/20 bg-blue-400/[0.04] text-blue-300",
  green: "border-emerald-400/20 bg-emerald-400/[0.04] text-emerald-300",
};

function StatCard({ item }) {
  const Icon = icons[item.icon];
  return (
    <article className={`rounded-md border p-4 ${tones[item.tone]}`}>
      <div className="flex items-start justify-between gap-3">
        <p className="text-[10px] font-bold tracking-[0.16em] text-slate-500">{item.label}</p>
        <Icon size={17} strokeWidth={1.8} />
      </div>
      <p className="mt-3 text-2xl font-semibold tracking-tight text-slate-100">{item.value}</p>
      <div className="mt-2 flex items-center justify-between gap-2 text-[11px]">
        <span className="text-slate-500">{item.detail}</span>
        <span className="font-medium">{item.context}</span>
      </div>
    </article>
  );
}

export default StatCard;