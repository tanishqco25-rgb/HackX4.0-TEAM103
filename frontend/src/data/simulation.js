export const baseScenario = { severity: "High", population: 18500, incidents: 27, availability: 80, roads: 75, medical: 70 };

export const severityFactors = { Low: 0.7, Medium: 0.85, High: 1, Critical: 1.25 };

export const scenarioPresets = [
  { name: "BASELINE", values: baseScenario },
  { name: "MAJOR EARTHQUAKE", values: { severity: "Critical", population: 32000, incidents: 45, availability: 65, roads: 55, medical: 90 } },
  { name: "SEVERE FLOOD", values: { severity: "High", population: 26500, incidents: 38, availability: 58, roads: 42, medical: 76 } },
  { name: "MULTI-ZONE EMERGENCY", values: { severity: "Critical", population: 41000, incidents: 54, availability: 48, roads: 62, medical: 84 } },
];

export const baseMetrics = { incidents: 27, population: 18500, coverage: 87, response: 14, gaps: 6, utilisation: 72, unserved: 2395 };

export const resourceBaseline = [
  { name: "Ambulances", current: 24, baseRequired: 24 },
  { name: "Rescue Teams", current: 18, baseRequired: 18 },
  { name: "Medical Teams", current: 16, baseRequired: 16 },
  { name: "Water Supply", current: 40, baseRequired: 40 },
  { name: "Food Supply", current: 35, baseRequired: 35 },
  { name: "Shelters", current: 18, baseRequired: 18 },
];

export const initialHistory = [
  { scenario: "Major Earthquake", severity: "Critical", population: "32,000", coverage: "68%", response: "21 min", status: "High Risk" },
  { scenario: "Severe Flood", severity: "High", population: "26,500", coverage: "74%", response: "18 min", status: "Reviewed" },
  { scenario: "Baseline", severity: "High", population: "18,500", coverage: "87%", response: "14 min", status: "Stable" },
  { scenario: "Multi-Zone Emergency", severity: "Critical", population: "41,000", coverage: "59%", response: "25 min", status: "High Risk" },
];