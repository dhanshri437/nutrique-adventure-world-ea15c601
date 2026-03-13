import monsterGreasy from "@/assets/monster-greasy.png";
import monsterIcecream from "@/assets/monster-icecream.png";
import monsterGalactic from "@/assets/monster-galactic.png";

const monsters = [
  { img: monsterGreasy, name: "Greasy Goblin", desc: "A monster made of greasy junk food! Defeat it with healthy veggie power!", hp: 75 },
  { img: monsterIcecream, name: "Ice Cream Monster", desc: "This melting menace loves sugar! Counter with fruit smoothie attacks!", hp: 85 },
  { img: monsterGalactic, name: "Galactic Junk Warrior", desc: "The ultimate junk food boss from outer space! Only balanced meals can stop it!", hp: 95 },
];

const MonstersSection = () => {
  return (
    <section className="py-20 bg-gradient-to-b from-foreground/5 to-background">
      <div className="container mx-auto px-4">
        <h2 className="section-title">Boss Battles 👾</h2>
        <p className="section-subtitle">Defeat junk food monsters by making healthy food choices!</p>
        <div className="grid sm:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {monsters.map((m, i) => (
            <div key={i} className="game-card bg-card border-2 border-game-red/20 text-center group">
              <img src={m.img} alt={m.name} className="w-32 h-32 mx-auto mb-4 group-hover:animate-wiggle" />
              <h3 className="font-display font-bold text-xl text-destructive mb-2">{m.name}</h3>
              <p className="text-muted-foreground font-body text-sm mb-4">{m.desc}</p>
              <div className="w-full bg-muted rounded-full h-3 overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-game-red to-game-orange rounded-full transition-all duration-500"
                  style={{ width: `${m.hp}%` }}
                />
              </div>
              <p className="text-xs text-muted-foreground mt-1 font-display">HP: {m.hp}/100</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default MonstersSection;
