import { useState, useRef, useEffect, useCallback } from "react";
import { X, Send, Trash2, Minimize2, Maximize2, Mic, MicOff, Download, Volume2, VolumeX } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { ScrollArea } from "@/components/ui/scroll-area";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";

interface Message {
  id?: string;
  role: "user" | "assistant";
  content: string;
  imageUrl?: string;
}

interface AIChatModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const CHAT_URL = '/api/career-chat';

// Local responses when API is unavailable
function getLocalChatReply(msg: string): string {
  const lower = msg.toLowerCase();
  if (lower.match(/^(hi|hello|hey|vanakkam)/)) {
    return `👋 வணக்கம்! Welcome! I'm your **VAZHIKATTI AI Career Guide**.\n\nI can help you with:\n\n🎯 **Career options** after 10th & 12th\n🏫 **College & course** suggestions in Tamil Nadu\n📝 **Exam prep** — NEET, JEE, TNEA, TNPSC\n💼 **Job search** & interview tips\n💰 **Scholarship** & financial aid info\n📊 **Cutoff marks** & admission guidance\n\nJust type your question! 😊`;
  }
  if (lower.includes('12th') && (lower.includes('science') || lower.includes('bio'))) {
    return `🎓 **Career Options After 12th Science (Bio):**\n\n**Medical Path:**\n🏥 MBBS (NEET UG) → Doctor\n🦷 BDS → Dentist\n💊 B.Pharm → Pharmacist\n🌿 BAMS / BHMS / BSMS (Siddha)\n\n**Non-Medical:**\n🔬 B.Sc. Biotechnology / Microbiology\n🌾 B.Sc. Agriculture\n🐾 B.V.Sc (Veterinary)\n\n**Top TN Colleges:** Madras Medical, JIPMER, Stanley, PSG\n\nWant NEET preparation tips or cutoff details?`;
  }
  if (lower.includes('12th') && (lower.includes('maths') || lower.includes('engineering'))) {
    return `🎓 **Career Options After 12th Science (Maths):**\n\n**Engineering:**\n💻 B.E/B.Tech — CSE, ECE, Mech, Civil\n📱 Entry: TNEA (12th marks) or JEE Main\n\n**Other Paths:**\n📊 B.Sc. Computer Science / IT\n🏗️ B.Arch (Architecture)\n🎮 BCA (Computer Applications)\n\n**Top TN Colleges:** Anna Univ, NIT Trichy, PSG Tech, SSN, VIT\n\n**TNEA Formula:** Maths 50% + Physics 25% + Chemistry 25%\n\nWant TNEA counselling details?`;
  }
  if (lower.includes('commerce')) {
    return `🎓 **Career Options After 12th Commerce:**\n\n💰 **B.Com** → Accountant, Auditor\n📊 **BBA** → Business Management\n🏦 **CA** (Chartered Accountant) → ₹7-20 LPA\n📋 **CS** (Company Secretary)\n💳 **CMA** (Cost Management)\n🏦 **Banking** → IBPS PO/Clerk\n📈 **B.Com + CFA** → Finance\n\n**Top Colleges:** Loyola, MCC, PSG CAS, Ethiraj\n\nWhich career interests you most?`;
  }
  if (lower.includes('arts') || lower.includes('humanities')) {
    return `🎓 **Career Options After 12th Arts:**\n\n📖 **BA** — English, History, Economics, Political Science\n⚖️ **Law** (5-year integrated — CLAT exam)\n📰 **Mass Communication / Journalism**\n🏨 **Hotel Management**\n🎨 **Design** (NID, NIFT entrance)\n👨‍🏫 **B.Ed** → Teaching\n📚 **Library Science**\n🏛️ **Civil Services** (IAS/IPS after graduation)\n\n**Top Colleges:** Presidency, Stella Maris, MCC, WCC\n\nWhich field interests you?`;
  }
  if (lower.includes('12th') || lower.includes('career')) {
    return `🎓 **Career Paths After 12th — All Streams:**\n\n**Science:** Engineering (TNEA/JEE), Medical (NEET), B.Sc., BCA\n**Commerce:** B.Com, BBA, CA, CS, CMA, Banking\n**Arts:** BA, Law (CLAT), Journalism, Hotel Management\n**Government:** TNPSC, UPSC, Railway, Banking, SSC\n**Skill-Based:** Digital Marketing, Data Science, Web Dev\n\nTell me your **stream** for specific guidance! 🎯`;
  }
  if (lower.includes('neet') || lower.includes('medical') || lower.includes('mbbs')) {
    return `📚 **NEET UG 2026 Guide:**\n\n**Exam:** 200 MCQs | 3h 20min | 720 marks\n**Subjects:** Physics (45), Chemistry (45), Biology (90)\n\n**Preparation Tips:**\n1️⃣ Master NCERT textbooks completely\n2️⃣ Solve 10 years previous papers\n3️⃣ Biology has highest weightage!\n4️⃣ Take weekly mock tests\n5️⃣ Revise daily with flashcards\n\n**TN Colleges:** MMC Chennai, JIPMER, Stanley, Kilpauk\n**Cutoff:** General ~600+, OBC ~540+, SC/ST ~450+\n\nWant a month-wise study plan? 📅`;
  }
  if (lower.includes('jee') || lower.includes('tnea')) {
    return `📚 **Engineering Admission Guide:**\n\n**TNEA (Tamil Nadu):**\n• Based on 12th marks only\n• Formula: Maths 50% + Physics 25% + Chemistry 25%\n• Apply on tneaonline.org\n• ~500 colleges participate\n\n**JEE Main (National):**\n• 90 MCQs | 3 hours | 300 marks\n• For NITs, IIITs, GFTIs\n• Study: NCERT → HC Verma → Cengage\n\n**Top Picks:** NIT Trichy, Anna Univ, PSG Tech, VIT, SRM\n\nWant step-by-step TNEA counselling process?`;
  }
  if (lower.includes('scholarship') || lower.includes('loan') || lower.includes('fee') || lower.includes('money')) {
    return `💰 **Scholarships for TN Students:**\n\n**State Govt:**\n• BC/MBC/SC/ST Scholarship (Free education)\n• First Graduate Scholarship\n• Moovalur Scheme (for girls)\n\n**Central Govt:**\n• Post-Matric Scholarship\n• Pragati (girls in tech)\n• National Scholarship Portal (NSP)\n\n**Private:** HDFC, Tata Trust, Reliance Foundation\n\n**Education Loans:**\n• SBI Scholar Loan — up to ₹20 Lakhs\n• Vidya Lakshmi Portal — compare banks\n\nApply early! Deadlines matter! 📅`;
  }
  if (lower.includes('job') || lower.includes('salary') || lower.includes('placement')) {
    return `💼 **High-Demand Jobs 2026:**\n\n**Tech:** Software Dev (₹4-20 LPA), Data Scientist (₹6-25 LPA), AI Engineer (₹8-30 LPA)\n**Healthcare:** Doctor (₹6-15 LPA), Pharmacist (₹3-8 LPA)\n**Finance:** CA (₹7-15 LPA), Banking (₹5-12 LPA)\n**Government:** TNPSC, Banking PO, SSC CGL\n\n**Job Search Tips:**\n1. Build LinkedIn profile\n2. Use Naukri, Indeed, LinkedIn\n3. Learn in-demand skills\n4. Practice aptitude tests\n\nWant guidance for a specific career? 🎯`;
  }
  if (lower.includes('tnpsc') || lower.includes('government') || lower.includes('govt')) {
    return `🏛️ **Government Job Guide:**\n\n**TNPSC:**\n• Group 1 — Deputy Collector, DSP (₹56K-2L/month)\n• Group 2 — Revenue Officer (₹36K-1.1L/month)\n• Group 4 — Clerk, Typist (₹19K-63K/month)\n\n**Others:** Banking (IBPS), Railway (RRB), SSC, Defence (NDA/CDS)\n\n**Preparation:**\n• Tamil Nadu GK — must study!\n• NCERT 6th-12th books\n• Current affairs daily\n• Previous year papers\n\nWhich exam interests you? 📋`;
  }
  if (lower.includes('college') || lower.includes('university') || lower.includes('best')) {
    return `🏫 **Top Colleges in Tamil Nadu:**\n\n**Engineering:** NIT Trichy, Anna Univ, PSG Tech, SSN, VIT, SRM, SASTRA\n**Medical:** MMC Chennai, JIPMER, Stanley, Kilpauk, Coimbatore MC\n**Arts & Science:** Loyola, Presidency, MCC, PSG CAS\n**Law:** NLSIU, TNDALU, SASTRA Law\n**Management:** IIM Trichy, XLRI, LIBA\n\nTell me your stream & marks — I'll suggest the best fit! 🎯`;
  }
  if (lower.includes('cutoff') || lower.includes('marks') || lower.includes('score')) {
    return `📊 **Cutoff Guide:**\n\n**TNEA Engineering (Approx):**\n• Anna Univ CEG CSE: 195+\n• PSG Tech CSE: 194+\n• SSN CSE: 193+\n• VIT: VITEEE rank based\n\n**NEET Medical:**\n• Govt Medical (General): 600+\n• Govt Medical (OBC): 540+\n• Private Medical: 400+\n\n**Note:** Cutoffs change every year. Use our **Admission Predictor** for accurate estimates!\n\nWant cutoff for a specific college?`;
  }
  if (lower.includes('10th') || lower.includes('after 10')) {
    return `🎓 **After 10th — Choose Your Stream:**\n\n**Science (Maths):** → Engineering, IT, Architecture\n**Science (Bio):** → Medical, Pharmacy, Agriculture\n**Commerce:** → CA, Banking, Business\n**Arts:** → Law, Journalism, Civil Services\n\n**Other Options:**\n🔧 ITI / Polytechnic Diploma (3 years)\n💻 Computer Courses\n🎨 Fine Arts / Design\n\n**Tip:** Choose based on your INTEREST, not just marks!\n\nWant help deciding your stream?`;
  }
  return `Thank you for your question! 🤔\n\nI can help you with:\n\n🎯 **"Career options after 12th"**\n📚 **"NEET/JEE/TNEA preparation"**\n🏫 **"Best colleges in Tamil Nadu"**\n💼 **"High salary jobs"**\n💰 **"Scholarships for TN students"**\n🏛️ **"Government job guide"**\n📊 **"Cutoff marks"**\n\nJust type your question! 😊`;
}

// Speech recognition types
interface SpeechRecognitionEvent extends Event {
  results: SpeechRecognitionResultList;
  resultIndex: number;
}

interface SpeechRecognitionResultList {
  length: number;
  item(index: number): SpeechRecognitionResult;
  [index: number]: SpeechRecognitionResult;
}

interface SpeechRecognitionResult {
  isFinal: boolean;
  length: number;
  item(index: number): SpeechRecognitionAlternative;
  [index: number]: SpeechRecognitionAlternative;
}

interface SpeechRecognitionAlternative {
  transcript: string;
  confidence: number;
}

interface SpeechRecognition extends EventTarget {
  continuous: boolean;
  interimResults: boolean;
  lang: string;
  start(): void;
  stop(): void;
  abort(): void;
  onresult: ((event: SpeechRecognitionEvent) => void) | null;
  onerror: ((event: Event) => void) | null;
  onend: (() => void) | null;
  onstart: (() => void) | null;
}

declare global {
  interface Window {
    SpeechRecognition: new () => SpeechRecognition;
    webkitSpeechRecognition: new () => SpeechRecognition;
  }
}

const AIChatModal = ({ isOpen, onClose }: AIChatModalProps) => {
  const { user } = useAuth();
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [voiceStatus, setVoiceStatus] = useState<string>("");
  const [isLoadingHistory, setIsLoadingHistory] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [ttsEnabled, setTtsEnabled] = useState(true);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const chatScrollRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const recognitionRef = useRef<SpeechRecognition | null>(null);
  const speechSynthRef = useRef<SpeechSynthesisUtterance | null>(null);

  // Chat starts fresh each session - no history loading

  // Save message to database
  const saveMessage = useCallback(async (message: Message) => {
    if (!user) return;
    
    try {
      const { error } = await supabase
        .from("chat_messages")
        .insert({
          user_id: user.id,
          role: message.role,
          content: message.content,
          image_url: message.imageUrl || null
        });
      
      if (error) throw error;
    } catch (error) {
    }
  }, [user]);

  // Scroll to bottom only if user is already near the bottom
  useEffect(() => {
    const container = chatScrollRef.current;
    if (!container) {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
      return;
    }
    const scrollEl = container.querySelector('[data-radix-scroll-area-viewport]') as HTMLElement;
    if (!scrollEl) {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
      return;
    }
    const { scrollTop, scrollHeight, clientHeight } = scrollEl;
    const isNearBottom = scrollHeight - scrollTop - clientHeight < 150;
    if (isNearBottom) {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  useEffect(() => {
    if (isOpen && !isMinimized && textareaRef.current) {
      textareaRef.current.focus();
    }
  }, [isOpen, isMinimized]);

  // Initialize speech recognition
  useEffect(() => {
    const SpeechRecognitionAPI = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (SpeechRecognitionAPI) {
      recognitionRef.current = new SpeechRecognitionAPI();
      recognitionRef.current.continuous = false;
      recognitionRef.current.interimResults = true;
      recognitionRef.current.lang = "en-US"; // Will auto-detect Tamil as well
      
      recognitionRef.current.onstart = () => {
        setVoiceStatus("Listening...");
      };
      
      recognitionRef.current.onresult = (event: SpeechRecognitionEvent) => {
        let finalTranscript = "";
        let interimTranscript = "";
        
        for (let i = event.resultIndex; i < event.results.length; i++) {
          const transcript = event.results[i][0].transcript;
          if (event.results[i].isFinal) {
            finalTranscript += transcript;
          } else {
            interimTranscript += transcript;
          }
        }
        
        if (finalTranscript) {
          setInput(prev => prev + finalTranscript);
          setVoiceStatus("Processing...");
        } else if (interimTranscript) {
          setVoiceStatus(`"${interimTranscript}"`);
        }
      };
      
      recognitionRef.current.onerror = (event) => {
        setIsListening(false);
        setVoiceStatus("");
        toast.error("Voice input error. Please try again.");
      };
      
      recognitionRef.current.onend = () => {
        setIsListening(false);
        setVoiceStatus("");
      };
    }
    
    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.abort();
      }
    };
  }, [saveMessage]);

  // Text-to-speech function
  const speakText = useCallback((text: string) => {
    if (!ttsEnabled || !window.speechSynthesis) return;
    
    // Cancel any ongoing speech
    window.speechSynthesis.cancel();
    
    const utterance = new SpeechSynthesisUtterance(text);
    speechSynthRef.current = utterance;
    
    // Detect language (simple heuristic for Tamil)
    const hasTamil = /[\u0B80-\u0BFF]/.test(text);
    utterance.lang = hasTamil ? "ta-IN" : "en-US";
    utterance.rate = 1.0;
    utterance.pitch = 1.0;
    
    utterance.onstart = () => setIsSpeaking(true);
    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = () => setIsSpeaking(false);
    
    window.speechSynthesis.speak(utterance);
  }, [ttsEnabled]);

  const stopSpeaking = useCallback(() => {
    window.speechSynthesis?.cancel();
    setIsSpeaking(false);
  }, []);

  const toggleTts = useCallback(() => {
    if (isSpeaking) {
      stopSpeaking();
    }
    setTtsEnabled(prev => !prev);
    toast.success(ttsEnabled ? "Voice output disabled" : "Voice output enabled");
  }, [ttsEnabled, isSpeaking, stopSpeaking]);

  const toggleVoiceInput = useCallback(() => {
    if (!recognitionRef.current) {
      toast.error("Voice input is not supported in your browser");
      return;
    }
    
    if (isListening) {
      recognitionRef.current.stop();
      setIsListening(false);
      setVoiceStatus("");
    } else {
      try {
        recognitionRef.current.start();
        setIsListening(true);
      } catch (error) {
        toast.error("Could not start voice input");
      }
    }
  }, [isListening]);

  const streamChat = useCallback(async (userMessages: Message[]) => {
    let apiSuccess = false;
    
    try {
      const resp = await fetch(CHAT_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: userMessages.map(m => ({ role: m.role, content: m.content })) }),
      });

      if (resp.ok) {
        const contentType = resp.headers.get("content-type") || "";
        
        if (contentType.includes("text/event-stream") && resp.body) {
          apiSuccess = true;
          const reader = resp.body.getReader();
          const decoder = new TextDecoder();
          let assistantContent = "";
          let buffer = "";

          while (true) {
            const { done, value } = await reader.read();
            if (done) break;
            
            buffer += decoder.decode(value, { stream: true });
            const lines = buffer.split("\n");
            buffer = lines.pop() || "";

            for (const line of lines) {
              if (line.startsWith("data: ") && line.trim() !== "data: [DONE]") {
                try {
                  const parsed = JSON.parse(line.slice(6).trim());
                  const content = parsed.text || parsed.choices?.[0]?.delta?.content || '';
                  if (content) {
                    assistantContent += content;
                    setMessages((prev) => {
                      const last = prev[prev.length - 1];
                      if (last?.role === "assistant" && !last.imageUrl) {
                        return prev.map((m, i) =>
                          i === prev.length - 1 ? { ...m, content: assistantContent } : m
                        );
                      }
                      return [...prev, { role: "assistant", content: assistantContent }];
                    });
                  }
                } catch { /* skip */ }
              }
            }
          }
          
          if (assistantContent) {
            await saveMessage({ role: "assistant", content: assistantContent });
            speakText(assistantContent);
          }
        } else if (contentType.includes("application/json")) {
          const data = await resp.json();
          if (data.type === "image" && data.imageUrl) {
            const assistantMsg: Message = { 
              role: "assistant", 
              content: data.content || "Here's the image you requested!",
              imageUrl: data.imageUrl 
            };
            setMessages(prev => [...prev, assistantMsg]);
            await saveMessage(assistantMsg);
            speakText(assistantMsg.content);
            apiSuccess = true;
          }
        }
      }
    } catch (apiError) {
    }

    // If API didn't work, use local response
    if (!apiSuccess) {
      const userMsg = userMessages[userMessages.length - 1]?.content || '';
      const localReply = getLocalChatReply(userMsg);
      const localMsg: Message = { role: "assistant", content: localReply };
      setMessages(prev => [...prev, localMsg]);
    }
  }, [saveMessage, speakText]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    // Stop voice input if active
    if (isListening && recognitionRef.current) {
      recognitionRef.current.stop();
      setIsListening(false);
      setVoiceStatus("");
    }

    const userMessage: Message = { role: "user", content: input.trim() };
    const newMessages = [...messages, userMessage];
    setMessages(newMessages);
    setInput("");
    setIsLoading(true);

    // Save user message
    await saveMessage(userMessage);

    try {
      await streamChat(newMessages);
    } catch (error) {
      // Show a helpful local response instead of error
      const localReply = getLocalChatReply(input.trim());
      const localMsg: Message = { role: "assistant", content: localReply };
      setMessages([...newMessages, localMsg]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const clearChat = async () => {
    if (!user) {
      setMessages([]);
      toast.success("Chat cleared");
      return;
    }
    
    try {
      const { error } = await supabase
        .from("chat_messages")
        .delete()
        .eq("user_id", user.id);
      
      if (error) throw error;
      
      setMessages([]);
      toast.success("Chat cleared");
    } catch (error) {
      toast.error("Failed to clear chat history");
    }
  };

  const downloadImage = (imageUrl: string) => {
    const link = document.createElement("a");
    link.href = imageUrl;
    link.download = `jkkn-ai-image-${Date.now()}.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    toast.success("Image download started");
  };

  if (!isOpen) return null;

  if (isMinimized) {
    return (
      <div className="fixed bottom-24 right-4 sm:right-6 z-50 bg-gradient-to-r from-emerald-600 to-green-600 text-white rounded-xl shadow-lg p-3 flex items-center gap-3 animate-scale-in">
        <span className="text-lg">🤖</span>
        <span className="font-bold text-sm">VAZHIKATTI AI</span>
        <Button size="icon" variant="ghost" onClick={() => setIsMinimized(false)} className="text-white hover:bg-white/20 h-7 w-7">
          <Maximize2 className="w-4 h-4" />
        </Button>
        <Button size="icon" variant="ghost" onClick={onClose} className="text-white hover:bg-white/20 h-7 w-7">
          <X className="w-4 h-4" />
        </Button>
      </div>
    );
  }

  return (
    <div className="fixed bottom-24 right-4 sm:right-6 z-50 w-[calc(100vw-32px)] sm:w-[400px] h-[75vh] sm:h-[560px] max-h-[560px] bg-card border border-border rounded-2xl shadow-2xl flex flex-col overflow-hidden animate-scale-in ring-1 ring-black/5">
      {/* Header */}
      <div className="flex items-center justify-between p-3 border-b border-border bg-gradient-to-r from-emerald-600 to-green-600 text-white">
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-xl bg-white/20 flex items-center justify-center text-lg">🤖</div>
          <div>
            <h3 className="font-bold text-sm">VAZHIKATTI AI</h3>
            <div className="flex items-center gap-1.5">
              <span className="relative flex h-2 w-2"><span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-300 opacity-75"></span><span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-200"></span></span>
              <p className="text-[10px] text-emerald-100">Online • Career Guide</p>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-0.5">
          <Button 
            size="icon" 
            variant="ghost" 
            onClick={isSpeaking ? stopSpeaking : toggleTts} 
            title={isSpeaking ? "Stop speaking" : ttsEnabled ? "Disable voice" : "Enable voice"}
            className={`text-white hover:bg-white/20 h-8 w-8 ${isSpeaking ? "animate-pulse" : ""}`}
          >
            {ttsEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
          </Button>
          <Button size="icon" variant="ghost" onClick={clearChat} title="Clear chat" className="text-white hover:bg-white/20 h-8 w-8">
            <Trash2 className="w-4 h-4" />
          </Button>
          <Button size="icon" variant="ghost" onClick={() => setIsMinimized(true)} title="Minimize" className="text-white hover:bg-white/20 h-8 w-8">
            <Minimize2 className="w-4 h-4" />
          </Button>
          <Button size="icon" variant="ghost" onClick={onClose} title="Close" className="text-white hover:bg-white/20 h-8 w-8">
            <X className="w-4 h-4" />
          </Button>
        </div>
      </div>

      {/* Messages */}
      <div ref={chatScrollRef} className="flex-1 min-h-0">
      <ScrollArea className="h-full p-4">
        {isLoadingHistory ? (
          <div className="flex items-center justify-center py-8">
            <div className="flex gap-1">
              <span className="w-2 h-2 bg-foreground/50 rounded-full animate-bounce" />
              <span className="w-2 h-2 bg-foreground/50 rounded-full animate-bounce [animation-delay:0.1s]" />
              <span className="w-2 h-2 bg-foreground/50 rounded-full animate-bounce [animation-delay:0.2s]" />
            </div>
          </div>
        ) : messages.length === 0 ? (
          <div className="py-4 space-y-5">
            {/* Welcome */}
            <div className="text-center">
              <div className="w-14 h-14 mx-auto mb-3 rounded-2xl bg-gradient-to-br from-emerald-500 to-green-600 flex items-center justify-center shadow-lg">
                <span className="text-2xl">🤖</span>
              </div>
              <h3 className="text-base font-bold text-foreground">VAZHIKATTI AI Assistant</h3>
              <p className="text-xs text-muted-foreground mt-1">Your personal career guide — ask me anything!</p>
            </div>

            {/* Quick Actions */}
            <div className="space-y-3">
              <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider text-center">Popular Questions</p>
              
              <div className="space-y-1.5">
                {[
                  { emoji: '🎯', text: 'Career options after 12th Science', q: 'What are the best career options after 12th Science?' },
                  { emoji: '🏥', text: 'NEET preparation tips', q: 'How should I prepare for NEET UG? Give me a study plan.' },
                  { emoji: '🛠️', text: 'Engineering through TNEA', q: 'How does TNEA counselling work? What cutoff do I need?' },
                  { emoji: '💰', text: 'Scholarships for Tamil Nadu students', q: 'What scholarships are available for 12th pass students in Tamil Nadu?' },
                  { emoji: '🏫', text: 'Best colleges in Tamil Nadu', q: 'What are the top colleges in Tamil Nadu for engineering and arts?' },
                  { emoji: '💼', text: 'High-salary career paths', q: 'Which career paths offer the highest salary in India right now?' },
                ].map((item, i) => (
                  <button
                    key={i}
                    onClick={() => { setInput(item.q); }}
                    className="w-full flex items-center gap-3 text-left px-3 py-2.5 rounded-xl bg-muted/50 hover:bg-primary/10 border border-transparent hover:border-primary/20 transition-all duration-200 group"
                  >
                    <span className="text-base flex-shrink-0">{item.emoji}</span>
                    <span className="text-xs font-medium text-foreground/80 group-hover:text-primary">{item.text}</span>
                  </button>
                ))}
              </div>

              <div className="flex items-center justify-center gap-2 pt-2">
                <span className="text-[10px] text-muted-foreground">🎤 Voice enabled</span>
                <span className="text-muted-foreground/30">•</span>
                <span className="text-[10px] text-muted-foreground">🎨 Image generation</span>
                <span className="text-muted-foreground/30">•</span>
                <span className="text-[10px] text-muted-foreground">🌐 Tamil & English</span>
              </div>
            </div>
          </div>
        ) : (
          <div className="space-y-3">
            {messages.map((msg, i) => (
              <div
                key={i}
                className={`flex gap-2 ${msg.role === "user" ? "justify-end" : "justify-start"}`}
              >
                {msg.role === "assistant" && (
                  <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-emerald-500 to-green-600 flex items-center justify-center flex-shrink-0 mt-0.5 shadow-sm">
                    <span className="text-xs">🤖</span>
                  </div>
                )}
                <div
                  className={`max-w-[80%] rounded-2xl px-3.5 py-2.5 text-sm ${
                    msg.role === "user"
                      ? "bg-gradient-to-r from-emerald-600 to-green-600 text-white rounded-br-md"
                      : "bg-muted text-foreground rounded-bl-md border border-border/50"
                  }`}
                >
                  <p className="whitespace-pre-wrap">{msg.content}</p>
                  {msg.imageUrl && (
                    <div className="mt-2 relative group">
                      <img 
                        src={msg.imageUrl} 
                        alt="Generated image" 
                        className="rounded-lg max-w-full h-auto"
                      />
                      <Button
                        size="sm"
                        variant="secondary"
                        className="absolute bottom-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity"
                        onClick={() => downloadImage(msg.imageUrl!)}
                      >
                        <Download className="w-3 h-3 mr-1" />
                        Save
                      </Button>
                    </div>
                  )}
                </div>
              </div>
            ))}
            {isLoading && messages[messages.length - 1]?.role === "user" && (
              <div className="flex gap-2 justify-start">
                <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-emerald-500 to-green-600 flex items-center justify-center flex-shrink-0 shadow-sm">
                  <span className="text-xs">🤖</span>
                </div>
                <div className="bg-muted rounded-2xl rounded-bl-md px-4 py-3 border border-border/50">
                  <div className="flex items-center gap-1.5">
                    <span className="w-2 h-2 bg-emerald-500 rounded-full animate-bounce" />
                    <span className="w-2 h-2 bg-emerald-500 rounded-full animate-bounce [animation-delay:0.15s]" />
                    <span className="w-2 h-2 bg-emerald-500 rounded-full animate-bounce [animation-delay:0.3s]" />
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
        )}
      </ScrollArea>
      </div>

      {/* Voice Status */}
      {voiceStatus && (
        <div className="px-3 py-2 bg-accent/20 text-center">
          <span className="text-xs text-accent-foreground flex items-center justify-center gap-2">
            <span className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
            {voiceStatus}
          </span>
        </div>
      )}

      {/* Input */}
      <div className="p-3 border-t border-border bg-background">
        <div className="flex gap-2 items-end">
          <Button
            onClick={toggleVoiceInput}
            size="icon"
            variant={isListening ? "destructive" : "outline"}
            className={`shrink-0 h-10 w-10 rounded-xl ${isListening ? "animate-pulse bg-red-500" : "hover:bg-emerald-50 hover:border-emerald-300"}`}
            title={isListening ? "Stop listening" : "Start voice input"}
          >
            {isListening ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
          </Button>
          <Textarea
            ref={textareaRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Type your career question..."
            className="min-h-[44px] max-h-[120px] resize-none rounded-xl text-sm"
            disabled={isLoading}
          />
          <Button
            onClick={handleSend}
            disabled={!input.trim() || isLoading}
            size="icon"
            className="shrink-0 h-10 w-10 rounded-xl bg-gradient-to-r from-emerald-600 to-green-600 hover:from-emerald-700 hover:to-green-700 shadow-md"
          >
            <Send className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AIChatModal;
