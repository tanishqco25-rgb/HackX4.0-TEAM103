function SettingSelect({ label, value, options, onChange, description }) {
  return <label className="flex items-center justify-between gap-4 border-b border-slate-800/70 py-3 last:border-0"><span><span className="block text-xs font-medium text-slate-200">{label}</span>{description && <span className="mt-1 block text-[10px] text-slate-500">{description}</span>}</span><select aria-label={label} value={value} onChange={(event) => onChange(event.target.value)} className="h-8 max-w-47.5 rounded border border-slate-700 bg-[#0d151c] px-2 text-xs text-slate-300 outline-none focus:border-cyan-400/60">{options.map((option) => <option key={option}>{option}</option>)}</select></label>;
}

export default SettingSelect;