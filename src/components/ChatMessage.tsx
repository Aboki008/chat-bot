"use client";

import React, { useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import {
  GraduationCap,
  Copy,
  Check,
  Volume2,
  VolumeX,
  ArrowRight,
  ThumbsUp,
  ThumbsDown,
  Sparkles,
} from "lucide-react";
import { Message } from "@/types/chat";

interface ChatMessageProps {
  message: Message;
  isStreaming?: boolean;
  onSelectPrompt: (prompt: string) => void;
}

export const ChatMessage: React.FC<ChatMessageProps> = ({
  message,
  isStreaming = false,
  onSelectPrompt,
}) => {
  const isUser = message.role === "user";
  const [copied, setCopied] = useState(false);
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [feedback, setFeedback] = useState<"like" | "dislike" | null>(null);

  // Parse suggested follow-ups from the message content if present
  let mainContent = message.content;
  const followUps: string[] = [];

  const followUpSplitPattern = /---\s*\n(?:\*\*)?Suggested Follow-ups:?(?:\*\*)?\s*\n([\s\S]*)$/i;
  const match = message.content.match(followUpSplitPattern);

  if (match && !isStreaming) {
    mainContent = message.content.substring(0, match.index).trim();
    const rawList = match[1];
    const lines = rawList.split("\n");
    for (const line of lines) {
      const clean = line.replace(/^[-*•\d.]+\s*/, "").trim();
      if (clean && clean.length > 3) {
        followUps.push(clean);
      }
    }
  }

  const handleCopy = () => {
    navigator.clipboard.writeText(mainContent);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleTextToSpeech = () => {
    if (!("speechSynthesis" in window)) return;

    if (isPlayingAudio) {
      window.speechSynthesis.cancel();
      setIsPlayingAudio(false);
      return;
    }

    window.speechSynthesis.cancel();
    const cleanSpeechText = mainContent
      .replace(/[#*_`~>-]/g, " ")
      .replace(/\[(.*?)\]\(.*?\)/g, "$1")
      .trim();

    const utterance = new SpeechSynthesisUtterance(cleanSpeechText);
    utterance.rate = 1.0;
    utterance.onend = () => setIsPlayingAudio(false);
    utterance.onerror = () => setIsPlayingAudio(false);

    setIsPlayingAudio(true);
    window.speechSynthesis.speak(utterance);
  };

  if (isUser) {
    return (
      <div className="flex justify-end my-4">
        <div className="max-w-[85%] sm:max-w-[75%] px-4 py-2.5 rounded-2xl rounded-tr-xs bg-zinc-100 text-zinc-900 border border-zinc-200/50 text-[14.5px] leading-relaxed whitespace-pre-wrap font-normal">
          {message.content}
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-start gap-3.5 my-6 group">
      {/* Assistant Monogram */}
      <div className="w-7 h-7 rounded-lg bg-emerald-800 text-white flex items-center justify-center shrink-0 mt-1 shadow-2xs">
        <GraduationCap className="w-4 h-4" />
      </div>

      <div className="flex-1 min-w-0">
        {/* Markdown Response */}
        <div className="markdown-content text-[15px] text-zinc-900 leading-relaxed overflow-x-auto">
          <ReactMarkdown remarkPlugins={[remarkGfm]}>
            {mainContent}
          </ReactMarkdown>
          {isStreaming && <span className="animate-cursor" />}
        </div>

        {/* Minimal Action Toolbar */}
        {!isStreaming && mainContent && (
          <div className="mt-3 flex items-center justify-between text-zinc-400 text-xs">
            <div className="flex items-center gap-1.5">
              <button
                onClick={handleCopy}
                className="p-1 rounded-md hover:bg-zinc-100 hover:text-zinc-700 transition-colors cursor-pointer flex items-center gap-1 text-[11px]"
                title="Copy response"
              >
                {copied ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-600" />
                    <span className="text-emerald-600">Copied</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    <span>Copy</span>
                  </>
                )}
              </button>

              {"speechSynthesis" in (typeof window !== "undefined" ? window : {}) && (
                <button
                  onClick={handleTextToSpeech}
                  className={`p-1 rounded-md transition-colors cursor-pointer flex items-center gap-1 text-[11px] ${
                    isPlayingAudio
                      ? "text-emerald-700 bg-emerald-50"
                      : "hover:bg-zinc-100 hover:text-zinc-700"
                  }`}
                  title={isPlayingAudio ? "Stop reading" : "Read aloud"}
                >
                  {isPlayingAudio ? (
                    <>
                      <VolumeX className="w-3.5 h-3.5 text-emerald-600" />
                      <span className="text-emerald-600">Stop</span>
                    </>
                  ) : (
                    <>
                      <Volume2 className="w-3.5 h-3.5" />
                      <span>Read</span>
                    </>
                  )}
                </button>
              )}
            </div>

            {/* Helpful thumbs rating */}
            <div className="flex items-center gap-0.5">
              <button
                onClick={() => setFeedback(feedback === "like" ? null : "like")}
                className={`p-1 rounded-md transition-colors cursor-pointer ${
                  feedback === "like"
                    ? "text-emerald-600 bg-emerald-50"
                    : "hover:bg-zinc-100 hover:text-zinc-700"
                }`}
                title="Helpful"
              >
                <ThumbsUp className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={() => setFeedback(feedback === "dislike" ? null : "dislike")}
                className={`p-1 rounded-md transition-colors cursor-pointer ${
                  feedback === "dislike"
                    ? "text-rose-600 bg-rose-50"
                    : "hover:bg-zinc-100 hover:text-zinc-700"
                }`}
                title="Not helpful"
              >
                <ThumbsDown className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        )}

        {/* Suggested Follow-ups */}
        {followUps.length > 0 && (
          <div className="mt-4 pt-2 flex flex-col gap-1.5">
            <span className="text-[11px] font-medium text-zinc-400 flex items-center gap-1">
              <Sparkles className="w-3 h-3 text-emerald-600" />
              Suggested Follow-ups
            </span>
            <div className="flex flex-wrap gap-1.5">
              {followUps.map((question, idx) => (
                <button
                  key={idx}
                  onClick={() => onSelectPrompt(question)}
                  className="text-xs px-3 py-1.5 rounded-full bg-white hover:bg-emerald-50/60 border border-zinc-200/90 hover:border-emerald-300 text-zinc-700 hover:text-emerald-800 transition-all flex items-center gap-1.5 cursor-pointer text-left shadow-2xs group"
                >
                  <span>{question}</span>
                  <ArrowRight className="w-3 h-3 text-zinc-300 group-hover:text-emerald-600 transition-colors shrink-0" />
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
