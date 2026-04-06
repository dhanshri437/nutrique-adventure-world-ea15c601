import { useGame, GameProvider } from './GameContext';
import { sounds } from './sounds';
import GameHUD from './GameHUD';
import LevelTransition from './LevelTransition';
import GameOver from './GameOver';
import DemoLimit from './DemoLimit';
import RainbowPlateGame from './RainbowPlateGame';
import QuizGame from './QuizGame';
import RunnerGame from './RunnerGame';
import { X, Play } from 'lucide-react';
import { useState, useEffect } from 'react';

const GameMenu = () => {
  const { startGame } = useGame();
  const [show, setShow] = useState(false);

  useEffect(() => {
    setTimeout(() => setShow(true), 100);
  }, []);

  return (
    <div className={`absolute inset-0 flex items-center justify-center bg-gradient-to-br from-green-400 via-emerald-500 to-teal-600 transition-all duration-500 ${show ? 'opacity-100' : 'opacity-0'}`}>
      {/* Floating emojis */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {['🍎', '🥦', '🥕', '🍇', '🍌', '🍓', '🥬', '🫐', '🍊', '🥑', '🍅', '💧'].map((e, i) => (
          <div
            key={i}
            className="absolute text-4xl animate-bounce opacity-40"
            style={{
              left: `${(i * 8.3) % 100}%`,
              top: `${10 + (i * 17) % 80}%`,
              animationDelay: `${i * 0.3}s`,
              animationDuration: `${2 + i * 0.2}s`,
            }}
          >
            {e}
          </div>
        ))}
      </div>

      <div className={`text-center text-white z-10 transition-all duration-700 ${show ? 'scale-100 translate-y-0' : 'scale-75 translate-y-10'}`}>
        <h1 className="text-6xl md:text-8xl font-display font-bold mb-4 drop-shadow-lg">🥦 NutriQuest</h1>
        <p className="text-xl md:text-2xl mb-8 opacity-90">Eat Healthy, Play Smart!</p>

        <div className="bg-white/20 backdrop-blur-sm rounded-3xl p-6 mb-8 max-w-md mx-auto">
          <h3 className="text-lg font-bold mb-3">🎮 Game Levels</h3>
          <div className="space-y-2 text-left">
            <p>🥗 <strong>Rainbow Plate</strong> – Sort healthy food onto your plate</p>
            <p>🧠 <strong>Quiz Time</strong> – Answer nutrition questions</p>
            <p>🏃 <strong>Food Runner</strong> – Collect healthy food, avoid junk!</p>
          </div>
        </div>

        <button
          onClick={() => { sounds.click(); startGame(); }}
          className="bg-white text-green-700 font-bold text-2xl px-12 py-5 rounded-full shadow-xl hover:scale-110 transition-transform flex items-center gap-3 mx-auto"
        >
          <Play className="w-8 h-8 fill-green-700" /> Start Game
        </button>

        <p className="mt-6 text-sm opacity-70">Use Arrow Keys / Swipe to move in runner mode</p>
      </div>
    </div>
  );
};

const GameContent = ({ onClose }: { onClose: () => void }) => {
  const { phase, currentLevelType, currentTheme } = useGame();

  return (
    <div className="fixed inset-0 z-[100] bg-black">
      {/* Background */}
      <div className={`absolute inset-0 bg-gradient-to-br ${currentTheme.bg} transition-all duration-1000`} />

      {/* Close button */}
      <button
        onClick={onClose}
        className="absolute top-3 right-3 z-50 bg-black/30 hover:bg-black/50 text-white rounded-full p-2 transition-colors"
      >
        <X className="w-6 h-6" />
      </button>

      {/* HUD */}
      {phase === 'playing' && <GameHUD />}

      {/* Game content */}
      {phase === 'menu' && <GameMenu />}
      {phase === 'playing' && currentLevelType === 'rainbow' && <RainbowPlateGame />}
      {phase === 'playing' && currentLevelType === 'quiz' && <QuizGame />}
      {phase === 'playing' && currentLevelType === 'runner' && <RunnerGame />}
      {phase === 'transition' && <LevelTransition />}
      {phase === 'gameover' && <GameOver />}
      {phase === 'demolimit' && <DemoLimit />}
    </div>
  );
};

interface GameScreenProps {
  open: boolean;
  onClose: () => void;
}

const GameScreen = ({ open, onClose }: GameScreenProps) => {
  if (!open) return null;

  return (
    <GameProvider>
      <GameContent onClose={onClose} />
    </GameProvider>
  );
};

export default GameScreen;
