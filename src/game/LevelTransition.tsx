import { useGame } from './GameContext';
import { sounds } from './sounds';
import { useEffect, useState } from 'react';
import { Star, Trophy, ArrowRight } from 'lucide-react';

const LevelTransition = () => {
  const { score, totalScore, levelsCompleted, stars, nextLevel, currentTheme } = useGame();
  const [show, setShow] = useState(false);
  const earnedStars = score >= 100 ? 3 : score >= 60 ? 2 : 1;

  useEffect(() => {
    sounds.levelComplete();
    setTimeout(() => setShow(true), 100);
  }, []);

  return (
    <div className={`absolute inset-0 z-40 flex items-center justify-center bg-gradient-to-br ${currentTheme.bg} transition-all duration-500 ${show ? 'opacity-100' : 'opacity-0'}`}>
      {/* Celebration particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {Array.from({ length: 30 }).map((_, i) => (
          <div
            key={i}
            className="absolute animate-bounce"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 2}s`,
              animationDuration: `${1 + Math.random() * 2}s`,
              fontSize: `${16 + Math.random() * 24}px`,
            }}
          >
            {['🎉', '⭐', '🎊', '✨', '🌟', '🎈'][i % 6]}
          </div>
        ))}
      </div>

      <div className={`text-center text-white transition-all duration-700 ${show ? 'scale-100 translate-y-0' : 'scale-50 translate-y-10'}`}>
        <Trophy className="w-20 h-20 mx-auto mb-4 text-yellow-300 animate-bounce" />
        <h2 className="text-5xl font-display font-bold mb-2">Level Complete! 🎉</h2>
        <p className="text-2xl mb-6 opacity-90">{currentTheme.emoji} {currentTheme.name}</p>

        <div className="flex justify-center gap-2 mb-6">
          {Array.from({ length: 3 }).map((_, i) => (
            <Star
              key={i}
              className={`w-12 h-12 transition-all duration-500 ${i < earnedStars ? 'text-yellow-300 fill-yellow-300 scale-100' : 'text-white/30 scale-75'}`}
              style={{ transitionDelay: `${i * 200 + 300}ms` }}
            />
          ))}
        </div>

        <div className="bg-white/20 rounded-2xl p-6 mb-8 inline-block backdrop-blur-sm">
          <p className="text-3xl font-bold mb-1">Score: {score}</p>
          <p className="text-lg opacity-80">Total: {totalScore} | ⭐ {stars} Stars</p>
        </div>

        <button
          onClick={() => { sounds.click(); nextLevel(); }}
          className="bg-white text-gray-900 font-bold text-xl px-10 py-4 rounded-full shadow-lg hover:scale-110 transition-transform flex items-center gap-3 mx-auto"
        >
          Next Level <ArrowRight className="w-6 h-6" />
        </button>
      </div>
    </div>
  );
};

export default LevelTransition;
