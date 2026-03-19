import { UserPlus, ClipboardCheck, Rocket, ArrowRight } from 'lucide-react';

const steps = [
  {
    icon: UserPlus,
    number: '01',
    title: 'Register',
    titleTa: 'பதிவு செய்யுங்கள்',
    description: 'Sign up with your mobile number and basic details in just 2 minutes',
    image: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=400&h=300&fit=crop&auto=format',
    color: 'from-blue-500 to-blue-600',
    bg: 'bg-blue-50',
    border: 'border-blue-200',
    accent: '#3b82f6',
  },
  {
    icon: ClipboardCheck,
    number: '02',
    title: 'Take Assessment',
    titleTa: 'மதிப்பீடு எடுங்கள்',
    description: 'Complete an AI-powered career assessment to discover your ideal path',
    image: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=400&h=300&fit=crop&auto=format',
    color: 'from-emerald-500 to-emerald-600',
    bg: 'bg-emerald-50',
    border: 'border-emerald-200',
    accent: '#10b981',
  },
  {
    icon: Rocket,
    number: '03',
    title: 'Get Your Roadmap',
    titleTa: 'வழிகாட்டுதல் பெறுங்கள்',
    description: 'Receive a personalized career plan with colleges, courses, and exam guidance',
    image: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=400&h=300&fit=crop&auto=format',
    color: 'from-amber-500 to-orange-500',
    bg: 'bg-amber-50',
    border: 'border-amber-200',
    accent: '#f59e0b',
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

        <div className="max-w-5xl mx-auto space-y-6 md:space-y-0 md:grid md:grid-cols-3 md:gap-6">
          {steps.map((step, i) => (
            <div key={i} className="group relative">
              {/* Card */}
              <div className={`rounded-2xl overflow-hidden border-2 ${step.border} hover:shadow-xl transition-all duration-300 hover:-translate-y-1 ${step.bg}`}>
                {/* Image */}
                <div className="relative h-44 overflow-hidden">
                  <img
                    src={step.image}
                    alt={step.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                  {/* Number badge */}
                  <div className={`absolute top-3 left-3 w-10 h-10 rounded-xl bg-gradient-to-br ${step.color} flex items-center justify-center text-white text-sm font-black shadow-lg`}>
                    {step.number}
                  </div>
                  {/* Arrow between cards (desktop) */}
                  {i < 2 && (
                    <div className="hidden md:flex absolute top-1/2 -right-5 z-20 w-8 h-8 rounded-full bg-white shadow-md items-center justify-center border border-gray-200">
                      <ArrowRight className="w-4 h-4 text-gray-400" />
                    </div>
                  )}
                </div>

                {/* Content */}
                <div className="p-5">
                  <div className="flex items-center gap-2 mb-2">
                    <step.icon className="w-5 h-5" style={{ color: step.accent }} />
                    <h3 className="text-lg font-bold text-gray-900">{step.title}</h3>
                  </div>
                  <p className="text-sm text-emerald-600 font-medium mb-2">{step.titleTa}</p>
                  <p className="text-sm text-gray-500 leading-relaxed">{step.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
