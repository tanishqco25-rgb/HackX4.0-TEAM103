import { Bell, CheckCircle2 } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import AIReasoning from "../components/allocation/AIReasoning";
import AllocationMap from "../components/allocation/AllocationMap";
import AllocationMatrix from "../components/allocation/AllocationMatrix";
import AllocationMetrics from "../components/allocation/AllocationMetrics";
import AllocationStatus from "../components/allocation/AllocationStatus";
import AvailableResources from "../components/allocation/AvailableResources";
import IncidentDemand from "../components/allocation/IncidentDemand";
import OptimizationComparison from "../components/allocation/OptimizationComparison";
import RecommendationCard from "../components/allocation/RecommendationCard";
import { allocationIncidents, allocationResources, allocationScores, optimisationMetrics, recommendations as initialRecommendations } from "../data/allocation";

function Allocation() {
  const [isRunning, setIsRunning] = useState(false);
  const [lastRun, setLastRun] = useState(false);
  const [recommendations, setRecommendations] = useState(initialRecommendations);
  const [resources, setResources] = useState(allocationResources);
  const [metrics, setMetrics] = useState(optimisationMetrics);
  const [selectedIncident, setSelectedIncident] = useState(allocationIncidents[0]);
  const [selectedResource, setSelectedResource] = useState(allocationResources[0]);
  const [resourceFilter, setResourceFilter] = useState("All");
  const [reasoning, setReasoning] = useState(null);
  const [notice, setNotice] = useState("");

  useEffect(() => { if (!notice) return undefined; const timer = setTimeout(() => setNotice(""), 3500); return () => clearTimeout(timer); }, [notice]);

  const filteredResources = useMemo(() => resources.filter((resource) => resourceFilter === "All" || resource.type === resourceFilter), [resourceFilter, resources]);
  const runOptimisation = () => { setIsRunning(true); setTimeout(() => { setIsRunning(false); setLastRun(true); setNotice("Optimisation complete: 4 priority allocations generated."); }, 1400); };
  const approve = (recommendation) => {
    const incident = allocationIncidents.find((item) => item.id === recommendation.incidentId);
    setRecommendations((current) => current.map((item) => item.id === recommendation.id ? { ...item, status: "Approved" } : item));
    setResources((current) => current.map((resource) => resource.id === recommendation.resourceId ? { ...resource, availability: "En Route", assignedIncident: recommendation.incidentId } : resource));
    setMetrics((current) => ({ ...current, resourcesOptimised: current.resourcesOptimised + 1 }));
    setSelectedResource((current) => current?.id === recommendation.resourceId ? { ...current, availability: "En Route", assignedIncident: recommendation.incidentId } : current);
    setNotice(`Allocation Approved: ${recommendation.resourceId} → ${incident.zone}`);
  };
  const reject = (recommendation) => { setRecommendations((current) => current.map((item) => item.id === recommendation.id ? { ...item, status: "Rejected" } : item)); setNotice(`Recommendation ${recommendation.id} rejected. Reviewing next available match.`); };
  const openReasoning = (recommendation) => { const incident = allocationIncidents.find((item) => item.id === recommendation.incidentId); const resource = resources.find((item) => item.id === recommendation.resourceId); setReasoning({ recommendation, incident, resource }); };
  const selectedRecommendation = recommendations.find((item) => item.incidentId === selectedIncident?.id) || recommendations[0];
  const matrixHighlight = selectedRecommendation ? { incidentId: selectedRecommendation.incidentId, resourceId: selectedRecommendation.resourceId } : null;

  return <div className="mx-auto max-w-[1680px] space-y-4"><div className="flex flex-wrap items-end justify-between gap-3"><div><p className="text-[10px] font-bold tracking-[0.2em] text-cyan-400">OPTIMISATION / ALLOCATION</p><h1 className="mt-1 text-2xl font-semibold tracking-tight text-slate-100">AI Resource Allocation</h1><p className="mt-1 text-sm text-slate-500">Optimise emergency resource deployment using demand, severity, distance and availability.</p></div><div className="flex items-center gap-2 text-[10px] font-bold tracking-[0.12em] text-cyan-300"><span className="h-1.5 w-1.5 rounded-full bg-cyan-400" />DETERMINISTIC AI DEMO</div></div><AllocationStatus isRunning={isRunning} onRun={runOptimisation} lastRun={lastRun} /><AllocationMetrics metrics={metrics} /><section className="grid gap-4 xl:grid-cols-[minmax(240px,0.78fr)_minmax(240px,0.78fr)_minmax(360px,1.35fr)]"><IncidentDemand incidents={allocationIncidents} selectedIncident={selectedIncident} onSelect={(incident) => { setSelectedIncident(incident); const match = recommendations.find((item) => item.incidentId === incident.id); if (match) setSelectedResource(resources.find((resource) => resource.id === match.resourceId)); }} /><AvailableResources resources={filteredResources} selectedResource={selectedResource} onSelect={setSelectedResource} filter={resourceFilter} onFilterChange={setResourceFilter} /><section className="rounded-md border border-slate-800 bg-[#111b24] p-4"><div className="flex items-center justify-between"><div><p className="text-[10px] font-bold tracking-[0.16em] text-emerald-300">03 / AI RECOMMENDED ALLOCATION</p><h2 className="mt-1 text-sm font-semibold text-slate-100">Optimal deployment matches</h2></div><span className="text-[10px] text-slate-500">{recommendations.filter((item) => !item.status).length} pending</span></div><div className="mt-3 space-y-3">{recommendations.map((recommendation) => <RecommendationCard key={recommendation.id} recommendation={recommendation} incident={allocationIncidents.find((item) => item.id === recommendation.incidentId)} resource={resources.find((item) => item.id === recommendation.resourceId)} status={recommendation.status} onApprove={() => approve(recommendation)} onReject={() => reject(recommendation)} onReasoning={() => openReasoning(recommendation)} />)}</div></section></section><section className="grid gap-4 xl:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)]"><AllocationMatrix rows={allocationScores} highlight={matrixHighlight} /><OptimizationComparison metrics={metrics} /></section><AllocationMap activeResourceId={selectedRecommendation?.resourceId || selectedResource.id} activeIncidentId={selectedRecommendation?.incidentId || selectedIncident.id} />{reasoning && <AIReasoning recommendation={reasoning.recommendation} incident={reasoning.incident} resource={reasoning.resource} onClose={() => setReasoning(null)} />}{notice && <div role="status" className="fixed bottom-5 right-5 z-1100 flex max-w-sm items-center gap-2 rounded border border-emerald-400/30 bg-[#10231f] px-4 py-3 text-xs text-emerald-200 shadow-xl"><CheckCircle2 size={16} />{notice}<button type="button" aria-label="Dismiss notification" onClick={() => setNotice("")} className="ml-2 text-emerald-500">×</button></div>}<div className="sr-only"><Bell /></div></div>;
}

export default Allocation;