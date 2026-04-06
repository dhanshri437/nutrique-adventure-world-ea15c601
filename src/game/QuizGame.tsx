import { useState, useCallback, useEffect } from 'react';
import { useGame } from './GameContext';
import { sounds } from './sounds';

interface Question {
  q: string;
  options: string[];
  correct: number;
  emoji: string;
}

const ALL_QUESTIONS: Question[] = [
  { q: "Which food group gives you the most energy?", options: ["Candy", "Whole Grains", "Soda", "Chips"], correct: 1, emoji: "🌾" },
  { q: "Which vitamin is found in oranges?", options: ["Vitamin A", "Vitamin D", "Vitamin C", "Vitamin K"], correct: 2, emoji: "🍊" },
  { q: "How many glasses of water should kids drink daily?", options: ["2", "4", "6-8", "12"], correct: 2, emoji: "💧" },
  { q: "Which is a healthy snack?", options: ["Chips", "Apple slices", "Candy bar", "Soda"], correct: 1, emoji: "🍎" },
  { q: "What does protein help build?", options: ["Hair only", "Muscles", "Teeth only", "Nothing"], correct: 1, emoji: "💪" },
  { q: "Which food has the most calcium?", options: ["Pizza", "Milk", "Fries", "Hotdog"], correct: 1, emoji: "🥛" },
  { q: "What is a balanced meal?", options: ["Only meat", "Only fruits", "Mix of food groups", "Only desserts"], correct: 2, emoji: "🍱" },
  { q: "Which vegetable is orange?", options: ["Broccoli", "Spinach", "Carrot", "Lettuce"], correct: 2, emoji: "🥕" },
  { q: "What meal should you never skip?", options: ["Lunch", "Dinner", "Breakfast", "Dessert"], correct: 2, emoji: "🌅" },
  { q: "Which drink is healthiest?", options: ["Soda", "Juice box", "Water", "Energy drink"], correct: 2, emoji: "🚰" },
];

function pickQuestions(n: number): Question[] {
  const shuffled = [...ALL_QUESTIONS].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, n);
}

const QuizGame = () => {
  const { addScore, addStrike, completeLevel } = useGame();
  const [questions] = useState(() => pickQuestions(5));
  const [currentQ, setCurrentQ] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [correctCount, setCorrectCount] = useState(0);
  const [foodRain, setFoodRain] = useState(false);

  const q = questions[currentQ];

  const handleAnswer = useCallback((idx: number) => {
    if (showResult) return;
    setSelected(idx);
    setShowResult(true);

    if (idx === q.correct) {
      sounds.correct();
      addScore(20);
      setCorrectCount(c => c + 1);
      setFoodRain(true);
      setTimeout(() => setFoodRain(false), 1500);
    } else {
      sounds.wrong();
      addStrike();
    }

    setTimeout(() => {
      if (currentQ + 1 >= questions.length) {
        completeLevel();
      } else {
        setCurrentQ(c => c + 1);
        setSelected(null);
        setShowResult(false);
      }
    }, 2000);
  }, [showResult, q, currentQ, questions.length, addScore, addStrike, completeLevel]);

  return (
    <div className="absolute inset-0 flex items-center justify-center p-4">
      {/* Food rain effect */}
      {foodRain && (
        <div className="absolute inset-0 pointer-events-none overflow-hidden z-30">
          {Array.from({ length: 20 }).map((_, i) => (
            <div
              key={i}
              className="absolute text-3xl"
              style={{
                left: `${Math.random() * 100}%`,
                animation: `fall ${1 + Math.random()}s linear forwards`,
                animationDelay: `${Math.random() * 0.5}s`,
              }}
            >
              {['🍎', '🥦', '🍇', '🥕', '🍌', '🍓'][i % 6]}
            </div>
          ))}
        </div>
      )}

      <div className="max-w-lg w-full">
        {/* Progress */}
        <div className="flex gap-2 mb-6 justify-center">
          {questions.map((_, i) => (
            <div
              key={i}
              className={`w-10 h-2 rounded-full transition-all ${
                i < currentQ ? 'bg-green-400' : i === currentQ ? 'bg-yellow-400 scale-y-150' : 'bg-white/30'
              }`}
            />
          ))}
        </div>

        {/* Question */}
        <div className="bg-white/20 backdrop-blur-md rounded-3xl p-8 text-center">
          <span className="text-6xl block mb-4">{q.emoji}</span>
          <h3 className="text-2xl font-bold text-white mb-6">{q.q}</h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {q.options.map((opt, idx) => {
              let bg = 'bg-white/90 text-gray-800 hover:bg-white hover:scale-105';
              if (showResult) {
                if (idx === q.correct) bg = 'bg-green-400 text-white scale-105';
                else if (idx === selected) bg = 'bg-red-400 text-white scale-95';
                else bg = 'bg-white/50 text-gray-500';
              }
              return (
                <button
                  key={idx}
                  onClick={() => handleAnswer(idx)}
                  disabled={showResult}
                  className={`${bg} font-bold text-lg py-4 px-6 rounded-2xl shadow-md transition-all duration-300 cursor-pointer disabled:cursor-default`}
                >
                  {String.fromCharCode(65 + idx)}. {opt}
                </button>
              );
            })}
          </div>

          {showResult && (
            <p className={`mt-4 text-lg font-bold ${selected === q.correct ? 'text-green-300' : 'text-red-300'}`}>
              {selected === q.correct ? '🎉 Correct! Great job!' : `❌ The answer is: ${q.options[q.correct]}`}
            </p>
          )}
        </div>

        <p className="text-center text-white/70 mt-4">Question {currentQ + 1} of {questions.length}</p>
      </div>

      <style>{`
        @keyframes fall {
          from { top: -10%; opacity: 1; }
          to { top: 110%; opacity: 0; }
        }
      `}</style>
    </div>
  );
};

export default QuizGame;
