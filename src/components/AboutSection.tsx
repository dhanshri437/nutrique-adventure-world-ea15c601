import { BookOpen, Heart, Tv } from "lucide-react";

const points = [
  { icon: BookOpen, text: "Encourage balanced diet awareness", color: "text-game-green" },
  { icon: Heart, text: "Reduce unhealthy eating habits", color: "text-game-red" },
  { icon: Tv, text: "Turn screen time into meaningful learning", color: "text-game-blue" },
];

const AboutSection = () => {
  return (
    <section id="about" className="py-20 bg-card">
      <div className="container mx-auto px-4">
        <h2 className="section-title">What is <span className="text-primary">NutriHive</span>?</h2>
        <p className="section-subtitle">
          An educational adventure game that teaches children about healthy eating habits through engaging gameplay, challenges, and rewards.
        </p>
        <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          {points.map((p, i) => (
            <div key={i} className="game-card bg-background text-center">
              <p.icon className={`w-12 h-12 mx-auto mb-4 ${p.color}`} />
              <p className="font-display font-semibold text-lg text-foreground">{p.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AboutSection;