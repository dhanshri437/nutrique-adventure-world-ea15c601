import { useGame } from './GameContext';
import { sounds } from './sounds';
import { useEffect, useState } from 'react';
import { RotateCcw, Home } from 'lucide-react';

const GameOver = () => {
  const { totalScore, score, levelsCompleted, stars, startGame, resetGame } = useGame();
  const [show, setShow] = useState(false);

  useEffect(() => {
    sounds.gameOver();
    setTimeout(() => setShow(true), 100);
  }, []);

  return (
    <div className={`absolute inset-0 z-40 flex items-center justify-center bg-gradient-to-br from-red-900 via-red-800 to-orange-900 transition-all duration-500 ${show ? 'opacity-100' : 'opacity-0'}`}>
      <div className={`text-center text-white transition-all duration-700 ${show ? 'scale-100' : 'scale-50'}`}>
        <div className="text-8xl mb-4">💔</div>
        <h2 className="text-5xl font-display font-bold mb-2">Game Over!</h2>
        <p className="text-xl mb-8 opacity-80">Too much junk food! Try again with healthier choices.</p>

        <div className="bg-white/20 rounded-2xl p-6 mb-8 inline-block backdrop-blur-sm">
          <p className="text-2xl font-bold mb-1">Score: {totalScore + score}</p>
          <p className="text-lg opacity-80">Levels: {levelsCompleted} | ⭐ {stars} Stars</p>
        </div>

        <div className="flex gap-4 justify-center">
          <button
            onClick={() => { sounds.click(); startGame(); }}
            className="bg-green-500 hover:bg-green-400 text-white font-bold text-lg px-8 py-4 rounded-full shadow-lg hover:scale-110 transition-transform flex items-center gap-2"
          >
            <RotateCcw className="w-5 h-5" /> Try Again
          </button>
          <button
            onClick={() => { sounds.click(); resetGame(); }}
            className="bg-white/20 hover:bg-white/30 text-white font-bold text-lg px-8 py-4 rounded-full shadow-lg hover:scale-105 transition-transform flex items-center gap-2"
          >
            <Home className="w-5 h-5" /> Exit
          </button>
        </div>
      </div>
    </div>
  );
};

export default GameOver;
