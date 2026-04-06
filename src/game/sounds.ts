// Web Audio API sound effects - no external files needed
const audioCtx = () => {
  if (!(window as any).__nutriAudioCtx) {
    (window as any).__nutriAudioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
  }
  return (window as any).__nutriAudioCtx as AudioContext;
};

function playTone(freq: number, duration: number, type: OscillatorType = 'sine', volume = 0.3) {
  try {
    const ctx = audioCtx();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = type;
    osc.frequency.value = freq;
    gain.gain.value = volume;
    gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + duration);
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start();
    osc.stop(ctx.currentTime + duration);
  } catch {}
}

export const sounds = {
  healthy: () => {
    playTone(523, 0.15, 'sine', 0.25);
    setTimeout(() => playTone(659, 0.15, 'sine', 0.25), 100);
    setTimeout(() => playTone(784, 0.2, 'sine', 0.25), 200);
  },
  junk: () => {
    playTone(200, 0.3, 'square', 0.2);
    setTimeout(() => playTone(150, 0.3, 'square', 0.2), 150);
  },
  correct: () => {
    playTone(660, 0.1, 'sine', 0.25);
    setTimeout(() => playTone(880, 0.2, 'sine', 0.25), 100);
  },
  wrong: () => {
    playTone(300, 0.2, 'sawtooth', 0.15);
    setTimeout(() => playTone(250, 0.3, 'sawtooth', 0.15), 150);
  },
  water: () => {
    playTone(400, 0.1, 'sine', 0.2);
    setTimeout(() => playTone(600, 0.1, 'sine', 0.2), 80);
    setTimeout(() => playTone(800, 0.15, 'sine', 0.2), 160);
  },
  levelComplete: () => {
    [523, 659, 784, 1047].forEach((f, i) => {
      setTimeout(() => playTone(f, 0.25, 'sine', 0.3), i * 150);
    });
  },
  gameOver: () => {
    [400, 350, 300, 200].forEach((f, i) => {
      setTimeout(() => playTone(f, 0.3, 'sawtooth', 0.2), i * 200);
    });
  },
  click: () => playTone(800, 0.08, 'sine', 0.15),
};
