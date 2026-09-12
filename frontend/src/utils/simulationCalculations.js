import { resourceBaseline, severityFactors } from "../data/simulation";

export function calculateIncidentDemand(scenario) {
  return Math.round(scenario.incidents * severityFactors[scenario.severity] * (scenario.population / 18500));
}

export function calculateResourceDemand(scenario) {
  const multiplier = severityFactors[scenario.severity] * (scenario.population / 18500) * (0.7 + scenario.medical / 300) * (1 + (100 - scenario.roads) / 400);
  return resourceBaseline.map((resource, index) => ({ ...resource, required: Math.max(resource.current, Math.round(resource.baseRequired * multiplier + index * (multiplier - 1) * 1.5)), gap: Math.max(0, Math.round(resource.baseRequired * multiplier + index * (multiplier - 1) * 1.5) - Math.round(resource.current * scenario.availability / 100)) }));
}

export function calculateDemandCoverage(scenario) {
  const demandPressure = severityFactors[scenario.severity] * (scenario.population / 18500) * (0.7 + scenario.medical / 300);
  return Math.max(35, Math.min(98, Math.round(87 - (demandPressure - 1) * 28 - (80 - scenario.availability) * 0.22 - (75 - scenario.roads) * 0.08)));
}

export function calculateResponseTime(scenario) {
  return Math.max(9, Math.round(14 + (severityFactors[scenario.severity] - 1) * 9 + (scenario.population - 18500) / 5000 + (80 - scenario.availability) / 10 + (75 - scenario.roads) / 8));
}

export function calculateCriticalGaps(scenario, demand = calculateResourceDemand(scenario)) {
  return Math.max(2, Math.round(demand.filter((resource) => resource.gap > 0).length + (100 - scenario.availability) / 18 + (severityFactors[scenario.severity] - 1) * 5));
}

export function calculateUnservedPopulation(scenario, coverage = calculateDemandCoverage(scenario)) {
  return Math.round(scenario.population * (1 - coverage / 100));
}

export function calculateSimulation(scenario) {
  const demand = calculateResourceDemand(scenario);
  const coverage = calculateDemandCoverage(scenario);
  return { demand, incidents: calculateIncidentDemand(scenario), coverage, response: calculateResponseTime(scenario), gaps: calculateCriticalGaps(scenario, demand), unserved: calculateUnservedPopulation(scenario, coverage), utilisation: Math.min(99, Math.round(100 - scenario.availability * 0.28)), population: scenario.population };
}