import { Users, Building2, TrendingUp } from "lucide-react";

const stats = [
  { value: "5000+", label: "Students", icon: Users },
  { value: "500+", label: "Companies", icon: Building2 },
  { value: "95%", label: "Got Jobs", icon: TrendingUp },
];

const StatsBar = () => {
  return (
    <section className="bg-gradient-stats py-12">
      <div className="container mx-auto px-4 md:px-8">
        <div className="grid grid-cols-3 gap-8">
          {stats.map((stat, index) => (
            <div
              key={stat.label}
              className="text-center text-primary-foreground animate-fade-up"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <stat.icon className="w-6 h-6 md:w-8 md:h-8 mx-auto mb-2 text-accent" />
              <div className="text-2xl md:text-4xl font-bold mb-1">{stat.value}</div>
              <div className="text-xs md:text-sm text-primary-foreground/80 font-medium">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatsBar;
