export const operationalStatus = [
  { label: "DISASTER SCENARIO", value: "Earthquake Response", tone: "text-orange-300" },
  { label: "SYSTEM STATUS", value: "Operational", tone: "text-emerald-300", dot: true },
  { label: "DATA STATUS", value: "Live", tone: "text-cyan-300", dot: true },
  { label: "LAST UPDATED", value: "32 seconds ago", tone: "text-slate-200" },
];

export const kpis = [
  { label: "ACTIVE INCIDENTS", value: "27", detail: "4 new in last hour", context: "+3.2%", tone: "red", icon: "activity" },
  { label: "CRITICAL ZONES", value: "6", detail: "2 require escalation", context: "Priority", tone: "orange", icon: "alert" },
  { label: "AVAILABLE RESOURCES", value: "42", detail: "Across 8 response hubs", context: "Ready", tone: "cyan", icon: "boxes" },
  { label: "RESOURCES DEPLOYED", value: "81%", detail: "134 of 166 units", context: "+6.8%", tone: "blue", icon: "truck" },
  { label: "AVG RESPONSE TIME", value: "14 min", detail: "Target under 18 min", context: "On target", tone: "green", icon: "clock" },
  { label: "UNMET DEMAND", value: "18%", detail: "Down from 24% today", context: "-6.0%", tone: "green", icon: "trend" },
];

export const incidents = [
  {
    id: "INC-1042", location: "Zone Alpha", type: "Earthquake", affected: "1,850 affected", severity: "CRITICAL", resources: "2 Ambulances + 1 Rescue Team", status: "Response Required", time: "08:42",
    details: "Structural collapse reported near the east transit corridor. Medical triage is needed at the western access point while rescue teams clear the primary route.",
  },
  {
    id: "INC-1038", location: "Zone Delta", type: "Infrastructure", affected: "940 affected", severity: "CRITICAL", resources: "1 Medical Team + Water Unit", status: "Teams En Route", time: "08:36",
    details: "Water main disruption has isolated three residential blocks. A mobile medical team is travelling with potable water and sanitation supplies.",
  },
  {
    id: "INC-1040", location: "Zone Beta", type: "Earthquake", affected: "620 affected", severity: "HIGH", resources: "1 Ambulance + 2 Rescue Teams", status: "Active Response", time: "08:31",
    details: "Multiple minor collapses are blocking the north service road. Search teams are working through the accessible southern entrance.",
  },
  {
    id: "INC-1035", location: "Zone Echo", type: "Fire", affected: "310 affected", severity: "HIGH", resources: "Fire Unit + Medical Team", status: "Contained", time: "08:18",
    details: "A utility fire has been contained. Crews are monitoring hot spots and preparing a controlled re-entry for residents.",
  },
  {
    id: "INC-1029", location: "Zone Gamma", type: "Shelter", affected: "185 affected", severity: "MEDIUM", resources: "Shelter Support Unit", status: "Monitoring", time: "07:54",
    details: "Shelter occupancy is approaching the planned threshold. Additional beds are being prepared at the civic centre.",
  },
];

export const recommendations = [
  {
    id: "01", resource: "AMBULANCE A12", destination: "Zone Alpha", priority: "Critical", eta: "8 min", impact: "Reduce medical arrival gap by 22%.", reason: "Zone Alpha has high medical urgency, significant population impact and insufficient nearby medical coverage.",
  },
  {
    id: "02", resource: "RESCUE TEAM R07", destination: "Zone Delta", priority: "High", eta: "12 min", impact: "Restore access for 940 residents.", reason: "The north access route is blocked and the closest available team can clear it before the next demand surge.",
  },
  {
    id: "03", resource: "MEDICAL UNIT M03", destination: "Zone Beta", priority: "High", eta: "15 min", impact: "Add 18 triage beds to the active corridor.", reason: "Current triage capacity is at 86% and two incoming incidents are forecast in the next 30 minutes.",
  },
];

export const utilisationData = [
  { name: "Ambulances", used: 78, available: 22 },
  { name: "Rescue Teams", used: 64, available: 36 },
  { name: "Medical Teams", used: 86, available: 14 },
  { name: "Food & Water", used: 58, available: 42 },
  { name: "Shelters", used: 76, available: 24 },
];

export const responseSummary = [
  { label: "FASTEST RESPONSE", value: "Zone Beta", detail: "8 min", tone: "cyan" },
  { label: "MOST UNDERSERVED", value: "Zone Delta", detail: "54% coverage", tone: "orange" },
  { label: "HIGHEST DEMAND", value: "Zone Alpha", detail: "94/100 priority", tone: "red" },
  { label: "SHELTER CAPACITY", value: "76%", detail: "1,248 of 1,640 beds", tone: "green" },
];

export const mapData = {
  incidents: [
    { id: "INC-1042", position: [28.626, 77.222], severity: "critical", label: "Zone Alpha" },
    { id: "INC-1038", position: [28.612, 77.208], severity: "critical", label: "Zone Delta" },
    { id: "INC-1040", position: [28.632, 77.241], severity: "high", label: "Zone Beta" },
    { id: "INC-1035", position: [28.603, 77.231], severity: "high", label: "Zone Echo" },
  ],
  resources: [
    { position: [28.619, 77.214], kind: "ambulance", label: "Ambulance A12" },
    { position: [28.616, 77.234], kind: "rescue", label: "Rescue Team R07" },
    { position: [28.608, 77.218], kind: "medical", label: "Medical Unit M03" },
  ],
  shelters: [
    { position: [28.641, 77.226], label: "Civic Centre Shelter" },
    { position: [28.595, 77.214], label: "South School Shelter" },
  ],
  facilities: [{ position: [28.615, 77.251], label: "Central Medical Facility" }],
  zones: [
    { center: [28.626, 77.222], radius: 1050, severity: "critical", label: "Alpha affected zone" },
    { center: [28.608, 77.208], radius: 720, severity: "high", label: "Delta affected zone" },
  ],
  blockedRoads: [
    [[28.638, 77.204], [28.626, 77.222], [28.612, 77.239]],
    [[28.596, 77.207], [28.608, 77.218]],
  ],
  routes: [
    [[28.619, 77.214], [28.626, 77.222]],
    [[28.616, 77.234], [28.608, 77.208]],
  ],
};