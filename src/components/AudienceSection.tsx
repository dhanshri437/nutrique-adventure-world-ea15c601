import { Baby, GraduationCap, Palette, Puzzle, Salad, Lightbulb } from "lucide-react";

const earlyItems = [
  { icon: Palette, text: "Food recognition" },
  { icon: Puzzle, text: "Simple matching games" },
  { icon: Baby, text: "Colorful food activities" },
];

const growingItems = [
  { icon: Salad, text: "Nutrition challenges" },
  { icon: Lightbulb, text: "Decision making games" },
  { icon: GraduationCap, text: "Healthy lifestyle education" },
];

const AudienceSection = () => {
  return (
    <section className="py-20 bg-card">
      <div className="container mx-auto px-4">
        <h2 className="section-title">Who Plays <span className="text-accent">NutriHive</span>?</h2>
        <p className="section-subtitle">Tailored experiences for every age group!</p>
        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          <div className="game-card bg-game-green/5 border-2 border-game-green/20">
            <div className="text-5xl mb-4">👶</div>
            <h3 className="font-display font-bold text-2xl text-foreground mb-2">Early Learners</h3>
            <p className="text-game-green font-display font-semibold mb-4">Ages 4–8</p>
            <ul className="space-y-3">
              {earlyItems.map((item, i) => (
                <li key={i} className="flex items-center gap-3 text-muted-foreground">
                  <item.icon className="w-5 h-5 text-game-green flex-shrink-0" />
                  <span className="font-body">{item.text}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="game-card bg-game-blue/5 border-2 border-game-blue/20">
            <div className="text-5xl mb-4">🧒</div>
            <h3 className="font-display font-bold text-2xl text-foreground mb-2">Growing Explorers</h3>
            <p className="text-game-blue font-display font-semibold mb-4">Ages 9–12</p>
            <ul className="space-y-3">
              {growingItems.map((item, i) => (
                <li key={i} className="flex items-center gap-3 text-muted-foreground">
                  <item.icon className="w-5 h-5 text-game-blue flex-shrink-0" />
                  <span className="font-body">{item.text}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AudienceSection;