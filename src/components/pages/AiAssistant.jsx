// src/components/AiAssistant.jsx
import { useRef, useEffect } from "react";
import { useChat } from "../Hooks/useChat";
import { useApp } from "../contexts/AppContext";

export default function AiAssistant() {
  const {
    messages,
    input,
    setInput,
    sendMessage,
    loading,
    clearHistory,
    error,
  } = useChat();
  const { theme } = useApp();
  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <div>
      <h2 className="font-semibold text-2xl text-slate-800">Assistant</h2>
      <p className="text-slate-800">Welcome back !</p>
      <div className="min-h-screen flex items-center justify-center">
        <div className="flex flex-col w-full max-w-2xl mx-auto border border-slate-200 rounded-xl overflow-hidden">
          <div className="flex flex-col my-auto w-full max-w-2xl mx-auto border border-slate-200 rounded-xl overflow-hidden">
            {/* Header */}
            <div className="flex justify-between items-center px-4 py-3 border-b border-slate-200">
              <button
                onClick={clearHistory}
                className="text-xs text-slate-400 hover:text-red-500 transition"
              >
                Clear history
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto px-4 py-4 space-y-3">
              {messages.length === 0 && (
                <p className="text-center text-slate-400 text-sm mt-10">
                  Start a conversation
                </p>
              )}
              {messages.map((msg, i) => (
                <div
                  key={i}
                  className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`max-w-[75%] px-4 py-2.5 rounded-2xl text-sm leading-relaxed ${
                      msg.role === "user"
                        ? "bg-blue-600 text-white rounded-br-sm"
                        : "bg-white border border-slate-200 text-slate-800 rounded-bl-sm"
                    }`}
                  >
                    {msg.content}
                  </div>
                </div>
              ))}
              {loading && (
                <div className="flex justify-start">
                  <div className="px-4 py-2.5 rounded-2xl rounded-bl-sm text-sm bg-white border border-slate-200 text-slate-400">
                    Thinking...
                  </div>
                </div>
              )}
              <div ref={bottomRef} />
            </div>

            {/* Error */}
            {error && (
              <div className="px-4 py-2 border-t bg-red-50 border-red-100">
                <p className="text-xs text-red-400">{error}</p>
              </div>
            )}

            {/* Input */}
            <div className="px-4 py-3 border-t border-slate-200 flex gap-2 items-end">
              <textarea
                rows={1}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Type a message..."
                className="flex-1 resize-none text-sm border border-slate-200 rounded-xl px-3 py-2 outline-none focus:ring-2 focus:ring-blue-500 text-slate-800 placeholder-slate-400"
              />
              <button
                onClick={sendMessage}
                disabled={loading || !input.trim()}
                className="px-3 py-2 bg-blue-600 text-white text-sm rounded-xl disabled:opacity-40 hover:bg-blue-700 transition"
              >
                &uarr;
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
