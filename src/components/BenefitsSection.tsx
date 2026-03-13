import { Heart, Smile, BookOpen, Shield, BarChart3, Monitor } from "lucide-react";

const kidsBenefits = [
  { icon: Heart, text: "Build healthy habits" },
  { icon: Smile, text: "Fun learning experience" },
  { icon: BookOpen, text: "Improved nutrition knowledge" },
];

const parentBenefits = [
  { icon: Monitor, text: "Educational screen time" },
  { icon: Shield, text: "Safe learning environment" },
  { icon: BarChart3, text: "Progress tracking" },
];

const BenefitsSection = () => {
  return (
    <section id="benefits" className="py-20 bg-game-pattern">
      <div className="container mx-auto px-4">
        <h2 className="section-title">Why <span className="text-primary">NutriQuest</span>?</h2>
        <p className="section-subtitle">Benefits for the whole family!</p>
        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          <div className="game-card bg-card">
            <h3 className="font-display font-bold text-2xl text-game-green mb-6 flex items-center gap-2">👧 For Kids</h3>
            <ul className="space-y-4">
              {kidsBenefits.map((b, i) => (
                <li key={i} className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-game-green/10 flex items-center justify-center">
                    <b.icon className="w-5 h-5 text-game-green" />
                  </div>
                  <span className="font-body font-semibold text-foreground">{b.text}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="game-card bg-card">
            <h3 className="font-display font-bold text-2xl text-game-blue mb-6 flex items-center gap-2">👨‍👩‍👧 For Parents</h3>
            <ul className="space-y-4">
              {parentBenefits.map((b, i) => (
                <li key={i} className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-game-blue/10 flex items-center justify-center">
                    <b.icon className="w-5 h-5 text-game-blue" />
                  </div>
                  <span className="font-body font-semibold text-foreground">{b.text}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BenefitsSection;
