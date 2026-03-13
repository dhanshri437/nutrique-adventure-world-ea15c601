import rainbowPlateImg from "@/assets/rainbow-plate.png";
import { Sparkles, Zap, Star } from "lucide-react";

const RainbowPlateSection = () => {
  return (
    <section className="py-20 bg-card">
      <div className="container mx-auto px-4">
        <h2 className="section-title">🌈 Rainbow Plate <span className="text-secondary">Game Mode</span></h2>
        <p className="section-subtitle">Sort foods into a balanced rainbow plate and earn points!</p>
        <div className="grid md:grid-cols-2 gap-12 items-center max-w-5xl mx-auto">
          <div className="flex justify-center">
            <img src={rainbowPlateImg} alt="Rainbow Plate game" className="w-72 md:w-80 floating" />
          </div>
          <div className="space-y-6">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-game-green/10 flex items-center justify-center flex-shrink-0">
                <Sparkles className="w-6 h-6 text-game-green" />
              </div>
              <div>
                <h3 className="font-display font-bold text-lg text-foreground">Drag & Drop</h3>
                <p className="text-muted-foreground font-body">Sort foods into the right plate sections by dragging them!</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-game-orange/10 flex items-center justify-center flex-shrink-0">
                <Zap className="w-6 h-6 text-game-orange" />
              </div>
              <div>
                <h3 className="font-display font-bold text-lg text-foreground">Instant Feedback</h3>
                <p className="text-muted-foreground font-body">Get real-time feedback on your food choices!</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-game-yellow/10 flex items-center justify-center flex-shrink-0">
                <Star className="w-6 h-6 text-game-yellow" />
              </div>
              <div>
                <h3 className="font-display font-bold text-lg text-foreground">Earn Points</h3>
                <p className="text-muted-foreground font-body">Score points for correct sorting and unlock new foods!</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default RainbowPlateSection;
