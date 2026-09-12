import L from "leaflet";

const colors = { Critical: "#f87171", High: "#fb923c", Medium: "#fbbf24", Low: "#94a3b8", Ambulance: "#22d3ee", "Rescue Team": "#38bdf8", "Medical Team": "#a78bfa", "Supply Vehicle": "#f59e0b", Hospital: "#34d399", Shelter: "#4ade80", "Relief Center": "#facc15" };
const labels = { Ambulance: "A", "Rescue Team": "R", "Medical Team": "M", "Supply Vehicle": "S", Hospital: "H", Shelter: "E", "Relief Center": "C" };

export function mapIcon(kind, value) { const color = colors[value] || colors[kind] || "#22d3ee"; const label = labels[kind] || "!"; return L.divIcon({ className: "custom-map-marker", html: `<span style="background:${color};box-shadow:0 0 0 3px ${color}33">${label}</span>`, iconSize: [22, 22], iconAnchor: [11, 11], popupAnchor: [0, -12] }); }