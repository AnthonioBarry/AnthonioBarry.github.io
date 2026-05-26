"use client";

import React, { useState, useEffect } from "react";
import { Menu, X, Terminal, FileDown } from "lucide-react";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handlePrintCV = () => {
    // Elegant print trigger leveraging our print CSS overrides
    window.print();
  };

  return (
    <header className="fixed top-0 left-0 w-full z-50 px-4 sm:px-6 py-4 no-print">
      <div className={`max-w-7xl mx-auto rounded-2xl transition-all duration-300 ${
        scrolled 
          ? "glass-panel shadow-lg shadow-black/30 py-3 px-6 border-slate-500/10" 
          : "bg-transparent py-4 px-4 border-transparent"
      } border flex items-center justify-between`}>
        
        {/* Logo */}
        <a href="#home" className="flex items-center gap-2 group">
          <div className="w-8 h-8 rounded-lg bg-teal-500/15 border border-teal-500/35 flex items-center justify-center group-hover:border-teal-400 group-hover:bg-teal-500/25 transition-all">
            <Terminal className="w-4 h-4 text-teal-400" />
          </div>
          <span className="font-mono text-xs tracking-wider text-slate-100 font-bold group-hover:text-teal-400 transition-all">
            ANTHONIO BARRY //
          </span>
        </a>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-6">
          <a href="#home" className="text-xs font-mono text-slate-400 hover:text-slate-100 transition-colors">./home</a>
          <a href="#projects" className="text-xs font-mono text-slate-400 hover:text-slate-100 transition-colors">./projects</a>
          <a href="#skills" className="text-xs font-mono text-slate-400 hover:text-slate-100 transition-colors">./skills</a>
          <a href="#contact" className="text-xs font-mono text-slate-400 hover:text-slate-100 transition-colors">./connect</a>
        </nav>

        {/* CTA Actions */}
        <div className="hidden md:flex items-center gap-3">
          <button
            onClick={handlePrintCV}
            className="px-3.5 py-1.5 bg-teal-500 hover:bg-teal-400 text-slate-950 font-bold font-mono text-[10px] rounded-xl flex items-center gap-1.5 transition-all active:scale-95 duration-200 cursor-pointer shadow-md shadow-teal-500/10"
          >
            <FileDown className="w-3.5 h-3.5" />
            Print / Save CV
          </button>
        </div>

        {/* Mobile menu button */}
        <button 
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden text-slate-400 hover:text-slate-100 p-1 cursor-pointer transition"
        >
          {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>

      </div>

      {/* Mobile Drawer */}
      {isOpen && (
        <div className="md:hidden mt-2 max-w-7xl mx-auto glass-panel rounded-2xl border border-slate-500/10 p-4 flex flex-col gap-3 shadow-2xl shadow-black/80 animate-slideDown">
          <a 
            href="#home" 
            onClick={() => setIsOpen(false)}
            className="text-xs font-mono text-slate-400 hover:text-slate-100 py-1.5"
          >
            ./home
          </a>
          <a 
            href="#projects" 
            onClick={() => setIsOpen(false)}
            className="text-xs font-mono text-slate-400 hover:text-slate-100 py-1.5"
          >
            ./projects
          </a>
          <a 
            href="#skills" 
            onClick={() => setIsOpen(false)}
            className="text-xs font-mono text-slate-400 hover:text-slate-100 py-1.5"
          >
            ./skills
          </a>
          <a 
            href="#contact" 
            onClick={() => setIsOpen(false)}
            className="text-xs font-mono text-slate-400 hover:text-slate-100 py-1.5"
          >
            ./connect
          </a>
          
          <button
            onClick={() => {
              setIsOpen(false);
              handlePrintCV();
            }}
            className="w-full justify-center mt-2 px-4 py-2 bg-teal-500 hover:bg-teal-400 text-slate-950 font-bold font-mono text-xs rounded-xl flex items-center gap-1.5 transition-all"
          >
            <FileDown className="w-3.5 h-3.5" />
            Print / Save CV
          </button>
        </div>
      )}
    </header>
  );
}
