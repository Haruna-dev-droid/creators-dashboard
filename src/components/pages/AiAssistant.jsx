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
    // <div>
    //   <h2 className="font-semibold text-2xl text-slate-800">Assistant</h2>
    //   <p className="text-slate-800">Welcome back !</p>
    //   <div className="min-h-screen flex items-center justify-center">
    //     <div className="flex flex-col w-full max-w-2xl mx-auto border border-slate-200 rounded-xl overflow-hidden">
    //       <div className="flex flex-col my-auto w-full max-w-2xl mx-auto border border-slate-200 rounded-xl overflow-hidden">
    //         {/* Header */}
    //         <div className="flex justify-between items-center px-4 py-3 border-b border-slate-200">
    //           <button
    //             onClick={clearHistory}
    //             className="text-xs text-slate-400 hover:text-red-500 transition"
    //           >
    //             Clear history
    //           </button>
    //         </div>

    //         {/* Messages */}
    //         <div className="flex-1 overflow-y-auto px-4 py-4 space-y-3">
    //           {messages.length === 0 && (
    //             <p className="text-center text-slate-400 text-sm mt-10">
    //               Start a conversation
    //             </p>
    //           )}
    //           {messages.map((msg, i) => (
    //             <div
    //               key={i}
    //               className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
    //             >
    //               <div
    //                 className={`max-w-[75%] px-4 py-2.5 rounded-2xl text-sm leading-relaxed ${
    //                   msg.role === "user"
    //                     ? "bg-blue-600 text-white rounded-br-sm"
    //                     : "bg-white border border-slate-200 text-slate-800 rounded-bl-sm"
    //                 }`}
    //               >
    //                 {msg.content}
    //               </div>
    //             </div>
    //           ))}
    //           {loading && (
    //             <div className="flex justify-start">
    //               <div className="px-4 py-2.5 rounded-2xl rounded-bl-sm text-sm bg-white border border-slate-200 text-slate-400">
    //                 Thinking...
    //               </div>
    //             </div>
    //           )}
    //           <div ref={bottomRef} />
    //         </div>

    //         {/* Error */}
    //         {error && (
    //           <div className="px-4 py-2 border-t bg-red-50 border-red-100">
    //             <p className="text-xs text-red-400">{error}</p>
    //           </div>
    //         )}

    //         {/* Input */}
    //         <div className="px-4 py-3 border-t border-slate-200 flex gap-2 items-end">
    //           <textarea
    //             rows={1}
    //             value={input}
    //             onChange={(e) => setInput(e.target.value)}
    //             onKeyDown={handleKeyDown}
    //             placeholder="Type a message..."
    //             className="flex-1 resize-none text-sm border border-slate-200 rounded-xl px-3 py-2 outline-none focus:ring-2 focus:ring-blue-500 text-slate-800 placeholder-slate-400"
    //           />
    //           <button
    //             onClick={sendMessage}
    //             disabled={loading || !input.trim()}
    //             className="px-3 py-2 bg-blue-600 text-white text-sm rounded-xl disabled:opacity-40 hover:bg-blue-700 transition"
    //           >
    //             &uarr;
    //           </button>
    //         </div>
    //       </div>
    //     </div>
    //   </div>
    // </div>
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <div className="relative bg-white border border-gray-200 rounded-[20px] p-10 max-w-md w-full text-center overflow-hidden shadow-sm">
        {/* Top blue accent strip */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-blue-600 rounded-t-[20px]" />

        {/* Icon */}
        <div className="w-16 h-16 rounded-2xl bg-blue-50 border border-blue-100 flex items-center justify-center mx-auto mb-5">
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none">
            <path
              d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z"
              stroke="#2563eb"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <circle cx="12" cy="12" r="3" fill="#3b82f6" opacity="0.3" />
          </svg>
        </div>

        {/* Badge */}
        <div className="inline-block bg-blue-50 border border-blue-200 rounded-full px-4 py-1 mb-4">
          <span className="text-[11px] font-medium text-blue-600 uppercase tracking-widest">
            Coming Soon
          </span>
        </div>

        {/* Title */}
        <h2 className="text-[22px] font-medium text-gray-900 mb-2">
          AI Assistant
        </h2>

        {/* Description */}
        <p className="text-sm text-gray-500 leading-relaxed mb-7">
          Your intelligent creative partner is on its way — helping you write,
          brainstorm, analyse, and grow faster than ever.
        </p>

        {/* Feature pills */}
        <div className="flex flex-wrap gap-2 justify-center mb-7">
          {[
            "Smart writing",
            "Idea generation",
            "Caption writing",
            "Content strategy",
          ].map((label) => (
            <span
              key={label}
              className="text-xs text-blue-600 bg-blue-50 border border-blue-100 rounded-full px-4 py-1"
            >
              {label}
            </span>
          ))}
        </div>

        {/* Divider */}
        <div className="border-t border-gray-100 mb-6" />

        {/* Notify section */}
        <p className="text-xs text-gray-400 mb-3">
          Get notified when it launches
        </p>
        <div className="flex gap-2">
          <input
            type="email"
            placeholder="your@email.com"
            className="flex-1 bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 text-sm text-gray-800 outline-none placeholder:text-gray-400 focus:border-blue-500 focus:bg-white transition-colors"
          />
          <button className="bg-blue-600 hover:bg-blue-700 transition-colors text-white text-sm font-medium rounded-xl px-5 py-2.5 whitespace-nowrap">
            Notify me
          </button>
        </div>

        {/* Footer note */}
        <p className="text-[11px] text-gray-400 mt-4">
          CrtrsHub · AI Assistant is in active development
        </p>
      </div>
    </div>
  );
}
