import { useGame } from './GameContext';
import { sounds } from './sounds';
import { useEffect, useState } from 'react';
import { Lock, Home, Star } from 'lucide-react';

const DemoLimit = () => {
  const { totalScore, stars, resetGame } = useGame();
  const [show, setShow] = useState(false);

  useEffect(() => {
    setTimeout(() => setShow(true), 100);
  }, []);

  return (
    <div className={`absolute inset-0 z-40 flex items-center justify-center bg-gradient-to-br from-purple-900 via-indigo-800 to-blue-900 transition-all duration-500 ${show ? 'opacity-100' : 'opacity-0'}`}>
      <div className={`text-center text-white transition-all duration-700 max-w-lg ${show ? 'scale-100' : 'scale-50'}`}>
        <Lock className="w-20 h-20 mx-auto mb-4 text-yellow-300" />
        <h2 className="text-4xl font-display font-bold mb-2">Demo Complete! 🎮</h2>
        <p className="text-xl mb-6 opacity-80">You've explored the demo levels. Unlock more adventures!</p>

        <div className="bg-white/20 rounded-2xl p-6 mb-6 backdrop-blur-sm">
          <p className="text-2xl font-bold mb-2">Your Journey</p>
          <div className="flex justify-center gap-6">
            <div><p className="text-3xl font-bold">{totalScore}</p><p className="text-sm opacity-70">Total Score</p></div>
            <div><p className="text-3xl font-bold flex items-center justify-center gap-1"><Star className="w-6 h-6 text-yellow-300 fill-yellow-300" />{stars}</p><p className="text-sm opacity-70">Stars</p></div>
          </div>
        </div>

        <p className="text-lg mb-6">Unlock 6 adventure worlds with 18+ levels!</p>

        <div className="flex flex-col gap-3 items-center">
          <button className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white font-bold text-lg px-10 py-4 rounded-full shadow-lg hover:scale-110 transition-transform">
            🔓 Subscribe to Unlock – $4.99/mo
          </button>
          <button
            onClick={() => { sounds.click(); resetGame(); }}
            className="bg-white/20 hover:bg-white/30 text-white font-bold px-8 py-3 rounded-full transition-all flex items-center gap-2"
          >
            <Home className="w-5 h-5" /> Back to Home
          </button>
        </div>
      </div>
    </div>
  );
};

export default DemoLimit;
