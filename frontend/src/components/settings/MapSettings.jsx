import SettingSelect from "./SettingSelect";
import SettingToggle from "./SettingToggle";

const mapItems = [["incidents", "Show Incidents"], ["resources", "Show Resources"], ["shelters", "Show Shelters"], ["hospitals", "Show Hospitals"], ["zones", "Show Affected Zones"], ["routes", "Show Deployment Routes"], ["blockedRoads", "Show Blocked Roads"], ["compactMarkers", "Compact Map Markers"], ["routeLabels", "Show Route Labels"]];

function MapSettings({ settings, onToggle, onTheme }) {
  return <div><div className="grid gap-x-8 md:grid-cols-2">{mapItems.map(([key, label]) => <SettingToggle key={key} label={label} checked={settings[key]} onChange={(value) => onToggle(key, value)} />)}</div><SettingSelect label="Map Theme" value={settings.theme} options={["Dark", "Standard"]} onChange={onTheme} /></div>;
}

export default MapSettings;