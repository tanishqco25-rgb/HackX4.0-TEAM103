import { Play, RotateCcw } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import DemandForecast from "../components/simulation/DemandForecast";
import ResourceImpact from "../components/simulation/ResourceImpact";
import ScenarioComparison from "../components/simulation/ScenarioComparison";
import ScenarioMetrics from "../components/simulation/ScenarioMetrics";
import ScenarioPresets from "../components/simulation/ScenarioPresets";
import SimulationControls from "../components/simulation/SimulationControls";
import SimulationHistory from "../components/simulation/SimulationHistory";
import SimulationRecommendations from "../components/simulation/SimulationRecommendations";
import { baseMetrics, baseScenario, scenarioPresets, initialHistory } from "../data/simulation";
import { calculateSimulation } from "../utils/simulationCalculations";

function Simulation() {
  const [scenario, setScenario] = useState(baseScenario);
  const [activePreset, setActivePreset] = useState("BASELINE");
  const [running, setRunning] = useState(false);
  const [lastSimulation, setLastSimulation] = useState("Never");
  const [history, setHistory] = useState(initialHistory);
  const simulated = useMemo(() => calculateSimulation(scenario), [scenario]);
  const current = baseMetrics;
  const forecast = simulated.demand.map((resource) => ({ name: resource.name, current: resource.current, simulated: resource.required }));
  const recommendations = useMemo(() => {
    const top = [...simulated.demand].sort((a, b) => b.gap - a.gap).slice(0, 4);
    const zone = scenario.severity === "Critical" ? "Zone Alpha" : scenario.roads < 55 ? "Zone Delta" : "Zone Beta";
    return top.map((resource, index) => ({ title: index === 0 ? `Deploy ${resource.gap} additional ${resource.name.toLowerCase()} to ${zone}.` : index === 1 ? `Open additional ${resource.name.toLowerCase()} capacity in Zone Delta.` : `Pre-position ${resource.name.toLowerCase()} near ${zone}.`, reason: `${scenario.population.toLocaleString()} affected people and ${scenario.medical}% medical demand exceed current nearby capacity.`, impact: `Demand coverage +${Math.max(4, Math.round(resource.gap * 1.8))}%` }));
  }, [scenario, simulated.demand]);

  useEffect(() => { if (!running) return undefined; const timer = setTimeout(() => { const status = simulated.coverage < 70 ? "High Risk" : simulated.coverage < 82 ? "Reviewed" : "Stable"; setHistory((items) => [{ scenario: activePreset === "BASELINE" ? "Custom Scenario" : activePreset.replace("MULTI-ZONE EMERGENCY", "Multi-Zone Emergency").replace("MAJOR EARTHQUAKE", "Major Earthquake").replace("SEVERE FLOOD", "Severe Flood"), severity: scenario.severity, population: scenario.population.toLocaleString(), coverage: `${simulated.coverage}%`, response: `${simulated.response} min`, status }, ...items].slice(0, 5)); setLastSimulation("Just now"); setRunning(false); }, 1300); return () => clearTimeout(timer); }, [activePreset, running, scenario, simulated]);

  const updateScenario = (key, value) => { setScenario((currentScenario) => ({ ...currentScenario, [key]: value })); setActivePreset("CUSTOM"); };
  const choosePreset = (preset) => { setScenario(preset.values); setActivePreset(preset.name); };
  const reset = () => { setScenario(baseScenario); setActivePreset("BASELINE"); setLastSimulation("Never"); };

  return <div className="mx-auto max-w-[1680px] space-y-4"><div className="flex flex-wrap items-end justify-between gap-3"><div><p className="text-[10px] font-bold tracking-[0.2em] text-cyan-400">PLANNING / SCENARIO LAB</p><h1 className="mt-1 text-2xl font-semibold tracking-tight text-slate-100">What-If Simulation</h1><p className="mt-1 text-sm text-slate-500">Simulate changing disaster conditions and evaluate emergency response requirements.</p></div><div className="flex items-center gap-2 text-[10px] font-bold tracking-[0.12em] text-emerald-300"><span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />SIMULATION READY</div></div><section className="flex flex-wrap items-center justify-between gap-4 rounded-md border border-slate-800 bg-[#111b24] p-4"><div className="flex flex-wrap gap-x-6 gap-y-2 text-[10px]"><span className="text-slate-500">SIMULATION STATUS <b className="ml-1 text-emerald-300">{running ? "Processing" : "Ready"}</b></span><span className="text-slate-500">BASE SCENARIO <b className="ml-1 text-slate-300">Earthquake Response</b></span><span className="text-slate-500">LAST SIMULATION <b className="ml-1 text-slate-300">{lastSimulation}</b></span></div><div className="flex gap-2"><button type="button" disabled={running} onClick={() => setRunning(true)} className="flex items-center gap-2 rounded bg-cyan-400 px-3 py-2 text-xs font-bold text-slate-950 disabled:cursor-wait disabled:opacity-60"><Play size={14} />{running ? "PROCESSING..." : "RUN SIMULATION"}</button><button type="button" onClick={reset} className="flex items-center gap-2 rounded border border-slate-700 px-3 py-2 text-xs font-bold text-slate-400 hover:bg-slate-800 hover:text-slate-100"><RotateCcw size={14} /> RESET SCENARIO</button></div>{running && <p className="basis-full text-[10px] font-medium tracking-[0.08em] text-orange-300">Loading scenario... Calculating demand... Evaluating resource gaps... Generating response plan...</p>}</section><div className="grid gap-4 xl:grid-cols-[minmax(0,1.1fr)_minmax(340px,0.9fr)]"><SimulationControls scenario={scenario} onChange={updateScenario} /><ScenarioPresets presets={scenarioPresets} active={activePreset} onSelect={choosePreset} /></div><ScenarioMetrics current={current} simulated={simulated} /><div className="grid gap-4 xl:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)]"><DemandForecast data={forecast} /><ResourceImpact resources={simulated.demand} /></div><div className="grid gap-4 xl:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]"><SimulationRecommendations recommendations={recommendations} /><ScenarioComparison current={current} simulated={simulated} /></div><SimulationHistory history={history} /></div>;
}

export default Simulation;