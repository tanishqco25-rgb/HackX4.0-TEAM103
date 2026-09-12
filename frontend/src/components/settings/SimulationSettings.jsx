import { RotateCcw } from "lucide-react";
import SettingSelect from "./SettingSelect";
import SettingToggle from "./SettingToggle";

function SimulationSettings({ settings, onChange, onToggle, onReset }) {
  return (
    <div>
      <div className="grid gap-x-8 md:grid-cols-2">
        <SettingSelect label="Default Severity" value={settings.severity} options={["Low", "Medium", "High", "Critical"]} onChange={(value) => onChange("severity", value)} />
        <SettingSelect label="Default Population" value={settings.population.toLocaleString()} options={["10,000", "18,500", "32,000", "50,000"]} onChange={(value) => onChange("population", Number(value.replace(",", "")))} />
        <SettingSelect label="Default Resource Availability" value={`${settings.availability}%`} options={["50%", "65%", "80%", "100%"]} onChange={(value) => onChange("availability", Number.parseInt(value, 10))} />
        <SettingSelect label="Default Road Accessibility" value={`${settings.roads}%`} options={["50%", "75%", "90%", "100%"]} onChange={(value) => onChange("roads", Number.parseInt(value, 10))} />
      </div>
      <div className="mt-2 grid gap-x-8 md:grid-cols-2">
        <SettingToggle label="Enable Scenario History" checked={settings.history} onChange={(value) => onToggle("history", value)} />
        <SettingToggle label="Automatically Save Scenarios" checked={settings.autoSave} onChange={(value) => onToggle("autoSave", value)} />
      </div>
      <button type="button" onClick={onReset} className="mt-4 flex items-center gap-2 text-[10px] font-bold text-slate-500 hover:text-slate-200">
        <RotateCcw size={12} /> RESET SIMULATION DEFAULTS
      </button>
    </div>
  );
}

export default SimulationSettings;