import { useRef, useEffect, useCallback, useState } from 'react';
import { useGame } from './GameContext';
import { sounds } from './sounds';

interface Item {
  x: number;
  y: number;
  type: 'healthy' | 'junk' | 'water';
  emoji: string;
  speed: number;
  collected: boolean;
}

const HEALTHY = ['🍎', '🥦', '🥕', '🍇', '🍌', '🍓', '🥬', '🫐'];
const JUNK = ['🍔', '🍕', '🍩', '🍟', '🍭', '🧁'];
const WATER = ['💧', '🥤'];

const LANE_COUNT = 3;

const RunnerGame = () => {
  const { addScore, addStrike, setEnergy, energy, strikes, completeLevel, setPhase, currentTheme } = useGame();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const stateRef = useRef({
    playerLane: 1,
    items: [] as Item[],
    frameCount: 0,
    distance: 0,
    targetDistance: 1500,
    running: true,
    energy: 100,
    score: 0,
    strikes: 0,
  });
  const [playerLane, setPlayerLane] = useState(1);
  const animRef = useRef<number>(0);

  const spawnItem = useCallback((canvasW: number) => {
    const lane = Math.floor(Math.random() * LANE_COUNT);
    const laneWidth = canvasW / LANE_COUNT;
    const rand = Math.random();
    let type: Item['type'], emoji: string;
    if (rand < 0.15) {
      type = 'water';
      emoji = WATER[Math.floor(Math.random() * WATER.length)];
    } else if (rand < 0.4) {
      type = 'junk';
      emoji = JUNK[Math.floor(Math.random() * JUNK.length)];
    } else {
      type = 'healthy';
      emoji = HEALTHY[Math.floor(Math.random() * HEALTHY.length)];
    }
    const x = laneWidth * lane + laneWidth / 2;
    stateRef.current.items.push({ x, y: -40, type, emoji, speed: 3 + Math.random() * 2, collected: false });
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resize = () => {
      canvas.width = canvas.parentElement?.clientWidth || 800;
      canvas.height = canvas.parentElement?.clientHeight || 600;
    };
    resize();
    window.addEventListener('resize', resize);

    const s = stateRef.current;
    s.energy = 100;
    s.score = 0;
    s.strikes = 0;

    const gameLoop = () => {
      if (!s.running) return;
      const w = canvas.width;
      const h = canvas.height;
      const laneWidth = w / LANE_COUNT;
      const playerW = 50;
      const playerH = 60;
      const playerX = laneWidth * s.playerLane + laneWidth / 2;
      const playerY = h - 100;

      // Clear
      ctx.clearRect(0, 0, w, h);

      // Background - moving stripes for road effect
      const bgColors = currentTheme.itemColors;
      ctx.fillStyle = bgColors[0] || '#4ade80';
      ctx.fillRect(0, 0, w, h);

      // Lane lines
      ctx.strokeStyle = 'rgba(255,255,255,0.3)';
      ctx.lineWidth = 2;
      ctx.setLineDash([20, 20]);
      for (let i = 1; i < LANE_COUNT; i++) {
        const lx = laneWidth * i;
        ctx.beginPath();
        ctx.moveTo(lx, 0);
        ctx.lineTo(lx, h);
        ctx.stroke();
      }
      ctx.setLineDash([]);

      // Moving background elements
      const bgOffset = s.frameCount % 60;
      ctx.fillStyle = 'rgba(255,255,255,0.1)';
      for (let y = bgOffset - 60; y < h; y += 60) {
        ctx.fillRect(0, y, w, 2);
      }

      // Spawn items
      s.frameCount++;
      if (s.frameCount % 30 === 0) spawnItem(w);

      // Update & draw items
      s.items = s.items.filter(item => {
        if (item.collected) return false;
        item.y += item.speed;
        if (item.y > h + 40) return false;

        // Collision detection
        const dx = Math.abs(item.x - playerX);
        const dy = Math.abs(item.y - playerY);
        if (dx < playerW && dy < playerH / 2) {
          item.collected = true;
          if (item.type === 'healthy') {
            sounds.healthy();
            s.score += 10;
            addScore(10);
          } else if (item.type === 'junk') {
            sounds.junk();
            s.strikes++;
            addStrike();
            if (s.strikes >= 5) {
              s.running = false;
              return false;
            }
          } else {
            sounds.water();
            s.energy = Math.min(100, s.energy + 20);
            setEnergy(s.energy);
          }
          return false;
        }

        // Draw item
        ctx.font = '36px serif';
        ctx.textAlign = 'center';
        ctx.fillText(item.emoji, item.x, item.y + 12);

        // Glow
        if (item.type === 'healthy') {
          ctx.shadowColor = '#4ade80';
          ctx.shadowBlur = 15;
        } else if (item.type === 'junk') {
          ctx.shadowColor = '#ef4444';
          ctx.shadowBlur = 15;
        } else {
          ctx.shadowColor = '#3b82f6';
          ctx.shadowBlur = 15;
        }
        ctx.shadowBlur = 0;

        return true;
      });

      // Energy drain
      if (s.frameCount % 10 === 0) {
        s.energy -= 0.5;
        setEnergy(s.energy);
        if (s.energy <= 0) {
          s.running = false;
          setPhase('gameover');
          return;
        }
      }

      // Distance / progress
      s.distance += 2;
      if (s.distance >= s.targetDistance) {
        s.running = false;
        completeLevel();
        return;
      }

      // Draw player
      ctx.font = '48px serif';
      ctx.textAlign = 'center';
      ctx.fillText('🏃', playerX, playerY + 15);

      // Draw distance bar at bottom
      const progress = s.distance / s.targetDistance;
      ctx.fillStyle = 'rgba(0,0,0,0.3)';
      ctx.fillRect(20, h - 30, w - 40, 16);
      ctx.fillStyle = '#fbbf24';
      ctx.fillRect(20, h - 30, (w - 40) * progress, 16);
      ctx.strokeStyle = 'rgba(255,255,255,0.5)';
      ctx.strokeRect(20, h - 30, w - 40, 16);

      // Flag at end
      ctx.font = '14px sans-serif';
      ctx.fillStyle = 'white';
      ctx.fillText(`${Math.floor(progress * 100)}%`, w / 2, h - 17);

      animRef.current = requestAnimationFrame(gameLoop);
    };

    animRef.current = requestAnimationFrame(gameLoop);

    return () => {
      cancelAnimationFrame(animRef.current);
      window.removeEventListener('resize', resize);
    };
  }, []);

  // Controls
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      const s = stateRef.current;
      if (e.key === 'ArrowLeft' || e.key === 'a') {
        s.playerLane = Math.max(0, s.playerLane - 1);
        setPlayerLane(s.playerLane);
      }
      if (e.key === 'ArrowRight' || e.key === 'd') {
        s.playerLane = Math.min(LANE_COUNT - 1, s.playerLane + 1);
        setPlayerLane(s.playerLane);
      }
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, []);

  // Touch controls
  const touchStartX = useRef(0);

  return (
    <div className="absolute inset-0 flex flex-col">
      <div className="flex-1 relative"
        onTouchStart={e => { touchStartX.current = e.touches[0].clientX; }}
        onTouchEnd={e => {
          const diff = e.changedTouches[0].clientX - touchStartX.current;
          const s = stateRef.current;
          if (diff < -30) {
            s.playerLane = Math.max(0, s.playerLane - 1);
            setPlayerLane(s.playerLane);
          } else if (diff > 30) {
            s.playerLane = Math.min(LANE_COUNT - 1, s.playerLane + 1);
            setPlayerLane(s.playerLane);
          }
        }}
      >
        <canvas ref={canvasRef} className="w-full h-full" />
      </div>
      {/* Mobile controls */}
      <div className="md:hidden flex justify-center gap-8 p-4 bg-black/30">
        <button
          className="bg-white/30 text-white text-3xl w-16 h-16 rounded-full active:bg-white/50"
          onClick={() => {
            const s = stateRef.current;
            s.playerLane = Math.max(0, s.playerLane - 1);
            setPlayerLane(s.playerLane);
          }}
        >⬅️</button>
        <button
          className="bg-white/30 text-white text-3xl w-16 h-16 rounded-full active:bg-white/50"
          onClick={() => {
            const s = stateRef.current;
            s.playerLane = Math.min(LANE_COUNT - 1, s.playerLane + 1);
            setPlayerLane(s.playerLane);
          }}
        >➡️</button>
      </div>
    </div>
  );
};

export default RunnerGame;
