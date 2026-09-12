export const analyticsRanges = {
  "Last 24 Hours": {
    summary: { response: "14 min", responseTrend: "↓ 22% vs baseline", coverage: "87%", coverageTrend: "↑ 18%", utilisation: "81%", utilisationTrend: "↑ 9%", resolved: "68%", resolvedTrend: "↑ 14%", efficiency: "91%", efficiencyTrend: "↑ 16%", unmet: "18%", unmetTrend: "↓ 27%" },
    responseTrend: ["00:00", "04:00", "08:00", "12:00", "16:00", "20:00"].map((time, index) => ({ time, average: [19, 18, 17, 15, 14, 14][index], critical: [28, 27, 25, 22, 20, 19][index], ai: [18, 17, 16, 14, 13, 12][index] })),
    demand: [{ name: "Ambulances", demand: 31, capacity: 24, allocated: 22 }, { name: "Rescue Teams", demand: 24, capacity: 18, allocated: 17 }, { name: "Medical Teams", demand: 21, capacity: 16, allocated: 15 }, { name: "Water", demand: 52, capacity: 40, allocated: 38 }, { name: "Food", demand: 46, capacity: 35, allocated: 34 }, { name: "Shelters", demand: 22, capacity: 18, allocated: 17 }],
    incident: [{ name: "Resolved", value: 18, color: "#34d399" }, { name: "Responding", value: 6, color: "#22d3ee" }, { name: "Monitoring", value: 3, color: "#f59e0b" }],
    zones: [{ zone: "Zone Alpha", incidents: 8, population: "12,400", coverage: 42, response: 19, gap: 5, priority: 94 }, { zone: "Zone Beta", incidents: 5, population: "6,800", coverage: 78, response: 11, gap: 2, priority: 81 }, { zone: "Zone Gamma", incidents: 4, population: "3,200", coverage: 89, response: 9, gap: 1, priority: 63 }, { zone: "Zone Delta", incidents: 6, population: "5,900", coverage: 61, response: 16, gap: 3, priority: 76 }, { zone: "Zone Echo", incidents: 4, population: "2,100", coverage: 91, response: 8, gap: 0, priority: 48 }],
    efficiency: [{ name: "Ambulances", value: 91 }, { name: "Rescue Teams", value: 88 }, { name: "Medical Teams", value: 94 }, { name: "Supplies", value: 82 }],
    aiImpact: { without: { response: 18, coverage: 69, gaps: 11, unserved: 4280 }, with: { response: 14, coverage: 87, gaps: 6, unserved: 2130 } },
  },
  "Last 7 Days": {
    summary: { response: "16 min", responseTrend: "↓ 18% vs baseline", coverage: "82%", coverageTrend: "↑ 14%", utilisation: "78%", utilisationTrend: "↑ 7%", resolved: "63%", resolvedTrend: "↑ 11%", efficiency: "87%", efficiencyTrend: "↑ 13%", unmet: "23%", unmetTrend: "↓ 19%" },
    responseTrend: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((time, index) => ({ time, average: [19, 18, 17, 17, 16, 15, 16][index], critical: [27, 26, 24, 25, 22, 21, 22][index], ai: [18, 17, 16, 15, 14, 14, 14][index] })),
    demand: [{ name: "Ambulances", demand: 28, capacity: 24, allocated: 21 }, { name: "Rescue Teams", demand: 22, capacity: 18, allocated: 16 }, { name: "Medical Teams", demand: 20, capacity: 16, allocated: 14 }, { name: "Water", demand: 47, capacity: 40, allocated: 36 }, { name: "Food", demand: 42, capacity: 35, allocated: 32 }, { name: "Shelters", demand: 21, capacity: 18, allocated: 16 }],
    incident: [{ name: "Resolved", value: 94, color: "#34d399" }, { name: "Responding", value: 22, color: "#22d3ee" }, { name: "Monitoring", value: 11, color: "#f59e0b" }],
    zones: [{ zone: "Zone Alpha", incidents: 21, population: "31,200", coverage: 48, response: 21, gap: 7, priority: 96 }, { zone: "Zone Beta", incidents: 16, population: "18,400", coverage: 75, response: 13, gap: 3, priority: 82 }, { zone: "Zone Gamma", incidents: 12, population: "9,200", coverage: 86, response: 10, gap: 2, priority: 65 }, { zone: "Zone Delta", incidents: 18, population: "16,100", coverage: 59, response: 18, gap: 5, priority: 79 }, { zone: "Zone Echo", incidents: 9, population: "6,800", coverage: 90, response: 9, gap: 1, priority: 51 }],
    efficiency: [{ name: "Ambulances", value: 87 }, { name: "Rescue Teams", value: 84 }, { name: "Medical Teams", value: 91 }, { name: "Supplies", value: 79 }],
    aiImpact: { without: { response: 20, coverage: 64, gaps: 14, unserved: 11200 }, with: { response: 16, coverage: 82, gaps: 8, unserved: 7100 } },
  },
  "Last 30 Days": {
    summary: { response: "17 min", responseTrend: "↓ 16% vs baseline", coverage: "79%", coverageTrend: "↑ 12%", utilisation: "75%", utilisationTrend: "↑ 6%", resolved: "59%", resolvedTrend: "↑ 9%", efficiency: "84%", efficiencyTrend: "↑ 11%", unmet: "27%", unmetTrend: "↓ 15%" },
    responseTrend: ["01", "06", "11", "16", "21", "26", "30"].map((time, index) => ({ time: `Day ${time}`, average: [21, 19, 18, 17, 18, 16, 17][index], critical: [31, 29, 27, 25, 26, 23, 24][index], ai: [20, 18, 17, 15, 16, 14, 15][index] })),
    demand: [{ name: "Ambulances", demand: 26, capacity: 24, allocated: 20 }, { name: "Rescue Teams", demand: 20, capacity: 18, allocated: 15 }, { name: "Medical Teams", demand: 18, capacity: 16, allocated: 14 }, { name: "Water", demand: 44, capacity: 40, allocated: 34 }, { name: "Food", demand: 39, capacity: 35, allocated: 30 }, { name: "Shelters", demand: 20, capacity: 18, allocated: 15 }],
    incident: [{ name: "Resolved", value: 410, color: "#34d399" }, { name: "Responding", value: 88, color: "#22d3ee" }, { name: "Monitoring", value: 56, color: "#f59e0b" }],
    zones: [{ zone: "Zone Alpha", incidents: 72, population: "108,400", coverage: 53, response: 22, gap: 8, priority: 97 }, { zone: "Zone Beta", incidents: 48, population: "62,800", coverage: 77, response: 14, gap: 4, priority: 84 }, { zone: "Zone Gamma", incidents: 39, population: "34,600", coverage: 88, response: 11, gap: 2, priority: 67 }, { zone: "Zone Delta", incidents: 56, population: "57,100", coverage: 63, response: 18, gap: 5, priority: 81 }, { zone: "Zone Echo", incidents: 31, population: "21,900", coverage: 91, response: 9, gap: 1, priority: 53 }],
    efficiency: [{ name: "Ambulances", value: 84 }, { name: "Rescue Teams", value: 81 }, { name: "Medical Teams", value: 89 }, { name: "Supplies", value: 76 }],
    aiImpact: { without: { response: 21, coverage: 61, gaps: 17, unserved: 38400 }, with: { response: 17, coverage: 79, gaps: 10, unserved: 24600 } },
  },
};

export const insightTemplates = [
  "Zone Alpha remains the most underserved area with only {coverage}% resource coverage.",
  "AI-assisted allocation reduced average emergency response time by approximately {reduction}% in the selected demo period.",
  "Medical teams are operating at {medical}% utilisation and may require reinforcement.",
  "Zone Echo currently has sufficient resource coverage and can support nearby zones.",
  "Critical incident resolution improved compared with the baseline scenario.",
];