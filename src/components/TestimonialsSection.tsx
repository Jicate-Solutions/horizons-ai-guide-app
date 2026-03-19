import { Star, Quote, ChevronLeft, ChevronRight, BadgeCheck, MessageSquareQuote, Users, School, ThumbsUp } from "lucide-react";
import { useState, useEffect } from "react";

const testimonials = [
  {
    name: "T. Gokilavani",
    role: "Class 12 Student",
    school: "Government Higher Secondary School, Veppadai",
    quote: "This app helped me understand my strengths and explore suitable career options.",
    avatar: "TG",
    color: "#e11d48",
    date: "28 Jan 2026",
  },
  {
    name: "Chandru S",
    role: "Class 12 Student",
    school: "Government Boys Higher Secondary School, Kumarapalayam",
    quote: "I was confused about my future before using this app. Now I feel more confident in my choices.",
    avatar: "CS",
    color: "#7c3aed",
    date: "06 Jan 2026",
  },
  {
    name: "K. Karthick",
    role: "Class 12 Student",
    school: "Pallipalayam Boys Higher Secondary School",
    quote: "The power of AI combined with expert guidance made me realize the importance of choosing the right career path early. VAZHIKAATTI is a game-changer.",
    avatar: "KK",
    color: "#2563eb",
    date: "28 Nov 2025",
  },
  {
    name: "M.G. Bharanee Dharan",
    role: "Class 12 Student",
    school: "Government Higher Secondary School (Boys), Chithode",
    quote: "Thanks to the career discovery sessions, I now have a clear roadmap for my future. The AI assistant helped me understand which courses align with my interests.",
    avatar: "MB",
    color: "#059669",
    date: "05 Dec 2025",
  },
  {
    name: "Mahalakshmi V",
    role: "Class 12 Student",
    school: "Government Higher Secondary School, Anupparpalayam, Tirupur",
    quote: "VAZHIKAATTI opened my eyes to career options I never knew existed. The AI assessment matched me with courses that truly fit my skills, and now I have a clear plan for my future after 12th.",
    avatar: "MV",
    color: "#d97706",
    date: "08 Jan 2026",
  },
];

const TestimonialsSection = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const total = testimonials.length;

  const goTo = (i: number) => setActiveIndex(((i % total) + total) % total);

  useEffect(() => {
    if (isPaused) return;
    const id = setInterval(() => setActiveIndex(p => (p + 1) % total), 5000);
    return () => clearInterval(id);
  }, [isPaused, total]);

  const getVisible = () => {
    const items = [];
    for (let i = 0; i < 3; i++) items.push(testimonials[(activeIndex + i) % total]);
    return items;
  };

  const featured = testimonials[activeIndex];

  return (
    <section className="py-20 md:py-28 relative overflow-hidden" id="testimonials">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-emerald-900 via-green-800 to-emerald-900">
        <div className="absolute inset-0" style={{
          backgroundImage: 'radial-gradient(circle at 15% 50%, rgba(16,185,129,0.15) 0%, transparent 50%), radial-gradient(circle at 85% 50%, rgba(245,158,11,0.1) 0%, transparent 50%), radial-gradient(circle at 50% 0%, rgba(59,130,246,0.1) 0%, transparent 40%)'
        }} />
        {/* Subtle grid */}
        <div className="absolute inset-0 opacity-[0.03]" style={{
          backgroundImage: 'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)',
          backgroundSize: '40px 40px'
        }} />
      </div>

      <div className="container mx-auto px-4 md:px-8 relative z-10">
        {/* Header */}
        <div className="text-center mb-14">
          <div className="inline-flex items-center gap-2 bg-amber-500/10 backdrop-blur-sm text-amber-300 px-5 py-2.5 rounded-full text-sm font-semibold mb-5 border border-amber-500/20">
            <MessageSquareQuote className="w-4 h-4" />
            Voices of Real Learners
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4 leading-tight">
            Hear From Those Who
            <br />
            <span className="bg-gradient-to-r from-amber-300 via-yellow-300 to-orange-300 bg-clip-text text-transparent">
              Found Their Path
            </span>
          </h2>
          <p className="text-base md:text-lg text-gray-400 max-w-2xl mx-auto">
            Genuine feedback from 12th standard learners across Tamil Nadu 
            who discovered their career direction with Vazhikatti
          </p>
        </div>

        {/* Featured Quote — Large Display */}
        <div className="max-w-3xl mx-auto mb-14">
          <div className="relative bg-white/[0.04] backdrop-blur-sm rounded-3xl border border-white/10 p-8 md:p-10 text-center">
            {/* Large quote marks */}
            <div className="absolute top-4 left-6 opacity-10">
              <Quote className="w-16 h-16 text-amber-300" />
            </div>
            <div className="absolute bottom-4 right-6 opacity-10 rotate-180">
              <Quote className="w-16 h-16 text-amber-300" />
            </div>

            {/* Quote text */}
            <p className="text-lg md:text-2xl text-white font-medium leading-relaxed mb-8 relative z-10 italic">
              "{featured.quote}"
            </p>

            {/* Author */}
            <div className="flex items-center justify-center gap-3">
              <div className="w-12 h-12 rounded-full flex items-center justify-center text-white font-bold text-sm shadow-lg" style={{ backgroundColor: featured.color }}>
                {featured.avatar}
              </div>
              <div className="text-left">
                <div className="flex items-center gap-1.5">
                  <p className="text-white font-bold text-sm">{featured.name}</p>
                  <BadgeCheck className="w-4 h-4 text-emerald-400" />
                </div>
                <p className="text-gray-400 text-xs">{featured.school}</p>
              </div>
            </div>

            {/* Stars */}
            <div className="flex justify-center gap-1 mt-4">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
              ))}
            </div>
          </div>
        </div>

        {/* Carousel */}
        <div
          className="relative max-w-6xl mx-auto px-10 md:px-12"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          {/* Arrows */}
          <button onClick={() => goTo(activeIndex - 1)}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-10 w-11 h-11 bg-white/5 backdrop-blur-md border border-white/10 rounded-full flex items-center justify-center hover:bg-white/15 transition-all group">
            <ChevronLeft className="w-5 h-5 text-white/70 group-hover:text-white" />
          </button>
          <button onClick={() => goTo(activeIndex + 1)}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-10 w-11 h-11 bg-white/5 backdrop-blur-md border border-white/10 rounded-full flex items-center justify-center hover:bg-white/15 transition-all group">
            <ChevronRight className="w-5 h-5 text-white/70 group-hover:text-white" />
          </button>

          {/* Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {getVisible().map((t, index) => (
              <div key={`${activeIndex}-${index}`} className="testimonial-card">
                <div className="bg-white/[0.06] backdrop-blur-sm rounded-2xl p-6 h-full flex flex-col border border-white/10 hover:border-white/20 hover:bg-white/[0.08] transition-all duration-300 group">
                  {/* Top row */}
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex gap-0.5">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                      ))}
                    </div>
                    <div className="flex items-center gap-1 text-[10px] font-semibold text-emerald-400 bg-emerald-500/10 px-2 py-1 rounded-full border border-emerald-500/20">
                      <BadgeCheck className="w-3 h-3" />
                      Verified
                    </div>
                  </div>

                  {/* Quote */}
                  <div className="flex-1 mb-5">
                    <Quote className="w-6 h-6 text-amber-400/30 mb-2" />
                    <p className="text-[15px] leading-relaxed text-gray-300 group-hover:text-gray-200 transition-colors">
                      {t.quote}
                    </p>
                  </div>

                  {/* Author */}
                  <div className="flex items-center gap-3 pt-4 border-t border-white/10">
                    <div className="w-10 h-10 rounded-full flex items-center justify-center text-white font-bold text-xs flex-shrink-0 shadow-md" style={{ backgroundColor: t.color }}>
                      {t.avatar}
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="font-bold text-white text-sm truncate">{t.name}</p>
                      <p className="text-[11px] text-gray-400 truncate">{t.school}</p>
                    </div>
                    <span className="text-[10px] text-gray-500 flex-shrink-0">{t.date}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Dots */}
          <div className="flex justify-center gap-2.5 mt-10">
            {testimonials.map((_, i) => (
              <button key={i} onClick={() => goTo(i)}
                className={`rounded-full transition-all duration-300 ${
                  i === activeIndex
                    ? "w-10 h-2.5 bg-gradient-to-r from-amber-400 to-orange-400 shadow-lg shadow-amber-500/30"
                    : "w-2.5 h-2.5 bg-white/20 hover:bg-white/40"
                }`}
              />
            ))}
          </div>
        </div>

        {/* Bottom Trust Bar */}
        <div className="max-w-3xl mx-auto mt-14">
          <div className="bg-white/[0.03] backdrop-blur-sm rounded-2xl border border-white/10 p-5 md:p-6">
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-emerald-500/10 flex items-center justify-center border border-emerald-500/20">
                  <ThumbsUp className="w-5 h-5 text-emerald-400" />
                </div>
                <div>
                  <p className="text-sm font-bold text-white">Feedback collected from real classroom sessions</p>
                  <p className="text-xs text-gray-500 mt-0.5">Government schools across Namakkal, Erode & Tirupur districts</p>
                </div>
              </div>
              <div className="flex items-center gap-6">
                <div className="text-center">
                  <p className="text-xl font-black text-amber-400">98%</p>
                  <p className="text-[10px] text-gray-500">Satisfaction</p>
                </div>
                <div className="w-px h-8 bg-white/10" />
                <div className="text-center">
                  <p className="text-xl font-black text-emerald-400">500+</p>
                  <p className="text-[10px] text-gray-500">Learners</p>
                </div>
                <div className="w-px h-8 bg-white/10" />
                <div className="text-center">
                  <p className="text-xl font-black text-blue-400">50+</p>
                  <p className="text-[10px] text-gray-500">Schools</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .testimonial-card {
          animation: cardFadeIn 0.6s ease-out;
        }
        @keyframes cardFadeIn {
          from { opacity: 0; transform: translateY(16px) scale(0.97); }
          to { opacity: 1; transform: translateY(0) scale(1); }
        }
      `}</style>
    </section>
  );
};

export default TestimonialsSection;
