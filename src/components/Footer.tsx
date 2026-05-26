import React from "react";
import { Terminal, Mail } from "lucide-react";

export default function Footer() {
  return (
    <footer className="w-full bg-[#03060c] border-t border-slate-900/80 py-10 px-6 mt-16 no-print">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
        
        {/* Left column */}
        <div className="flex flex-col gap-2 text-center md:text-left">
          <div className="flex items-center justify-center md:justify-start gap-2">
            <Terminal className="w-4 h-4 text-teal-400" />
            <span className="font-mono text-xs tracking-wider text-slate-300 font-bold">
              ANTHONIO BARRY // PORTFOLIO
            </span>
          </div>
          <p className="text-[10px] text-slate-500 font-mono leading-relaxed">
            IT Engineering, Data Analytics, and AI Workflow Automations.
          </p>
        </div>

        {/* Center Tech details */}
        <div className="text-center md:text-right flex flex-col gap-1 text-[10px] font-mono text-slate-600">
          <span>Built with Next.js 16 • Tailwind CSS v4 • TypeScript</span>
          <span>© {new Date().getFullYear()} Anthonio Barry. All rights reserved.</span>
        </div>

        {/* Right Social Connectors */}
        <div className="flex items-center gap-4">
          <a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            className="w-8 h-8 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-800 hover:border-slate-700 flex items-center justify-center text-slate-400 hover:text-slate-100 transition-all duration-200"
            title="GitHub Profile"
          >
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
              <path d="M9 18c-4.51 2-5-2-7-2" />
            </svg>
          </a>
          <a
            href="https://linkedin.com"
            target="_blank"
            rel="noopener noreferrer"
            className="w-8 h-8 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-800 hover:border-slate-700 flex items-center justify-center text-slate-400 hover:text-slate-100 transition-all duration-200"
            title="LinkedIn Profile"
          >
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
              <rect width="4" height="12" x="2" y="9" rx="1" ry="1" />
              <circle cx="4" cy="4" r="2" />
            </svg>
          </a>
          <a
            href="mailto:contact@domain.com"
            className="w-8 h-8 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-800 hover:border-slate-700 flex items-center justify-center text-slate-400 hover:text-slate-100 transition-all duration-200"
            title="Send Email"
          >
            <Mail className="w-4 h-4" />
          </a>
        </div>

      </div>
    </footer>
  );
}
