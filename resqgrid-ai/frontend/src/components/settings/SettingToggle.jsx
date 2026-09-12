function SettingToggle({ label, description, checked, onChange }) {
  return <label className="flex cursor-pointer items-center justify-between gap-4 border-b border-slate-800/70 py-3 last:border-0"><span><span className="block text-xs font-medium text-slate-200">{label}</span>{description && <span className="mt-1 block text-[10px] text-slate-500">{description}</span>}</span><button type="button" role="switch" aria-checked={checked} aria-label={label} onClick={() => onChange(!checked)} className={`relative h-5 w-9 shrink-0 rounded-full transition-colors ${checked ? "bg-cyan-400" : "bg-slate-700"}`}><span className={`absolute top-0.5 h-4 w-4 rounded-full bg-white transition-transform ${checked ? "translate-x-4" : "translate-x-0.5"}`} /></button></label>;
}

export default SettingToggle;