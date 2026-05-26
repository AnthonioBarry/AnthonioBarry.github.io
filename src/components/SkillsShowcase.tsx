"use client";

import React, { useState } from "react";
import { Award, Code2, Database, ShieldCheck, Cpu, Brain, ChartArea, Settings } from "lucide-react";

interface SkillItem {
  name: string;
  category: "analytics" | "automation" | "it" | "all";
  level: string;
  icon: string;
  colorClass: string;
}

const SKILLS: SkillItem[] = [
  // Data Analytics
  { name: "Python (PvLib, Pandas, NumPy)", category: "analytics", level: "Expert", icon: "🐍", colorClass: "border-teal-500/20 text-teal-400 group-hover:border-teal-500/50" },
  { name: "Power BI", category: "analytics", level: "Expert", icon: "📊", colorClass: "border-teal-500/20 text-teal-400 group-hover:border-teal-500/50" },
  { name: "Tableau", category: "analytics", level: "Advanced", icon: "📈", colorClass: "border-teal-500/20 text-teal-400 group-hover:border-teal-500/50" },
  { name: "SQL (PostgreSQL, MySQL)", category: "analytics", level: "Expert", icon: "🗄️", colorClass: "border-teal-500/20 text-teal-400 group-hover:border-teal-500/50" },
  { name: "Mathematical Modeling", category: "analytics", level: "Advanced", icon: "📐", colorClass: "border-teal-500/20 text-teal-400 group-hover:border-teal-500/50" },

  // AI Automation
  { name: "n8n Automation Flow", category: "automation", level: "Expert", icon: "🔌", colorClass: "border-indigo-500/20 text-indigo-400 group-hover:border-indigo-500/50" },
  { name: "Antigravity & Cursor AI Workflows", category: "automation", level: "Expert", icon: "🤖", colorClass: "border-indigo-500/20 text-indigo-400 group-hover:border-indigo-500/50" },
  { name: "Regex Parsing & Telemetry Scripts", category: "automation", level: "Expert", icon: "⚡", colorClass: "border-indigo-500/20 text-indigo-400 group-hover:border-indigo-500/50" },
  { name: "AI Agent Orchestration", category: "automation", level: "Advanced", icon: "🧬", colorClass: "border-indigo-500/20 text-indigo-400 group-hover:border-indigo-500/50" },

  // IT & Systems
  { name: "Outside Plant (OSP) Engineering", category: "it", level: "Expert", icon: "🌐", colorClass: "border-slate-500/20 text-slate-300 group-hover:border-slate-500/50" },
  { name: "VPS (Linux, Systemd, Daemonization)", category: "it", level: "Advanced", icon: "🖥️", colorClass: "border-slate-500/20 text-slate-300 group-hover:border-slate-500/50" },
  { name: "SLA Compliance & MTTR Tracking", category: "it", level: "Expert", icon: "⏱️", colorClass: "border-slate-500/20 text-slate-300 group-hover:border-slate-500/50" },
  { name: "Next.js & Tailwind CSS", category: "it", level: "Advanced", icon: "⚛️", colorClass: "border-slate-500/20 text-slate-300 group-hover:border-slate-500/50" },
  { name: "Git & CI/CD", category: "it", level: "Expert", icon: "🐙", colorClass: "border-slate-500/20 text-slate-300 group-hover:border-slate-500/50" }
];

export default function SkillsShowcase() {
  const [filter, setFilter] = useState<"all" | "analytics" | "automation" | "it">("all");

  const filteredSkills = filter === "all" 
    ? SKILLS 
    : SKILLS.filter(s => s.category === filter);

  return (
    <div className="flex flex-col gap-8">
      
      {/* Category Nav Filters */}
      <div className="flex flex-wrap items-center justify-center gap-2">
        <button
          onClick={() => setFilter("all")}
          className={`px-4 py-1.5 rounded-xl text-xs font-mono transition-all duration-200 cursor-pointer ${
            filter === "all" 
              ? "bg-slate-100 text-slate-950 font-bold" 
              : "bg-slate-900 text-slate-400 hover:text-slate-200 border border-slate-900 hover:border-slate-800"
          }`}
        >
          All Expertises
        </button>
        <button
          onClick={() => setFilter("analytics")}
          className={`px-4 py-1.5 rounded-xl text-xs font-mono transition-all duration-200 cursor-pointer ${
            filter === "analytics" 
              ? "bg-teal-500 text-slate-950 font-bold" 
              : "bg-slate-900 text-slate-400 hover:text-teal-400 border border-slate-900 hover:border-teal-950/40"
          }`}
        >
          Data Analytics & Visualization
        </button>
        <button
          onClick={() => setFilter("automation")}
          className={`px-4 py-1.5 rounded-xl text-xs font-mono transition-all duration-200 cursor-pointer ${
            filter === "automation" 
              ? "bg-indigo-500 text-slate-950 font-bold" 
              : "bg-slate-900 text-slate-400 hover:text-indigo-400 border border-slate-900 hover:border-indigo-950/40"
          }`}
        >
          AI Automation (n8n / Agents)
        </button>
        <button
          onClick={() => setFilter("it")}
          className={`px-4 py-1.5 rounded-xl text-xs font-mono transition-all duration-200 cursor-pointer ${
            filter === "it" 
              ? "bg-slate-300 text-slate-950 font-bold" 
              : "bg-slate-900 text-slate-400 hover:text-slate-200 border border-slate-900 hover:border-slate-800"
          }`}
        >
          IT Engineering & Infrastructure
        </button>
      </div>

      {/* Grid of Skill Badges */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {filteredSkills.map((s, idx) => (
          <div
            key={idx}
            className={`glass-panel p-4 rounded-xl border flex flex-col justify-between gap-3 group glass-panel-hover ${s.colorClass}`}
          >
            <div className="flex items-center justify-between gap-2">
              <span className="text-xl">{s.icon}</span>
              <span className="text-[8px] font-mono border border-slate-800 bg-slate-950 px-2 py-0.5 rounded-full text-slate-400">
                {s.level}
              </span>
            </div>
            <div>
              <h4 className="text-xs font-semibold text-slate-100 mt-1 leading-snug group-hover:text-white transition">
                {s.name}
              </h4>
              <span className="text-[9px] font-mono text-slate-500 uppercase tracking-widest block mt-0.5">
                {s.category}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Professional Certifications Grid */}
      <div className="mt-8 border-t border-slate-900 pt-8">
        <div className="flex items-center gap-2 mb-6 justify-center">
          <Award className="w-5 h-5 text-teal-400" />
          <h4 className="text-sm font-mono text-slate-300 uppercase tracking-wider">
            Verified Professional Credentials
          </h4>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {/* Certification 1 */}
          <div className="glass-panel p-5 rounded-2xl border border-slate-900 flex items-start gap-4 hover:border-teal-500/30 transition-all duration-300">
            <div className="w-10 h-10 rounded-xl bg-teal-500/10 border border-teal-500/20 flex items-center justify-center shrink-0">
              <Award className="w-5 h-5 text-teal-400" />
            </div>
            <div>
              <div className="flex justify-between items-start gap-2">
                <h5 className="text-xs font-bold text-slate-100">Data Analyst Complete Bundle</h5>
                <span className="text-[8px] font-mono bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 px-2 py-0.5 rounded-full uppercase shrink-0">Verified</span>
              </div>
              <span className="text-[10px] font-mono text-slate-400 block mt-0.5">ITBOX Credential Academy</span>
              <p className="text-[11px] text-slate-400 mt-2 leading-relaxed">
                Comprehensive professional program covering advanced database modeling (SQL), visual report automation (Power BI/Tableau), and business process logic. Focuses on extracting actionable analytics for high-level SLA environments.
              </p>
            </div>
          </div>

          {/* Certification 2 */}
          <div className="glass-panel p-5 rounded-2xl border border-slate-900 flex items-start gap-4 hover:border-indigo-500/30 transition-all duration-300">
            <div className="w-10 h-10 rounded-xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center shrink-0">
              <Code2 className="w-5 h-5 text-indigo-400" />
            </div>
            <div>
              <div className="flex justify-between items-start gap-2">
                <h5 className="text-xs font-bold text-slate-100">Python Fundamental</h5>
                <span className="text-[8px] font-mono bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 px-2 py-0.5 rounded-full uppercase shrink-0">Verified</span>
              </div>
              <span className="text-[10px] font-mono text-slate-400 block mt-0.5">Ioda Academy</span>
              <p className="text-[11px] text-slate-400 mt-2 leading-relaxed">
                Rigorous logic program establishing strong foundations in object-oriented programming, analytical scripting, automated web/file operations, and mathematical modeling packages (Pandas, NumPy, and scientific mathematical simulations).
              </p>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
}
