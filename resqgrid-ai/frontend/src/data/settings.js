export const defaultSettings = {
  command: { dashboard: "Operational Overview", scenario: "Earthquake Response", zoom: "Affected Region", liveIndicators: true, autoRefresh: true, refreshInterval: "30 seconds" },
  alerts: { critical: true, shortage: true, blockage: true, shelter: true, allocation: true, zones: true, sound: false, threshold: "Critical + High" },
  ai: { weights: { severity: 35, population: 25, shortage: 20, distance: 15, availability: 5 }, confidence: "75%", recommendations: true, manualApproval: true },
  map: { incidents: true, resources: true, shelters: true, hospitals: true, zones: true, routes: true, blockedRoads: true, theme: "Dark", compactMarkers: false, routeLabels: true },
  simulation: { severity: "High", population: 18500, availability: 80, roads: 75, history: true, autoSave: false },
};

export const systemStatus = [
  ["API Connection", "Demo Mode", "amber"],
  ["Database", "Simulation Data", "cyan"],
  ["Map Service", "Connected", "green"],
  ["AI Engine", "Operational", "green"],
  ["Notification Service", "Operational", "green"],
];