import { MessageCircle, X, Sparkles } from "lucide-react";
import { useChatModal } from "@/hooks/useChatModal";
import AIChatModal from "./AIChatModal";
import { useState, useEffect } from "react";

const FloatingChatButton = () => {
  const { isOpen, toggleChat, closeChat } = useChatModal();
  const [showLabel, setShowLabel] = useState(false);

  // Show the label after 3 seconds on first load
  useEffect(() => {
    const timer = setTimeout(() => setShowLabel(true), 3000);
    const hideTimer = setTimeout(() => setShowLabel(false), 10000);
    return () => { clearTimeout(timer); clearTimeout(hideTimer); };
  }, []);

  return (
    <>
      {/* Floating label */}
      {showLabel && !isOpen && (
        <div className="fixed bottom-[88px] right-6 z-50 animate-fade-up">
          <div className="bg-white rounded-xl shadow-lg border border-gray-200 px-4 py-2.5 flex items-center gap-2 max-w-[200px]">
            <Sparkles className="w-4 h-4 text-amber-500 flex-shrink-0" />
            <div>
              <p className="text-xs font-bold text-gray-800">AI Career Guide</p>
              <p className="text-[10px] text-gray-500">Ask me anything!</p>
            </div>
            <button onClick={() => setShowLabel(false)} className="text-gray-300 hover:text-gray-500 flex-shrink-0">
              <X className="w-3 h-3" />
            </button>
          </div>
          <div className="absolute -bottom-1.5 right-6 w-3 h-3 bg-white border-r border-b border-gray-200 rotate-45" />
        </div>
      )}

      {/* Chat Button */}
      <button
        onClick={toggleChat}
        className="fixed bottom-6 right-6 z-50 group"
        aria-label={isOpen ? "Close AI Chat" : "Open AI Chat"}
      >
        <div className={`w-14 h-14 rounded-2xl flex items-center justify-center transition-all duration-300 shadow-xl ${
          isOpen 
            ? "bg-gray-800 hover:bg-gray-700 rotate-90" 
            : "bg-gradient-to-br from-emerald-500 to-green-600 hover:from-emerald-600 hover:to-green-700 hover:scale-110 shadow-emerald-500/30"
        }`}>
          {isOpen ? (
            <X className="w-6 h-6 text-white" />
          ) : (
            <MessageCircle className="w-6 h-6 text-white" />
          )}
        </div>
        {/* Pulse ring */}
        {!isOpen && (
          <span className="absolute inset-0 rounded-2xl animate-ping bg-emerald-500/20 -z-10" style={{ animationDuration: '3s' }} />
        )}
      </button>

      <AIChatModal isOpen={isOpen} onClose={closeChat} />
    </>
  );
};

export default FloatingChatButton;
