import heroImg from "@/assets/hero-illustration.png";
import FloatingFruits from "./FloatingFruits";

interface HeroSectionProps {
  onPlayDemo: () => void;
}

const HeroSection = ({ onPlayDemo }: HeroSectionProps) => {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden bg-game-pattern pt-16">
      <FloatingFruits />
      <div className="container mx-auto px-4 relative z-10">
        <div className="grid md:grid-cols-2 gap-8 items-center">
          <div className="text-center md:text-left">
            <h1 className="text-5xl md:text-7xl font-display font-bold leading-tight mb-6">
              <span className="gradient-text">NutriHive –</span>
              <br />
              <span className="gradient-text">Eat Healthy,</span>
              <br />
              <span className="text-foreground">Play Smart!</span>
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground font-body mb-8 max-w-lg">
              NutriHive helps kids learn healthy eating through fun games, exciting adventures, and delicious discoveries!
            </p>
            <div className="flex flex-wrap gap-4 justify-center md:justify-start">
              <button onClick={onPlayDemo} className="game-btn-primary text-lg animate-pulse hover:animate-none">🎮 Play Demo</button>
              <a href="#cta" className="game-btn-secondary">📱 Download App</a>
              <a href="#worlds" className="game-btn-accent">🌍 Explore Game</a>
            </div>
          </div>
          <div className="flex justify-center">
            <img
              src={heroImg}
              alt="Kids exploring a colorful food world"
              className="w-full max-w-lg rounded-3xl shadow-2xl wiggle"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;