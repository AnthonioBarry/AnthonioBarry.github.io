"use client";

import React, { useState, useEffect } from "react";
import { Mail, Send, Award, Database, CheckCircle, HelpCircle, Loader2 } from "lucide-react";

interface MessagePayload {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  timestamp: string;
}

export default function ContactForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [savedMessages, setSavedMessages] = useState<MessagePayload[]>([]);
  const [visitorCount, setVisitorCount] = useState<number>(318);

  // Load message logs from localStorage on mount and increment visitor count
  useEffect(() => {
    // Visitor counter simulation
    const storedCount = localStorage.getItem("portfolio_visitor_count");
    let currentCount = storedCount ? parseInt(storedCount) : Math.floor(Math.random() * 200 + 150);
    
    // Increment visitor count by 1 on fresh tab session
    const sessionVisited = sessionStorage.getItem("portfolio_session_visited");
    if (!sessionVisited) {
      currentCount += 1;
      localStorage.setItem("portfolio_visitor_count", currentCount.toString());
      sessionStorage.setItem("portfolio_session_visited", "true");
    }
    setVisitorCount(currentCount);

    // Stored messages
    const storedMsgs = localStorage.getItem("portfolio_contact_messages");
    if (storedMsgs) {
      setSavedMessages(JSON.parse(storedMsgs));
    }
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !message) return;

    setLoading(true);

    // Mock API processing delay
    setTimeout(() => {
      const newPayload: MessagePayload = {
        id: `MSG-${Math.floor(Math.random() * 90000 + 10000)}`,
        name,
        email,
        subject: subject || "No Subject Provided",
        message,
        timestamp: new Date().toLocaleString(),
      };

      const updatedLogs = [newPayload, ...savedMessages];
      setSavedMessages(updatedLogs);
      localStorage.setItem("portfolio_contact_messages", JSON.stringify(updatedLogs));

      setLoading(false);
      setSuccess(true);
      
      // Clear inputs
      setName("");
      setEmail("");
      setSubject("");
      setMessage("");

      setTimeout(() => {
        setSuccess(false);
      }, 5000);
    }, 1200);
  };

  return (
    <div className="glass-panel p-6 rounded-2xl glow-indigo relative overflow-hidden transition-all duration-300">
      
      {/* Background radial highlight */}
      <div className="absolute -right-24 -top-24 w-48 h-48 rounded-full bg-indigo-500/5 blur-3xl" />

      {/* Header Info */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b border-slate-900 pb-4 mb-6">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono text-indigo-400 tracking-widest uppercase">
            <Mail className="w-4 h-4 text-indigo-400" />
            Connect & Dispatch
          </div>
          <h3 className="text-xl font-bold mt-1 text-slate-100">Send an Operational Message</h3>
        </div>

        {/* Live Visitor Counter Badge */}
        <div className="flex items-center gap-2 bg-[#0b0e17] border border-slate-800 px-3 py-1.5 rounded-xl font-mono text-xs text-slate-400">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          <span>Live Readers: </span>
          <span className="font-bold text-slate-200">{visitorCount}</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Contact Form */}
        <div className="lg:col-span-7 flex flex-col gap-4">
          
          {success && (
            <div className="bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 p-4 rounded-xl text-xs font-mono flex items-start gap-2.5 animate-fadeIn">
              <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
              <div>
                <span className="font-bold block text-slate-200 mb-0.5">Payload Transmitted Successfully!</span>
                Message written locally (stored in localStorage payload pool). Check the "Message Logs" console on the right!
              </div>
            </div>
          )}

          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Name */}
              <div className="flex flex-col gap-1.5">
                <label className="text-[10px] font-mono text-slate-400 uppercase tracking-wider">Your Name *</label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Hiring Manager"
                  className="bg-slate-950/80 border border-slate-800 focus:border-indigo-500 text-xs px-3.5 py-2.5 rounded-xl text-slate-100 focus:outline-none focus:ring-1 focus:ring-indigo-500/50"
                />
              </div>

              {/* Email */}
              <div className="flex flex-col gap-1.5">
                <label className="text-[10px] font-mono text-slate-400 uppercase tracking-wider">Email Address *</label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="hrd@company.com"
                  className="bg-slate-950/80 border border-slate-800 focus:border-indigo-500 text-xs px-3.5 py-2.5 rounded-xl text-slate-100 focus:outline-none focus:ring-1 focus:ring-indigo-500/50"
                />
              </div>
            </div>

            {/* Subject */}
            <div className="flex flex-col gap-1.5">
              <label className="text-[10px] font-mono text-slate-400 uppercase tracking-wider">Subject</label>
              <input
                type="text"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                placeholder="Let's build something together / Interview Invitation"
                className="bg-slate-950/80 border border-slate-800 focus:border-indigo-500 text-xs px-3.5 py-2.5 rounded-xl text-slate-100 focus:outline-none focus:ring-1 focus:ring-indigo-500/50"
              />
            </div>

            {/* Message */}
            <div className="flex flex-col gap-1.5">
              <label className="text-[10px] font-mono text-slate-400 uppercase tracking-wider">Your Message *</label>
              <textarea
                required
                rows={4}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Describe your project, team opportunity, or engineering problem..."
                className="bg-slate-950/80 border border-slate-800 focus:border-indigo-500 text-xs px-3.5 py-2.5 rounded-xl text-slate-100 focus:outline-none focus:ring-1 focus:ring-indigo-500/50 resize-none"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="mt-2 px-5 py-3 bg-indigo-500 hover:bg-indigo-400 disabled:bg-slate-800 disabled:text-slate-500 text-slate-950 font-bold text-xs rounded-xl shadow-lg shadow-indigo-500/20 transition duration-200 cursor-pointer flex items-center justify-center gap-1.5 active:scale-98 self-start"
            >
              {loading ? (
                <>
                  <Loader2 className="w-3.5 h-3.5 animate-spin" />
                  Transmitting Payload...
                </>
              ) : (
                <>
                  <Send className="w-3.5 h-3.5" />
                  Transmit Message
                </>
              )}
            </button>
          </form>
        </div>

        {/* Console / Supabase Hookup guide */}
        <div className="lg:col-span-5 flex flex-col gap-4">
          
          {/* Telemetry Message Logs */}
          <div className="bg-slate-950 border border-slate-900 rounded-xl p-4 flex flex-col h-[200px] justify-between">
            <span className="text-[10px] font-mono text-indigo-400 flex items-center gap-1 border-b border-slate-900 pb-2">
              <Database className="w-3.5 h-3.5 text-indigo-400" />
              Local Database Logs (localStorage payload)
            </span>

            <div className="flex-1 overflow-y-auto font-mono text-[9px] text-slate-300 leading-normal py-2 space-y-2.5 scrollbar-thin">
              {savedMessages.length === 0 ? (
                <div className="text-slate-500 italic py-6 text-center">
                  Standby. No messages stored in session. Send a message on the left to see telemetry database writing live!
                </div>
              ) : (
                savedMessages.map((msg) => (
                  <div key={msg.id} className="bg-[#0b0e17] p-2 rounded border border-slate-900">
                    <div className="flex justify-between text-indigo-300 mb-0.5">
                      <span>{msg.id} ({msg.name})</span>
                      <span>{msg.timestamp}</span>
                    </div>
                    <div className="text-slate-400 text-[8px] truncate">Email: {msg.email}</div>
                    <div className="text-slate-400 text-[8px] truncate">Subj: {msg.subject}</div>
                    <p className="text-slate-200 mt-1 text-[8.5px] whitespace-pre-wrap">{msg.message}</p>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Clean Architecture & Git Repositories Card */}
          <div className="bg-[#0b0e17]/80 border border-slate-800 rounded-xl p-5 flex flex-col gap-3">
            <span className="text-[10px] font-mono text-teal-400 flex items-center gap-1.5 uppercase font-bold tracking-wider">
              <Award className="w-4 h-4 text-teal-400" />
              Clean Code & Repository Access
            </span>
            <p className="text-xs text-slate-300 leading-relaxed font-sans">
              I believe in modular design, robust error handling, and clean documentation. The repository for this entire portfolio and all automation pipelines is fully open source.
            </p>
            <div className="flex flex-col gap-2 mt-1">
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full text-center px-4 py-2.5 bg-slate-900 hover:bg-slate-800 border border-slate-800 hover:border-slate-700 text-slate-100 font-bold text-xs rounded-xl transition duration-200 cursor-pointer flex items-center justify-center gap-2 group active:scale-98"
              >
                <svg className="w-4 h-4 text-slate-400 group-hover:text-slate-100" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
                  <path d="M9 18c-4.51 2-5-2-7-2" />
                </svg>
                Explore Codebase on GitHub
              </a>
            </div>
          </div>

        </div>
      </div>

    </div>
  );
}
