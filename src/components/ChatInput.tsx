"use client";

import React, { useState, useRef, useEffect } from "react";
import { ArrowUp, Square, Mic, MicOff, Sparkles } from "lucide-react";

interface ChatInputProps {
  onSendMessage: (content: string) => void;
  onStopStreaming: () => void;
  isStreaming: boolean;
  disabled?: boolean;
}

export const ChatInput: React.FC<ChatInputProps> = ({
  onSendMessage,
  onStopStreaming,
  isStreaming,
  disabled = false,
}) => {
  const [input, setInput] = useState("");
  const [isListening, setIsListening] = useState(false);
  const [hasSpeechSupport, setHasSpeechSupport] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const recognitionRef = useRef<any>(null);

  // Auto-resize textarea smoothly
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${Math.min(
        textareaRef.current.scrollHeight,
        180
      )}px`;
    }
  }, [input]);

  // Speech Recognition Setup after mount
  useEffect(() => {
    const SpeechRecognition =
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;

    if (SpeechRecognition) {
      setHasSpeechSupport(true);
      const recognition = new SpeechRecognition();
      recognition.continuous = false;
      recognition.interimResults = true;
      recognition.lang = "en-US";

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      recognition.onresult = (event: any) => {
        let transcript = "";
        for (let i = event.resultIndex; i < event.results.length; i++) {
          transcript += event.results[i][0].transcript;
        }
        setInput((prev) => (prev ? `${prev} ${transcript}` : transcript));
      };

      recognition.onerror = () => setIsListening(false);
      recognition.onend = () => setIsListening(false);
      recognitionRef.current = recognition;
    }
  }, []);

  const toggleSpeech = () => {
    if (!recognitionRef.current) return;

    if (isListening) {
      recognitionRef.current.stop();
      setIsListening(false);
    } else {
      try {
        recognitionRef.current.start();
        setIsListening(true);
      } catch (err) {
        console.error("Speech start error:", err);
      }
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleSend = () => {
    const trimmed = input.trim();
    if (!trimmed || isStreaming || disabled) return;
    onSendMessage(trimmed);
    setInput("");
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
    }
  };

  return (
    <div className="w-full max-w-3xl mx-auto px-4 pb-3">
      {/* Floating Claude / ChatGPT style input container */}
      <div className="relative rounded-3xl bg-zinc-50/90 hover:bg-zinc-50 focus-within:bg-white border border-zinc-200/90 focus-within:border-zinc-300 focus-within:ring-3 focus-within:ring-zinc-100/80 transition-all p-2 pl-4 flex items-end gap-2 shadow-[0_2px_12px_rgba(0,0,0,0.03)]">
        <textarea
          ref={textareaRef}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Ask a question about ND, HND, cut-off marks, Remita fees..."
          rows={1}
          disabled={disabled}
          className="w-full resize-none bg-transparent text-[14.5px] text-zinc-900 placeholder:text-zinc-400 focus:outline-hidden max-h-44 py-2 leading-relaxed"
        />

        <div className="flex items-center gap-1.5 shrink-0 pb-1">
          {/* Voice Input */}
          {hasSpeechSupport && (
            <button
              type="button"
              onClick={toggleSpeech}
              className={`p-2 rounded-full transition-all cursor-pointer ${
                isListening
                  ? "bg-rose-100 text-rose-600 animate-pulse ring-2 ring-rose-200"
                  : "text-zinc-400 hover:text-zinc-700 hover:bg-zinc-200/60"
              }`}
              title={isListening ? "Listening... click to stop" : "Voice input"}
            >
              {isListening ? (
                <MicOff className="w-4 h-4" />
              ) : (
                <Mic className="w-4 h-4" />
              )}
            </button>
          )}

          {/* Send / Stop button */}
          {isStreaming ? (
            <button
              type="button"
              onClick={onStopStreaming}
              className="w-8 h-8 rounded-full bg-zinc-900 text-white flex items-center justify-center hover:bg-zinc-800 transition-colors cursor-pointer shadow-xs"
              title="Stop generating"
            >
              <Square className="w-3.5 h-3.5 fill-white" />
            </button>
          ) : (
            <button
              type="button"
              onClick={handleSend}
              disabled={!input.trim() || disabled}
              className={`w-8 h-8 rounded-full flex items-center justify-center transition-all cursor-pointer ${
                input.trim() && !disabled
                  ? "bg-emerald-800 text-white hover:bg-emerald-900 shadow-xs"
                  : "bg-zinc-200 text-zinc-400 cursor-not-allowed"
              }`}
              title="Send message"
            >
              <ArrowUp className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>

      {/* Institutional Microcopy Disclaimer */}
      <p className="mt-2 text-center text-[11px] text-zinc-400 font-normal">
        FCAHPTVom Academic AI Advisor can make mistakes. Verify official screening and fee notices on the college portal.
      </p>
    </div>
  );
};
