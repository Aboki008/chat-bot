"use client";

import React, { useState, useEffect } from "react";
import { GraduationCap, ArrowUpRight, Sparkles, CheckCircle2 } from "lucide-react";

interface EmptyStateProps {
  onSelectPrompt: (prompt: string) => void;
}

interface StarterCard {
  id: string;
  category: "all" | "admissions" | "programs" | "fees" | "campus";
  tag: string;
  title: string;
  subtitle: string;
  prompt: string;
}

const STARTER_PROMPTS: StarterCard[] = [
  {
    id: "cut-off",
    category: "admissions",
    tag: "Admissions",
    title: "JAMB Cut-off & Post-UTME",
    subtitle: "Check minimum UTME cut-off marks and O'Level subject combinations.",
    prompt: "What is the JAMB UTME cut-off mark and O'Level requirements for ND programmes at FCAHPTVom?",
  },
  {
    id: "nd-hnd-courses",
    category: "programs",
    tag: "Courses",
    title: "ND & HND Programmes Offered",
    subtitle: "Explore Animal Health, Production, Science Lab Tech, and Computing.",
    prompt: "What National Diploma (ND) and Higher National Diploma (HND) programmes are available at FCAHPTVom?",
  },
  {
    id: "remita-fees",
    category: "fees",
    tag: "Fees",
    title: "School Fees & Remita Payment",
    subtitle: "Estimated session fees, acceptance fee, and Remita payment guide.",
    prompt: "How much is the acceptance fee and estimated school fees for fresh ND and HND students at FCAHPTVom?",
  },
  {
    id: "hnd-screening",
    category: "programs",
    tag: "HND Entry",
    title: "HND Admission & IT Requirements",
    subtitle: "Mandatory Industrial Training (IT) letters and transcript submission.",
    prompt: "What are the requirements for HND admission, including IT completion and transcript submission at FCAHPTVom?",
  },
  {
    id: "hostel-vom",
    category: "campus",
    tag: "Campus Life",
    title: "Hostels & Living in Vom",
    subtitle: "On-campus male and female hostel allocation, electricity, and safety.",
    prompt: "What are the on-campus hostel accommodation options, charges, and facilities in Vom?",
  },
  {
    id: "caps-acceptance",
    category: "admissions",
    tag: "Screening",
    title: "JAMB CAPS & Change of Course",
    subtitle: "How to accept admission on CAPS and effect a change of institution.",
    prompt: "How do I accept admission on JAMB CAPS and effect a change of institution to FCAHPTVom?",
  },
];

export const EmptyState: React.FC<EmptyStateProps> = ({ onSelectPrompt }) => {
  const [greeting, setGreeting] = useState("Welcome to FCAHPTVom");
  const [selectedCategory, setSelectedCategory] = useState<"all" | "admissions" | "programs" | "fees" | "campus">("all");

  useEffect(() => {
    const hour = new Date().getHours();
    if (hour < 12) setGreeting("Good morning");
    else if (hour < 17) setGreeting("Good afternoon");
    else setGreeting("Good evening");
  }, []);

  const filteredCards =
    selectedCategory === "all"
      ? STARTER_PROMPTS
      : STARTER_PROMPTS.filter((card) => card.category === selectedCategory);

  return (
    <div className="flex-1 flex flex-col items-center justify-center text-center px-4 py-8 sm:py-12 max-w-2xl mx-auto w-full">
      {/* Institutional Crest Icon */}
      <div className="relative mb-4 flex items-center justify-center">
        <div className="w-13 h-13 rounded-2xl bg-emerald-800 text-white flex items-center justify-center shadow-md ring-4 ring-emerald-50">
          <GraduationCap className="w-7 h-7 text-white" />
        </div>
      </div>

      {/* Greeting Header */}
      <h2 className="text-xl sm:text-2xl font-semibold text-zinc-900 tracking-tight">
        {greeting}. How can I assist you?
      </h2>
      <p className="mt-1.5 text-xs sm:text-sm text-zinc-500 max-w-lg leading-relaxed">
        Official enquiry desk for <strong>Federal College of Animal Health and Production Technology, Vom</strong>. Ask about ND & HND programmes, JAMB screening, Remita fees, or hostels.
      </p>

      {/* Category Filter Chips */}
      <div className="mt-6 flex flex-wrap items-center justify-center gap-1.5">
        {[
          { label: "All Topics", value: "all" },
          { label: "Admissions", value: "admissions" },
          { label: "Courses", value: "programs" },
          { label: "School Fees", value: "fees" },
          { label: "Hostels", value: "campus" },
        ].map((tab) => (
          <button
            key={tab.value}
            onClick={() => setSelectedCategory(tab.value as any)}
            className={`px-3 py-1 rounded-full text-xs font-medium transition-all cursor-pointer ${
              selectedCategory === tab.value
                ? "bg-zinc-900 text-white shadow-2xs"
                : "bg-zinc-100 hover:bg-zinc-200/70 text-zinc-600 hover:text-zinc-900"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Starter Prompts Grid */}
      <div className="mt-4 w-full grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-left">
        {filteredCards.map((item) => (
          <button
            key={item.id}
            onClick={() => onSelectPrompt(item.prompt)}
            className="p-3.5 rounded-2xl bg-white hover:bg-zinc-50/80 border border-zinc-200/80 hover:border-zinc-300 shadow-2xs transition-all text-left flex flex-col justify-between group cursor-pointer"
          >
            <div>
              <div className="flex items-center justify-between mb-1">
                <span className="text-[10px] font-semibold uppercase tracking-wider px-1.5 py-0.5 rounded-md bg-zinc-100 text-zinc-600 group-hover:bg-emerald-50 group-hover:text-emerald-700 transition-colors">
                  {item.tag}
                </span>
                <ArrowUpRight className="w-3.5 h-3.5 text-zinc-300 group-hover:text-emerald-700 transition-colors" />
              </div>
              <h3 className="text-xs font-semibold text-zinc-900 group-hover:text-emerald-800 transition-colors">
                {item.title}
              </h3>
              <p className="mt-1 text-[11px] text-zinc-500 leading-relaxed line-clamp-2">
                {item.subtitle}
              </p>
            </div>
          </button>
        ))}
      </div>

      {/* Trust pill */}
      <div className="mt-6 flex items-center gap-1.5 text-[11px] text-zinc-400">
        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
        <span>Grounded on official FCAHPTVom academic & admissions catalogues</span>
      </div>
    </div>
  );
};
