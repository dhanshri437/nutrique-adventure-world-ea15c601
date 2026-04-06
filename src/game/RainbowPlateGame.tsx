import { useState, useCallback, useRef, useEffect } from 'react';
import { useGame } from './GameContext';
import { sounds } from './sounds';

interface FoodItem {
  id: number;
  emoji: string;
  name: string;
  healthy: boolean;
  x: number;
  y: number;
  placed: boolean;
  feedback?: 'good' | 'bad';
}

const HEALTHY_FOODS = [
  { emoji: '🍎', name: 'Apple' }, { emoji: '🥦', name: 'Broccoli' }, { emoji: '🥕', name: 'Carrot' },
  { emoji: '🍇', name: 'Grapes' }, { emoji: '🥬', name: 'Lettuce' }, { emoji: '🍌', name: 'Banana' },
  { emoji: '🫐', name: 'Blueberry' }, { emoji: '🍊', name: 'Orange' }, { emoji: '🥒', name: 'Cucumber' },
  { emoji: '🍓', name: 'Strawberry' }, { emoji: '🥑', name: 'Avocado' }, { emoji: '🍅', name: 'Tomato' },
];

const JUNK_FOODS = [
  { emoji: '🍔', name: 'Burger' }, { emoji: '🍕', name: 'Pizza' }, { emoji: '🍩', name: 'Donut' },
  { emoji: '🍟', name: 'Fries' }, { emoji: '🍭', name: 'Candy' }, { emoji: '🧁', name: 'Cupcake' },
  { emoji: '🌭', name: 'Hot Dog' }, { emoji: '🍫', name: 'Chocolate' },
];

function generateFoods(): FoodItem[] {
  const items: FoodItem[] = [];
  const healthyCount = 6 + Math.floor(Math.random() * 3);
  const junkCount = 3 + Math.floor(Math.random() * 3);

  for (let i = 0; i < healthyCount; i++) {
    const food = HEALTHY_FOODS[Math.floor(Math.random() * HEALTHY_FOODS.length)];
    items.push({ id: i, ...food, healthy: true, x: 0, y: 0, placed: false });
  }
  for (let i = 0; i < junkCount; i++) {
    const food = JUNK_FOODS[Math.floor(Math.random() * JUNK_FOODS.length)];
    items.push({ id: healthyCount + i, ...food, healthy: false, x: 0, y: 0, placed: false });
  }

  // Randomize positions around the plate
  return items.sort(() => Math.random() - 0.5).map((item, idx) => {
    const angle = (idx / items.length) * Math.PI * 2;
    const radius = 35 + Math.random() * 10;
    return { ...item, x: 50 + Math.cos(angle) * radius, y: 50 + Math.sin(angle) * radius };
  });
}

const RainbowPlateGame = () => {
  const { addScore, addStrike, completeLevel, currentTheme, setPhase } = useGame();
  const [foods, setFoods] = useState<FoodItem[]>(() => generateFoods());
  const [healthyPlaced, setHealthyPlaced] = useState(0);
  const [junkPlaced, setJunkPlaced] = useState(0);
  const [plateGlow, setPlateGlow] = useState<'none' | 'green' | 'red'>('none');
  const [rotation, setRotation] = useState(0);
  const [dragging, setDragging] = useState<number | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const totalHealthy = foods.filter(f => f.healthy).length;

  // Rotate plate
  useEffect(() => {
    const interval = setInterval(() => setRotation(r => r + 0.5), 50);
    return () => clearInterval(interval);
  }, []);

  const handleDrop = useCallback((id: number) => {
    setFoods(prev => {
      const food = prev.find(f => f.id === id);
      if (!food || food.placed) return prev;

      if (food.healthy) {
        sounds.healthy();
        addScore(15);
        setHealthyPlaced(h => {
          const newH = h + 1;
          if (newH >= totalHealthy) {
            setTimeout(() => completeLevel(), 1000);
          }
          return newH;
        });
        setPlateGlow('green');
        setTimeout(() => setPlateGlow('none'), 500);
        return prev.map(f => f.id === id ? { ...f, placed: true, feedback: 'good' } : f);
      } else {
        sounds.junk();
        const gameOver = addStrike();
        setJunkPlaced(j => j + 1);
        setPlateGlow('red');
        setTimeout(() => setPlateGlow('none'), 500);
        if (gameOver) return prev;
        return prev.map(f => f.id === id ? { ...f, feedback: 'bad' } : f);
      }
    });
    setDragging(null);
  }, [addScore, addStrike, completeLevel, totalHealthy]);

  const handleDragStart = (e: React.DragEvent | React.TouchEvent, id: number) => {
    setDragging(id);
    if ('dataTransfer' in e) {
      e.dataTransfer.setData('text/plain', String(id));
    }
  };

  const handleTouchEnd = useCallback((id: number, e: React.TouchEvent) => {
    e.preventDefault();
    const touch = e.changedTouches[0];
    const container = containerRef.current;
    if (!container) return;
    const rect = container.getBoundingClientRect();
    const cx = rect.width / 2;
    const cy = rect.height / 2;
    const tx = touch.clientX - rect.left;
    const ty = touch.clientY - rect.top;
    const dist = Math.sqrt((tx - cx) ** 2 + (ty - cy) ** 2);
    if (dist < 120) {
      handleDrop(id);
    }
    setDragging(null);
  }, [handleDrop]);

  return (
    <div ref={containerRef} className="absolute inset-0 flex flex-col items-center justify-center select-none">
      <p className="text-white text-lg font-bold mb-2 z-10">Drag healthy foods onto the plate! 🍽️</p>

      {/* Plate */}
      <div
        className="relative w-48 h-48 md:w-56 md:h-56 rounded-full flex items-center justify-center transition-all duration-300"
        style={{
          background: 'radial-gradient(circle, #fff 0%, #f0f0f0 60%, #ddd 100%)',
          transform: `rotate(${rotation}deg)`,
          boxShadow: plateGlow === 'green' ? '0 0 60px 20px rgba(74,222,128,0.6)' :
                     plateGlow === 'red' ? '0 0 60px 20px rgba(239,68,68,0.6)' :
                     '0 10px 40px rgba(0,0,0,0.3)',
        }}
        onDragOver={e => e.preventDefault()}
        onDrop={e => {
          e.preventDefault();
          const id = parseInt(e.dataTransfer.getData('text/plain'));
          handleDrop(id);
        }}
      >
        {/* Plate sections */}
        <div className="absolute inset-4 rounded-full border-4 border-dashed border-gray-300 flex items-center justify-center">
          <span className="text-4xl" style={{ transform: `rotate(${-rotation}deg)` }}>🍽️</span>
        </div>
        {/* Placed foods on plate */}
        {foods.filter(f => f.placed).map((f, i) => {
          const a = (i / 6) * Math.PI * 2;
          return (
            <span
              key={f.id}
              className="absolute text-2xl animate-bounce"
              style={{
                left: `${50 + Math.cos(a) * 30}%`,
                top: `${50 + Math.sin(a) * 30}%`,
                transform: `rotate(${-rotation}deg) translate(-50%, -50%)`,
              }}
            >
              {f.emoji}
            </span>
          );
        })}
      </div>

      {/* Progress */}
      <div className="mt-4 z-10 flex items-center gap-4">
        <div className="bg-white/20 rounded-full px-4 py-2 text-white backdrop-blur-sm">
          <span className="text-green-300 font-bold">✅ {healthyPlaced}/{totalHealthy}</span>
          {junkPlaced > 0 && <span className="ml-3 text-red-300 font-bold">❌ {junkPlaced}</span>}
        </div>
      </div>

      {/* Food items around the plate */}
      {foods.filter(f => !f.placed).map(food => (
        <div
          key={food.id}
          draggable
          onDragStart={e => handleDragStart(e, food.id)}
          onTouchStart={e => handleDragStart(e, food.id)}
          onTouchEnd={e => handleTouchEnd(food.id, e)}
          className={`absolute cursor-grab active:cursor-grabbing transition-all duration-300 z-20
            ${food.feedback === 'bad' ? 'animate-ping opacity-0' : 'hover:scale-125'}
            ${dragging === food.id ? 'scale-125 opacity-70' : ''}`}
          style={{
            left: `${food.x}%`,
            top: `${food.y}%`,
            transform: 'translate(-50%, -50%)',
          }}
        >
          <div className="bg-white/90 rounded-2xl p-2 shadow-lg backdrop-blur-sm flex flex-col items-center min-w-[60px]">
            <span className="text-3xl">{food.emoji}</span>
            <span className="text-[10px] font-bold text-gray-700">{food.name}</span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default RainbowPlateGame;
