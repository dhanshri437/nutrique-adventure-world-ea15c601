import { UserPlus, Layers, Swords, Award, Globe } from "lucide-react";

const steps = [
  { icon: UserPlus, label: "Register / Login", color: "bg-game-green text-primary-foreground" },
  { icon: Layers, label: "Choose Level", color: "bg-game-orange text-secondary-foreground" },
  { icon: Swords, label: "Play Challenges", color: "bg-game-blue text-accent-foreground" },
  { icon: Award, label: "Earn Rewards", color: "bg-game-yellow text-foreground" },
  { icon: Globe, label: "Unlock New Worlds", color: "bg-game-purple text-primary-foreground" },
];

const GameplaySection = () => {
  return (
    <section className="py-20 bg-game-pattern">
      <div className="container mx-auto px-4">
        <h2 className="section-title">How to <span className="text-primary">Play</span></h2>
        <p className="section-subtitle">Your adventure in 5 simple steps!</p>
        <div className="flex flex-col md:flex-row items-center justify-center gap-4 md:gap-2 max-w-5xl mx-auto">
          {steps.map((step, i) => (
            <div key={i} className="flex items-center gap-2 md:gap-0 flex-col md:flex-row">
              <div className="flex flex-col items-center text-center">
                <div className={`w-16 h-16 rounded-2xl ${step.color} flex items-center justify-center mb-2 shadow-lg`}>
                  <step.icon className="w-8 h-8" />
                </div>
                <span className="font-display font-semibold text-sm text-foreground w-24">{step.label}</span>
              </div>
              {i < steps.length - 1 && (
                <div className="hidden md:block w-12 h-1 bg-border rounded-full mx-2 mt-[-1rem]" />
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default GameplaySection;
