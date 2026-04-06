import { useGame } from './GameContext';
import { Heart, Zap, Star, X } from 'lucide-react';

const GameHUD = () => {
  const { score, strikes, energy, currentTheme, currentLevelType, levelsCompleted, stars } = useGame();

  const levelLabel = currentLevelType === 'rainbow' ? '🥗 Rainbow Plate' : currentLevelType === 'quiz' ? '🧠 Quiz Time' : '🏃 Food Runner';

  return (
    <div className="absolute top-0 left-0 right-0 z-30 p-3 flex items-center justify-between bg-black/30 backdrop-blur-sm text-white">
      <div className="flex items-center gap-3">
        <span className="text-lg font-bold">{currentTheme.emoji} {currentTheme.name}</span>
        <span className="bg-white/20 rounded-full px-3 py-1 text-sm font-semibold">{levelLabel}</span>
      </div>
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-1">
          <Star className="w-5 h-5 text-yellow-400 fill-yellow-400" />
          <span className="font-bold">{score}</span>
        </div>
        <div className="flex items-center gap-1">
          {Array.from({ length: 5 }).map((_, i) => (
            <X key={i} className={`w-4 h-4 ${i < strikes ? 'text-red-500' : 'text-white/30'}`} />
          ))}
        </div>
        {currentLevelType === 'runner' && (
          <div className="flex items-center gap-1 min-w-[100px]">
            <Zap className="w-5 h-5 text-blue-400" />
            <div className="w-20 h-3 bg-white/20 rounded-full overflow-hidden">
              <div
                className="h-full rounded-full transition-all duration-300"
                style={{
                  width: `${energy}%`,
                  background: energy > 50 ? '#4ade80' : energy > 25 ? '#fbbf24' : '#ef4444',
                }}
              />
            </div>
          </div>
        )}
        <div className="flex items-center gap-1">
          <Heart className="w-5 h-5 text-pink-400 fill-pink-400" />
          <span className="text-sm">Lv {levelsCompleted + 1}</span>
        </div>
      </div>
    </div>
  );
};

export default GameHUD;
