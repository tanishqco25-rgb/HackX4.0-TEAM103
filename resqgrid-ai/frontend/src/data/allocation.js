export const allocationIncidents = [
  { id: "INC-1042", zone: "Zone Alpha", severity: "CRITICAL", affected: 1850, required: ["2 Ambulances", "1 Rescue Team", "1 Medical Team"], priority: 94, description: "Major structural damage and multiple medical emergencies reported across the east transit corridor.", position: [28.626, 77.222] },
  { id: "INC-1047", zone: "Zone Delta", severity: "CRITICAL", affected: 940, required: ["2 Rescue Teams", "1 Medical Team"], priority: 88, description: "Partial building collapse has isolated three blocks and requires structural search support.", position: [28.612, 77.208] },
  { id: "INC-1051", zone: "Zone Beta", severity: "HIGH", affected: 620, required: ["1 Ambulance", "2 Medical Teams"], priority: 81, description: "High-volume triage demand at the north transit interchange after a secondary tremor.", position: [28.632, 77.241] },
  { id: "INC-1036", zone: "Zone Gamma", severity: "HIGH", affected: 480, required: ["2 Water Rescue Teams", "1 Shelter Unit"], priority: 76, description: "Flash flooding has displaced residents from two low-lying apartment blocks.", position: [28.608, 77.218] },
  { id: "INC-1035", zone: "Zone Echo", severity: "MEDIUM", affected: 310, required: ["1 Fire Unit", "1 Medical Team"], priority: 62, description: "Utility fire is contained, with crews monitoring hot spots before re-entry.", position: [28.603, 77.231] },
  { id: "INC-1029", zone: "Zone Alpha", severity: "MEDIUM", affected: 185, required: ["1 Shelter Support Unit"], priority: 54, description: "Shelter occupancy is approaching the planned threshold for vulnerable residents.", position: [28.641, 77.226] },
];

export const allocationResources = [
  { id: "AMB-A12", type: "Ambulance", location: "Zone Beta", availability: "Available", distance: "4.2 km", travel: "8 min", position: [28.619, 77.214] },
  { id: "AMB-A18", type: "Ambulance", location: "Zone Gamma", availability: "Available", distance: "6.8 km", travel: "13 min", position: [28.608, 77.218] },
  { id: "RES-R04", type: "Rescue Team", location: "Zone Gamma", availability: "Available", distance: "7.1 km", travel: "15 min", position: [28.616, 77.234] },
  { id: "RES-R09", type: "Rescue Team", location: "Zone Echo", availability: "Available", distance: "9.5 km", travel: "19 min", position: [28.603, 77.231] },
  { id: "MED-M02", type: "Medical Team", location: "Zone Delta", availability: "Available", distance: "5.4 km", travel: "11 min", position: [28.612, 77.208] },
  { id: "MED-M04", type: "Medical Team", location: "Zone Gamma", availability: "Available", distance: "8.2 km", travel: "16 min", position: [28.608, 77.218] },
  { id: "WTR-W06", type: "Water Supply", location: "Central Hub", availability: "Available", distance: "6.3 km", travel: "12 min", position: [28.619, 77.202] },
  { id: "FOD-F14", type: "Food Supply", location: "Zone Beta", availability: "Available", distance: "3.6 km", travel: "7 min", position: [28.632, 77.241] },
  { id: "KIT-K12", type: "Medicine Kit", location: "Central Hub", availability: "Available", distance: "4.8 km", travel: "10 min", position: [28.619, 77.202] },
];

export const recommendations = [
  { id: "01", resourceId: "AMB-A12", incidentId: "INC-1042", priority: 94, eta: "8 min", confidence: 96, reason: "High medical demand, critical incident severity and insufficient nearby ambulance coverage.", impactCoverage: "+18%", impactTime: "-7 min", factors: { severity: 35, population: 25, shortage: 20, distance: 15, availability: 5 } },
  { id: "02", resourceId: "RES-R04", incidentId: "INC-1047", priority: 91, eta: "15 min", confidence: 92, reason: "Structural search is the limiting factor in Zone Delta and R04 provides the shortest available route.", impactCoverage: "+15%", impactTime: "-9 min", factors: { severity: 35, population: 25, shortage: 20, distance: 15, availability: 5 } },
  { id: "03", resourceId: "MED-M02", incidentId: "INC-1051", priority: 86, eta: "11 min", confidence: 89, reason: "Zone Beta has rising triage demand and M02 can reinforce the existing team before capacity is exceeded.", impactCoverage: "+12%", impactTime: "-5 min", factors: { severity: 35, population: 25, shortage: 20, distance: 15, availability: 5 } },
  { id: "04", resourceId: "WTR-W06", incidentId: "INC-1036", priority: 79, eta: "12 min", confidence: 87, reason: "Flood displacement has created a water shortage and W06 is the nearest sealed reserve.", impactCoverage: "+10%", impactTime: "-4 min", factors: { severity: 35, population: 25, shortage: 20, distance: 15, availability: 5 } },
];

export const allocationScores = [
  { incidentId: "INC-1042", scores: { "AMB-A12": 94, "AMB-A18": 72, "RES-R04": 81, "MED-M02": 89 } },
  { incidentId: "INC-1047", scores: { "AMB-A12": 68, "AMB-A18": 74, "RES-R04": 91, "MED-M02": 79 } },
  { incidentId: "INC-1051", scores: { "AMB-A12": 76, "AMB-A18": 83, "RES-R04": 77, "MED-M02": 86 } },
  { incidentId: "INC-1036", scores: { "AMB-A12": 51, "AMB-A18": 63, "RES-R04": 58, "MED-M02": 69 } },
  { incidentId: "INC-1035", scores: { "AMB-A12": 42, "AMB-A18": 55, "RES-R04": 61, "MED-M02": 72 } },
];

export const optimisationMetrics = { resourcesOptimised: 42, criticalGaps: 6, responseReduction: 23, coverage: 87, before: { response: 18, coverage: 69, gaps: 11, unserved: 4280 }, after: { response: 14, coverage: 87, gaps: 6, unserved: 2130 } };

export const allocationMapData = { blocked: [[[28.638, 77.204], [28.626, 77.222]], [[28.596, 77.207], [28.608, 77.218]]], recommendationRoutes: [[[28.619, 77.214], [28.626, 77.222]], [[28.616, 77.234], [28.612, 77.208]], [[28.612, 77.208], [28.632, 77.241]]], resourcePositions: allocationResources, incidentPositions: allocationIncidents };