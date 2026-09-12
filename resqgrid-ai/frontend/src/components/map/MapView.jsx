import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { Circle, MapContainer, Marker, Polyline, Popup, TileLayer } from "react-leaflet";
import { useState } from "react";
import { mapData } from "../../data/dashboardData";
import MapFilters from "./MapFilters";
import MapLegend from "./MapLegend";

const markerColors = { critical: "#f87171", high: "#fb923c", ambulance: "#67e8f9", rescue: "#38bdf8", medical: "#a5b4fc", shelter: "#34d399", facility: "#4ade80" };
const markerLabels = { ambulance: "A", rescue: "R", medical: "M", shelter: "S", facility: "H" };

function createMarker(kind, severity) {
  const color = markerColors[severity || kind];
  const label = markerLabels[kind] || "!";
  return L.divIcon({ className: "custom-map-marker", html: `<span style="background:${color};box-shadow:0 0 0 3px ${color}33">${label}</span>`, iconSize: [22, 22], iconAnchor: [11, 11], popupAnchor: [0, -12] });
}

function MapView({ incidents: liveIncidents = mapData.incidents, resources: liveResources = mapData.resources }) {
  const [activeFilter, setActiveFilter] = useState("ALL");
  const show = (kind) => activeFilter === "ALL" || activeFilter === kind;
  return (
    <section className="rounded-md border border-slate-800 bg-[#111b24] p-3">
      <div className="mb-3 flex items-center justify-between gap-3 px-1">
        <div><p className="text-[10px] font-bold tracking-[0.16em] text-cyan-400">OPERATIONAL INTELLIGENCE</p><h2 className="mt-1 text-sm font-semibold text-slate-100">Interactive disaster map</h2></div>
        <span className="hidden items-center gap-1.5 text-[10px] text-emerald-300 sm:flex"><i className="h-1.5 w-1.5 rounded-full bg-emerald-400" />LIVE POSITIONING</span>
      </div>
      <div className="relative h-87.5 overflow-hidden rounded border border-slate-700/80 bg-slate-900">
        <MapContainer center={[28.618, 77.223]} zoom={13} scrollWheelZoom={false} className="h-full w-full">
          <TileLayer attribution='&copy; OpenStreetMap contributors' url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
          {show("INCIDENTS") && mapData.zones.map((zone) => <Circle key={zone.label} center={zone.center} radius={zone.radius} pathOptions={{ color: zone.severity === "critical" ? "#f87171" : "#fb923c", fillColor: zone.severity === "critical" ? "#f87171" : "#fb923c", fillOpacity: 0.12, weight: 1 }} />)}
          {show("ROUTES") && mapData.blockedRoads.map((road, index) => <Polyline key={`blocked-${index}`} positions={road} pathOptions={{ color: "#94a3b8", dashArray: "5 6", weight: 3 }} />)}
          {show("ROUTES") && mapData.routes.map((route, index) => <Polyline key={`route-${index}`} positions={route} pathOptions={{ color: "#22d3ee", weight: 2, opacity: 0.85 }} />)}
          {show("INCIDENTS") && liveIncidents.map((item) => <Marker key={item.id} position={item.position} icon={createMarker("incident", item.severity.toLowerCase())}><Popup><strong>{item.id}</strong><br />{item.location || item.label}<br />{item.severity}</Popup></Marker>)}
          {show("RESOURCES") && liveResources.map((item) => <Marker key={item.id || item.label} position={item.position} icon={createMarker(item.kind || item.type.toLowerCase())}><Popup>{item.id || item.label}<br />{item.type} · {item.status}</Popup></Marker>)}
          {show("SHELTERS") && mapData.shelters.map((item) => <Marker key={item.label} position={item.position} icon={createMarker("shelter")}><Popup>{item.label}</Popup></Marker>)}
          {show("SHELTERS") && mapData.facilities.map((item) => <Marker key={item.label} position={item.position} icon={createMarker("facility")}><Popup>{item.label}</Popup></Marker>)}
        </MapContainer>
        <MapFilters activeFilter={activeFilter} onChange={setActiveFilter} />
        <MapLegend />
      </div>
    </section>
  );
}

export default MapView;