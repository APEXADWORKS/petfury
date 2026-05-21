import React, { useState, useRef, useEffect } from "react";
import { Sparkles, Send, RefreshCw, AlertTriangle, MessageSquare, HeartHandshake } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

interface Message {
  role: "user" | "model";
  text: string;
}

export function AiCoachWidget() {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "model",
      text: "Hello! I am Dr. Amelia, your AI Pet Care Guide and Wellness Coach. How can I assist you with your companion's diet, physical conditioning, behavior correction, or obedience training today?",
    },
  ]);
  const [inputMessage, setInputMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [errorStatus, setErrorStatus] = useState<string | null>(null);

  const listScrollRef = useRef<HTMLDivElement>(null);

  // Auto-scroll on new message insertion
  useEffect(() => {
    listScrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isLoading]);

  const presetTemplates = [
    {
      label: "Commands Recall Plan",
      prompt: "Give me a step-by-step 4-week training schedule to teach a 4-month-old puppy the perfect 'Come' command.",
    },
    {
      label: "Cat scratched sofa fix",
      prompt: "Help! My tabby cat won't stop scratching the side of my sofa. What is the physical redirection playbook to solve this?",
    },
    {
      label: "Diarrhea/Symptom triage",
      prompt: "My 3-year-old dog has mild diarrhea but is still energetic and drinking water. What immediate home safety and diet adjustments are recommended?",
    },
  ];

  const handleSendMessage = async (textToSend: string) => {
    if (!textToSend.trim() || isLoading) return;

    setErrorStatus(null);
    const userMsg: Message = { role: "user", text: textToSend };
    setMessages((prev) => [...prev, userMsg]);
    setInputMessage("");
    setIsLoading(true);

    try {
      const response = await fetch("/api/pet-coach", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: textToSend,
          history: messages, // Send session context
        }),
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || "Server issue resolving Gemini response.");
      }

      setMessages((prev) => [...prev, { role: "model", text: data.text }]);
    } catch (err: any) {
      console.error("AI Coach Widget Error:", err);
      setErrorStatus(err.message || "Failed to reach Dr. Amelia. Please check connection.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleClearChat = () => {
    setMessages([
      {
        role: "model",
        text: "Reset complete. Hello! I am Dr. Amelia, your AI Pet Care Guide. What diagnostics or training drills would you like to prepare now?",
      },
    ]);
    setErrorStatus(null);
  };

  return (
    <div
      className="bg-neutral-900 rounded-3xl border border-neutral-800 text-white shadow-xl overflow-hidden flex flex-col h-[600px]"
      id="ai-coach-widget"
    >
      {/* Dynamic Header */}
      <div className="p-5 border-b border-neutral-800 bg-neutral-950 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-blue-500/15 border border-blue-500/30 flex items-center justify-center">
            <Sparkles className="w-5 h-5 text-blue-500" />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <h3 className="font-bold tracking-tight text-sm font-sans text-neutral-100">
                AI CO-PILOT • Dr. Amelia
              </h3>
              <span className="h-1.5 w-1.5 bg-emerald-500 rounded-full animate-ping" />
            </div>
            <p className="text-[10px] text-neutral-400 font-mono tracking-wider uppercase">
              Veterinary &amp; Obedience Coach
            </p>
          </div>
        </div>

        <button
          onClick={handleClearChat}
          className="p-2 hover:bg-neutral-800 text-neutral-400 hover:text-white rounded-xl transition"
          title="Reset Coaching Context"
          id="ai-coach-btn-clear"
        >
          <RefreshCw className="w-4 h-4" />
        </button>
      </div>

      {/* Safety Info Banner */}
      <div className="px-5 py-2.5 bg-blue-500/10 border-b border-blue-500/20 text-xxs text-blue-200/80 font-sans flex items-start gap-2">
        <AlertTriangle className="w-4 h-4 text-blue-500 shrink-0 mt-0.5" />
        <p>
          <strong>Clinical Disclaimer:</strong> Dr. Amelia provides professional educational guidance on behaviors, diets, and training. For red-flag emergencies (breathing distress, toxic ingestion, trauma), transport your animal instantly to an emergency vet.
        </p>
      </div>

      {/* Messages Container Area */}
      <div className="flex-1 p-5 overflow-y-auto space-y-4 bg-neutral-950/40">
        <AnimatePresence initial={false}>
          {messages.map((msg, index) => {
            const isUser = msg.role === "user";
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.2 }}
                className={`flex ${isUser ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-[85%] rounded-2xl px-4 py-3 text-xs leading-relaxed ${
                    isUser
                      ? "bg-blue-600 text-white rounded-tr-none"
                      : "bg-neutral-800 border border-neutral-700/50 text-neutral-200 rounded-tl-none whitespace-pre-wrap"
                  }`}
                >
                  {/* Persona Indicator icon */}
                  {!isUser && (
                    <div className="flex items-center gap-1 mb-1.5 text-[9px] uppercase tracking-widest text-blue-500 font-bold font-mono">
                      <HeartHandshake className="w-3.5 h-3.5" /> DR. AMELIA
                    </div>
                  )}
                  <p className="font-sans whitespace-pre-line">{msg.text}</p>
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>

        {isLoading && (
          <div className="flex justify-start">
            <div className="bg-neutral-800 border border-neutral-700/50 text-neutral-200 rounded-2xl rounded-tl-none px-4 py-3 text-xs flex items-center gap-2">
              <span className="text-[10px] text-neutral-400 font-mono">Formulating advice...</span>
              <div className="flex gap-1">
                <span className="w-1.5 h-1.5 bg-blue-500 rounded-full animate-bounce delay-100" />
                <span className="w-1.5 h-1.5 bg-blue-500 rounded-full animate-bounce delay-200" />
                <span className="w-1.5 h-1.5 bg-blue-500 rounded-full animate-bounce delay-300" />
              </div>
            </div>
          </div>
        )}

        {errorStatus && (
          <div className="p-3 bg-red-950/50 border border-red-900/50 text-red-200 rounded-xl text-xxs font-mono flex items-center gap-2">
            <span>⚠️ {errorStatus}</span>
          </div>
        )}

        <div ref={listScrollRef} />
      </div>

      {/* Preset Starters Panel */}
      <div className="p-4 bg-neutral-900 border-t border-neutral-800 space-y-2 shrink-0">
        <p className="text-[10px] text-neutral-400 uppercase tracking-wider font-semibold font-mono">
          Or Select a Companion Training preset:
        </p>
        <div className="flex flex-wrap gap-2">
          {presetTemplates.map((tpl, i) => (
            <button
              key={i}
              onClick={() => handleSendMessage(tpl.prompt)}
              disabled={isLoading}
              className="text-xxs px-3 py-1.5 rounded-lg bg-neutral-800 border border-neutral-700 text-neutral-300 hover:text-white hover:bg-neutral-700/80 disabled:opacity-50 transition font-sans text-left"
            >
              {tpl.label}
            </button>
          ))}
        </div>
      </div>

      {/* Chat Input row */}
      <div className="p-4 bg-neutral-950 border-t border-neutral-800 shrink-0">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSendMessage(inputMessage);
          }}
          className="flex gap-2"
        >
          <input
            id="ai-coach-input-field"
            type="text"
            className="flex-1 px-4 py-2 bg-neutral-900 border border-neutral-800 focus:border-blue-500 rounded-xl text-xs text-white placeholder-neutral-500 focus:outline-none transition"
            placeholder="Ask Dr. Amelia about training, allergy formulas, behaviors..."
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            disabled={isLoading}
          />
          <button
            id="ai-coach-btn-send"
            type="submit"
            disabled={!inputMessage.trim() || isLoading}
            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 disabled:bg-neutral-800 disabled:text-neutral-500 text-white rounded-xl transition text-xs font-semibold flex items-center gap-1.5 shrink-0"
          >
            <Send className="w-3.5 h-3.5" /> Ask
          </button>
        </form>
      </div>
    </div>
  );
}
