import { Link } from "react-router-dom";

interface CTASectionProps {
  onPlayDemo?: () => void;
}

const CTASection = ({ onPlayDemo }: CTASectionProps) => {
  return (
    <section id="cta" className="py-20 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-game-green via-game-blue to-game-purple opacity-90" />
      <div className="container mx-auto px-4 relative z-10 text-center">
        <h2 className="text-4xl md:text-6xl font-display font-bold text-primary-foreground mb-4">
          Start Your Healthy Adventure Today!
        </h2>
        <p className="text-lg text-primary-foreground/80 font-body mb-8 max-w-xl mx-auto">
          Join thousands of kids already learning about nutrition through play!
        </p>
        <div className="flex flex-wrap gap-4 justify-center">
          <Link to="/signup" className="game-btn bg-card text-foreground font-display hover:shadow-xl">✨ Sign Up</Link>
          <button className="game-btn bg-game-orange text-primary-foreground font-display hover:shadow-xl">📱 Download App</button>
          <button onClick={onPlayDemo} className="game-btn bg-game-yellow text-foreground font-display hover:shadow-xl">🎮 Play Demo</button>
        </div>
      </div>
    </section>
  );
};

export default CTASection;