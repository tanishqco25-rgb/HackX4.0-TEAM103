const defaultApiUrl = typeof window === "undefined"
  ? "http://localhost:8000"
  : `${window.location.protocol}//${window.location.hostname}:8000`;
const API_URL = (import.meta.env.VITE_API_URL || defaultApiUrl).replace(/\/$/, "");

async function request(path, options = {}) {
  let response;
  try {
    response = await fetch(`${API_URL}${path}`, {
      headers: { "Content-Type": "application/json", ...options.headers },
      ...options,
    });
  } catch {
    throw new Error(`Unable to reach the backend at ${API_URL}. Start the FastAPI server on port 8000.`);
  }

  const payload = await response.json().catch(() => undefined);

  if (!response.ok) {
    throw new Error(payload?.detail || payload?.message || `Request failed (${response.status})`);
  }

  return payload;
}

const titleCase = (value) => String(value || "").replace(/(^|[_ -])\w/g, (letter) => letter.toUpperCase());

export function normalizeIncident(incident) {
  const required = incident.resources_required ? String(incident.resources_required).split(",").map((item) => item.trim()).filter(Boolean) : [];
  const status = incident.status === "active" ? "Response Required" : titleCase(incident.status);
  return {
    ...incident,
    id: `INC-${String(incident.id).padStart(4, "0")}`,
    backendId: incident.id,
    location: `${Number(incident.latitude).toFixed(4)}, ${Number(incident.longitude).toFixed(4)}`,
    type: required[0] ? titleCase(required[0]) : "Emergency Incident",
    severity: titleCase(incident.severity),
    affected: incident.people_affected || 0,
    injured: incident.injured || 0,
    resourceNeed: required.length ? required.map(titleCase).join(" + ") : "Assessment required",
    requiredResources: required.map(titleCase),
    assignedResources: [],
    status,
    reported: "Backend record",
    reportedMinutes: 0,
    description: `${incident.people_affected || 0} people affected and ${incident.injured || 0} injured near ${Number(incident.latitude).toFixed(4)}, ${Number(incident.longitude).toFixed(4)}.`,
    accessibility: "Unknown",
    nearbyResources: [],
    estimatedResponse: "Pending allocation",
    position: [incident.latitude, incident.longitude],
    zone: `Lat ${Number(incident.latitude).toFixed(2)} / Lon ${Number(incident.longitude).toFixed(2)}`,
  };
}

export function normalizeResource(resource) {
  return {
    ...resource,
    id: String(resource.id),
    type: titleCase(resource.type),
    location: `${Number(resource.latitude).toFixed(4)}, ${Number(resource.longitude).toFixed(4)}`,
    zone: "Backend location",
    availability: titleCase(resource.status),
    status: titleCase(resource.status),
    condition: "Operational",
    eta: resource.status === "available" ? "Ready" : "Unavailable",
    position: [resource.latitude, resource.longitude],
  };
}

export const api = {
  getIncidents: () => request("/incidents/").then((items) => items.map(normalizeIncident)),
  createIncident: (payload) => request("/incidents/", { method: "POST", body: JSON.stringify(payload) }).then((result) => normalizeIncident(result.incident)),
  getResources: () => request("/resources/").then((items) => items.map(normalizeResource)),
  getHospitals: () => request("/resources/hospitals"),
  getShelters: () => request("/resources/shelters"),
  getAllocation: (incidentId) => request(`/allocation/${incidentId}`),
  deployResources: (incidentId) => request(`/allocation/${incidentId}/deploy`, { method: "POST" }),
  analyzeReport: (report) => request("/ai/analyze", { method: "POST", body: JSON.stringify({ report }) }),
  getEquity: () => request("/equity/"),
};

export { API_URL };
