"use client";
import Link from 'next/link';
import Image from 'next/image';
import { useState, useContext } from "react";
import { IModeContext, ModeContext } from './modeContext';

export default function Home() {
  const imodeContext: IModeContext = useContext(ModeContext);
   return (
   <main className="flex min-h-screen flex-col items-center justify-around p-10 md:p-12 text-blue-950">
    <div className="flex flex-col items-center text-center max-w-3xl space-y-4">
    <h1 className="text-4xl font-extrabold tracking-tight md:text-5xl lg:text-6xl text-slate-900 drop-shadow-sm">RiboLogic Designer</h1>
    <p 
      className="text-base md:text-lg lg:text-xl font-medium leading-relaxed text-blue-950/90"
    >RiboLogic is an RNA-based therapeutic system that uses microRNAs as biomarkers to control protein expression. 
    RL Designer allows you to customize these therapeutic systems by generating optimized sequences for microRNA inputs and protein outputs of your choosing, or to change the entire system. 
    </p>
    </div>
    {/* Mode Toggle Switch */}
      <div className="inline-flex rounded-xl bg-white/20 p-1.5 backdrop-blur-md border border-white/30 shadow-inner">
        <button
          type="button"
          onClick={() => imodeContext.setisAdvancedMode(false)}
          className={`rounded-lg px-6 py-3 text-base font-semibold transition-all duration-200 ${
            !imodeContext.isAdvancedMode
              ? "bg-white text-blue-900 shadow-md"
              : "text-blue-900/70 hover:text-blue-950 hover:bg-white/10"
          }`}
        >
          Basic mode
        </button>
        <button
          type="button"
          onClick={() => imodeContext.setisAdvancedMode(true)}
          className={`rounded-lg px-6 py-3 text-base font-semibold transition-all duration-200 ${
            imodeContext.isAdvancedMode
              ? "bg-white text-blue-900 shadow-md"
              : "text-blue-900/70 hover:text-blue-950 hover:bg-white/10"
          }`}
        >
          Advanced mode
        </button>
      </div>
    
        {/* Card Navigation Row */}
      <div className="flex flex-row justify-center gap-6 w-full max-w-4xl px-4">
        {/* Card 1: Tutorials */}
        <Link 
          href="https://2026.igem.wiki/aarhus-university/software#tutorial_start" 
          className="group flex flex-1 flex-col items-center justify-center rounded-2xl bg-white/20 p-6 text-blue-950 shadow-lg backdrop-blur-md border border-white/30 transition-all duration-300 hover:-translate-y-1 hover:bg-white/30 hover:border-white/50 hover:shadow-xl"
        >
          <div className="relative mb-3 flex h-20 w-20 items-center justify-center rounded-2xl bg-white/30 p-2 border border-white/20 transition-transform duration-300 group-hover:scale-105">
            <Image 
              src="https://static.igem.wiki/teams/6332/wiki/assets-for-the-wiki-logos-etc/icons/better-designed-icons/project-light.svg" 
              alt="Tutorials icon" 
              width={60} 
              height={60} 
              className="object-contain"
            />
          </div>
          <span className="text-lg font-semibold tracking-wide">Tutorials</span>
        </Link>

        {/* Card 2: Documentation */}
        <Link 
          href="https://2026.igem.wiki/aarhus-university/software" 
          className="group flex flex-1 flex-col items-center justify-center rounded-2xl bg-white/20 p-6 text-blue-950 shadow-lg backdrop-blur-md border border-white/30 transition-all duration-300 hover:-translate-y-1 hover:bg-white/30 hover:border-white/50 hover:shadow-xl"
        >
          <div className="relative mb-3 flex h-20 w-20 items-center justify-center rounded-2xl bg-white/30 p-2 border border-white/20 transition-transform duration-300 group-hover:scale-105">
            <Image 
              src="https://static.igem.wiki/teams/6332/wiki/assets-for-the-wiki-logos-etc/icons/better-designed-icons/education-light.svg"
              alt="Documentation icon" 
              width={60} 
              height={60} 
              className="object-contain"
            />
          </div>
          <span className="text-lg font-semibold tracking-wide">Documentation</span>
        </Link>

        {/* Card 3: Team Wiki */}
        <Link 
          href="https://2026.igem.wiki/aarhus-university/" 
          className="group flex flex-1 flex-col items-center justify-center rounded-2xl bg-white/20 p-6 text-blue-950 shadow-lg backdrop-blur-md border border-white/30 transition-all duration-300 hover:-translate-y-1 hover:bg-white/30 hover:border-white/50 hover:shadow-xl"
        >
          <div className="relative mb-3 flex h-20 w-20 items-center justify-center rounded-2xl bg-white/30 p-2 border border-white/20 transition-transform duration-300 group-hover:scale-105">
            <Image 
              src="https://static.igem.wiki/teams/6332/wiki/assets-for-the-wiki-logos-etc/icons/better-designed-icons/team-light.svg" 
              alt="Team Wiki icon" 
              width={60} 
              height={60} 
              className="object-contain"
            />
          </div>
          <span className="text-lg font-semibold tracking-wide text-center">Team Wiki</span>
        </Link>
      </div>

    </main>
    );
}
