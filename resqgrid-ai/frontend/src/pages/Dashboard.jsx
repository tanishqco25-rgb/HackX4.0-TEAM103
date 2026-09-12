import { X } from "lucide-react";
import { useEffect, useState } from "react";
import AIRecommendation from "../components/dashboard/AIRecommendation";
import IncidentPriority from "../components/dashboard/IncidentPriority";
import OperationalStatus from "../components/dashboard/OperationalStatus";
import ResourceUtilisation from "../components/dashboard/ResourceUtilisation";
import ResponseSummary from "../components/dashboard/ResponseSummary";
import StatCard from "../components/dashboard/StatCard";
import MapView from "../components/map/MapView";
import { incidents as initialIncidents, kpis, operationalStatus, recommendations, responseSummary, utilisationData } from "../data/dashboardData";
import { api } from "../services/api";

function Dashboard() {
  const [selectedIncident, setSelectedIncident] = useState(null);
  const [incidents, setIncidents] = useState(initialIncidents);
  const [mapData, setMapData] = useState({ incidents: [], resources: [] });
  const [error, setError] = useState("");
  const [deployed, setDeployed] = useState(() => new Set());
  const [expanded, setExpanded] = useState(null);

  useEffect(() => {
    Promise.all([api.getIncidents(), api.getResources()]).then(([incidentItems, resourceItems]) => {
      setIncidents(incidentItems.map((item) => ({ ...item, severity: item.severity.toUpperCase(), resources: item.resourceNeed, details: item.description })));
      setMapData({ incidents: incidentItems, resources: resourceItems });
    }).catch((requestError) => setError(requestError.message));
  }, []);

  const deploy = (id) => setDeployed((current) => new Set(current).add(id));

  return (
    <div className="mx-auto max-w-[1680px] space-y-4">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div><p className="text-[10px] font-bold tracking-[0.2em] text-cyan-400">COMMAND OVERVIEW</p><h1 className="mt-1 text-2xl font-semibold tracking-tight text-slate-100">Emergency Command Center</h1><p className="mt-1 text-sm text-slate-500">Real-time disaster intelligence and emergency resource coordination</p></div>
        <div className="rounded border border-slate-800 bg-[#111b24] px-3 py-2 text-right"><p className="text-[9px] font-bold tracking-[0.15em] text-slate-500">ACTIVE RESPONSE WINDOW</p><p className="mt-1 text-xs font-medium text-slate-200">08:00 - 18:00 UTC</p></div>
      </div>
      <OperationalStatus items={operationalStatus} />
      {error && <p role="alert" className="rounded border border-red-400/30 bg-red-400/10 px-3 py-2 text-xs text-red-200">Live incident data unavailable: {error}</p>}
      <section className="grid grid-cols-2 gap-3 md:grid-cols-3 xl:grid-cols-6">{kpis.map((item) => <StatCard key={item.label} item={item} />)}</section>
      <section className="grid gap-4 xl:grid-cols-[minmax(0,1.65fr)_minmax(330px,0.85fr)]">
        <MapView incidents={mapData.incidents.length ? mapData.incidents : undefined} resources={mapData.resources.length ? mapData.resources : undefined} />
        <section className="rounded-md border border-slate-800 bg-[#111b24]">
          <div className="flex items-center justify-between border-b border-slate-800/80 px-4 py-3"><div><p className="text-[10px] font-bold tracking-[0.16em] text-red-300">PRIORITY QUEUE</p><h2 className="mt-1 text-sm font-semibold text-slate-100">Incident priorities</h2></div><span className="rounded bg-red-400/10 px-2 py-1 text-[10px] font-semibold text-red-300">{incidents.length} ACTIVE</span></div>
          <div>{incidents.map((incident) => <IncidentPriority key={incident.id} incident={incident} onSelect={setSelectedIncident} />)}</div>
        </section>
      </section>
      <section><div className="mb-3 flex items-center justify-between"><div><p className="text-[10px] font-bold tracking-[0.16em] text-amber-300">DECISION SUPPORT</p><h2 className="mt-1 text-sm font-semibold text-slate-100">AI resource recommendations</h2></div><span className="text-[10px] text-slate-500">Updated 32 seconds ago</span></div><div className="grid gap-3 lg:grid-cols-3">{recommendations.map((item) => <AIRecommendation key={item.id} item={item} isDeployed={deployed.has(item.id)} isExpanded={expanded === item.id} onDeploy={() => deploy(item.id)} onToggle={() => setExpanded(expanded === item.id ? null : item.id)} />)}</div></section>
      <section className="grid gap-4 xl:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)]"><ResourceUtilisation data={utilisationData} /><div><div className="mb-3"><p className="text-[10px] font-bold tracking-[0.16em] text-slate-500">RESPONSE SUMMARY</p><h2 className="mt-1 text-sm font-semibold text-slate-100">Field conditions at a glance</h2></div><ResponseSummary items={responseSummary} /></div></section>
      {selectedIncident && <div className="fixed inset-0 z-1100 flex justify-end bg-slate-950/65" onClick={() => setSelectedIncident(null)}><aside role="dialog" aria-modal="true" aria-label={`${selectedIncident.id} details`} onClick={(event) => event.stopPropagation()} className="h-full w-full max-w-md border-l border-slate-700 bg-[#101820] p-6 shadow-2xl"><div className="flex items-start justify-between"><div><p className="text-[10px] font-bold tracking-[0.18em] text-red-300">INCIDENT DETAILS</p><h2 className="mt-2 text-xl font-semibold text-slate-100">{selectedIncident.id}</h2></div><button type="button" aria-label="Close incident details" onClick={() => setSelectedIncident(null)} className="rounded border border-slate-700 p-2 text-slate-400 hover:text-slate-100"><X size={17} /></button></div><div className="mt-8 space-y-5 text-sm"><div><p className="text-[10px] font-bold tracking-[0.15em] text-slate-500">LOCATION</p><p className="mt-1 text-slate-200">{selectedIncident.location}</p></div><div className="grid grid-cols-2 gap-4"><div><p className="text-[10px] font-bold tracking-[0.15em] text-slate-500">TYPE</p><p className="mt-1 text-slate-200">{selectedIncident.type}</p></div><div><p className="text-[10px] font-bold tracking-[0.15em] text-slate-500">SEVERITY</p><p className="mt-1 text-red-300">{selectedIncident.severity}</p></div></div><div><p className="text-[10px] font-bold tracking-[0.15em] text-slate-500">PEOPLE AFFECTED</p><p className="mt-1 text-2xl font-semibold text-slate-100">{selectedIncident.affected}</p></div><div><p className="text-[10px] font-bold tracking-[0.15em] text-slate-500">REQUIRED RESOURCES</p><p className="mt-1 text-slate-300">{selectedIncident.resources}</p></div><div><p className="text-[10px] font-bold tracking-[0.15em] text-slate-500">CURRENT STATUS</p><p className="mt-1 inline-flex rounded border border-orange-400/25 bg-orange-400/10 px-2 py-1 text-xs text-orange-300">{selectedIncident.status}</p></div><div className="border-t border-slate-800 pt-5"><p className="text-[10px] font-bold tracking-[0.15em] text-slate-500">FIELD NOTE</p><p className="mt-2 leading-6 text-slate-400">{selectedIncident.details}</p></div></div></aside></div>}
    </div>
  );
}

export default Dashboard;