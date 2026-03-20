import { Star, Quote, ChevronLeft, ChevronRight, BadgeCheck, ThumbsUp, Sparkles } from "lucide-react";
import { useState, useEffect } from "react";

const testimonials = [
  {
    name: "T. Gokilavani",
    school: "Govt Hr Sec School, Veppadai",
    quote: "This app helped me understand my strengths and explore suitable career options.",
    initials: "TG",
    bg: "bg-gradient-to-br from-rose-500 to-pink-600",
    light: "bg-rose-50",
    text: "text-rose-700",
    border: "border-rose-200",
    date: "28 Jan 2026",
  },
  {
    name: "Chandru S",
    school: "Govt Boys Hr Sec School, Kumarapalayam",
    quote: "I was confused about my future before using this app. Now I feel more confident in my choices.",
    initials: "CS",
    bg: "bg-gradient-to-br from-violet-500 to-purple-600",
    light: "bg-violet-50",
    text: "text-violet-700",
    border: "border-violet-200",
    date: "06 Jan 2026",
  },
  {
    name: "K. Karthick",
    school: "Pallipalayam Boys Hr Sec School",
    quote: "The power of AI combined with expert guidance made me realize the importance of choosing the right career path early. VAZHIKATTI is a game-changer.",
    initials: "KK",
    bg: "bg-gradient-to-br from-emerald-500 to-green-600",
    light: "bg-emerald-50",
    text: "text-emerald-700",
    border: "border-emerald-200",
    date: "28 Nov 2025",
  },
  {
    name: "M.G. Bharanee Dharan",
    school: "Govt Hr Sec School (Boys), Chithode",
    quote: "Thanks to the career discovery sessions, I now have a clear roadmap for my future. The AI assistant helped me understand which courses align with my interests.",
    initials: "MB",
    bg: "bg-gradient-to-br from-blue-500 to-indigo-600",
    light: "bg-blue-50",
    text: "text-blue-700",
    border: "border-blue-200",
    date: "05 Dec 2025",
  },
  {
    name: "Mahalakshmi V",
    school: "Govt Hr Sec School, Anupparpalayam, Tirupur",
    quote: "VAZHIKATTI opened my eyes to career options I never knew existed. The AI assessment matched me with courses that truly fit my skills, and now I have a clear plan for my future after 12th.",
    initials: "MV",
    bg: "bg-gradient-to-br from-amber-500 to-orange-600",
    light: "bg-amber-50",
    text: "text-amber-700",
    border: "border-amber-200",
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

  const featured = testimonials[activeIndex];

  return (
    <section className="py-20 md:py-28 relative overflow-hidden bg-white" id="testimonials">
      {/* Decorative background elements */}
      <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-emerald-100/40 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
      <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-amber-100/40 rounded-full blur-3xl translate-x-1/3 translate-y-1/3" />
      <div className="absolute top-1/2 left-1/2 w-[300px] h-[300px] bg-violet-100/30 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />

      <div className="container mx-auto px-4 md:px-8 relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-emerald-600 to-green-600 text-white px-5 py-2.5 rounded-full text-sm font-bold mb-5 shadow-lg shadow-emerald-500/20">
            <Sparkles className="w-4 h-4" />
            Real Learner Stories
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-gray-900 mb-4 leading-tight tracking-tight">
            Students Who Discovered
            <br />
            <span className="bg-gradient-to-r from-emerald-600 via-green-500 to-emerald-600 bg-clip-text text-transparent">
              Their True Calling
            </span>
          </h2>
          <p className="text-base md:text-lg text-gray-500 max-w-xl mx-auto">
            Real feedback from 12th standard learners across Tamil Nadu
          </p>
        </div>

        {/* Featured Large Card */}
        <div
          className="max-w-4xl mx-auto mb-16"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          <div className={`relative rounded-3xl overflow-hidden shadow-2xl border-2 ${featured.border} transition-all duration-500`}>
            {/* Top color band */}
            <div className={`${featured.bg} h-2`} />

            <div className="bg-white p-5 sm:p-8 md:p-12">
              <div className="flex flex-col md:flex-row gap-8 items-start">
                {/* Left - Avatar & Info */}
                <div className="flex-shrink-0 text-center md:text-left">
                  <div className={`w-20 h-20 md:w-24 md:h-24 ${featured.bg} rounded-2xl flex items-center justify-center mx-auto md:mx-0 shadow-xl`}>
                    <span className="text-2xl md:text-3xl font-black text-white">{featured.initials}</span>
                  </div>
                  <div className="mt-4">
                    <div className="flex items-center justify-center md:justify-start gap-1.5">
                      <h3 className="text-lg font-bold text-gray-900">{featured.name}</h3>
                      <BadgeCheck className="w-5 h-5 text-emerald-500" />
                    </div>
                    <p className="text-sm text-gray-500 mt-1 max-w-[220px]">{featured.school}</p>
                    <p className="text-xs text-gray-400 mt-1">{featured.date}</p>
                    <div className="flex items-center justify-center md:justify-start gap-0.5 mt-2">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                      ))}
                    </div>
                  </div>
                </div>

                {/* Right - Quote */}
                <div className="flex-1 relative">
                  <Quote className="w-8 h-8 md:w-12 md:h-12 text-gray-100 absolute -top-2 -left-2" />
                  <p className="text-lg md:text-2xl text-gray-800 font-medium leading-relaxed relative z-10 italic pl-4 md:pl-8 border-l-4 border-emerald-400">
                    "{featured.quote}"
                  </p>
                  <div className={`inline-flex items-center gap-1.5 mt-6 px-3 py-1.5 rounded-full ${featured.light} ${featured.text} text-xs font-bold border ${featured.border}`}>
                    <BadgeCheck className="w-3.5 h-3.5" />
                    Verified Student Feedback
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Navigation arrows below */}
          <div className="flex items-center justify-center gap-4 mt-6">
            <button onClick={() => goTo(activeIndex - 1)}
              className="w-10 h-10 rounded-full bg-gray-100 hover:bg-emerald-100 flex items-center justify-center transition-colors group border border-gray-200">
              <ChevronLeft className="w-5 h-5 text-gray-400 group-hover:text-emerald-600" />
            </button>

            {/* Dots */}
            <div className="flex gap-2">
              {testimonials.map((t, i) => (
                <button key={i} onClick={() => goTo(i)}
                  className={`rounded-full transition-all duration-300 ${
                    i === activeIndex
                      ? `w-8 sm:w-10 h-3 ${t.bg} shadow-md`
                      : "w-3 h-3 bg-gray-200 hover:bg-gray-300"
                  }`}
                />
              ))}
            </div>

            <button onClick={() => goTo(activeIndex + 1)}
              className="w-10 h-10 rounded-full bg-gray-100 hover:bg-emerald-100 flex items-center justify-center transition-colors group border border-gray-200">
              <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-emerald-600" />
            </button>
          </div>
        </div>

        {/* Feedback Cards Row */}
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-4">
            {testimonials.map((t, i) => (
              <button
                key={i}
                onClick={() => goTo(i)}
                className={`rounded-2xl p-5 text-left transition-all duration-300 border-2 ${
                  i === activeIndex
                    ? `${t.light} ${t.border} shadow-lg scale-[1.03]`
                    : "bg-gray-50 border-gray-100 hover:border-gray-200 hover:shadow-md"
                }`}
              >
                <div className="flex items-center gap-3 mb-3">
                  <div className={`w-11 h-11 rounded-xl ${t.bg} flex items-center justify-center flex-shrink-0 shadow-md`}>
                    <span className="text-sm font-bold text-white">{t.initials}</span>
                  </div>
                  <div className="min-w-0">
                    <p className={`text-sm font-bold truncate ${i === activeIndex ? t.text : 'text-gray-800'}`}>{t.name}</p>
                    <div className="flex gap-0.5 mt-0.5">
                      {[...Array(5)].map((_, j) => (
                        <Star key={j} className="w-3 h-3 fill-amber-400 text-amber-400" />
                      ))}
                    </div>
                  </div>
                </div>
                <p className="text-xs text-gray-500 line-clamp-3 leading-relaxed">"{t.quote}"</p>
                <p className="text-[10px] text-gray-400 mt-2 font-medium">{t.date}</p>
              </button>
            ))}
          </div>
        </div>

        {/* Trust Footer */}
        <div className="max-w-3xl mx-auto mt-14">
          <div className="bg-gradient-to-r from-emerald-50 via-green-50 to-emerald-50 rounded-2xl border-2 border-emerald-200 p-6">
            <div className="flex flex-col md:flex-row items-center justify-between gap-5">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-emerald-500 to-green-600 flex items-center justify-center shadow-lg shadow-emerald-500/20 flex-shrink-0">
                  <ThumbsUp className="w-6 h-6 text-white" />
                </div>
                <div>
                  <p className="text-sm font-bold text-gray-900">Collected from real classroom sessions</p>
                  <p className="text-xs text-gray-500 mt-0.5">Government schools across Namakkal, Erode & Tirupur</p>
                </div>
              </div>
              <div className="flex items-center gap-8">
                {[
                  { value: '98%', label: 'Satisfaction', color: 'text-emerald-600' },
                  { value: '500+', label: 'Learners', color: 'text-green-600' },
                  { value: '50+', label: 'Schools', color: 'text-emerald-600' },
                ].map((s, i) => (
                  <div key={i} className="text-center">
                    <p className={`text-2xl font-black ${s.color}`}>{s.value}</p>
                    <p className="text-[10px] text-gray-500 font-semibold uppercase tracking-wider">{s.label}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
