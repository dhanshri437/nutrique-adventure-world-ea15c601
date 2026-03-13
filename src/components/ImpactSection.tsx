import { TrendingDown, Eye, ThumbsUp, Smartphone } from "lucide-react";

const impacts = [
  { icon: TrendingDown, text: "Addresses childhood obesity", color: "text-game-red" },
  { icon: Eye, text: "Promotes nutrition awareness", color: "text-game-green" },
  { icon: ThumbsUp, text: "Encourages healthy decision-making", color: "text-game-blue" },
  { icon: Smartphone, text: "Turns passive screen time into active learning", color: "text-game-orange" },
];

const ImpactSection = () => {
  return (
    <section className="py-20 bg-card">
      <div className="container mx-auto px-4">
        <h2 className="section-title">Real World <span className="text-game-green">Impact</span> 🌍</h2>
        <p className="section-subtitle">Making a real difference in children's lives!</p>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
          {impacts.map((item, i) => (
            <div key={i} className="game-card bg-background text-center">
              <item.icon className={`w-10 h-10 mx-auto mb-4 ${item.color}`} />
              <p className="font-display font-semibold text-foreground">{item.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ImpactSection;
