function WeightControl({ label, value, onChange }) {
  return <label className="block"><span className="flex justify-between text-[10px] font-bold tracking-widest text-slate-500"><span>{label}</span><b className="text-cyan-300">{value}%</b></span><input aria-label={`${label} weight`} type="range" min="0" max="100" value={value} onChange={(event) => onChange(Number(event.target.value))} className="mt-2 h-1.5 w-full cursor-pointer accent-cyan-400" /></label>;
}

export default WeightControl;