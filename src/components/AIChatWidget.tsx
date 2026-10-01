"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: string;
}

const INITIAL_MESSAGES: Message[] = [
  {
    id: "welcome",
    role: "assistant",
    content:
      "Hello! 👋 I'm the Sarvopaya AI Assistant. Ask me anything about our growth services, performance marketing, AI automation, or case studies.",
    timestamp: "Just now",
  },
];

const SUGGESTIONS = [
  "What services do you offer?",
  "How does AI automation work?",
  "How do you scale D2C brands?",
  "How can I book a strategy call?",
];

function renderFormattedMessage(text: string) {
  // Simple markdown renderer for bold text, bullet points, and links
  const lines = text.split("\n");

  return lines.map((line, lineIndex) => {
    // Check if line is a bullet item
    const isBullet = line.trim().startsWith("•") || line.trim().startsWith("-");
    const cleanLine = isBullet ? line.trim().substring(1).trim() : line;

    // Parse links [text](url) and bold **text**
    const parts: (string | React.ReactNode)[] = [];
    const linkRegex = /\[([^\]]+)\]\(([^)]+)\)/g;
    let lastIndex = 0;
    let match;

    while ((match = linkRegex.exec(cleanLine)) !== null) {
      if (match.index > lastIndex) {
        parts.push(cleanLine.substring(lastIndex, match.index));
      }
      const linkText = match[1];
      const linkHref = match[2];
      const isInternal = linkHref.startsWith("/");

      parts.push(
        isInternal ? (
          <Link
            key={`link-${lineIndex}-${match.index}`}
            href={linkHref}
            className="font-semibold text-[var(--accent)] underline underline-offset-2 hover:opacity-80 transition-opacity"
          >
            {linkText}
          </Link>
        ) : (
          <a
            key={`link-${lineIndex}-${match.index}`}
            href={linkHref}
            target="_blank"
            rel="noopener noreferrer"
            className="font-semibold text-[var(--accent)] underline underline-offset-2 hover:opacity-80 transition-opacity"
          >
            {linkText}
          </a>
        )
      );
      lastIndex = match.index + match[0].length;
    }

    if (lastIndex < cleanLine.length) {
      parts.push(cleanLine.substring(lastIndex));
    }

    // Process bold within string parts
    const finalParts = parts.map((part, pIdx) => {
      if (typeof part !== "string") return part;
      const boldSegments = part.split(/(\*\*[^*]+\*\*)/g);
      return boldSegments.map((segment, sIdx) => {
        if (segment.startsWith("**") && segment.endsWith("**")) {
          return (
            <strong key={`b-${pIdx}-${sIdx}`} className="font-semibold text-black">
              {segment.slice(2, -2)}
            </strong>
          );
        }
        return segment;
      });
    });

    if (isBullet) {
      return (
        <li key={lineIndex} className="ml-3 list-disc pl-1 text-xs leading-relaxed text-black/80 my-1">
          {finalParts}
        </li>
      );
    }

    if (cleanLine.trim() === "") {
      return <div key={lineIndex} className="h-2" />;
    }

    return (
      <p key={lineIndex} className="text-xs leading-relaxed text-black/80 my-1">
        {finalParts}
      </p>
    );
  });
}

let msgIdCounter = 0;
function nextMsgId(prefix: string) {
  msgIdCounter += 1;
  return `${prefix}-${msgIdCounter}-${Math.random().toString(36).slice(2, 7)}`;
}

export default function AIChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>(INITIAL_MESSAGES);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Restore messages from session storage
  useEffect(() => {
    try {
      const saved = sessionStorage.getItem("sarvopaya_chat_messages");
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          setMessages(parsed);
        }
      }
    } catch {
      // Ignore session storage errors
    }
  }, []);

  // Save messages to session storage
  useEffect(() => {
    if (messages.length > 1) {
      try {
        sessionStorage.setItem("sarvopaya_chat_messages", JSON.stringify(messages));
      } catch {
        // Ignore session storage errors
      }
    }
  }, [messages]);

  // Scroll to bottom on new message
  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, isOpen, isLoading]);

  const sendMessage = async (contentToSend?: string) => {
    const text = (contentToSend || input).trim();
    if (!text || isLoading) return;

    const userMessage: Message = {
      id: nextMsgId("user"),
      role: "user",
      content: text,
      timestamp: "Just now",
    };

    const updatedMessages = [...messages, userMessage];
    setMessages(updatedMessages);
    setInput("");
    setIsLoading(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: updatedMessages.map((m) => ({
            role: m.role,
            content: m.content,
          })),
        }),
      });

      const data = await response.json();
      const reply = data.reply || "Thank you for asking! For a customized walkthrough, please visit our [Contact Page](/contact).";

      const assistantMessage: Message = {
        id: nextMsgId("assistant"),
        role: "assistant",
        content: reply,
        timestamp: "Just now",
      };

      setMessages((prev) => [...prev, assistantMessage]);
    } catch (err) {
      console.error("Chat error:", err);
      const errorMessage: Message = {
        id: nextMsgId("err"),
        role: "assistant",
        content: "Sorry, I had trouble reaching our service. Please try again or reach us directly at [jay.sarvopaya@gmail.com](mailto:jay.sarvopaya@gmail.com).",
        timestamp: "Just now",
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const clearChat = () => {
    setMessages(INITIAL_MESSAGES);
    try {
      sessionStorage.removeItem("sarvopaya_chat_messages");
    } catch {}
  };

  return (
    <>
      {/* ── Floating Launcher Button (positioned above WhatsApp) ── */}
      <div className="fixed bottom-24 right-6 z-50">
        <motion.button
          type="button"
          onClick={() => setIsOpen((prev) => !prev)}
          aria-label={isOpen ? "Close AI chat" : "Ask Sarvopaya AI Assistant"}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className={`group relative flex h-14 w-14 items-center justify-center rounded-full shadow-2xl transition-all duration-300 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-black/20 ${
            isOpen
              ? "bg-black text-white"
              : "bg-black text-white hover:bg-neutral-900"
          }`}
        >
          {/* Active status pulse */}
          <span
            aria-hidden="true"
            className="absolute -right-0.5 -top-0.5 flex h-3.5 w-3.5"
          >
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[var(--accent)] opacity-75" />
            <span className="relative inline-flex h-3.5 w-3.5 rounded-full border-2 border-white bg-[var(--accent)]" />
          </span>

          {isOpen ? (
            <svg
              className="h-6 w-6 transition-transform duration-200 group-hover:rotate-90"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2.5"
            >
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          ) : (
            <div className="flex flex-col items-center justify-center">
              <svg
                className="h-6 w-6 text-white"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M12 8V4H8" />
                <rect width="16" height="12" x="4" y="8" rx="2" />
                <path d="M2 14h2" />
                <path d="M20 14h2" />
                <path d="M15 13v2" />
                <path d="M9 13v2" />
              </svg>
              <span className="text-[9px] font-extrabold tracking-tighter text-[var(--accent)]">
                AI
              </span>
            </div>
          )}

          {/* Hover Tooltip when closed */}
          {!isOpen && (
            <span className="pointer-events-none absolute right-16 top-1/2 -translate-y-1/2 whitespace-nowrap rounded-lg bg-black px-2.5 py-1 text-[11px] font-bold text-white opacity-0 shadow-lg transition-opacity duration-200 group-hover:opacity-100">
              Ask Sarvopaya AI
            </span>
          )}
        </motion.button>
      </div>

      {/* ── Chat Modal Window ── */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 15, scale: 0.96 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="fixed bottom-24 right-4 sm:right-6 z-50 flex h-[540px] max-h-[calc(100vh-8rem)] w-[calc(100vw-2rem)] sm:w-[380px] flex-col overflow-hidden rounded-3xl border border-black/10 bg-white shadow-2xl"
          >
            {/* ── Modal Header ── */}
            <div className="flex items-center justify-between border-b border-black/8 bg-black px-4 py-3.5 text-white">
              <div className="flex items-center gap-2.5">
                <div className="relative flex h-8 w-8 items-center justify-center rounded-xl bg-white/10 text-[var(--accent)] font-bold text-xs">
                  AI
                  <span className="absolute -bottom-0.5 -right-0.5 h-2 w-2 rounded-full border border-black bg-emerald-400" />
                </div>
                <div>
                  <div className="flex items-center gap-1.5">
                    <h3 className="font-heading text-xs font-bold tracking-wide">
                      Sarvopaya AI
                    </h3>
                    <span className="text-[10px] text-emerald-400 font-semibold">• Online</span>
                  </div>
                  <p className="text-[10px] text-white/50">
                    Real-time services & growth answers
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-1">
                {messages.length > 1 && (
                  <button
                    type="button"
                    onClick={clearChat}
                    title="Clear chat"
                    className="rounded-lg p-1.5 text-white/60 hover:bg-white/10 hover:text-white transition-colors text-[11px]"
                  >
                    Clear
                  </button>
                )}
                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  aria-label="Close chat"
                  className="rounded-lg p-1.5 text-white/70 hover:bg-white/10 hover:text-white transition-colors"
                >
                  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <line x1="18" y1="6" x2="6" y2="18" strokeWidth="2.5" />
                    <line x1="6" y1="6" x2="18" y2="18" strokeWidth="2.5" />
                  </svg>
                </button>
              </div>
            </div>

            {/* ── Messages Scroll Area ── */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3.5 bg-neutral-50/50">
              {messages.map((message) => {
                const isUser = message.role === "user";
                return (
                  <div
                    key={message.id}
                    className={`flex flex-col ${isUser ? "items-end" : "items-start"}`}
                  >
                    <div
                      className={`max-w-[85%] rounded-2xl px-3.5 py-2.5 text-xs shadow-sm ${
                        isUser
                          ? "bg-black text-white rounded-br-xs"
                          : "bg-white text-black border border-black/8 rounded-bl-xs"
                      }`}
                    >
                      {isUser ? (
                        <p className="leading-relaxed">{message.content}</p>
                      ) : (
                        <div className="prose-xs">{renderFormattedMessage(message.content)}</div>
                      )}
                    </div>
                    <span className="mt-1 px-1 text-[9px] text-black/35 font-medium">
                      {message.timestamp}
                    </span>
                  </div>
                );
              })}

              {/* Typing indicator */}
              {isLoading && (
                <div className="flex items-center gap-1.5 rounded-2xl rounded-bl-xs border border-black/8 bg-white px-3 py-2 text-xs w-fit shadow-sm">
                  <span className="h-1.5 w-1.5 rounded-full bg-[var(--accent)] animate-bounce" />
                  <span
                    className="h-1.5 w-1.5 rounded-full bg-[var(--accent)] animate-bounce"
                    style={{ animationDelay: "0.15s" }}
                  />
                  <span
                    className="h-1.5 w-1.5 rounded-full bg-[var(--accent)] animate-bounce"
                    style={{ animationDelay: "0.3s" }}
                  />
                  <span className="ml-1 text-[10px] text-black/40 font-medium">Thinking...</span>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* ── Quick Suggestions (shown when minimal interaction) ── */}
            {messages.length <= 2 && !isLoading && (
              <div className="border-t border-black/6 bg-white px-3 py-2">
                <p className="text-[10px] font-bold text-black/40 mb-1.5 uppercase tracking-wider">
                  Suggested Questions
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {SUGGESTIONS.map((s) => (
                    <button
                      key={s}
                      type="button"
                      onClick={() => sendMessage(s)}
                      className="rounded-full border border-black/10 bg-black/[0.02] px-2.5 py-1 text-[10px] font-semibold text-black/70 hover:border-black/25 hover:bg-black/5 hover:text-black transition-colors text-left"
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* ── Chat Input ── */}
            <div className="border-t border-black/8 bg-white p-3">
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  sendMessage();
                }}
                className="flex items-center gap-2"
              >
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="Ask about our services, pricing, SEO..."
                  disabled={isLoading}
                  className="flex-1 rounded-full border border-black/15 bg-black/[0.02] px-3.5 py-2 text-xs text-black placeholder:text-black/40 outline-none transition-colors focus:border-black/40 focus:bg-white disabled:opacity-50"
                />
                <button
                  type="submit"
                  disabled={!input.trim() || isLoading}
                  aria-label="Send message"
                  className="flex h-8 w-8 items-center justify-center rounded-full bg-black text-white transition-all hover:bg-[var(--accent)] disabled:opacity-40 disabled:hover:bg-black shrink-0"
                >
                  <svg
                    className="h-3.5 w-3.5 rotate-90"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth="2.5"
                  >
                    <path d="M12 19V5M5 12l7-7 7 7" />
                  </svg>
                </button>
              </form>

              {/* Bottom discovery link */}
              <div className="mt-2 flex items-center justify-between text-[10px] text-black/40 px-1">
                <span>Powered by Sarvopaya AI</span>
                <Link
                  href="/contact"
                  onClick={() => setIsOpen(false)}
                  className="font-bold text-[var(--accent)] hover:underline"
                >
                  Book 30-min Call →
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
