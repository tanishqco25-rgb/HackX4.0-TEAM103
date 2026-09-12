import { RotateCcw } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import ResourceCategoryCard from "../components/resources/ResourceCategoryCard";
import ResourceDetails from "../components/resources/ResourceDetails";
import ResourceDistribution from "../components/resources/ResourceDistribution";
import ResourceFilters from "../components/resources/ResourceFilters";
import ResourceGap from "../components/resources/ResourceGap";
import ResourceSummary from "../components/resources/ResourceSummary";
import ResourceTable from "../components/resources/ResourceTable";
import { resourceCategories, resourceDistribution, resourceGaps, resources as initialResources } from "../data/resources";
import { api } from "../services/api";

function Resources() {
  const [resources, setResources] = useState(initialResources);
  const [query, setQuery] = useState("");
  const [filters, setFilters] = useState({ type: "All", status: "All", condition: "All", zone: "All" });
  const [selectedResource, setSelectedResource] = useState(null);
  const [refreshedAt, setRefreshedAt] = useState(false);
  const [showAdd, setShowAdd] = useState(false);
  useEffect(() => {
    api.getResources().then(setResources).catch(() => undefined);
  }, []);
  const filteredResources = useMemo(() => resources.filter((resource) => { const term = query.toLowerCase(); return (!term || [resource.id, resource.type, resource.location, resource.zone].some((field) => field.toLowerCase().includes(term))) && Object.entries(filters).every(([key, value]) => value === "All" || resource[{ type: "type", status: "status", condition: "condition", zone: "zone" }[key]] === value); }), [filters, query, resources]);
  const updateResource = (resource) => { setResources((current) => current.map((item) => item.id === resource.id ? resource : item)); setSelectedResource(resource); };
  const clearFilters = () => { setQuery(""); setFilters({ type: "All", status: "All", condition: "All", zone: "All" }); };
  const hasFilters = query || Object.values(filters).some((value) => value !== "All");
  return <div className="mx-auto max-w-[1680px] space-y-4"><div className="flex flex-wrap items-end justify-between gap-3"><div><p className="text-[10px] font-bold tracking-[0.2em] text-cyan-400">OPERATIONS / RESOURCES</p><h1 className="mt-1 text-2xl font-semibold tracking-tight text-slate-100">Emergency Resources</h1><p className="mt-1 text-sm text-slate-500">Monitor availability, deployment and distribution of emergency response resources.</p></div><div className="flex items-center gap-2 text-[10px] font-bold tracking-[0.12em] text-emerald-300"><span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />LIVE RESOURCE DATA</div></div><ResourceSummary /><section><div className="mb-3 flex items-end justify-between"><div><p className="text-[10px] font-bold tracking-[0.16em] text-slate-500">RESOURCE CATEGORIES</p><h2 className="mt-1 text-sm font-semibold text-slate-100">Capacity by response capability</h2></div><span className="text-[10px] text-slate-500">124 units registered</span></div><div className="grid grid-cols-2 gap-3 md:grid-cols-4 xl:grid-cols-8">{resourceCategories.map((category) => <ResourceCategoryCard key={category.name} category={category} />)}</div></section><ResourceFilters query={query} filters={filters} onQueryChange={setQuery} onFilterChange={(key, value) => setFilters((current) => ({ ...current, [key]: value }))} onClear={clearFilters} onRefresh={() => setRefreshedAt(true)} refreshedAt={refreshedAt} onAdd={() => setShowAdd(true)} /><section className="overflow-hidden rounded-md border border-slate-800 bg-[#111b24]"><div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-800/80 px-4 py-3"><div><p className="text-[10px] font-bold tracking-[0.16em] text-slate-500">RESOURCE REGISTER</p><p className="mt-1 text-xs text-slate-400">Showing {filteredResources.length} of {resources.length} operational resources</p></div><div className="flex items-center gap-3"><span className="text-[10px] text-slate-500">{hasFilters ? "Filtered view" : "All field resources"}</span><button type="button" onClick={() => setRefreshedAt(false)} className="flex items-center gap-1.5 text-[10px] font-bold tracking-widest text-slate-500 hover:text-slate-200"><RotateCcw size={13} /> RESET VIEW</button></div></div><ResourceTable resources={filteredResources} onView={setSelectedResource} /></section><section className="grid gap-4 xl:grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)]"><ResourceGap gaps={resourceGaps} /><ResourceDistribution distribution={resourceDistribution} /></section>{selectedResource && <ResourceDetails resource={selectedResource} onClose={() => setSelectedResource(null)} onUpdate={updateResource} onViewMap={() => setSelectedResource(null)} />}{showAdd && <div className="fixed inset-0 z-1100 flex items-center justify-center bg-slate-950/70 p-4"><div role="dialog" aria-label="Add resource" className="w-full max-w-md rounded-md border border-slate-700 bg-[#101820] p-6"><p className="text-[10px] font-bold tracking-[0.18em] text-cyan-400">RESOURCE INTAKE</p><h2 className="mt-2 text-lg font-semibold text-slate-100">Add resource</h2><p className="mt-4 text-sm leading-6 text-slate-400">New resource intake is available in this frontend prototype. Connect it to the resource service when backend workflows are introduced.</p><button type="button" onClick={() => setShowAdd(false)} className="mt-5 w-full rounded bg-cyan-400 px-3 py-2.5 text-xs font-bold text-slate-950">CLOSE INTAKE</button></div></div>}</div>;
}

export default Resources;