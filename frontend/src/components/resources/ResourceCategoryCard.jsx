import { Ambulance, Boxes, Cross, Droplets, HeartPulse, Home, Package, Shield } from "lucide-react";

const icons = { ambulance: Ambulance, rescue: Shield, medical: HeartPulse, food: Package, water: Droplets, medicine: Cross, equipment: Boxes, shelter: Home };

function ResourceCategoryCard({ category }) {
  const Icon = icons[category.icon];
  return <article className="rounded-md border border-slate-800 bg-[#111b24] p-3"><div className="flex items-center gap-2"><span className="flex h-7 w-7 items-center justify-center rounded border border-cyan-400/20 bg-cyan-400/10 text-cyan-300"><Icon size={15} /></span><p className="truncate text-xs font-semibold text-slate-200">{category.name}</p></div><div className="mt-3 flex items-end justify-between"><div><p className="text-[10px] text-slate-500">TOTAL</p><p className="mt-1 text-lg font-semibold text-slate-100">{category.total}</p></div><p className="text-xs font-semibold text-cyan-300">{category.utilisation}%</p></div><div className="mt-2 h-1.5 overflow-hidden rounded-full bg-slate-800"><div className="h-full rounded-full bg-cyan-400" style={{ width: `${category.utilisation}%` }} /></div><div className="mt-2 flex justify-between text-[10px] text-slate-500"><span>Available <b className="text-emerald-300">{category.available}</b></span><span>Deployed <b className="text-slate-300">{category.deployed}</b></span><span>En route <b className="text-orange-300">{category.enRoute}</b></span></div></article>;
}

export default ResourceCategoryCard;