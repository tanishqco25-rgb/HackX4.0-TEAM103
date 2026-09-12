export const incidents = [
  { id: "INC-1042", zone: "Zone Alpha", type: "Earthquake", severity: "Critical", affected: 1850, position: [28.626, 77.222], coverage: 42, required: ["2 Ambulances", "1 Rescue Team", "1 Medical Team"] },
  { id: "INC-1047", zone: "Zone Beta", type: "Building Collapse", severity: "High", affected: 720, position: [28.632, 77.241], coverage: 68, required: ["2 Rescue Teams", "1 Medical Team"] },
  { id: "INC-1051", zone: "Zone Gamma", type: "Medical Emergency", severity: "Medium", affected: 310, position: [28.608, 77.218], coverage: 76, required: ["1 Ambulance", "1 Medical Team"] },
  { id: "INC-1056", zone: "Zone Delta", type: "Fire", severity: "High", affected: 580, position: [28.612, 77.208], coverage: 61, required: ["1 Fire Unit", "1 Medical Team"] },
  { id: "INC-1060", zone: "Zone Echo", type: "Flood", severity: "Low", affected: 210, position: [28.603, 77.231], coverage: 91, required: ["1 Water Supply"] },
  { id: "INC-1064", zone: "Zone Alpha", type: "Landslide", severity: "High", affected: 440, position: [28.641, 77.226], coverage: 48, required: ["1 Rescue Team", "1 Earthmover"] },
  { id: "INC-1068", zone: "Zone Beta", type: "Earthquake", severity: "Critical", affected: 980, position: [28.618, 77.252], coverage: 55, required: ["2 Ambulances", "2 Medical Teams"] },
  { id: "INC-1071", zone: "Zone Gamma", type: "Fire", severity: "Medium", affected: 160, position: [28.595, 77.214], coverage: 82, required: ["1 Fire Unit"] },
  { id: "INC-1075", zone: "Zone Delta", type: "Medical Emergency", severity: "Low", affected: 95, position: [28.598, 77.245], coverage: 88, required: ["1 Ambulance"] },
  { id: "INC-1079", zone: "Zone Echo", type: "Building Collapse", severity: "Medium", affected: 270, position: [28.646, 77.208], coverage: 73, required: ["1 Rescue Team"] },
];

export const zones = [
  { name: "Zone Alpha", severity: "Critical", population: 18500, affected: 12400, coverage: 42, priority: 94, center: [28.626, 77.222], radius: 1050 },
  { name: "Zone Beta", severity: "High", population: 13200, affected: 6800, coverage: 68, priority: 81, center: [28.632, 77.241], radius: 850 },
  { name: "Zone Gamma", severity: "Medium", population: 9800, affected: 3200, coverage: 76, priority: 63, center: [28.608, 77.218], radius: 700 },
  { name: "Zone Delta", severity: "High", population: 11500, affected: 5900, coverage: 61, priority: 76, center: [28.612, 77.208], radius: 800 },
  { name: "Zone Echo", severity: "Low", population: 7100, affected: 2100, coverage: 91, priority: 48, center: [28.603, 77.231], radius: 600 },
];

export const resources = [
  { id: "AMB-A12", type: "Ambulance", location: "Zone Beta", status: "Available", zone: "Zone Alpha", eta: "8 min", position: [28.619, 77.214] },
  { id: "AMB-A18", type: "Ambulance", location: "Zone Gamma", status: "En Route", zone: "Zone Beta", eta: "13 min", position: [28.608, 77.218] },
  { id: "AMB-A09", type: "Ambulance", location: "Zone Delta", status: "Available", zone: "Zone Delta", eta: "Ready", position: [28.616, 77.234] },
  { id: "RES-R04", type: "Rescue Team", location: "Zone Echo", status: "Available", zone: "Zone Echo", eta: "Ready", position: [28.603, 77.231] },
  { id: "RES-R07", type: "Rescue Team", location: "Zone Alpha", status: "Deployed", zone: "Zone Alpha", eta: "On site", position: [28.626, 77.222] },
  { id: "RES-R09", type: "Rescue Team", location: "Zone Gamma", status: "Available", zone: "Zone Delta", eta: "Ready", position: [28.608, 77.218] },
  { id: "MED-M02", type: "Medical Team", location: "Zone Beta", status: "Deployed", zone: "Zone Beta", eta: "On site", position: [28.632, 77.241] },
  { id: "MED-M04", type: "Medical Team", location: "Zone Gamma", status: "Available", zone: "Zone Alpha", eta: "16 min", position: [28.608, 77.218] },
  { id: "MED-M07", type: "Medical Team", location: "Zone Delta", status: "En Route", zone: "Zone Beta", eta: "15 min", position: [28.612, 77.208] },
  { id: "SUP-S03", type: "Supply Vehicle", location: "Central Hub", status: "Available", zone: "Zone Echo", eta: "Ready", position: [28.619, 77.202] },
  { id: "SUP-S08", type: "Supply Vehicle", location: "Zone Echo", status: "Deployed", zone: "Zone Echo", eta: "On site", position: [28.603, 77.231] },
  { id: "SUP-S11", type: "Supply Vehicle", location: "Central Hub", status: "En Route", zone: "Zone Alpha", eta: "12 min", position: [28.619, 77.202] },
  { id: "AMB-A21", type: "Ambulance", location: "Central Hub", status: "Available", zone: "Zone Gamma", eta: "Ready", position: [28.619, 77.202] },
  { id: "RES-R12", type: "Rescue Team", location: "Zone Beta", status: "Available", zone: "Zone Beta", eta: "Ready", position: [28.632, 77.241] },
  { id: "MED-M09", type: "Medical Team", location: "Zone Echo", status: "Available", zone: "Zone Delta", eta: "Ready", position: [28.603, 77.231] },
];

export const hospitals = [
  { name: "Central Emergency Hospital", capacity: 240, occupied: 182, available: 58, status: "Operational", position: [28.615, 77.251] },
  { name: "North Field Hospital", capacity: 160, occupied: 128, available: 32, status: "Operational", position: [28.646, 77.208] },
  { name: "East Trauma Centre", capacity: 120, occupied: 108, available: 12, status: "High Load", position: [28.598, 77.245] },
  { name: "South Medical Post", capacity: 80, occupied: 41, available: 39, status: "Operational", position: [28.595, 77.214] },
];

export const shelters = [
  { name: "Shelter-07", capacity: 500, occupied: 384, available: 116, status: "Open", position: [28.641, 77.226] },
  { name: "Shelter-03", capacity: 320, occupied: 245, available: 75, status: "Open", position: [28.595, 77.214] },
  { name: "Shelter-11", capacity: 260, occupied: 260, available: 0, status: "Full", position: [28.603, 77.231] },
  { name: "Shelter-14", capacity: 420, occupied: 210, available: 210, status: "Open", position: [28.612, 77.208] },
  { name: "Shelter-18", capacity: 180, occupied: 96, available: 84, status: "Open", position: [28.632, 77.241] },
];

export const reliefCenters = [
  { name: "Relief Center Alpha", water: "1,200 L", food: "840 units", medicine: "320 kits", status: "Operational", position: [28.619, 77.202] },
  { name: "Relief Center Delta", water: "860 L", food: "620 units", medicine: "180 kits", status: "Operational", position: [28.608, 77.218] },
  { name: "Relief Center Echo", water: "540 L", food: "410 units", medicine: "96 kits", status: "Limited Stock", position: [28.603, 77.231] },
];

export const roads = [
  { id: "ROAD-07", cause: "Structural Damage", status: "Blocked", alternative: "Route B", positions: [[28.638, 77.204], [28.626, 77.222], [28.616, 77.234]] },
  { id: "ROAD-12", cause: "Flooding", status: "Restricted", alternative: "Route C", positions: [[28.596, 77.207], [28.608, 77.218], [28.618, 77.241]] },
  { id: "ROAD-03", cause: "Debris", status: "Open", alternative: "-", positions: [[28.646, 77.208], [28.632, 77.241]] },
  { id: "ROAD-18", cause: "Utility Inspection", status: "Restricted", alternative: "Route A", positions: [[28.595, 77.214], [28.603, 77.231]] },
];

export const routes = [
  { id: "ROUTE-A12", resource: "AMB-A12", from: "Zone Beta", to: "Zone Alpha", distance: "4.2 km", eta: "8 min", status: "AI Recommended", positions: [[28.619, 77.214], [28.626, 77.222]] },
  { id: "ROUTE-R07", resource: "RES-R07", from: "Zone Alpha", to: "Zone Delta", distance: "5.1 km", eta: "12 min", status: "Active Route", positions: [[28.626, 77.222], [28.612, 77.208]] },
  { id: "ROUTE-S11", resource: "SUP-S11", from: "Central Hub", to: "Zone Alpha", distance: "6.3 km", eta: "12 min", status: "Alternative Route", positions: [[28.619, 77.202], [28.626, 77.222]] },
];