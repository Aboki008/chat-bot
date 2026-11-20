"use client";

import React, { useState, useMemo } from "react";
import {
  SquarePen,
  PanelLeftClose,
  Sparkles,
  ChevronDown,
  ChevronRight,
  GraduationCap,
  Calendar,
  DollarSign,
  Home,
  BookOpen,
  Search,
  ExternalLink,
  X,
  FileText,
} from "lucide-react";

interface QuickQuestion {
  id: string;
  question: string;
}

interface QuestionCategory {
  name: string;
  icon: React.ReactNode;
  questions: QuickQuestion[];
}

interface SideNavProps {
  isOpen: boolean;
  onToggle: () => void;
  onSelectPrompt: (prompt: string) => void;
  onNewChat: () => void;
}

const QUICK_CATEGORIES: QuestionCategory[] = [
  {
    name: "Admissions & Cut-off",
    icon: <Calendar className="w-3.5 h-3.5 text-emerald-600" />,
    questions: [
      {
        id: "a1",
        question: "What is the JAMB UTME cut-off mark for FCAHPTVom programmes?",
      },
      {
        id: "a2",
        question: "What O'Level subjects are required for Animal Health & Production?",
      },
      {
        id: "a3",
        question: "How do I register for the Post-UTME screening on the portal?",
      },
      {
        id: "a4",
        question: "How do I accept admission on JAMB CAPS and print my admission letter?",
      },
    ],
  },
  {
    name: "ND & HND Programmes",
    icon: <BookOpen className="w-3.5 h-3.5 text-blue-600" />,
    questions: [
      {
        id: "p1",
        question: "What National Diploma (ND) courses are offered at FCAHPTVom?",
      },
      {
        id: "p2",
        question: "What Higher National Diploma (HND) programmes can I apply for?",
      },
      {
        id: "p3",
        question: "What options exist under Veterinary Laboratory Technology (VLT)?",
      },
      {
        id: "p4",
        question: "Does FCAHPTVom run degree programmes in affiliation with universities?",
      },
    ],
  },
  {
    name: "Fees & Remita Payment",
    icon: <DollarSign className="w-3.5 h-3.5 text-amber-600" />,
    questions: [
      {
        id: "t1",
        question: "How much is the acceptance fee and how do I pay via Remita?",
      },
      {
        id: "t2",
        question: "What is the estimated school fee schedule for fresh ND and HND students?",
      },
      {
        id: "t3",
        question: "What are the departmental and registration dues for new students?",
      },
    ],
  },
  {
    name: "HND & IT Requirements",
    icon: <FileText className="w-3.5 h-3.5 text-violet-600" />,
    questions: [
      {
        id: "h1",
        question: "What are the entry requirements for HND admission after ND?",
      },
      {
        id: "h2",
        question: "Is the 1-year cognitive Industrial Training (IT) letter compulsory?",
      },
      {
        id: "h3",
        question: "How do I forward my official ND transcript to FCAHPTVom?",
      },
    ],
  },
  {
    name: "Hostels & Campus Life",
    icon: <Home className="w-3.5 h-3.5 text-indigo-600" />,
    questions: [
      {
        id: "c1",
        question: "What are the on-campus hostel accommodation options in Vom?",
      },
      {
        id: "c2",
        question: "Tell me about the institutional livestock farms and research laboratories.",
      },
      {
        id: "c3",
        question: "Where is the college located in Jos South, Plateau State?",
      },
    ],
  },
];

export const SideNav: React.FC<SideNavProps> = ({
  isOpen,
  onToggle,
  onSelectPrompt,
  onNewChat,
}) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [collapsedCategories, setCollapsedCategories] = useState<Record<string, boolean>>({});

  const toggleCategory = (catName: string) => {
    setCollapsedCategories((prev) => ({
      ...prev,
      [catName]: !prev[catName],
    }));
  };

  // Filter questions based on search query
  const filteredCategories = useMemo(() => {
    if (!searchQuery.trim()) return QUICK_CATEGORIES;
    const query = searchQuery.toLowerCase();
    return QUICK_CATEGORIES.map((cat) => ({
      ...cat,
      questions: cat.questions.filter((q) =>
        q.question.toLowerCase().includes(query)
      ),
    })).filter((cat) => cat.questions.length > 0);
  }, [searchQuery]);

  return (
    <>
      {/* Mobile backdrop */}
      {isOpen && (
        <div
          onClick={onToggle}
          className="fixed inset-0 z-40 bg-zinc-900/20 backdrop-blur-xs md:hidden transition-opacity"
        />
      )}

      {/* Side Navigation Rail */}
      <aside
        className={`fixed md:static top-0 left-0 z-50 h-screen w-72 shrink-0 bg-zinc-50/80 border-r border-zinc-200/70 flex flex-col justify-between transition-all duration-300 ease-in-out ${
          isOpen
            ? "translate-x-0"
            : "-translate-x-full md:-ml-72 md:translate-x-0"
        }`}
      >
        {/* Top Header */}
        <div className="p-3 border-b border-zinc-200/60 bg-white/50">
          <div className="flex items-center justify-between mb-2.5 px-1">
            <div className="flex items-center gap-2">
              <div className="w-5.5 h-5.5 rounded-md bg-emerald-800 text-white flex items-center justify-center">
                <GraduationCap className="w-3.5 h-3.5" />
              </div>
              <span className="text-xs font-semibold text-zinc-800 tracking-tight">
                Quick Enquiries
              </span>
            </div>

            <button
              onClick={onToggle}
              className="p-1 rounded-md text-zinc-400 hover:text-zinc-700 hover:bg-zinc-200/60 transition-colors cursor-pointer"
              title="Close sidebar"
            >
              <PanelLeftClose className="w-4 h-4 hidden md:block" />
              <X className="w-4 h-4 md:hidden" />
            </button>
          </div>

          {/* New Chat Button */}
          <button
            onClick={() => {
              onNewChat();
              if (window.innerWidth < 768) onToggle();
            }}
            className="w-full py-2 px-3 rounded-xl bg-white hover:bg-zinc-100 border border-zinc-200 text-zinc-800 text-xs font-medium flex items-center justify-between shadow-2xs transition-all cursor-pointer group"
          >
            <div className="flex items-center gap-2">
              <SquarePen className="w-3.5 h-3.5 text-zinc-500 group-hover:text-zinc-800 transition-colors" />
              <span>New Enquiry</span>
            </div>
            <span className="text-[10px] text-zinc-400 font-mono bg-zinc-50 px-1.5 py-0.5 rounded border border-zinc-200/60">
              ⌘N
            </span>
          </button>

          {/* Search/Filter Bar */}
          <div className="relative mt-2">
            <Search className="w-3.5 h-3.5 text-zinc-400 absolute left-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search questions..."
              className="w-full pl-8 pr-3 py-1.5 rounded-lg bg-white border border-zinc-200/80 text-xs text-zinc-800 placeholder:text-zinc-400 focus:outline-hidden focus:border-zinc-300 transition-all"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-2 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-zinc-600"
              >
                <X className="w-3 h-3" />
              </button>
            )}
          </div>
        </div>

        {/* Questions Feed */}
        <div className="flex-1 overflow-y-auto p-2.5 space-y-3">
          <div className="space-y-2">
            {filteredCategories.map((category) => {
              const isCollapsed = collapsedCategories[category.name] && !searchQuery;
              return (
                <div key={category.name} className="space-y-0.5">
                  {/* Category Header */}
                  <button
                    onClick={() => toggleCategory(category.name)}
                    className="w-full px-2 py-1.5 text-xs font-semibold text-zinc-700 hover:text-zinc-900 flex items-center justify-between rounded-lg hover:bg-zinc-200/40 transition-colors cursor-pointer group"
                  >
                    <div className="flex items-center gap-2 min-w-0">
                      {category.icon}
                      <span className="text-[11px] tracking-tight truncate">{category.name}</span>
                    </div>
                    <div className="flex items-center gap-1 shrink-0">
                      <span className="text-[10px] text-zinc-400 font-mono">
                        {category.questions.length}
                      </span>
                      {isCollapsed ? (
                        <ChevronRight className="w-3 h-3 text-zinc-400" />
                      ) : (
                        <ChevronDown className="w-3 h-3 text-zinc-400" />
                      )}
                    </div>
                  </button>

                  {/* Question Items */}
                  {!isCollapsed && (
                    <div className="space-y-0.5 pl-1.5">
                      {category.questions.map((item) => (
                        <button
                          key={item.id}
                          onClick={() => {
                            onSelectPrompt(item.question);
                            if (window.innerWidth < 768) onToggle();
                          }}
                          className="w-full text-left px-2.5 py-1.5 rounded-lg text-xs text-zinc-600 hover:text-zinc-900 hover:bg-white transition-all cursor-pointer group flex items-start justify-between gap-1.5 leading-snug"
                        >
                          <span className="line-clamp-2">{item.question}</span>
                          <ChevronRight className="w-3 h-3 text-zinc-300 opacity-0 group-hover:opacity-100 transition-opacity shrink-0 mt-0.5 text-emerald-600" />
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}

            {filteredCategories.length === 0 && (
              <div className="p-4 text-center text-xs text-zinc-400">
                No matching questions found.
              </div>
            )}
          </div>
        </div>

        {/* Footer info card */}
        <div className="p-3 border-t border-zinc-200/60 bg-white/70">
          <div className="p-2.5 rounded-xl bg-white border border-zinc-200/80 shadow-2xs space-y-1 text-xs">
            <div className="flex items-center justify-between text-zinc-700 font-medium">
              <span className="text-[11px] font-semibold text-zinc-900">
                FCAHPTVom Desk
              </span>
              <span className="flex items-center gap-1 text-[10px] text-emerald-700 font-medium">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                Vom, Plateau
              </span>
            </div>
            <a
              href="https://portal.fcahptvom.edu.ng"
              target="_blank"
              rel="noreferrer"
              className="text-[11px] text-emerald-700 hover:underline flex items-center justify-between font-mono"
            >
              <span>portal.fcahptvom.edu.ng</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>
        </div>
      </aside>
    </>
  );
};
