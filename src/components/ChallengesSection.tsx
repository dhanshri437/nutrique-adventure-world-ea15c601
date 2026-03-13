import { Droplets, ShieldCheck, Scale } from "lucide-react";

const challenges = [
  { icon: Droplets, title: "Hydration Quest", desc: "Reminding kids to drink water through fun challenges!", emoji: "💧", color: "bg-game-blue/10 border-game-blue/30 text-game-blue" },
  { icon: ShieldCheck, title: "Healthy vs Unhealthy", desc: "Sort foods into healthy and unhealthy categories!", emoji: "🥦", color: "bg-game-green/10 border-game-green/30 text-game-green" },
  { icon: Scale, title: "Snack Comparison", desc: "Compare snacks and pick the healthier option!", emoji: "⚖️", color: "bg-game-orange/10 border-game-orange/30 text-game-orange" },
];

const ChallengesSection = () => {
  return (
    <section className="py-20 bg-card">
      <div className="container mx-auto px-4">
        <h2 className="section-title">Special <span className="text-game-yellow">Challenges</span> ⚡</h2>
        <p className="section-subtitle">Take on fun mini challenges to test your nutrition knowledge!</p>
        <div className="grid sm:grid-cols-3 gap-6 max-w-4xl mx-auto">
          {challenges.map((c, i) => (
            <div key={i} className={`game-card border-2 ${c.color}`}>
              <div className="text-4xl mb-3">{c.emoji}</div>
              <c.icon className="w-8 h-8 mb-3" />
              <h3 className="font-display font-bold text-lg text-foreground mb-2">{c.title}</h3>
              <p className="text-muted-foreground font-body text-sm">{c.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ChallengesSection;
