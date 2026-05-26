"use client";

import React, { useState, useEffect } from "react";
import { Activity, AlertTriangle, ShieldCheck, Clock, MapPin, Zap } from "lucide-react";

interface RegionData {
  name: string;
  code: string;
  uptime: number;
  mttr: number;
  activeFaults: number;
  totalCapacity: string;
  opticalFiberSla: string;
}

const REGIONS: Record<string, RegionData> = {
  Sumatra: { name: "Sumatra Backhaul", code: "SUM", uptime: 99.32, mttr: 2.8, activeFaults: 1, totalCapacity: "2.4 Tbps", opticalFiberSla: "Compliant" },
  Java: { name: "Java Core Ring", code: "JAV", uptime: 99.85, mttr: 1.5, activeFaults: 0, totalCapacity: "10.0 Tbps", opticalFiberSla: "Excellent" },
  Kalimantan: { name: "Kalimantan Backbone", code: "KAL", uptime: 99.45, mttr: 2.1, activeFaults: 0, totalCapacity: "1.2 Tbps", opticalFiberSla: "Compliant" },
  Sulawesi: { name: "Sulawesi Link", code: "SUL", uptime: 99.12, mttr: 3.5, activeFaults: 1, totalCapacity: "800 Gbps", opticalFiberSla: "At Risk" },
  Papua: { name: "Papua East Subsea", code: "PAP", uptime: 98.90, mttr: 4.8, activeFaults: 0, totalCapacity: "400 Gbps", opticalFiberSla: "Critical" },
};

export default function OspDashboard() {
  const [selectedRegion, setSelectedRegion] = useState<string>("Java");
  const [faults, setFaults] = useState<Array<{ id: string; region: string; ticket: string; mttr: number; status: string }>>([
    { id: "T-01", region: "Sumatra", ticket: "OSP-SUM-2901: Fiber Cut KM 45", mttr: 2.8, status: "Investigating" },
    { id: "T-02", region: "Sulawesi", ticket: "OSP-SUL-1842: Power Outage Node Palu", mttr: 3.5, status: "Dispatching" },
  ]);

  const [simulatedAlert, setSimulatedAlert] = useState<string | null>(null);

  const currentData = REGIONS[selectedRegion];

  // Calculate National metrics
  const totalFaults = faults.length;
  const avgMttr = (Object.values(REGIONS).reduce((acc, curr) => acc + curr.mttr, 0) / 5).toFixed(1);
  const avgUptime = (Object.values(REGIONS).reduce((acc, curr) => acc + curr.uptime, 0) / 5).toFixed(2);

  const simulateNewFault = () => {
    const regionNames = Object.keys(REGIONS);
    const randomRegion = regionNames[Math.floor(Math.random() * regionNames.length)];
    const ticketId = Math.floor(Math.random() * 8000 + 1000);
    const newFault = {
      id: `T-${ticketId}`,
      region: randomRegion,
      ticket: `OSP-${REGIONS[randomRegion].code}-${ticketId}: Terrestrial Break detected`,
      mttr: parseFloat((Math.random() * 4 + 1).toFixed(1)),
      status: "Active Alert",
    };

    setFaults((prev) => [newFault, ...prev.slice(0, 3)]);
    setSimulatedAlert(`New Fiber Outage simulated in ${randomRegion}! Operational telemetry updated.`);
    setSelectedRegion(randomRegion);

    setTimeout(() => {
      setSimulatedAlert(null);
    }, 4000);
  };

  const resolveFault = (id: string) => {
    setFaults((prev) => prev.filter((f) => f.id !== id));
  };

  return (
    <div className="glass-panel p-6 rounded-2xl glow-teal flex flex-col gap-6 relative overflow-hidden transition-all duration-300">
      
      {/* Alert Ribbon */}
      {simulatedAlert && (
        <div className="absolute top-4 left-4 right-4 bg-teal-500/20 border border-teal-500/50 text-teal-200 px-4 py-2 rounded-lg text-xs font-mono flex items-center justify-between animate-pulse z-10">
          <span className="flex items-center gap-2">
            <Zap className="w-3.5 h-3.5 text-teal-400 animate-bounce" />
            {simulatedAlert}
          </span>
          <button className="text-teal-400 font-bold ml-2 hover:text-white" onClick={() => setSimulatedAlert(null)}>✕</button>
        </div>
      )}

      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono text-teal-400 tracking-widest uppercase">
            <Activity className="w-4 h-4 text-teal-400 animate-pulse" />
            National OSP Network Telemetry
          </div>
          <h3 className="text-xl font-bold mt-1 text-slate-100">Fiber Optic Core MTTR & SLA Monitoring</h3>
        </div>
        <button
          onClick={simulateNewFault}
          className="px-4 py-2 bg-teal-500 hover:bg-teal-400 text-slate-950 font-semibold text-xs rounded-xl shadow-lg shadow-teal-500/20 transition-all active:scale-95 duration-200 cursor-pointer flex items-center gap-1.5 print:hidden"
        >
          <AlertTriangle className="w-3.5 h-3.5" />
          Simulate Network Fault
        </button>
      </div>

      {/* Grid Dashboard */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mt-2">
        
        {/* SVG Map of Indonesia - Interactive Node Selector */}
        <div className="col-span-1 lg:col-span-7 bg-[#0b0e17]/80 rounded-xl p-4 border border-slate-800 flex flex-col justify-between min-h-[300px]">
          <span className="text-xs font-mono text-slate-400 flex items-center gap-1">
            <MapPin className="w-3 h-3 text-teal-400" />
            Interactive Telemetry Map (Click a node to inspect)
          </span>

          {/* Simple Vector Map representation of Indonesia regions */}
          <div className="relative flex items-center justify-center py-4 my-auto">
            <svg viewBox="0 0 800 350" className="w-full h-auto max-w-[550px] text-slate-700">
              {/* Sumatra Link */}
              <path d="M50,80 L200,200" stroke="#1e293b" strokeWidth="2" strokeDasharray="4 4" />
              {/* Sumatra-Java Link */}
              <path d="M200,200 L280,240" stroke={selectedRegion === "Sumatra" || selectedRegion === "Java" ? "#2dd4bf" : "#334155"} strokeWidth="2" className="animate-pulse" />
              {/* Java Ring */}
              <path d="M280,240 L450,260" stroke="#1e293b" strokeWidth="2" strokeDasharray="4 4" />
              {/* Java-Kalimantan Link */}
              <path d="M330,160 L360,250" stroke="#1e293b" strokeWidth="2" strokeDasharray="4 4" />
              {/* Kalimantan Backbone */}
              <path d="M300,100 L400,160" stroke="#1e293b" strokeWidth="2" strokeDasharray="4 4" />
              {/* Java-Sulawesi subsea */}
              <path d="M420,255 L500,180" stroke="#1e293b" strokeWidth="2" strokeDasharray="4 4" />
              {/* Sulawesi Ring */}
              <path d="M490,140 L530,200" stroke="#1e293b" strokeWidth="2" strokeDasharray="4 4" />
              {/* Sulawesi-Papua subsea */}
              <path d="M530,180 L700,210" stroke={selectedRegion === "Sulawesi" || selectedRegion === "Papua" ? "#ef4444" : "#1e293b"} strokeWidth="2" strokeDasharray="2 2" />

              {/* Sumatra Node */}
              <g 
                onClick={() => setSelectedRegion("Sumatra")}
                className="cursor-pointer group"
              >
                <circle cx="120" cy="130" r="14" fill={selectedRegion === "Sumatra" ? "rgba(45, 212, 191, 0.2)" : "rgba(30, 41, 59, 0.5)"} stroke={selectedRegion === "Sumatra" ? "#2dd4bf" : "#475569"} strokeWidth="2" />
                <circle cx="120" cy="130" r="6" fill={REGIONS.Sumatra.activeFaults > 0 ? "#f59e0b" : "#10b981"} className={REGIONS.Sumatra.activeFaults > 0 ? "animate-ping" : ""} />
                <circle cx="120" cy="130" r="4" fill={REGIONS.Sumatra.activeFaults > 0 ? "#f59e0b" : "#10b981"} />
                <text x="120" y="105" textAnchor="middle" fill="#94a3b8" className="text-[10px] font-mono group-hover:fill-teal-400 font-semibold">Sumatra</text>
              </g>

              {/* Kalimantan Node */}
              <g 
                onClick={() => setSelectedRegion("Kalimantan")}
                className="cursor-pointer group"
              >
                <circle cx="350" cy="120" r="14" fill={selectedRegion === "Kalimantan" ? "rgba(45, 212, 191, 0.2)" : "rgba(30, 41, 59, 0.5)"} stroke={selectedRegion === "Kalimantan" ? "#2dd4bf" : "#475569"} strokeWidth="2" />
                <circle cx="350" cy="120" r="4" fill="#10b981" />
                <text x="350" y="95" textAnchor="middle" fill="#94a3b8" className="text-[10px] font-mono group-hover:fill-teal-400 font-semibold">Kalimantan</text>
              </g>

              {/* Java Node (Main Hub) */}
              <g 
                onClick={() => setSelectedRegion("Java")}
                className="cursor-pointer group"
              >
                <circle cx="340" cy="245" r="16" fill={selectedRegion === "Java" ? "rgba(45, 212, 191, 0.25)" : "rgba(30, 41, 59, 0.5)"} stroke={selectedRegion === "Java" ? "#2dd4bf" : "#475569"} strokeWidth="2.5" />
                <circle cx="340" cy="245" r="5" fill="#10b981" />
                <text x="340" y="275" textAnchor="middle" fill="#94a3b8" className="text-[10px] font-mono group-hover:fill-teal-400 font-semibold">Java Core</text>
              </g>

              {/* Sulawesi Node */}
              <g 
                onClick={() => setSelectedRegion("Sulawesi")}
                className="cursor-pointer group"
              >
                <circle cx="510" cy="160" r="14" fill={selectedRegion === "Sulawesi" ? "rgba(45, 212, 191, 0.2)" : "rgba(30, 41, 59, 0.5)"} stroke={selectedRegion === "Sulawesi" ? "#2dd4bf" : "#475569"} strokeWidth="2" />
                <circle cx="510" cy="160" r="6" fill="#f43f5e" className="animate-ping" />
                <circle cx="510" cy="160" r="4" fill="#f43f5e" />
                <text x="510" y="135" textAnchor="middle" fill="#94a3b8" className="text-[10px] font-mono group-hover:fill-teal-400 font-semibold">Sulawesi</text>
              </g>

              {/* Papua Node */}
              <g 
                onClick={() => setSelectedRegion("Papua")}
                className="cursor-pointer group"
              >
                <circle cx="710" cy="200" r="14" fill={selectedRegion === "Papua" ? "rgba(45, 212, 191, 0.2)" : "rgba(30, 41, 59, 0.5)"} stroke={selectedRegion === "Papua" ? "#2dd4bf" : "#475569"} strokeWidth="2" />
                <circle cx="710" cy="200" r="4" fill="#10b981" />
                <text x="710" y="175" textAnchor="middle" fill="#94a3b8" className="text-[10px] font-mono group-hover:fill-teal-400 font-semibold">Papua</text>
              </g>
            </svg>
          </div>

          <div className="flex justify-between items-center text-[10px] font-mono text-slate-400 border-t border-slate-900 pt-2">
            <span>● Green: Core Healthy</span>
            <span>● Amber: Fault Active</span>
            <span>● Red: Subsea Critical</span>
          </div>
        </div>

        {/* Selected Region Telemetry Stats Panel */}
        <div className="col-span-1 lg:col-span-5 flex flex-col gap-4">
          
          {/* Main Selected Stats */}
          <div className="bg-[#0b0e17]/80 rounded-xl p-4 border border-slate-800 flex flex-col gap-4">
            <div className="flex justify-between items-center">
              <span className="text-sm font-bold text-teal-400">{currentData.name}</span>
              <span className="text-[10px] font-mono bg-slate-800 text-slate-300 px-2 py-0.5 rounded-full">{currentData.code}</span>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="bg-slate-900/60 p-3 rounded-lg border border-slate-900">
                <span className="text-[10px] font-mono text-slate-400 block mb-1">Local SLA Uptime</span>
                <span className="text-lg font-bold text-slate-100 font-mono">{currentData.uptime}%</span>
              </div>
              <div className="bg-slate-900/60 p-3 rounded-lg border border-slate-900">
                <span className="text-[10px] font-mono text-slate-400 block mb-1">Mean Time to Repair</span>
                <span className="text-lg font-bold text-slate-100 font-mono flex items-center gap-1">
                  <Clock className="w-4 h-4 text-amber-400" />
                  {currentData.mttr} hrs
                </span>
              </div>
              <div className="bg-slate-900/60 p-3 rounded-lg border border-slate-900">
                <span className="text-[10px] font-mono text-slate-400 block mb-1">Active Faults</span>
                <span className={`text-lg font-bold font-mono ${currentData.activeFaults > 0 ? "text-amber-400" : "text-emerald-400"}`}>
                  {currentData.activeFaults}
                </span>
              </div>
              <div className="bg-slate-900/60 p-3 rounded-lg border border-slate-900">
                <span className="text-[10px] font-mono text-slate-400 block mb-1">Core Link Capacity</span>
                <span className="text-lg font-bold text-slate-100 font-mono">{currentData.totalCapacity}</span>
              </div>
            </div>

            <div className="bg-[#0e1626] p-3 rounded-lg border border-teal-500/10 flex justify-between items-center">
              <span className="text-[10px] font-mono text-slate-400">Compliance Status:</span>
              <span className={`text-xs font-mono font-bold flex items-center gap-1 ${
                currentData.opticalFiberSla === "Excellent" || currentData.opticalFiberSla === "Compliant" 
                  ? "text-emerald-400" 
                  : currentData.opticalFiberSla === "At Risk" 
                  ? "text-amber-400" 
                  : "text-rose-400"
              }`}>
                <ShieldCheck className="w-3.5 h-3.5" />
                {currentData.opticalFiberSla}
              </span>
            </div>
          </div>

          {/* SLA National Overview Cards */}
          <div className="bg-[#0b0e17]/80 rounded-xl p-4 border border-slate-800 flex flex-col gap-3">
            <span className="text-xs font-mono text-slate-400">National SLA Telemetry Overview</span>
            <div className="flex flex-col gap-2">
              <div className="flex justify-between items-center text-xs text-slate-300">
                <span>National SLA Uptime Average</span>
                <span className="font-mono text-emerald-400 font-semibold">{avgUptime}%</span>
              </div>
              <div className="w-full bg-slate-900 h-2 rounded-full overflow-hidden">
                <div className="bg-emerald-500 h-full rounded-full transition-all duration-500" style={{ width: `${avgUptime}%` }} />
              </div>
            </div>

            <div className="flex flex-col gap-2 mt-1">
              <div className="flex justify-between items-center text-xs text-slate-300">
                <span>National Average MTTR Target (4h)</span>
                <span className="font-mono text-teal-400 font-semibold">{avgMttr} hrs</span>
              </div>
              <div className="w-full bg-slate-900 h-2 rounded-full overflow-hidden">
                {/* 4 hours is target. Lower is better. */}
                <div 
                  className="bg-teal-500 h-full rounded-full transition-all duration-500" 
                  style={{ width: `${Math.min(100, (parseFloat(avgMttr) / 4) * 100)}%` }} 
                />
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Outage Tickets Feed - HRD can click "Resolve" to clear mock data */}
      <div className="bg-[#0b0e17]/80 border border-slate-800 rounded-xl p-4 mt-2">
        <h4 className="text-xs font-mono text-slate-300 flex items-center justify-between mb-3 border-b border-slate-900 pb-2">
          <span>Active Fault Ticket Management (Live n8n Queue)</span>
          <span className="bg-amber-500/10 text-amber-400 border border-amber-500/20 px-2 py-0.5 rounded text-[10px]">
            {totalFaults} Pending Tickets
          </span>
        </h4>
        
        {totalFaults === 0 ? (
          <div className="py-6 text-center text-xs text-slate-500 font-mono">
            🎉 All fiber optic lines operational. National OSP SLA Uptime is at 100%!
          </div>
        ) : (
          <div className="flex flex-col gap-3">
            {faults.map((f) => (
              <div key={f.id} className="bg-slate-950/60 p-3 rounded-lg border border-slate-900 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
                <div className="flex items-start gap-2.5">
                  <div className="w-2 h-2 rounded-full bg-rose-500 animate-ping mt-1.5" />
                  <div>
                    <span className="text-[10px] font-mono text-slate-400 block">{f.id} | {f.region} Backbone</span>
                    <span className="text-xs font-semibold text-slate-200 block">{f.ticket}</span>
                  </div>
                </div>

                <div className="flex items-center gap-4 w-full sm:w-auto justify-between sm:justify-end">
                  <div className="text-right">
                    <span className="text-[9px] font-mono text-slate-400 block">SLA Elapsed</span>
                    <span className="text-xs font-mono text-amber-400 font-semibold">{f.mttr} hrs / 4.0h Limit</span>
                  </div>

                  <button
                    onClick={() => resolveFault(f.id)}
                    className="px-3 py-1 bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 border border-emerald-500/20 hover:border-emerald-500/40 text-[10px] font-mono rounded cursor-pointer transition-all duration-150 print:hidden"
                  >
                    Acknowledge & Resolve
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

    </div>
  );
}
