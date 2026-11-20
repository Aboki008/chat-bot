"use client";

import React from "react";
import { SquarePen, Settings2, GraduationCap, PanelLeft } from "lucide-react";

interface HeaderProps {
  onToggleSideNav: () => void;
  isSideNavOpen: boolean;
  onNewChat: () => void;
  onOpenSettings: () => void;
  hasCustomKey: boolean;
}

export const Header: React.FC<HeaderProps> = ({
  onToggleSideNav,
  isSideNavOpen,
  onNewChat,
  onOpenSettings,
  hasCustomKey,
}) => {
  return (
    <header className="sticky top-0 z-30 w-full bg-white/90 backdrop-blur-md border-b border-zinc-100">
      <div className="w-full max-w-4xl mx-auto px-4 h-14 flex items-center justify-between">
        {/* Left: Sidebar Toggle & Institutional Title */}
        <div className="flex items-center gap-2.5 sm:gap-3">
          <button
            onClick={onToggleSideNav}
            className="p-1.5 rounded-lg text-zinc-500 hover:text-zinc-900 hover:bg-zinc-100 transition-colors cursor-pointer"
            title={isSideNavOpen ? "Collapse sidebar" : "Open Quick Ask sidebar"}
            aria-label="Toggle sidebar"
          >
            <PanelLeft className="w-4.5 h-4.5" />
          </button>

          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-lg bg-emerald-800 text-white flex items-center justify-center shadow-xs">
              <GraduationCap className="w-4 h-4" />
            </div>
            <div className="flex items-center gap-2">
              <h1 className="text-sm font-semibold text-zinc-900 tracking-tight leading-none">
                FCAHPTVom
              </h1>
              <span className="hidden sm:inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-medium bg-emerald-50 text-emerald-700 border border-emerald-200/60">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                Admissions AI
              </span>
            </div>
          </div>
        </div>

        {/* Right: New Chat & Settings */}
        <div className="flex items-center gap-1.5">
          <button
            onClick={onNewChat}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-zinc-700 hover:text-zinc-900 hover:bg-zinc-100 rounded-lg transition-colors cursor-pointer"
            title="Start new enquiry"
          >
            <SquarePen className="w-3.5 h-3.5 text-zinc-500" />
            <span className="hidden sm:inline">New Chat</span>
          </button>

          <button
            onClick={onOpenSettings}
            className={`p-1.5 rounded-lg text-zinc-500 hover:text-zinc-900 hover:bg-zinc-100 transition-colors cursor-pointer relative ${
              !hasCustomKey ? "text-zinc-400" : ""
            }`}
            title="Settings & API Key"
          >
            <Settings2 className="w-4 h-4" />
            {!hasCustomKey && (
              <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 rounded-full bg-amber-500 ring-2 ring-white" />
            )}
          </button>
        </div>
      </div>
    </header>
  );
};
