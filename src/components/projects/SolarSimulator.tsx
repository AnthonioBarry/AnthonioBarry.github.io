"use client";

import React, { useState, useEffect } from "react";
import { Sun, Battery, Cpu, Landmark, Leaf, TrendingUp } from "lucide-react";

export default function SolarSimulator() {
  // Slider states
  const [panelCapacity, setPanelCapacity] = useState<number>(8); // kWp
  const [batteryCapacity, setBatteryCapacity] = useState<number>(24); // kWh
  const [loadDemand, setLoadDemand] = useState<number>(2.2); // kW steady load

  // Computed metrics
  const [solarFraction, setSolarFraction] = useState<number>(75);
  const [dieselSaved, setDieselSaved] = useState<number>(3400); // Liters/yr
  const [co2Saved, setCo2Saved] = useState<number>(8.9); // Tonnes/yr
  const [autonomyHrs, setAutonomyHrs] = useState<number>(11);

  useEffect(() => {
    // Basic mathematical model for analytical rigor
    // Daily load demand: loadDemand * 24 hrs = e.g. 2.2 * 24 = 52.8 kWh
    const dailyLoad = loadDemand * 24;
    
    // Average Indonesian peak sun hours (PSH): ~4.5 hours
    const dailySolarYield = panelCapacity * 4.5;
    
    // Fraction of daily energy met by solar (taking into account battery buffer efficiency ~85%)
    // If solar yield is greater than load, we are limited by battery size to carry over night.
    const batteryLimit = batteryCapacity * 0.85; 
    const directDayload = loadDemand * 9; // ~9 hrs of direct sun operation
    
    // Calculated solar coverage
    const usableSolarInput = Math.min(dailySolarYield, directDayload + batteryLimit);
    const fraction = Math.min(100, Math.round((usableSolarInput / dailyLoad) * 100));
    
    // Diesel savings: 1 kWh of solar replaces approx 0.35 Liters of diesel in generator
    const annualEnergyYield = usableSolarInput * 365;
    const litersSaved = Math.round(annualEnergyYield * 0.38);
    
    // Carbon savings: 1 liter diesel = ~2.68 kg CO2
    const tonnesCo2 = parseFloat(((litersSaved * 2.68) / 1000).toFixed(1));
    
    // Autonomy hours from fully charged battery: battery / load
    const autonomy = Math.round(batteryLimit / loadDemand);

    setSolarFraction(fraction);
    setDieselSaved(litersSaved);
    setCo2Saved(tonnesCo2);
    setAutonomyHrs(autonomy);
  }, [panelCapacity, batteryCapacity, loadDemand]);

  // Generate SVG path for Solar Yield Curve (Sine Wave peaking at noon)
  // 24 points representation (0h to 23h)
  const renderChartPaths = () => {
    const points: string[] = [];
    const loadPoints: string[] = [];
    
    // SVG width: 500, height: 150
    const w = 500;
    const h = 150;
    
    for (let hr = 0; hr <= 24; hr++) {
      const x = (hr / 24) * w;
      
      // Solar Curve: Sine wave peaking between 6am (6) and 6pm (18). Center at 12.
      let solarYVal = 0;
      if (hr >= 6 && hr <= 18) {
        // peak height depends on panelCapacity (max scale 20 kWp maps to height 120)
        const amplitude = (panelCapacity / 20) * 110;
        const theta = ((hr - 6) / 12) * Math.PI;
        solarYVal = Math.sin(theta) * amplitude;
      }
      
      const y = h - 20 - solarYVal;
      points.push(`${x},${y}`);

      // Load Curve: Slightly variable but steady around loadDemand (max demand 5kW maps to height 60)
      const loadYVal = (loadDemand / 5) * 60 + Math.sin((hr / 24) * Math.PI * 4) * 4; 
      const ly = h - 20 - loadYVal;
      loadPoints.push(`${x},${ly}`);
    }

    return {
      solarPath: `M ${points.join(" L ")}`,
      loadPath: `M ${loadPoints.join(" L ")}`,
      baselineY: h - 20
    };
  };

  const { solarPath, loadPath, baselineY } = renderChartPaths();

  return (
    <div className="glass-panel p-6 rounded-2xl glow-teal flex flex-col gap-6 transition-all duration-300">
      
      {/* Header */}
      <div>
        <div className="flex items-center gap-2 text-xs font-mono text-teal-400 tracking-widest uppercase">
          <Sun className="w-4 h-4 text-amber-400 animate-spin-slow" />
          Riset & Analisis PLTS untuk BTS
        </div>
        <h3 className="text-xl font-bold mt-1 text-slate-100">Solar Yield (PV) & Battery Simulation Model</h3>
        <p className="text-xs text-slate-400 mt-1">
          Simulate the solar energy generation and battery autonomy for a remote base transceiver station (BTS) using live physical variables.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mt-1">
        
        {/* Left: Inputs & Sliders */}
        <div className="lg:col-span-4 flex flex-col gap-5 bg-[#0b0e17]/85 border border-slate-800 rounded-xl p-4 justify-center">
          <span className="text-xs font-mono text-slate-300 border-b border-slate-900 pb-2 mb-1">
            🎛️ Simulation Parameters
          </span>

          {/* Slider 1: Solar Power */}
          <div className="flex flex-col gap-2">
            <div className="flex justify-between text-xs font-mono">
              <span className="text-slate-400 flex items-center gap-1">
                <Sun className="w-3.5 h-3.5 text-amber-400" />
                Solar Array Capacity
              </span>
              <span className="text-teal-400 font-bold">{panelCapacity} kWp</span>
            </div>
            <input
              type="range"
              min="2"
              max="20"
              step="1"
              value={panelCapacity}
              onChange={(e) => setPanelCapacity(parseInt(e.target.value))}
              className="w-full h-1.5 bg-slate-900 rounded-lg appearance-none cursor-pointer accent-teal-400"
            />
            <span className="text-[9px] text-slate-500 font-mono text-right">Range: 2 - 20 kWp</span>
          </div>

          {/* Slider 2: Battery capacity */}
          <div className="flex flex-col gap-2">
            <div className="flex justify-between text-xs font-mono">
              <span className="text-slate-400 flex items-center gap-1">
                <Battery className="w-3.5 h-3.5 text-emerald-400" />
                Battery Bank Size
              </span>
              <span className="text-emerald-400 font-bold">{batteryCapacity} kWh</span>
            </div>
            <input
              type="range"
              min="5"
              max="50"
              step="2"
              value={batteryCapacity}
              onChange={(e) => setBatteryCapacity(parseInt(e.target.value))}
              className="w-full h-1.5 bg-slate-900 rounded-lg appearance-none cursor-pointer accent-emerald-400"
            />
            <span className="text-[9px] text-slate-500 font-mono text-right">Range: 5 - 50 kWh (LiFePO4)</span>
          </div>

          {/* Slider 3: Load Demand */}
          <div className="flex flex-col gap-2">
            <div className="flex justify-between text-xs font-mono">
              <span className="text-slate-400 flex items-center gap-1">
                <Cpu className="w-3.5 h-3.5 text-slate-400" />
                Steady Tower Load
              </span>
              <span className="text-slate-200 font-bold">{loadDemand} kW</span>
            </div>
            <input
              type="range"
              min="1.0"
              max="4.0"
              step="0.2"
              value={loadDemand}
              onChange={(e) => setLoadDemand(parseFloat(e.target.value))}
              className="w-full h-1.5 bg-slate-900 rounded-lg appearance-none cursor-pointer accent-slate-400"
            />
            <span className="text-[9px] text-slate-500 font-mono text-right">Average continuous draw</span>
          </div>
        </div>

        {/* Center: Live Graph Visualization */}
        <div className="lg:col-span-8 bg-[#0b0e17]/85 border border-slate-800 rounded-xl p-4 flex flex-col justify-between min-h-[260px]">
          <div className="flex justify-between items-center text-xs font-mono text-slate-400 mb-2">
            <span>Power Output Daily Cycle (00:00 - 24:00)</span>
            <div className="flex items-center gap-3">
              <span className="flex items-center gap-1">
                <span className="w-2.5 h-0.5 bg-teal-400 block" /> Solar Output
              </span>
              <span className="flex items-center gap-1">
                <span className="w-2.5 border-t border-dashed border-red-400 block" /> BTS Load
              </span>
            </div>
          </div>

          {/* SVG Render */}
          <div className="relative flex-1 flex items-center justify-center my-2">
            <svg viewBox="0 0 500 150" className="w-full h-full text-slate-800 overflow-visible">
              {/* Baseline Grid */}
              <line x1="0" y1={baselineY} x2="500" y2={baselineY} stroke="#1e293b" strokeWidth="1.5" />
              
              {/* Grid hours tags */}
              <text x="5" y="145" fill="#475569" className="text-[8px] font-mono">00:00</text>
              <text x="125" y="145" fill="#475569" className="text-[8px] font-mono">06:00</text>
              <text x="250" y="145" fill="#475569" className="text-[8px] font-mono">12:00 (Noon)</text>
              <text x="375" y="145" fill="#475569" className="text-[8px] font-mono">18:00</text>
              <text x="475" y="145" fill="#475569" className="text-[8px] font-mono">24:00</text>

              {/* Dynamic Solar Fill under curve */}
              <path 
                d={`${solarPath} L 500,${baselineY} L 0,${baselineY} Z`} 
                fill="url(#solar-gradient)" 
                opacity="0.15" 
              />

              {/* Solar Curve Line */}
              <path 
                d={solarPath} 
                fill="none" 
                stroke="#2dd4bf" 
                strokeWidth="2.5" 
                className="transition-all duration-300"
              />

              {/* BTS Load Line */}
              <path 
                d={loadPath} 
                fill="none" 
                stroke="#ef4444" 
                strokeWidth="1.5" 
                strokeDasharray="3 3"
                className="transition-all duration-300"
              />

              {/* Gradients */}
              <defs>
                <linearGradient id="solar-gradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#2dd4bf" />
                  <stop offset="100%" stopColor="#2dd4bf" stopOpacity="0" />
                </linearGradient>
              </defs>
            </svg>
          </div>

          {/* Quick Stats Overlay Row */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-2 pt-3 border-t border-slate-900">
            <div className="flex flex-col gap-0.5">
              <span className="text-[9px] font-mono text-slate-500 uppercase">Solar Coverage</span>
              <span className="text-sm font-bold text-teal-400 font-mono">{solarFraction}%</span>
            </div>
            <div className="flex flex-col gap-0.5">
              <span className="text-[9px] font-mono text-slate-500 uppercase">Diesel Saved</span>
              <span className="text-sm font-bold text-slate-100 font-mono flex items-center gap-1">
                <TrendingUp className="w-3.5 h-3.5 text-emerald-400" />
                {dieselSaved} L/yr
              </span>
            </div>
            <div className="flex flex-col gap-0.5">
              <span className="text-[9px] font-mono text-slate-500 uppercase">CO₂ Offset</span>
              <span className="text-sm font-bold text-emerald-400 font-mono flex items-center gap-0.5">
                <Leaf className="w-3.5 h-3.5 text-emerald-400" />
                {co2Saved} Tons/yr
              </span>
            </div>
            <div className="flex flex-col gap-0.5">
              <span className="text-[9px] font-mono text-slate-500 uppercase">Battery Autonomy</span>
              <span className="text-sm font-bold text-slate-100 font-mono">{autonomyHrs} hrs</span>
            </div>
          </div>
        </div>

      </div>

    </div>
  );
}
