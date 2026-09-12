import { Circle } from "react-leaflet";

const colors = { Critical: "#f87171", High: "#fb923c", Medium: "#fbbf24", Low: "#94a3b8" };
function AffectedZone({ zone, onSelect }) { const color = colors[zone.severity]; return <Circle center={zone.center} radius={zone.radius} pathOptions={{ color, fillColor: color, fillOpacity: 0.12, weight: 2 }} eventHandlers={{ click: () => onSelect(zone, "zone") }} />; }
export default AffectedZone;