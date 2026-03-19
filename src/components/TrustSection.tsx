import { Shield, Brain, Globe, Clock, Lock, Zap, Languages, HeadphonesIcon } from 'lucide-react';

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
    <section className="py-16 md:py-20 bg-gradient-to-b from-gray-50 to-white">
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

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6 max-w-4xl mx-auto">
          {features.map((f, i) => (
            <div key={i} className="group bg-white rounded-xl p-5 border border-gray-100 hover:border-gray-200 hover:shadow-lg transition-all duration-300 text-center">
              <div
                className="w-12 h-12 mx-auto mb-3 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300"
                style={{ backgroundColor: `${f.color}15` }}
              >
                <f.icon className="w-6 h-6" style={{ color: f.color }} />
              </div>
              <h3 className="text-sm font-bold text-gray-800 mb-1">{f.title}</h3>
              <p className="text-xs text-gray-500 leading-relaxed">{f.desc}</p>
            </div>
          ))}
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
    </section>
  );
};

export default TrustSection;
