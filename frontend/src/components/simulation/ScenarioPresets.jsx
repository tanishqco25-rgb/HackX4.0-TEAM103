function ScenarioPresets({ presets, active, onSelect }) {
  return <section className="rounded-md border border-slate-800 bg-[#111b24] p-4"><p className="text-[10px] font-bold tracking-[0.16em] text-slate-500">SCENARIO PRESETS</p><div className="mt-3 grid grid-cols-2 gap-2 xl:grid-cols-4">{presets.map((preset) => <button type="button" key={preset.name} onClick={() => onSelect(preset)} className={`rounded border px-3 py-2.5 text-[10px] font-bold tracking-[0.08em] ${active === preset.name ? "border-cyan-400/40 bg-cyan-400/10 text-cyan-200" : "border-slate-700 text-slate-500 hover:border-slate-600 hover:text-slate-200"}`}>{preset.name}</button>)}</div></section>;
}

export default ScenarioPresets;