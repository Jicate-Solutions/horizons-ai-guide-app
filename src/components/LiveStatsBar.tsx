import { useState, useEffect, useRef } from 'react';
import { Users, School, MapPin, Briefcase, TrendingUp, Shield } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';

const AnimatedCounter = ({ target, duration = 2000, suffix = '' }: { target: number; duration?: number; suffix?: string }) => {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const started = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true;
          const step = Math.ceil(target / (duration / 16));
          let current = 0;
          const timer = setInterval(() => {
            current += step;
            if (current >= target) { setCount(target); clearInterval(timer); }
            else setCount(current);
          }, 16);
        }
      },
      { threshold: 0.3 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [target, duration]);

  return <div ref={ref}>{count.toLocaleString('en-IN')}{suffix}</div>;
};

const LiveStatsBar = () => {
  const [liveCount, setLiveCount] = useState(0);
  const [schoolCount, setSchoolCount] = useState(0);
  const [districtCount, setDistrictCount] = useState(0);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const { data, error } = await supabase
          .from('registrations_12th_learners')
          .select('id, school_name, preferred_institution');
        
        if (!error && data) {
          setLiveCount(data.length);
          const schools = new Set(data.map(d => d.school_name).filter(Boolean));
          const districts = new Set(data.map(d => d.preferred_institution).filter(Boolean));
          setSchoolCount(schools.size);
          setDistrictCount(districts.size);
        }
      } catch (e) { /* silent */ }
    };
    fetchStats();
  }, []);

  const stats = [
    { icon: Users, value: Math.max(liveCount, 1), suffix: '+', label: 'Learners Registered', color: 'from-blue-400 to-blue-600' },
    { icon: School, value: Math.max(schoolCount, 1), suffix: '+', label: 'Schools Connected', color: 'from-emerald-400 to-emerald-600' },
    { icon: MapPin, value: Math.max(districtCount, 1), suffix: '+', label: 'Districts Reached', color: 'from-amber-400 to-amber-600' },
    { icon: Briefcase, value: 100, suffix: '+', label: 'Career Paths Mapped', color: 'from-purple-400 to-purple-600' },
  ];

  return (
    <section className="relative -mt-8 z-20 px-4">
      <div className="container mx-auto max-w-5xl">
        <div className="bg-white rounded-2xl shadow-2xl border border-gray-100 p-6 md:p-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
            {stats.map((stat, i) => (
              <div key={i} className="text-center group">
                <div className={`w-12 h-12 mx-auto mb-3 rounded-xl bg-gradient-to-br ${stat.color} flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                  <stat.icon className="w-6 h-6 text-white" />
                </div>
                <div className="text-2xl md:text-3xl font-black text-gray-900">
                  <AnimatedCounter target={stat.value} suffix={stat.suffix} />
                </div>
                <p className="text-xs md:text-sm text-gray-500 mt-1 font-medium">{stat.label}</p>
              </div>
            ))}
          </div>

          {/* Live indicator */}
          <div className="flex items-center justify-center gap-2 mt-6 pt-4 border-t border-gray-100">
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
            </span>
            <span className="text-[11px] text-gray-400 font-medium">Live data from Vazhikatti platform</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LiveStatsBar;
