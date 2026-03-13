import { Apple, Gamepad2, BarChart3, Brain, Trophy } from "lucide-react";

const features = [
  { icon: Apple, title: "Balanced Diet Learning", desc: "Learn about food groups and nutrition", bg: "bg-game-green/10", color: "text-game-green" },
  { icon: Gamepad2, title: "Interactive Mini Games", desc: "Fun games that teach healthy habits", bg: "bg-game-orange/10", color: "text-game-orange" },
  { icon: BarChart3, title: "Progress Tracking", desc: "Watch your nutrition knowledge grow", bg: "bg-game-blue/10", color: "text-game-blue" },
  { icon: Brain, title: "Nutrition Knowledge", desc: "Build real-world food smarts", bg: "bg-game-purple/10", color: "text-game-purple" },
  { icon: Trophy, title: "Rewards & Achievements", desc: "Earn badges and unlock new levels", bg: "bg-game-yellow/10", color: "text-game-yellow" },
];

const FeaturesSection = () => {
  return (
    <section id="features" className="py-20 bg-game-pattern">
      <div className="container mx-auto px-4">
        <h2 className="section-title">Core <span className="text-secondary">Features</span></h2>
        <p className="section-subtitle">Discover what makes NutriQuest the most fun way to learn about healthy eating!</p>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {features.map((f, i) => (
            <div key={i} className={`game-card ${f.bg} border-2 border-transparent hover:border-current ${f.color}`}>
              <f.icon className={`w-10 h-10 mb-4 ${f.color}`} />
              <h3 className="font-display font-bold text-xl text-foreground mb-2">{f.title}</h3>
              <p className="text-muted-foreground font-body">{f.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
