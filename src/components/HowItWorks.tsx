import { UserPlus, ClipboardCheck, Rocket } from 'lucide-react';

const steps = [
  {
    icon: UserPlus,
    number: '01',
    title: 'Register',
    titleTa: 'பதிவு செய்யுங்கள்',
    description: 'Sign up with your mobile number and basic details in just 2 minutes',
    color: 'from-blue-500 to-blue-600',
    bg: 'bg-blue-50',
    border: 'border-blue-200',
  },
  {
    icon: ClipboardCheck,
    number: '02',
    title: 'Take Assessment',
    titleTa: 'மதிப்பீடு எடுங்கள்',
    description: 'Complete an AI-powered career assessment to discover your ideal path',
    color: 'from-emerald-500 to-emerald-600',
    bg: 'bg-emerald-50',
    border: 'border-emerald-200',
  },
  {
    icon: Rocket,
    number: '03',
    title: 'Get Your Roadmap',
    titleTa: 'வழிகாட்டுதல் பெறுங்கள்',
    description: 'Receive a personalized career plan with colleges, courses, and exam guidance',
    color: 'from-amber-500 to-orange-500',
    bg: 'bg-amber-50',
    border: 'border-amber-200',
  },
];

const HowItWorks = () => {
  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="container mx-auto px-4 md:px-8">
        <div className="text-center mb-14">
          <span className="inline-flex items-center gap-2 bg-gradient-to-r from-gray-100 to-gray-50 text-gray-600 px-4 py-2 rounded-full text-sm font-semibold mb-4 border border-gray-200">
            Simple & Quick
          </span>
          <h2 className="font-serif text-2xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-3">
            How It Works
          </h2>
          <p className="text-base sm:text-lg text-gray-500 max-w-2xl mx-auto">
            Start your career journey in 3 simple steps
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="grid md:grid-cols-3 gap-6 md:gap-0 relative">
            {/* Connecting line (desktop) */}
            <div className="hidden md:block absolute top-16 left-[20%] right-[20%] h-0.5 bg-gradient-to-r from-blue-300 via-emerald-300 to-amber-300 z-0" />

            {steps.map((step, i) => (
              <div key={i} className="relative z-10 flex flex-col items-center text-center group">
                {/* Number badge */}
                <div className={`w-24 h-24 md:w-32 md:h-32 rounded-3xl ${step.bg} border-2 ${step.border} flex items-center justify-center mb-5 group-hover:scale-105 transition-all duration-300 shadow-sm group-hover:shadow-lg relative`}>
                  <step.icon className="w-10 h-10 md:w-14 md:h-14" style={{ color: step.color.includes('blue') ? '#3b82f6' : step.color.includes('emerald') ? '#10b981' : '#f59e0b' }} />
                  <div className={`absolute -top-2 -right-2 md:-top-3 md:-right-3 w-8 h-8 md:w-10 md:h-10 rounded-xl bg-gradient-to-br ${step.color} flex items-center justify-center text-white text-xs md:text-sm font-black shadow-lg`}>
                    {step.number}
                  </div>
                </div>

                <h3 className="text-lg font-bold text-gray-900 mb-1">{step.title}</h3>
                <p className="text-sm text-emerald-600 font-medium mb-2">{step.titleTa}</p>
                <p className="text-sm text-gray-500 max-w-[260px] leading-relaxed">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
