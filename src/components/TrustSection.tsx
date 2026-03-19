import { Shield, Brain, Globe, Clock, Lock, Zap, Languages } from 'lucide-react';

const features = [
  { icon: Brain, title: 'AI-Powered', desc: 'Smart career predictions using advanced AI', color: '#3b82f6' },
  { icon: Globe, title: 'Tamil Nadu Focused', desc: 'All TN districts, universities & colleges covered', color: '#10b981' },
  { icon: Languages, title: 'Multi-Language', desc: 'Available in Tamil, English & more languages', color: '#8b5cf6' },
  { icon: Clock, title: '24/7 Available', desc: 'Access career guidance anytime, anywhere', color: '#f59e0b' },
  { icon: Lock, title: '100% Secure', desc: 'Your data is encrypted and protected', color: '#ef4444' },
  { icon: Zap, title: 'Instant Results', desc: 'Get career recommendations in seconds', color: '#ec4899' },
];

const TrustSection = () => {
  return (
    <section className="py-16 md:py-20 bg-gradient-to-b from-gray-50 to-white overflow-hidden">
      <div className="container mx-auto px-4 md:px-8">
        <div className="text-center mb-12">
          <span className="inline-flex items-center gap-2 bg-gradient-to-r from-emerald-50 to-green-50 text-emerald-700 px-4 py-2 rounded-full text-sm font-semibold mb-4 border border-emerald-200">
            <Shield className="w-4 h-4" />
            Why Choose Vazhikatti
          </span>
          <h2 className="font-serif text-2xl sm:text-4xl font-bold text-gray-900 mb-3">
            Built For <span className="bg-gradient-to-r from-emerald-600 to-green-600 bg-clip-text text-transparent">Learners</span>, By Experts
          </h2>
          <p className="text-base text-gray-500 max-w-2xl mx-auto">
            Everything you need to make confident career decisions
          </p>
        </div>

        {/* Main content - Image + Features */}
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center mb-12">
            {/* Left - Image collage */}
            <div className="relative">
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-3">
                  <div className="rounded-2xl overflow-hidden shadow-lg h-40">
                    <img src="https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=300&h=200&fit=crop&auto=format" alt="Students in classroom" className="w-full h-full object-cover" loading="lazy" />
                  </div>
                  <div className="rounded-2xl overflow-hidden shadow-lg h-52">
                    <img src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=300&h=260&fit=crop&auto=format" alt="Students studying" className="w-full h-full object-cover" loading="lazy" />
                  </div>
                </div>
                <div className="space-y-3 pt-6">
                  <div className="rounded-2xl overflow-hidden shadow-lg h-52">
                    <img src="https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=300&h=260&fit=crop&auto=format" alt="Teacher with students" className="w-full h-full object-cover" loading="lazy" />
                  </div>
                  <div className="rounded-2xl overflow-hidden shadow-lg h-40">
                    <img src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=300&h=200&fit=crop&auto=format" alt="Group discussion" className="w-full h-full object-cover" loading="lazy" />
                  </div>
                </div>
              </div>
              {/* Floating badge */}
              <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 bg-white rounded-xl shadow-xl px-5 py-3 border border-gray-100 flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-emerald-500 to-green-600 flex items-center justify-center">
                  <Shield className="w-5 h-5 text-white" />
                </div>
                <div>
                  <p className="text-sm font-bold text-gray-900">Trusted by Schools</p>
                  <p className="text-[10px] text-gray-500">Across Tamil Nadu</p>
                </div>
              </div>
            </div>

            {/* Right - Feature grid */}
            <div className="grid grid-cols-2 gap-4">
              {features.map((f, i) => (
                <div key={i} className="group bg-white rounded-xl p-4 border border-gray-100 hover:border-gray-200 hover:shadow-lg transition-all duration-300">
                  <div
                    className="w-11 h-11 mb-3 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300"
                    style={{ backgroundColor: `${f.color}12` }}
                  >
                    <f.icon className="w-5 h-5" style={{ color: f.color }} />
                  </div>
                  <h3 className="text-sm font-bold text-gray-800 mb-1">{f.title}</h3>
                  <p className="text-xs text-gray-500 leading-relaxed">{f.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Trust badges */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-10 mt-14 pt-8 border-t border-gray-100">
            {[
              { label: 'Powered by', bold: 'AI Technology' },
              { label: 'Covers', bold: '38 TN Districts' },
              { label: 'Supports', bold: '100+ Careers' },
              { label: 'Guided by', bold: 'Education Experts' },
            ].map((b, i) => (
              <div key={i} className="text-center">
                <p className="text-[10px] text-gray-400 uppercase tracking-wider">{b.label}</p>
                <p className="text-sm font-bold text-gray-700">{b.bold}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TrustSection;
