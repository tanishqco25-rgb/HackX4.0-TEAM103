import { Plus, RotateCcw } from "lucide-react";
import { useEffect, useState } from "react";
import IncidentDetails from "../components/incidents/IncidentDetails";
import IncidentFilters from "../components/incidents/IncidentFilters";
import IncidentSummary from "../components/incidents/IncidentSummary";
import IncidentTable from "../components/incidents/IncidentTable";
import { incidents as initialIncidents } from "../data/incidents";
import { api } from "../services/api";

const severityRank = { Critical: 4, High: 3, Medium: 2, Low: 1 };

function Incidents() {
  const [incidents, setIncidents] = useState(initialIncidents);
  const [query, setQuery] = useState("");
  const [severity, setSeverity] = useState("All");
  const [type, setType] = useState("All");
  const [status, setStatus] = useState("All");
  const [sort, setSort] = useState({ key: "affected", direction: "desc" });
  const [selectedIncident, setSelectedIncident] = useState(null);
  const [refreshedAt, setRefreshedAt] = useState(false);
  const [showAdd, setShowAdd] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [submitError, setSubmitError] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [form, setForm] = useState({ latitude: "26.9120", longitude: "75.7900", severity: "medium", people_affected: "0", injured: "0", resources_required: "" });

  useEffect(() => {
    api.getIncidents().then(setIncidents).catch((requestError) => setError(requestError.message)).finally(() => setLoading(false));
  }, []);

  const filteredIncidents = incidents.filter((incident) => {
    const normalizedQuery = query.toLowerCase();
    return (!normalizedQuery || [incident.id, incident.location, incident.type].some((field) => field.toLowerCase().includes(normalizedQuery))) && (severity === "All" || incident.severity === severity) && (type === "All" || incident.type === type) && (status === "All" || incident.status === status);
  }).sort((first, second) => {
    let firstValue = first[sort.key];
    let secondValue = second[sort.key];
    if (sort.key === "severity") { firstValue = severityRank[firstValue]; secondValue = severityRank[secondValue]; }
    if (typeof firstValue === "string") return sort.direction === "asc" ? firstValue.localeCompare(secondValue) : secondValue.localeCompare(firstValue);
    return sort.direction === "asc" ? firstValue - secondValue : secondValue - firstValue;
  });

  const updateStatus = (nextStatus) => { if (nextStatus === "Change Status") return; setIncidents((current) => current.map((item) => item.id === selectedIncident.id ? { ...item, status: nextStatus } : item)); setSelectedIncident({ ...selectedIncident, status: nextStatus }); };
  const resolveIncident = () => updateStatus("Resolved");
  const clearFilters = () => { setQuery(""); setSeverity("All"); setType("All"); setStatus("All"); };
  const toggleSort = (key) => setSort((current) => ({ key, direction: current.key === key && current.direction === "desc" ? "asc" : "desc" }));
  const submitIncident = async (event) => {
    event.preventDefault();
    setSubmitting(true);
    setSubmitError("");
    try {
      const created = await api.createIncident({ ...form, latitude: Number(form.latitude), longitude: Number(form.longitude), people_affected: Number(form.people_affected), injured: Number(form.injured) });
      setIncidents((current) => [created, ...current]);
      setShowAdd(false);
    } catch (requestError) {
      setSubmitError(requestError.message);
    } finally {
      setSubmitting(false);
    }
  };

  return <div className="mx-auto max-w-[1680px] space-y-4"><div className="flex flex-wrap items-end justify-between gap-3"><div><p className="text-[10px] font-bold tracking-[0.2em] text-cyan-400">OPERATIONS / INCIDENTS</p><h1 className="mt-1 text-2xl font-semibold tracking-tight text-slate-100">Incident Management</h1><p className="mt-1 text-sm text-slate-500">Monitor, prioritise and coordinate active emergency incidents.</p></div><div className="flex items-center gap-2 text-[10px] text-slate-500"><span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />LIVE QUEUE <span className="text-slate-700">|</span> {refreshedAt ? "Just now" : "Backend"}</div></div>{error && <p role="alert" className="rounded border border-red-400/30 bg-red-400/10 px-3 py-2 text-xs text-red-200">Unable to load backend incidents: {error}</p>}{loading && <p className="text-xs text-slate-500">Loading incidents...</p>}<IncidentSummary /><IncidentFilters query={query} onQueryChange={setQuery} severity={severity} type={type} status={status} onFilterChange={(key, value) => ({ severity: setSeverity, type: setType, status: setStatus })[key](value)} onClear={clearFilters} onRefresh={() => setRefreshedAt(true)} refreshedAt={refreshedAt} onAdd={() => setShowAdd(true)} /><section className="overflow-hidden rounded-md border border-slate-800 bg-[#111b24]"><div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-800/80 px-4 py-3"><div><p className="text-[10px] font-bold tracking-[0.16em] text-slate-500">ACTIVE INCIDENT REGISTER</p><p className="mt-1 text-xs text-slate-400">Showing {filteredIncidents.length} of {incidents.length} backend reports</p></div><button type="button" onClick={() => setRefreshedAt(false)} className="flex items-center gap-1.5 text-[10px] font-bold tracking-widest text-slate-500 hover:text-slate-200"><RotateCcw size={13} /> RESET VIEW</button></div><IncidentTable incidents={filteredIncidents} sort={sort} onSort={toggleSort} onView={setSelectedIncident} /></section>{selectedIncident && <IncidentDetails incident={selectedIncident} onClose={() => setSelectedIncident(null)} onStatusChange={updateStatus} onResolve={resolveIncident} onViewMap={() => setSelectedIncident(null)} />}{showAdd && <div className="fixed inset-0 z-1100 flex items-center justify-center bg-slate-950/70 p-4"><form onSubmit={submitIncident} role="dialog" aria-label="Add incident" className="w-full max-w-md rounded-md border border-slate-700 bg-[#101820] p-6"><div className="flex items-start justify-between"><div><p className="text-[10px] font-bold tracking-[0.18em] text-cyan-400">FIELD REPORT</p><h2 className="mt-2 text-lg font-semibold text-slate-100">Add incident</h2></div><button type="button" aria-label="Close add incident" onClick={() => setShowAdd(false)} className="text-slate-500 hover:text-slate-100">×</button></div><div className="mt-4 grid grid-cols-2 gap-3">{[["latitude", "Latitude"], ["longitude", "Longitude"], ["people_affected", "People affected"], ["injured", "Injured"]].map(([key, label]) => <label key={key} className="text-xs text-slate-400">{label}<input required type="number" step="any" min="0" value={form[key]} onChange={(event) => setForm((current) => ({ ...current, [key]: event.target.value }))} className="mt-1 w-full rounded border border-slate-700 bg-slate-900 px-2 py-2 text-sm text-slate-100" /></label>)}</div><label className="mt-3 block text-xs text-slate-400">Severity<select value={form.severity} onChange={(event) => setForm((current) => ({ ...current, severity: event.target.value }))} className="mt-1 w-full rounded border border-slate-700 bg-slate-900 px-2 py-2 text-sm text-slate-100"><option value="critical">Critical</option><option value="high">High</option><option value="medium">Medium</option><option value="low">Low</option></select></label><label className="mt-3 block text-xs text-slate-400">Required resources<input value={form.resources_required} onChange={(event) => setForm((current) => ({ ...current, resources_required: event.target.value }))} placeholder="ambulance,rescue_team" className="mt-1 w-full rounded border border-slate-700 bg-slate-900 px-2 py-2 text-sm text-slate-100" /></label>{submitError && <p role="alert" className="mt-3 text-xs text-red-300">{submitError}</p>}<button disabled={submitting} type="submit" className="mt-5 flex w-full items-center justify-center gap-2 rounded bg-cyan-400 px-3 py-2.5 text-xs font-bold text-slate-950"><Plus size={14} /> {submitting ? "SUBMITTING..." : "SUBMIT FIELD REPORT"}</button></form></div>}</div>;
}

export default Incidents;