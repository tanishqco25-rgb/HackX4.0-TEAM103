import { BrainCircuit, RotateCcw } from "lucide-react";
import SettingSelect from "./SettingSelect";
import SettingToggle from "./SettingToggle";
import WeightControl from "./WeightControl";

const weightItems = [["severity", "Incident Severity"], ["population", "Population Impact"], ["shortage", "Resource Shortage"], ["distance", "Distance"], ["availability", "Resource Availability"]];

function AISettings({ settings, onWeightChange, onReset, onChange, onToggle }) {
  return <div><div className="mb-3 flex items-center gap-2 rounded border border-cyan-400/20 bg-cyan-400/5 px-3 py-2 text-[10px] text-cyan-200"><BrainCircuit size={14} />Demo optimisation engine factors; weights always total 100%.</div><div className="grid gap-4 sm:grid-cols-2">{weightItems.map(([key, label]) => <WeightControl key={key} label={label} value={settings.weights[key]} onChange={(value) => onWeightChange(key, value)} />)}</div><div className="mt-4 flex items-center justify-between border-t border-slate-800 pt-3"><span className="text-xs text-slate-500">TOTAL WEIGHT <b className="ml-1 text-emerald-300">{Object.values(settings.weights).reduce((sum, value) => sum + value, 0)}%</b></span><button type="button" onClick={onReset} className="flex items-center gap-1.5 text-[10px] font-bold text-slate-500 hover:text-slate-200"><RotateCcw size={12} /> RESET TO DEFAULT</button></div><div className="mt-3"><SettingSelect label="Minimum AI Confidence" value={settings.confidence} options={["60%", "70%", "75%", "80%", "90%"]} onChange={(value) => onChange("confidence", value)} /><SettingToggle label="Enable AI Recommendations" checked={settings.recommendations} onChange={(value) => onToggle("recommendations", value)} /><SettingToggle label="Require Manual Approval" checked={settings.manualApproval} onChange={(value) => onToggle("manualApproval", value)} /></div></div>;
}

export default AISettings;