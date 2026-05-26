"use client";

import React, { useState, useEffect, useRef } from "react";
import { Terminal, Send, Cpu, Database, Bell, ArrowRight, Play, Check } from "lucide-react";

interface TelegramMsg {
  sender: string;
  avatar: string;
  time: string;
  message: string;
}

export default function TelegramListener() {
  const [messages, setMessages] = useState<TelegramMsg[]>([
    { sender: "Surabaya NOC", avatar: "SN", time: "16:48", message: "URGENT: Disruption detected on Surabaya-Madura optical ring. Backbone links show critical power drops." },
    { sender: "System Alarm", avatar: "SA", time: "16:51", message: "ALARM ID #5532: Loss of Signal (LOS) at Segment KM-24 Pasuruan subsea backhaul. SLA MTTR clock started." },
  ]);

  const [inputText, setInputText] = useState("");
  const [consoleLogs, setConsoleLogs] = useState<string[]>([
    "[SYSTEM] Starting Tele-Listener daemon on VPS-node-03...",
    "[SYSTEM] Connection established to Telegram API Gateway.",
    "[SYSTEM] Standing by for operational updates (Group ID: -100940328)...",
  ]);
  
  const [parsedJson, setParsedJson] = useState<any>({
    event: "standby",
    status: "listening_vps_daemon"
  });

  const [n8nStep, setN8nStep] = useState<number>(0);
  const consoleEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (consoleEndRef.current) {
      consoleEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [consoleLogs]);

  const addConsoleLog = (log: string, delay = 0) => {
    return new Promise<void>((resolve) => {
      setTimeout(() => {
        setConsoleLogs((prev) => [...prev, log]);
        resolve();
      }, delay);
    });
  };

  const triggerAutomationPipeline = async (messageText: string, senderName: string) => {
    setN8nStep(1); // Telegram Ingest Active
    await addConsoleLog(`[INGEST] Received message from "${senderName}"`, 300);
    
    setN8nStep(2); // Parser Active
    await addConsoleLog(`[NLP-PARSER] Running Regex & Keyword heuristics on message...`, 400);
    
    // Extract metadata
    const isUrgent = /urgent|critical|disruption|cut|down|los/i.test(messageText);
    const locationMatch = messageText.match(/(Surabaya|Madura|Pasuruan|Semarang|Java|Sumatra|Palu)/i);
    const location = locationMatch ? locationMatch[0] : "General Link";
    const segmentMatch = messageText.match(/(Segment|KM-\d+|Node \w+)/i);
    const segment = segmentMatch ? segmentMatch[0] : "Core Backbone";

    const dataPacket = {
      timestamp: new Date().toISOString(),
      source: "telegram_bot_vps",
      sender: senderName,
      extracted_data: {
        location: location,
        sub_segment: segment,
        priority: isUrgent ? "CRITICAL" : "MEDIUM",
        inferred_issue: "Fiber Disruption / Alarm"
      },
      n8n_pipeline_trigger: "success",
      db_payload_status: "ready"
    };

    setParsedJson(dataPacket);
    await addConsoleLog(`[PARSER] Extraction complete. Matches: Region=${location}, Node=${segment}, SLA_Risk=${isUrgent}`, 200);
    
    setN8nStep(3); // Supabase Active
    await addConsoleLog(`[DATABASE] Forwarding JSON payload to Supabase database/Contact Form...`, 500);
    await addConsoleLog(`[DATABASE] Payload written successfully to 'optical_fault_logs'. Row UUID generated.`, 200);
    
    setN8nStep(4); // NOC Alert Active
    await addConsoleLog(`[BROADCAST] Routing Slack/Telegram Alerts to NOC Engineers Group...`, 500);
    await addConsoleLog(`[BROADCAST] Alert sent! Engineer dispatched. n8n workflow finished [200 OK].`, 300);
    
    setTimeout(() => {
      setN8nStep(0); // Reset workflow display
    }, 6000);
  };

  const handleSendMessage = () => {
    if (!inputText.trim()) return;

    const newMsg: TelegramMsg = {
      sender: "Recruiter (You)",
      avatar: "HR",
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      message: inputText
    };

    setMessages((prev) => [...prev, newMsg]);
    setInputText("");
    triggerAutomationPipeline(inputText, "Recruiter (You)");
  };

  const simulateQuickAlert = (presetText: string, presetSender: string) => {
    const newMsg: TelegramMsg = {
      sender: presetSender,
      avatar: presetSender.substring(0,2).toUpperCase(),
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      message: presetText
    };

    setMessages((prev) => [...prev, newMsg]);
    triggerAutomationPipeline(presetText, presetSender);
  };

  return (
    <div className="glass-panel p-6 rounded-2xl glow-indigo flex flex-col gap-6 transition-all duration-300">
      
      {/* Header */}
      <div>
        <div className="flex items-center gap-2 text-xs font-mono text-indigo-400 tracking-widest uppercase">
          <Terminal className="w-4 h-4 text-indigo-400" />
          AI AUTOMATION ENGINE
        </div>
        <h3 className="text-xl font-bold mt-1 text-slate-100">Real-Time Telegram Listener & n8n Workflow</h3>
        <p className="text-xs text-slate-400 mt-1">
          Python regex-daemon running on VPS capturing, parsing unstructured outages, and running automated logic cascades in n8n.
        </p>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-12 gap-6 mt-1">
        
        {/* Left: Chat Simulator */}
        <div className="xl:col-span-4 bg-[#0b0e17]/85 border border-slate-800 rounded-xl p-4 flex flex-col justify-between h-[360px]">
          <div className="flex justify-between items-center border-b border-slate-900 pb-2 mb-2">
            <span className="text-xs font-mono text-slate-300 flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              NOC Telegram Group
            </span>
            <span className="text-[10px] text-slate-500 font-mono">Simulated</span>
          </div>

          {/* Chat Bubble Thread */}
          <div className="flex-1 overflow-y-auto flex flex-col gap-2.5 pr-1 py-1 scrollbar-thin">
            {messages.map((m, idx) => (
              <div key={idx} className={`flex gap-2 max-w-[90%] ${m.sender === "Recruiter (You)" ? "self-end flex-row-reverse" : "self-start"}`}>
                <div className={`w-7 h-7 rounded-full flex items-center justify-center text-[10px] font-bold shrink-0 ${
                  m.sender === "Recruiter (You)" ? "bg-indigo-600 text-white" : "bg-slate-800 text-slate-300"
                }`}>
                  {m.avatar}
                </div>
                <div className={`p-2.5 rounded-xl text-xs ${
                  m.sender === "Recruiter (You)" 
                    ? "bg-indigo-500/20 border border-indigo-500/35 text-indigo-100 rounded-tr-none" 
                    : "bg-slate-900/90 border border-slate-900 text-slate-200 rounded-tl-none"
                }`}>
                  <div className="flex justify-between items-center gap-2 mb-0.5">
                    <span className="font-bold text-[10px] text-slate-400">{m.sender}</span>
                    <span className="text-[8px] text-slate-500 font-mono">{m.time}</span>
                  </div>
                  <p className="leading-normal">{m.message}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Quick presets for HRDs */}
          <div className="flex flex-wrap gap-1 mt-2.5 mb-1.5 print:hidden">
            <button 
              onClick={() => simulateQuickAlert("CRITICAL: Outage reported in Palu Segment A! n8n link check failing.", "Palu NOC")}
              className="text-[9px] font-mono bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-300 px-2 py-0.5 rounded cursor-pointer transition"
            >
              ⚡ Simulate Outage Msg
            </button>
            <button 
              onClick={() => simulateQuickAlert("All repairs complete at KM 45 Semarang link. Optical SLA returning to normal.", "Semaran Link Lead")}
              className="text-[9px] font-mono bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-300 px-2 py-0.5 rounded cursor-pointer transition"
            >
              ✅ Simulate Resolved Msg
            </button>
          </div>

          {/* Input field */}
          <div className="flex gap-1.5 border-t border-slate-900 pt-2 print:hidden">
            <input
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
              placeholder="Send outage chat to parser..."
              className="flex-1 bg-slate-900 text-xs px-3 py-1.5 rounded-lg border border-slate-800 focus:outline-none focus:border-indigo-500 text-slate-100"
            />
            <button
              onClick={handleSendMessage}
              className="w-8 h-8 rounded-lg bg-indigo-500 hover:bg-indigo-400 flex items-center justify-center shrink-0 cursor-pointer active:scale-95 transition"
            >
              <Send className="w-3.5 h-3.5 text-slate-950 font-bold" />
            </button>
          </div>
        </div>

        {/* Center: VPS Console Telemetry */}
        <div className="xl:col-span-4 bg-slate-950 border border-slate-900 rounded-xl p-4 flex flex-col justify-between h-[360px]">
          <div className="flex justify-between items-center border-b border-slate-900 pb-2 mb-2">
            <span className="text-xs font-mono text-indigo-400 flex items-center gap-1.5">
              <Cpu className="w-3.5 h-3.5 text-indigo-400" />
              VPS Telemetry Console
            </span>
            <span className="text-[10px] text-emerald-400 font-mono">running</span>
          </div>

          {/* Terminal Screen */}
          <div className="flex-1 overflow-y-auto font-mono text-[10px] text-slate-300 leading-relaxed pr-1 mb-2 scrollbar-thin">
            {consoleLogs.map((log, idx) => (
              <div key={idx} className={
                log.startsWith("[SYSTEM]") ? "text-slate-500" :
                log.startsWith("[NLP-PARSER]") ? "text-amber-400" :
                log.startsWith("[DATABASE]") ? "text-emerald-400" :
                log.startsWith("[BROADCAST]") ? "text-indigo-400" :
                "text-slate-200"
              }>
                {log}
              </div>
            ))}
            <div ref={consoleEndRef} />
          </div>

          {/* Extracted JSON Block */}
          <div className="bg-[#0b0e17] border border-slate-900 p-2.5 rounded-lg h-[110px] overflow-y-auto font-mono text-[9px] text-emerald-400">
            <span className="text-[8px] text-slate-500 block mb-1 uppercase tracking-wider font-bold">Regex-Daemon JSON Output:</span>
            <pre>{JSON.stringify(parsedJson, null, 2)}</pre>
          </div>
        </div>

        {/* Right: n8n Flow visual representation */}
        <div className="xl:col-span-4 bg-[#0b0e17]/85 border border-slate-800 rounded-xl p-4 flex flex-col justify-between h-[360px]">
          <div>
            <div className="flex justify-between items-center border-b border-slate-900 pb-2 mb-3">
              <span className="text-xs font-mono text-slate-300">n8n Execution Cascade</span>
              <span className="text-[10px] text-indigo-400 font-mono">active map</span>
            </div>
            
            <p className="text-[10px] text-slate-400 leading-normal mb-4">
              Watch nodes light up in real-time as the automation pipeline triggers!
            </p>
          </div>

          {/* Stack Nodes diagram */}
          <div className="flex flex-col gap-3 justify-center flex-1 my-auto">
            {/* Step 1: Telegram Webhook */}
            <div className={`p-2.5 rounded-lg border flex items-center justify-between transition-all duration-300 ${
              n8nStep === 1 
                ? "bg-indigo-500/20 border-indigo-500 shadow-md shadow-indigo-500/10 text-white translate-x-1" 
                : "bg-slate-950/60 border-slate-900 text-slate-400"
            }`}>
              <div className="flex items-center gap-2">
                <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold ${
                  n8nStep >= 1 ? "bg-indigo-500 text-slate-950" : "bg-slate-800 text-slate-500"
                }`}>1</span>
                <div>
                  <span className="text-[10px] font-mono block">Ingress Trigger</span>
                  <span className="text-xs font-semibold block">Telegram Webhook Node</span>
                </div>
              </div>
              {n8nStep > 1 && <Check className="w-4 h-4 text-emerald-400" />}
              {n8nStep === 1 && <div className="w-1.5 h-1.5 rounded-full bg-indigo-400 animate-ping" />}
            </div>

            {/* Step 2: Python Script Node */}
            <div className={`p-2.5 rounded-lg border flex items-center justify-between transition-all duration-300 ${
              n8nStep === 2 
                ? "bg-amber-500/20 border-amber-500 shadow-md shadow-amber-500/10 text-white translate-x-1" 
                : "bg-slate-950/60 border-slate-900 text-slate-400"
            }`}>
              <div className="flex items-center gap-2">
                <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold ${
                  n8nStep >= 2 ? "bg-amber-500 text-slate-950" : "bg-slate-800 text-slate-500"
                }`}>2</span>
                <div>
                  <span className="text-[10px] font-mono block">Data Processing</span>
                  <span className="text-xs font-semibold block">Python Parser node</span>
                </div>
              </div>
              {n8nStep > 2 && <Check className="w-4 h-4 text-emerald-400" />}
              {n8nStep === 2 && <div className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-ping" />}
            </div>

            {/* Step 3: Database Node */}
            <div className={`p-2.5 rounded-lg border flex items-center justify-between transition-all duration-300 ${
              n8nStep === 3 
                ? "bg-emerald-500/20 border-emerald-500 shadow-md shadow-emerald-500/10 text-white translate-x-1" 
                : "bg-slate-950/60 border-slate-900 text-slate-400"
            }`}>
              <div className="flex items-center gap-2">
                <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold ${
                  n8nStep >= 3 ? "bg-emerald-500 text-slate-950" : "bg-slate-800 text-slate-500"
                }`}>3</span>
                <div>
                  <span className="text-[10px] font-mono block">Database Storage</span>
                  <span className="text-xs font-semibold block">Supabase Logging API</span>
                </div>
              </div>
              {n8nStep > 3 && <Check className="w-4 h-4 text-emerald-400" />}
              {n8nStep === 3 && <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />}
            </div>

            {/* Step 4: Broadcast NOC Node */}
            <div className={`p-2.5 rounded-lg border flex items-center justify-between transition-all duration-300 ${
              n8nStep === 4 
                ? "bg-indigo-500/20 border-indigo-500 shadow-md shadow-indigo-500/10 text-white translate-x-1" 
                : "bg-slate-950/60 border-slate-900 text-slate-400"
            }`}>
              <div className="flex items-center gap-2">
                <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold ${
                  n8nStep >= 4 ? "bg-indigo-500 text-slate-950" : "bg-slate-800 text-slate-500"
                }`}>4</span>
                <div>
                  <span className="text-[10px] font-mono block">Incident Alerting</span>
                  <span className="text-xs font-semibold block">NOC Telegram Broadcaster</span>
                </div>
              </div>
              {n8nStep === 4 && <div className="w-1.5 h-1.5 rounded-full bg-indigo-400 animate-ping" />}
            </div>
          </div>

          <div className="text-[9px] font-mono text-slate-500 text-center border-t border-slate-900 pt-2 shrink-0">
            Pipeline average execution: 1.4 seconds. Success rate: 99.98%
          </div>
        </div>

      </div>

    </div>
  );
}
