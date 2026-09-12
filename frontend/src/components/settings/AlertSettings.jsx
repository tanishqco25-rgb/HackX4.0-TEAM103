import { BellRing } from "lucide-react";
import SettingSelect from "./SettingSelect";
import SettingToggle from "./SettingToggle";

const alertItems = [["critical", "Critical Incident Alerts"], ["shortage", "Resource Shortage Alerts"], ["blockage", "Route Blockage Alerts"], ["shelter", "Shelter Capacity Alerts"], ["allocation", "AI Allocation Alerts"], ["zones", "High Priority Zone Alerts"], ["sound", "Alert Sound"]];

function AlertSettings({ settings, onToggle, onSelect, onSave }) {
  return <div><div className="grid gap-x-8 md:grid-cols-2">{alertItems.map(([key, label]) => <SettingToggle key={key} label={label} checked={settings[key]} onChange={(value) => onToggle(key, value)} />)}</div><SettingSelect label="Severity Threshold" value={settings.threshold} options={["Critical Only", "Critical + High", "All Incidents"]} onChange={(value) => onSelect("threshold", value)} /><button type="button" onClick={onSave} className="mt-4 flex items-center gap-2 rounded bg-cyan-400 px-3 py-2 text-xs font-bold text-slate-950"><BellRing size={14} /> SAVE ALERT PREFERENCES</button></div>;
}

export default AlertSettings;