import React, { createContext, useContext, useState, useCallback } from 'react';

export type GamePhase = 'menu' | 'playing' | 'transition' | 'gameover' | 'demolimit';
export type LevelType = 'rainbow' | 'quiz' | 'runner';

export interface ThemeConfig {
  name: string;
  emoji: string;
  bg: string;
  groundColor: string;
  itemColors: string[];
}

export const THEMES: ThemeConfig[] = [
  { name: 'Jungle Safari', emoji: '🌿', bg: 'from-green-400 via-emerald-500 to-green-700', groundColor: '#2d5a1e', itemColors: ['#4ade80', '#22c55e'] },
  { name: 'Desert Adventure', emoji: '🏜️', bg: 'from-amber-300 via-orange-400 to-yellow-600', groundColor: '#c2884a', itemColors: ['#fbbf24', '#f59e0b'] },
  { name: 'Farm Land', emoji: '🚜', bg: 'from-lime-300 via-green-400 to-emerald-500', groundColor: '#6b4c2a', itemColors: ['#84cc16', '#65a30d'] },
  { name: 'Underwater World', emoji: '🌊', bg: 'from-cyan-400 via-blue-500 to-indigo-600', groundColor: '#1e3a5f', itemColors: ['#06b6d4', '#3b82f6'] },
  { name: 'Volcano Adventure', emoji: '🌋', bg: 'from-red-500 via-orange-500 to-amber-500', groundColor: '#7c2d12', itemColors: ['#ef4444', '#f97316'] },
  { name: 'Space Junk Battle', emoji: '🚀', bg: 'from-purple-900 via-indigo-800 to-slate-900', groundColor: '#1e1b4b', itemColors: ['#a78bfa', '#818cf8'] },
];

export const LEVEL_SEQUENCE: LevelType[] = ['rainbow', 'quiz', 'runner'];

interface GameState {
  phase: GamePhase;
  score: number;
  totalScore: number;
  strikes: number;
  energy: number;
  currentLevelIndex: number;
  currentThemeIndex: number;
  levelsCompleted: number;
  stars: number;
}

interface GameContextType extends GameState {
  startGame: () => void;
  setPhase: (p: GamePhase) => void;
  addScore: (n: number) => void;
  addStrike: () => boolean; // returns true if game over
  setEnergy: (n: number) => void;
  completeLevel: () => void;
  nextLevel: () => void;
  resetGame: () => void;
  currentTheme: ThemeConfig;
  currentLevelType: LevelType;
}

const GameContext = createContext<GameContextType | null>(null);

const INITIAL: GameState = {
  phase: 'menu',
  score: 0,
  totalScore: 0,
  strikes: 0,
  energy: 100,
  currentLevelIndex: 0,
  currentThemeIndex: 0,
  levelsCompleted: 0,
  stars: 0,
};

export const GameProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, setState] = useState<GameState>(INITIAL);

  const startGame = useCallback(() => setState({ ...INITIAL, phase: 'playing' }), []);
  const setPhase = useCallback((phase: GamePhase) => setState(s => ({ ...s, phase })), []);
  const addScore = useCallback((n: number) => setState(s => ({ ...s, score: s.score + n })), []);
  const addStrike = useCallback(() => {
    let gameOver = false;
    setState(s => {
      const newStrikes = s.strikes + 1;
      if (newStrikes >= 5) {
        gameOver = true;
        return { ...s, strikes: newStrikes, phase: 'gameover' };
      }
      return { ...s, strikes: newStrikes };
    });
    return gameOver;
  }, []);
  const setEnergy = useCallback((n: number) => setState(s => ({ ...s, energy: Math.max(0, Math.min(100, n)) })), []);

  const completeLevel = useCallback(() => {
    setState(s => {
      const newCompleted = s.levelsCompleted + 1;
      const earnedStars = s.score >= 100 ? 3 : s.score >= 60 ? 2 : 1;
      return {
        ...s,
        phase: 'transition',
        totalScore: s.totalScore + s.score,
        levelsCompleted: newCompleted,
        stars: s.stars + earnedStars,
      };
    });
  }, []);

  const nextLevel = useCallback(() => {
    setState(s => {
      // Check demo limit after 4 levels
      if (s.levelsCompleted >= 4) {
        return { ...s, phase: 'demolimit' };
      }
      const nextLevelIdx = (s.currentLevelIndex + 1) % LEVEL_SEQUENCE.length;
      const nextThemeIdx = nextLevelIdx === 0 ? (s.currentThemeIndex + 1) % THEMES.length : s.currentThemeIndex;
      return {
        ...s,
        phase: 'playing',
        score: 0,
        strikes: 0,
        energy: 100,
        currentLevelIndex: nextLevelIdx,
        currentThemeIndex: nextThemeIdx,
      };
    });
  }, []);

  const resetGame = useCallback(() => setState({ ...INITIAL }), []);

  const value: GameContextType = {
    ...state,
    startGame,
    setPhase,
    addScore,
    addStrike,
    setEnergy,
    completeLevel,
    nextLevel,
    resetGame,
    currentTheme: THEMES[state.currentThemeIndex],
    currentLevelType: LEVEL_SEQUENCE[state.currentLevelIndex],
  };

  return <GameContext.Provider value={value}>{children}</GameContext.Provider>;
};

export const useGame = () => {
  const ctx = useContext(GameContext);
  if (!ctx) throw new Error('useGame must be used within GameProvider');
  return ctx;
};
