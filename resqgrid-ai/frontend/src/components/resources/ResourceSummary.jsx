import { Box, CheckCircle2, Navigation, PackageX } from "lucide-react";

const metrics = [
  ["TOTAL RESOURCES", "124", "8 categories tracked", Box, "text-cyan-300"],
  ["AVAILABLE", "42", "34% ready capacity", CheckCircle2, "text-emerald-300"],
  ["DEPLOYED", "58", "47% in field", Navigation, "text-blue-300"],
  ["EN ROUTE", "17", "14% moving", Navigation, "text-orange-300"],
  ["UNAVAILABLE", "7", "5.6% offline", PackageX, "text-red-300"],
];

function ResourceSummary() {
  return <section className="grid grid-cols-2 gap-3 md:grid-cols-3 xl:grid-cols-5">{metrics.map(([label, value, detail, Icon, tone]) => <article key={label} className="rounded-md border border-slate-800 bg-[#111b24] px-4 py-3"><div className="flex items-center justify-between"><p className="text-[10px] font-bold tracking-[0.14em] text-slate-500">{label}</p><Icon size={16} className={tone} /></div><div className="mt-2 flex items-baseline gap-2"><p className="text-2xl font-semibold text-slate-100">{value}</p><p className="text-[10px] text-slate-500">{detail}</p></div></article>)}</section>;
}

export default ResourceSummary;