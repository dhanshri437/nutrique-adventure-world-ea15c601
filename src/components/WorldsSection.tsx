import { Star } from "lucide-react";

const worlds = [
  { name: "Healthy Food Adventure", emoji: "🥗", desc: "Learn food groups in a magical garden", stars: 1, bg: "from-game-green/20 to-game-green/5" },
  { name: "Jungle Safari", emoji: "🌴", desc: "Find tropical fruits in the wild jungle", stars: 2, bg: "from-game-green/20 to-game-yellow/5" },
  { name: "Desert Safari", emoji: "🏜️", desc: "Discover hydration secrets in the desert", stars: 2, bg: "from-game-orange/20 to-game-yellow/5" },
  { name: "Farm Frenzy", emoji: "🚜", desc: "Grow and harvest fresh vegetables", stars: 3, bg: "from-game-yellow/20 to-game-green/5" },
  { name: "Underwater World", emoji: "🐠", desc: "Explore seafood and omega-3 wonders", stars: 3, bg: "from-game-blue/20 to-game-purple/5" },
  { name: "Volcano Adventure", emoji: "🌋", desc: "Battle spicy junk food monsters", stars: 4, bg: "from-game-red/20 to-game-orange/5" },
  { name: "Drop-Down Chase", emoji: "🪂", desc: "Catch healthy foods falling from the sky", stars: 5, bg: "from-game-purple/20 to-game-pink/5" },
];

const WorldsSection = () => {
  return (
    <section id="worlds" className="py-20 bg-game-pattern">
      <div className="container mx-auto px-4">
        <h2 className="section-title">Adventure <span className="text-accent">Worlds</span></h2>
        <p className="section-subtitle">Explore exciting worlds and complete nutrition challenges!</p>
        <div className="flex gap-6 overflow-x-auto pb-4 snap-x snap-mandatory scrollbar-hide">
          {worlds.map((w, i) => (
            <div
              key={i}
              className={`game-card bg-gradient-to-b ${w.bg} min-w-[260px] snap-center border border-border`}
            >
              <div className="text-5xl mb-3">{w.emoji}</div>
              <h3 className="font-display font-bold text-lg text-foreground mb-1">{w.name}</h3>
              <p className="text-muted-foreground text-sm font-body mb-3">{w.desc}</p>
              <div className="flex gap-1">
                {Array.from({ length: 5 }).map((_, si) => (
                  <Star
                    key={si}
                    className={`w-4 h-4 ${si < w.stars ? "text-game-yellow fill-game-yellow" : "text-border"}`}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WorldsSection;
