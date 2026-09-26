import React, { useState } from "react";
import { askInvestigatorAssistant } from "../../lib/api";
import { Sparkles, Send, Bot, User, Loader2, Lightbulb } from "lucide-react";

interface AiInvestigatorChatProps {
  caseId: string;
}

interface ChatMessage {
  id: string;
  sender: "USER" | "ASSISTANT";
  text: string;
  timestamp: string;
}

export const AiInvestigatorChat: React.FC<AiInvestigatorChatProps> = ({ caseId }) => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: "init",
      sender: "ASSISTANT",
      text: "I am your AI Forensic Investigator assistant. I have reviewed the visual exhibits, OCR data, and cross-evidence matrix. Ask me to break down any suspicious findings or draft findings for your report.",
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    },
  ]);
  const [inputText, setInputText] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const quickPrompts = [
    "Explain key visual inconsistencies",
    "Analyze merchant and amount divergence",
    "Recommend immediate fraud mitigation steps",
    "Draft formal executive summary",
  ];

  const handleSend = async (questionText?: string) => {
    const query = questionText || inputText;
    if (!query.trim() || isLoading) return;

    const userMsg: ChatMessage = {
      id: `user-${Date.now()}`,
      sender: "USER",
      text: query,
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputText("");
    setIsLoading(true);

    try {
      const response = await askInvestigatorAssistant(caseId, query);
      const assistantMsg: ChatMessage = {
        id: `ai-${Date.now()}`,
        sender: "ASSISTANT",
        text: response.answer,
        timestamp: new Date(response.timestamp).toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
      };
      setMessages((prev) => [...prev, assistantMsg]);
    } catch (err: any) {
      const errorMsg: ChatMessage = {
        id: `err-${Date.now()}`,
        sender: "ASSISTANT",
        text: err?.message || "Could not query investigator copilot. Please verify your connection or try again.",
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      };
      setMessages((prev) => [...prev, errorMsg]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-[520px] rounded-xl border border-slate-200 bg-white shadow-xs overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-slate-200 bg-slate-900 px-4 py-3 text-white">
        <div className="flex items-center gap-2">
          <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-blue-600 text-white">
            <Sparkles className="h-4 w-4" />
          </div>
          <div>
            <h4 className="text-xs font-bold tracking-wide">AI Forensic Copilot</h4>
            <p className="text-[10px] text-slate-400">Grounded in case exhibits and OCR facts</p>
          </div>
        </div>
        <span className="rounded bg-slate-800 px-2 py-0.5 text-[10px] font-mono text-emerald-400">
          CASE #{caseId}
        </span>
      </div>

      {/* Messages Scroll Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3.5 bg-slate-50/50">
        {messages.map((m) => {
          const isUser = m.sender === "USER";
          return (
            <div
              key={m.id}
              className={`flex items-start gap-2.5 ${isUser ? "flex-row-reverse" : "flex-row"}`}
            >
              <div
                className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-xs font-bold ${
                  isUser ? "bg-blue-600 text-white" : "bg-slate-800 text-white"
                }`}
              >
                {isUser ? <User className="h-4 w-4" /> : <Bot className="h-4 w-4" />}
              </div>

              <div
                className={`flex flex-col max-w-[85%] rounded-xl px-3.5 py-2.5 text-xs shadow-xs ${
                  isUser
                    ? "bg-blue-600 text-white rounded-tr-none"
                    : "bg-white text-slate-800 border border-slate-200 rounded-tl-none"
                }`}
              >
                {!isUser && (
                  <span className="mb-1.5 inline-flex items-center gap-1 text-[9px] font-bold tracking-wider text-slate-400 uppercase">
                    <Sparkles className="h-3 w-3" /> AI-Generated Response
                  </span>
                )}
                <div className="whitespace-pre-wrap leading-relaxed">{m.text}</div>
                <span
                  className={`mt-1 text-[10px] self-end font-mono ${
                    isUser ? "text-blue-200" : "text-slate-400"
                  }`}
                >
                  {m.timestamp}
                </span>
              </div>
            </div>
          );
        })}

        {isLoading && (
          <div className="flex items-center gap-2 text-xs text-slate-500 italic py-1">
            <Loader2 className="h-4 w-4 animate-spin text-blue-600" />
            <span>Analyzing evidence corpus...</span>
          </div>
        )}
      </div>

      {/* Quick Prompts */}
      <div className="border-t border-slate-100 bg-white px-3 py-2 flex items-center gap-1.5 overflow-x-auto no-scrollbar">
        <Lightbulb className="h-3.5 w-3.5 text-amber-500 shrink-0" />
        {quickPrompts.map((prompt, idx) => (
          <button
            key={idx}
            type="button"
            onClick={() => handleSend(prompt)}
            disabled={isLoading}
            className="rounded-full border border-slate-200 bg-slate-50 px-2.5 py-1 text-[11px] font-medium text-slate-700 hover:bg-slate-100 hover:text-slate-900 whitespace-nowrap transition disabled:opacity-50"
          >
            {prompt}
          </button>
        ))}
      </div>

      {/* Input Box */}
      <div className="border-t border-slate-200 bg-white p-3">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSend();
          }}
          className="flex items-center gap-2"
        >
          <input
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder="Ask about font anomalies, amount mismatches, or next steps..."
            disabled={isLoading}
            className="flex-1 rounded-lg border border-slate-200 px-3 py-2 text-xs text-slate-900 placeholder-slate-400 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 disabled:bg-slate-50"
          />
          <button
            type="submit"
            disabled={!inputText.trim() || isLoading}
            className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-40 transition shrink-0"
          >
            <Send className="h-3.5 w-3.5" />
          </button>
        </form>
      </div>
    </div>
  );
};
