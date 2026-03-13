import { Star, Trophy, Lock, User } from "lucide-react";

const rewards = [
  { icon: Star, title: "Points & XP", desc: "Earn points for every healthy choice", value: "2,450 XP", color: "text-game-yellow" },
  { icon: Trophy, title: "Badges", desc: "Collect achievement badges", value: "12 Earned", color: "text-game-orange" },
  { icon: Lock, title: "Unlock Levels", desc: "Progress to new adventure worlds", value: "Level 5", color: "text-game-blue" },
  { icon: User, title: "Avatar Upgrades", desc: "Customize your game character", value: "8 Items", color: "text-game-purple" },
];

const RewardsSection = () => {
  return (
    <section className="py-20 bg-card">
      <div className="container mx-auto px-4">
        <h2 className="section-title">Rewards & <span className="text-game-yellow">Progress</span> 🏆</h2>
        <p className="section-subtitle">Track your progress and earn awesome rewards!</p>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
          {rewards.map((r, i) => (
            <div key={i} className="game-card bg-background text-center">
              <r.icon className={`w-10 h-10 mx-auto mb-3 ${r.color}`} />
              <p className={`font-display font-bold text-2xl ${r.color} mb-1`}>{r.value}</p>
              <h3 className="font-display font-semibold text-foreground mb-1">{r.title}</h3>
              <p className="text-muted-foreground font-body text-sm">{r.desc}</p>
            </div>
          ))}
        </div>
        {/* Progress bar demo */}
        <div className="max-w-md mx-auto mt-12">
          <div className="flex justify-between mb-2">
            <span className="font-display font-semibold text-foreground">Level Progress</span>
            <span className="font-display text-primary font-bold">72%</span>
          </div>
          <div className="w-full bg-muted rounded-full h-5 overflow-hidden">
            <div className="h-full bg-gradient-to-r from-game-green via-game-blue to-game-purple rounded-full transition-all duration-1000" style={{ width: "72%" }} />
          </div>
        </div>
      </div>
    </section>
  );
};

export default RewardsSection;
