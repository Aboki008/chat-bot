"use client";

import React, { useState, useEffect, useRef } from "react";
import { Header } from "@/components/Header";
import { SideNav } from "@/components/SideNav";
import { ChatMessage } from "@/components/ChatMessage";
import { ChatInput } from "@/components/ChatInput";
import { EmptyState } from "@/components/EmptyState";
import { ApiKeyModal } from "@/components/ApiKeyModal";
import { Message } from "@/types/chat";
import { ArrowDown, AlertCircle } from "lucide-react";

export default function Home() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isStreaming, setIsStreaming] = useState(false);
  const [apiKey, setApiKey] = useState("");
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isSideNavOpen, setIsSideNavOpen] = useState(true);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [showScrollBottom, setShowScrollBottom] = useState(false);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const chatContainerRef = useRef<HTMLDivElement>(null);
  const abortControllerRef = useRef<AbortController | null>(null);

  // Load preferences from localStorage on mount & check screen width
  useEffect(() => {
    try {
      const storedKey = localStorage.getItem("groq_api_key");
      if (storedKey) setApiKey(storedKey);

      const storedMessages = localStorage.getItem("fcahptvom_chat_session");
      if (storedMessages) {
        setMessages(JSON.parse(storedMessages));
      }

      // Default sidebar closed on small screens
      if (typeof window !== "undefined" && window.innerWidth < 1024) {
        setIsSideNavOpen(false);
      }
    } catch (e) {
      console.error("Error reading localStorage:", e);
    }
  }, []);

  // Keyboard shortcut ⌘N or Ctrl+N for new chat
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "n") {
        e.preventDefault();
        handleNewChat();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  // Save session to localStorage
  useEffect(() => {
    try {
      if (messages.length > 0) {
        localStorage.setItem("fcahptvom_chat_session", JSON.stringify(messages));
      } else {
        localStorage.removeItem("fcahptvom_chat_session");
      }
    } catch (e) {
      console.error("Error saving session:", e);
    }
  }, [messages]);

  // Handle scroll detection
  const handleScroll = () => {
    if (!chatContainerRef.current) return;
    const { scrollTop, scrollHeight, clientHeight } = chatContainerRef.current;
    const distanceToBottom = scrollHeight - scrollTop - clientHeight;
    setShowScrollBottom(distanceToBottom > 160);
  };

  const scrollToBottom = (behavior: ScrollBehavior = "smooth") => {
    messagesEndRef.current?.scrollIntoView({ behavior });
  };

  useEffect(() => {
    if (isStreaming) {
      scrollToBottom("auto");
    }
  }, [messages, isStreaming]);

  // Save API key
  const handleSaveApiKey = (key: string) => {
    setApiKey(key);
    localStorage.setItem("groq_api_key", key);
    setErrorMessage(null);
  };

  // Reset / Clear chat
  const handleNewChat = () => {
    if (isStreaming && abortControllerRef.current) {
      abortControllerRef.current.abort();
    }
    setMessages([]);
    localStorage.removeItem("fcahptvom_chat_session");
    setErrorMessage(null);
    setIsStreaming(false);
  };

  // Stop generation
  const handleStopStreaming = () => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
      abortControllerRef.current = null;
    }
    setIsStreaming(false);
  };

  // Send message & stream response
  const handleSendMessage = async (content: string) => {
    if (!content.trim() || isStreaming) return;

    setErrorMessage(null);

    const userMessage: Message = {
      id: `user-${Date.now()}`,
      role: "user",
      content,
      timestamp: Date.now(),
    };

    const assistantPlaceholderId = `assistant-${Date.now()}`;
    const assistantMessage: Message = {
      id: assistantPlaceholderId,
      role: "assistant",
      content: "",
      timestamp: Date.now(),
    };

    const newMessages = [...messages, userMessage];
    setMessages([...newMessages, assistantMessage]);
    setIsStreaming(true);

    const controller = new AbortController();
    abortControllerRef.current = controller;

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...(apiKey ? { "x-groq-key": apiKey } : {}),
        },
        body: JSON.stringify({
          messages: newMessages.map((m) => ({
            role: m.role,
            content: m.content,
          })),
          apiKey: apiKey || undefined,
        }),
        signal: controller.signal,
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        if (response.status === 401 && errorData.needsKey) {
          setIsSettingsOpen(true);
          throw new Error("Please enter your API Key to enable realtime chat.");
        }
        throw new Error(
          errorData.error || `Request failed with status ${response.status}`
        );
      }

      if (!response.body) {
        throw new Error("No response body received from server.");
      }

      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let accumulatedContent = "";

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        const chunk = decoder.decode(value, { stream: true });
        accumulatedContent += chunk;

        setMessages((prev) =>
          prev.map((msg) =>
            msg.id === assistantPlaceholderId
              ? { ...msg, content: accumulatedContent }
              : msg
          )
        );
      }
    } catch (error: unknown) {
      if (error instanceof Error && error.name === "AbortError") {
        console.log("Streaming stopped.");
      } else {
        const messageText =
          error instanceof Error
            ? error.message
            : "An unexpected error occurred while communicating with the server.";
        setErrorMessage(messageText);
        setMessages((prev) =>
          prev.map((msg) =>
            msg.id === assistantPlaceholderId
              ? {
                  ...msg,
                  content:
                    msg.content ||
                    `*${messageText}* Click the settings icon in the top right to configure your API key.`,
                }
              : msg
          )
        );
      }
    } finally {
      setIsStreaming(false);
      abortControllerRef.current = null;
    }
  };

  return (
    <div className="flex h-screen bg-white text-zinc-900 overflow-hidden font-sans">
      {/* Side Nav for Quick Ask */}
      <SideNav
        isOpen={isSideNavOpen}
        onToggle={() => setIsSideNavOpen((prev) => !prev)}
        onSelectPrompt={handleSendMessage}
        onNewChat={handleNewChat}
      />

      {/* Main Chat Column */}
      <div className="flex-1 flex flex-col h-full min-w-0 bg-white">
        {/* Header */}
        <Header
          onToggleSideNav={() => setIsSideNavOpen((prev) => !prev)}
          isSideNavOpen={isSideNavOpen}
          onNewChat={handleNewChat}
          onOpenSettings={() => setIsSettingsOpen(true)}
          hasCustomKey={!!apiKey}
        />

        {/* Conversation Viewport */}
        <div
          ref={chatContainerRef}
          onScroll={handleScroll}
          className="flex-1 overflow-y-auto px-4"
        >
          <div className="max-w-3xl mx-auto min-h-full flex flex-col justify-between pt-4 pb-2">
            {/* Error Notification */}
            {errorMessage && (
              <div className="mb-4 p-3.5 rounded-2xl bg-zinc-50 border border-zinc-200 text-zinc-700 flex items-center justify-between text-xs shadow-2xs">
                <div className="flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 text-emerald-700 shrink-0" />
                  <span>{errorMessage}</span>
                </div>
                <button
                  onClick={() => setIsSettingsOpen(true)}
                  className="font-semibold text-emerald-800 hover:underline cursor-pointer ml-2 shrink-0"
                >
                  Configure Key
                </button>
              </div>
            )}

            {/* Empty State or Messages Feed */}
            {messages.length === 0 ? (
              <EmptyState onSelectPrompt={handleSendMessage} />
            ) : (
              <div className="flex-1 pb-6">
                {messages.map((message, index) => (
                  <ChatMessage
                    key={message.id}
                    message={message}
                    isStreaming={isStreaming && index === messages.length - 1}
                    onSelectPrompt={handleSendMessage}
                  />
                ))}
                <div ref={messagesEndRef} />
              </div>
            )}
          </div>
        </div>

        {/* Floating Scroll to Bottom Button */}
        {showScrollBottom && (
          <button
            onClick={() => scrollToBottom("smooth")}
            className="fixed bottom-24 right-6 sm:right-1/2 sm:translate-x-44 z-20 w-8 h-8 rounded-full bg-white border border-zinc-200 text-zinc-700 shadow-md hover:bg-zinc-50 transition-all cursor-pointer flex items-center justify-center"
            title="Scroll to latest response"
          >
            <ArrowDown className="w-4 h-4" />
          </button>
        )}

        {/* Bottom Input Dock */}
        <div className="shrink-0 bg-white">
          <ChatInput
            onSendMessage={handleSendMessage}
            onStopStreaming={handleStopStreaming}
            isStreaming={isStreaming}
          />
        </div>
      </div>

      {/* Settings Modal */}
      <ApiKeyModal
        isOpen={isSettingsOpen}
        onClose={() => setIsSettingsOpen(false)}
        apiKey={apiKey}
        onSave={handleSaveApiKey}
      />
    </div>
  );
}
