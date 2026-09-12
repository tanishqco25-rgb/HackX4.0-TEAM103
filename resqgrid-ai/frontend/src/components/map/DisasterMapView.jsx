import "leaflet/dist/leaflet.css";
import { useEffect, useMemo, useState } from "react";
import { MapContainer, TileLayer, Polyline, useMap } from "react-leaflet";
import { incidents, resources, zones, hospitals, shelters, reliefCenters, roads, routes } from "../../data/mapData";
import AffectedZone from "./AffectedZone";
import AIRecommendation from "./AIRecommendation";
import DeploymentRoute from "./DeploymentRoute";
import MapLayers from "./MapLayers";
import MapMarker from "./MapMarker";
import MapPageFilters from "./MapPageFilters";
import MapPageLegend from "./MapPageLegend";
import MapSearch from "./MapSearch";
import OperationalStatusBar from "./OperationalStatusBar";
import SelectedObjectPanel from "./SelectedObjectPanel";
import { api } from "../../services/api";

function MapFocus({ selection }) { const map = useMap(); if (selection) { const position = selection.item.position || selection.item.center || selection.item.positions?.[0]; if (position) map.flyTo(position, 14, { duration: 0.5 }); } return null; }

function DisasterMapView() {
  const [layers, setLayers] = useState({ incidents: true, resources: true, zones: true, hospitals: true, shelters: true, reliefCenters: true, roads: true, routes: true });
  const [filters, setFilters] = useState({ severity: "All", resourceType: "All", resourceStatus: "All" });
  const [query, setQuery] = useState("");
  const [selection, setSelection] = useState(null);
  const [aiRoute, setAiRoute] = useState(true);
  const [approved, setApproved] = useState(false);
  const [liveData, setLiveData] = useState(null);
  const [error, setError] = useState("");
  useEffect(() => {
    Promise.all([api.getIncidents(), api.getResources(), api.getHospitals(), api.getShelters()]).then(([liveIncidents, liveResources, liveHospitals, liveShelters]) => setLiveData({
      incidents: liveIncidents,
      resources: liveResources,
      hospitals: liveHospitals.map((item) => ({ ...item, position: [item.latitude, item.longitude], available: item.available_beds, status: item.status })),
      shelters: liveShelters.map((item) => ({ ...item, position: [item.latitude, item.longitude], available: item.available_capacity, status: item.status })),
    })).catch((requestError) => setError(requestError.message));
  }, []);
  const liveIncidents = liveData?.incidents || incidents;
  const liveResources = liveData?.resources || resources;
  const liveHospitals = liveData?.hospitals || hospitals;
  const liveShelters = liveData?.shelters || shelters;
  const toggle = (key) => setLayers((current) => ({ ...current, [key]: !current[key] }));
  const selectable = useMemo(() => [...liveIncidents.map((item) => ({ item, kind: "incident", label: `${item.id} · ${item.zone || item.location}` })), ...liveResources.map((item) => ({ item, kind: "resource", label: `${item.id} · ${item.type}` })), ...zones.map((item) => ({ item, kind: "zone", label: item.name })), ...liveHospitals.map((item) => ({ item, kind: "hospital", label: item.name })), ...liveShelters.map((item) => ({ item, kind: "shelter", label: item.name }))], [liveIncidents, liveResources, liveHospitals, liveShelters]);
  const results = selectable.filter(({ label }) => label.toLowerCase().includes(query.toLowerCase())).slice(0, 8);
  const visibleIncidents = liveIncidents.filter((item) => filters.severity === "All" || item.severity === filters.severity);
  const visibleResources = liveResources.filter((item) => (filters.resourceType === "All" || item.type === filters.resourceType) && (filters.resourceStatus === "All" || item.status === filters.resourceStatus));
  const select = (item, kind) => { setSelection({ item, kind }); setQuery(""); };
  const approveAllocation = () => { setApproved(true); setAiRoute(false); setSelection({ item: { ...resources[0], status: "En Route", zone: "Zone Alpha" }, kind: "resource" }); };
  return <div className="relative h-[calc(100vh-7rem)] overflow-hidden rounded-md border border-slate-800 bg-slate-900">{error && <div role="alert" className="absolute left-3 top-3 z-1100 rounded border border-red-400/30 bg-slate-950/90 px-3 py-2 text-xs text-red-200">Live map data unavailable: {error}</div>}<MapContainer center={liveData ? [26.912, 75.79] : [28.618, 77.223]} zoom={13} scrollWheelZoom className="h-full w-full"><TileLayer attribution='&copy; OpenStreetMap contributors' url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" /><MapFocus selection={selection} />{layers.zones && zones.map((zone) => <AffectedZone key={zone.name} zone={zone} onSelect={select} />)}{layers.roads && roads.map((road) => <Polyline key={road.id} positions={road.positions} pathOptions={{ color: road.status === "Blocked" ? "#f87171" : road.status === "Restricted" ? "#fb923c" : "#94a3b8", weight: road.status === "Open" ? 2 : 4, dashArray: road.status === "Open" ? undefined : "6 6" }} eventHandlers={{ click: () => select(road, "road") }} />)}{layers.routes && routes.map((route) => <DeploymentRoute key={route.id} route={route} onSelect={select} />)}{layers.incidents && visibleIncidents.map((item) => <MapMarker key={item.id} item={item} kind="incident" onSelect={select}><strong>{item.id}</strong><br />{item.zone || item.location} · {item.type}<br />{item.severity} · {item.affected.toLocaleString()} affected</MapMarker>)}{layers.resources && visibleResources.map((item) => <MapMarker key={item.id} item={item} kind={item.type} onSelect={select}><strong>{item.id}</strong><br />{item.type} · {item.status}<br />{item.location} · ETA {item.eta}</MapMarker>)}{layers.hospitals && liveHospitals.map((item) => <MapMarker key={item.name} item={item} kind="Hospital" onSelect={select}><strong>{item.name}</strong><br />{item.available} beds available<br />{item.status}</MapMarker>)}{layers.shelters && liveShelters.map((item) => <MapMarker key={item.name} item={item} kind="Shelter" onSelect={select}><strong>{item.name}</strong><br />{item.available} beds available<br />{item.status}</MapMarker>)}{layers.reliefCenters && reliefCenters.map((item) => <MapMarker key={item.name} item={item} kind="Relief Center" onSelect={select}><strong>{item.name}</strong><br />Water {item.water} · Food {item.food}<br />{item.status}</MapMarker>)}</MapContainer><MapLayers layers={layers} onToggle={toggle} onShowAll={() => setLayers(Object.fromEntries(Object.keys(layers).map((key) => [key, true])))} onHideAll={() => setLayers(Object.fromEntries(Object.keys(layers).map((key) => [key, false])))} /><MapPageFilters filters={filters} onChange={(key, value) => setFilters((current) => ({ ...current, [key]: value }))} /><MapSearch query={query} onQueryChange={setQuery} results={results} onSelect={select} /><MapPageLegend /><OperationalStatusBar /><SelectedObjectPanel selection={selection} onClose={() => setSelection(null)} onApprove={approveAllocation} onAction={(action) => { if (action === "route") setAiRoute(true); }} /><AIRecommendation visible={aiRoute && !approved} onApprove={approveAllocation} onClose={() => setAiRoute(false)} /><div className="absolute right-3 bottom-3 z-1000 rounded border border-slate-700 bg-[#0d151c]/95 px-3 py-2 text-[9px] text-slate-500">{approved ? "LIVE ALLOCATION · EN ROUTE" : `LIVE MAP · ${liveResources.length} RESOURCES · ${liveIncidents.length} INCIDENTS`}</div></div>;
}

export default DisasterMapView;