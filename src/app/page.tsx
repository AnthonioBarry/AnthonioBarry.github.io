import React from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import OspDashboard from "@/components/projects/OspDashboard";
import TelegramListener from "@/components/projects/TelegramListener";
import SolarSimulator from "@/components/projects/SolarSimulator";
import SkillsShowcase from "@/components/SkillsShowcase";
import ContactForm from "@/components/ContactForm";

import { Cpu, Terminal, ArrowDownRight, Layers, Shield, Sparkles, ServerCrash } from "lucide-react";

export default function Home() {
  return (
    <div className="relative min-h-screen bg-[#060913] overflow-x-hidden flex flex-col justify-between selection:bg-teal-500/30 selection:text-teal-200">
      
      {/* Dynamic Cyber Grid Background */}
      <div className="absolute inset-0 cyber-grid animate-grid-move opacity-[0.8] pointer-events-none" />

      {/* Floating Ambient Glowing Blobs */}
      <div className="absolute top-[10%] left-[-10%] w-[500px] h-[500px] rounded-full bg-teal-500/5 blur-[120px] pointer-events-none" />
      <div className="absolute top-[40%] right-[-10%] w-[600px] h-[600px] rounded-full bg-indigo-500/5 blur-[150px] pointer-events-none" />
      <div className="absolute bottom-[10%] left-[20%] w-[500px] h-[500px] rounded-full bg-emerald-500/3 blur-[120px] pointer-events-none" />

      {/* Header Navigation */}
      <Header />

      {/* Main Core */}
      <main className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-16 relative z-10 flex flex-col gap-24">
        
        {/* ================= HERO SECTION ================= */}
        <section id="home" className="min-h-[80vh] flex flex-col lg:flex-row items-center justify-between gap-12 pt-8 sm:pt-16">
          {/* Left Column: Title & Credentials */}
          <div className="flex-1 flex flex-col gap-6 text-center lg:text-left">
            
            {/* Top Badge */}
            <div className="inline-flex items-center justify-center lg:justify-start gap-2 self-center lg:self-start px-3 py-1.5 rounded-full bg-teal-500/10 border border-teal-500/20 text-teal-400 font-mono text-[10px] uppercase tracking-wider animate-pulse">
              <Sparkles className="w-3.5 h-3.5 text-teal-400" />
              Recruiter Telemetry Active • Ready to Hire
            </div>

            {/* Headline */}
            <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white leading-tight">
              Architecting <span className="bg-gradient-to-r from-teal-400 via-cyan-400 to-indigo-400 bg-clip-text text-transparent">Intelligent Data Ecosystems</span> & AI Automations
            </h1>

            {/* Sub-headline */}
            <p className="text-sm sm:text-base text-slate-400 leading-relaxed max-w-2xl mx-auto lg:mx-0">
              IT Engineer & Data Analyst specializing in high-scale network telemetry, automated pipeline design, and predictive analytical modeling. Bridging the gap between raw hardware telemetry and actionable business intelligence.
            </p>

            {/* Visual Quick Badges */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-2 mt-2 font-mono text-[10px]">
              <span className="bg-slate-900 border border-slate-800 text-slate-300 px-3 py-1 rounded-full">IT Engineer</span>
              <span className="bg-slate-900 border border-slate-800 text-slate-300 px-3 py-1 rounded-full">Data Analyst</span>
              <span className="bg-slate-950 border border-teal-500/20 text-teal-400 px-3 py-1 rounded-full font-bold">AI Automation Specialist</span>
              <span className="bg-slate-900 border border-slate-800 text-slate-300 px-3 py-1 rounded-full">n8n / VPS Daemons</span>
            </div>

            {/* Call to Actions */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 mt-4">
              <a
                href="#projects"
                className="w-full sm:w-auto text-center px-6 py-3 bg-teal-500 hover:bg-teal-400 text-slate-950 font-bold text-xs rounded-xl shadow-lg shadow-teal-500/25 transition duration-200 cursor-pointer active:scale-95 flex items-center justify-center gap-1.5"
              >
                Explore Live Demos
                <ArrowDownRight className="w-4 h-4" />
              </a>
              <a
                href="#contact"
                className="w-full sm:w-auto text-center px-6 py-3 bg-slate-900 hover:bg-slate-800 text-slate-300 border border-slate-800 hover:border-slate-700 font-bold text-xs rounded-xl transition duration-200 cursor-pointer flex items-center justify-center gap-1.5"
              >
                Send Message / Hire Me
              </a>
            </div>

          </div>

          {/* Right Column: Interactive Quick-Telemetry Dashboard (Impress HRDs immediately!) */}
          <div className="w-full lg:w-[450px] shrink-0">
            <div className="glass-panel p-5 rounded-2xl border border-slate-500/10 shadow-2xl shadow-black/80 flex flex-col gap-4 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-24 h-24 bg-teal-500/5 rounded-full blur-2xl" />
              
              <div className="flex justify-between items-center border-b border-slate-900 pb-3">
                <span className="text-[10px] font-mono text-teal-400 flex items-center gap-1.5 uppercase font-bold tracking-wider">
                  <span className="w-2 h-2 rounded-full bg-teal-500 animate-ping" />
                  Live System Status
                </span>
                <span className="text-[9px] text-slate-500 font-mono">NODE-03 REGIONAL</span>
              </div>

              {/* Status parameters */}
              <div className="flex flex-col gap-3 font-mono text-xs">
                
                {/* Active SLA */}
                <div className="flex justify-between items-center py-1">
                  <span className="text-slate-400 flex items-center gap-1.5">
                    <Shield className="w-3.5 h-3.5 text-teal-400" />
                    Active Pipeline SLA
                  </span>
                  <span className="text-emerald-400 font-bold">99.98% (Target met)</span>
                </div>

                {/* Automation Scripts */}
                <div className="flex justify-between items-center py-1">
                  <span className="text-slate-400 flex items-center gap-1.5">
                    <Cpu className="w-3.5 h-3.5 text-indigo-400" />
                    VPS Cron Daemons
                  </span>
                  <span className="text-slate-200">14 active tasks</span>
                </div>

                {/* Operations savings */}
                <div className="flex justify-between items-center py-1">
                  <span className="text-slate-400 flex items-center gap-1.5">
                    <Layers className="w-3.5 h-3.5 text-slate-400" />
                    MTTR Reduction
                  </span>
                  <span className="text-teal-400 font-bold">-45% saved hrs</span>
                </div>

                {/* Telemetry connection node */}
                <div className="flex justify-between items-center py-1">
                  <span className="text-slate-400 flex items-center gap-1.5">
                    <Terminal className="w-3.5 h-3.5 text-slate-500" />
                    Visual Code Console
                  </span>
                  <span className="text-slate-300">Connected (Cursor/Antigravity)</span>
                </div>
              </div>

              {/* Console log display */}
              <div className="bg-slate-950 p-3 rounded-xl border border-slate-900 font-mono text-[9px] text-emerald-400 h-[100px] overflow-hidden flex flex-col justify-end">
                <div>[16:54:11] Init agentic diagnostics...</div>
                <div>[16:54:12] Power BI payload check: 200 OK</div>
                <div>[16:54:13] n8n pipeline active, listener running.</div>
                <div className="text-slate-200 flex items-center gap-0.5">
                  $ tail -f /var/log/syslog <span className="w-1.5 h-3.5 bg-slate-200 inline-block terminal-cursor" />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ================= FEATURED PROJECTS SECTION ================= */}
        <section id="projects" className="flex flex-col gap-12 pt-8">
          
          {/* Section title */}
          <div className="text-center">
            <div className="text-xs font-mono text-teal-400 uppercase tracking-widest">
              ⚙️ Interactive Recruiter Lab
            </div>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-white mt-1.5">
              Live Interactive Case Studies
            </h2>
            <p className="text-xs sm:text-sm text-slate-400 mt-2 max-w-xl mx-auto leading-relaxed print:hidden">
              Don't just view screenshots. Recruiter, click **"Simulate Network Fault"**, **"Simulate Outage Msg"**, or adjust **"Panel/Battery Sliders"** to test my system logic in real-time.
            </p>
            <p className="hidden print:block text-xs text-slate-600 mt-2 max-w-2xl mx-auto leading-relaxed italic">
              *Note: The following sections represent fully interactive, live-simulated operational dashboards. Please scan the QR code or visit <strong className="text-teal-600 font-semibold underline">anthoniobarry.dev</strong> on your web browser to play with the simulators and trigger n8n event cascades.
            </p>
          </div>

          {/* Interactive Demos Grid/Stack */}
          <div className="flex flex-col gap-12">
            {/* Project 1: OSP Dashboard */}
            <div className="flex flex-col gap-4">
              <div className="flex items-center gap-2 px-2">
                <span className="text-xs font-mono text-teal-400 bg-teal-500/10 border border-teal-500/20 px-2 py-0.5 rounded">Project 01</span>
                <span className="text-xs font-mono text-slate-500">Core Telemetry Architecture</span>
              </div>
              <OspDashboard />
            </div>

            {/* Project 2: Telegram Listener */}
            <div className="flex flex-col gap-4">
              <div className="flex items-center gap-2 px-2">
                <span className="text-xs font-mono text-indigo-400 bg-indigo-500/10 border border-indigo-500/20 px-2 py-0.5 rounded">Project 02</span>
                <span className="text-xs font-mono text-slate-500">AI Automation Pipeline</span>
              </div>
              <TelegramListener />
            </div>

            {/* Project 3: Solar Simulator */}
            <div className="flex flex-col gap-4">
              <div className="flex items-center gap-2 px-2">
                <span className="text-xs font-mono text-teal-400 bg-teal-500/10 border border-teal-500/20 px-2 py-0.5 rounded">Project 03</span>
                <span className="text-xs font-mono text-slate-500">Mathematical Analytical Modeling</span>
              </div>
              <SolarSimulator />
            </div>
          </div>

        </section>

        {/* ================= SKILLS & CERTIFICATIONS SECTION ================= */}
        <section id="skills" className="flex flex-col gap-12 pt-8">
          
          {/* Section title */}
          <div className="text-center">
            <div className="text-xs font-mono text-teal-400 uppercase tracking-widest">
              🧬 Competence Profile
            </div>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-white mt-1.5">
              Technical Arsenal & Certifications
            </h2>
            <p className="text-xs sm:text-sm text-slate-400 mt-2 max-w-xl mx-auto leading-relaxed">
              Curated toolkits, developer workflows, and formal academic achievements validating high-performance systems engineering.
            </p>
          </div>

          {/* Skills Grid and certificates component */}
          <SkillsShowcase />

        </section>

        {/* ================= CONTACT SECTION ================= */}
        <section id="contact" className="flex flex-col gap-12 pt-8">
          
          {/* Section title */}
          <div className="text-center">
            <div className="text-xs font-mono text-indigo-400 uppercase tracking-widest">
              📬 INCOMING NODE CONNECT
            </div>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-white mt-1.5">
              Initiate Recruiter Dispatch
            </h2>
            <p className="text-xs sm:text-sm text-slate-400 mt-2 max-w-xl mx-auto leading-relaxed">
              Have a pipeline issue or an engineering opening? Drop a message directly to write into my operational queue.
            </p>
          </div>

          {/* Contact form component */}
          <ContactForm />

        </section>

      </main>

      {/* Footer Navigation */}
      <Footer />

    </div>
  );
}
