let audioContext = null;

const getAudioContext = () => {
  if (!audioContext) {
    audioContext = new (window.AudioContext || window.webkitAudioContext)();
  }
  return audioContext;
};

let globalVolume = 0.5;
let soundEnabled = true;

// Audio elements
let clickAudio = null;

// Carregar áudio de clique
const loadClickAudio = () => {
  if (!clickAudio) {
    clickAudio = new Audio('/sounds/click.mp3');
  }
  return clickAudio;
};

// Função para tocar tom sintético
const playTone = (freq, duration, type = 'sine', vol = 0.25) => {
  if (!soundEnabled || globalVolume === 0) return;
  
  try {
    const ctx = getAudioContext();
    if (ctx.state === 'suspended') {
      ctx.resume();
    }
    
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    
    osc.type = type;
    osc.frequency.value = freq;
    
    gain.gain.setValueAtTime(vol * globalVolume, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + duration);
    
    osc.connect(gain);
    gain.connect(ctx.destination);
    
    osc.start();
    osc.stop(ctx.currentTime + duration);
  } catch (e) {}
};

export const setVolume = (vol) => {
  globalVolume = Math.max(0, Math.min(1, vol));
  localStorage.setItem('portfolio-volume', globalVolume.toString());
};

export const getVolume = () => globalVolume;

export const setSoundEnabled = (enabled) => { 
  soundEnabled = enabled;
  localStorage.setItem('portfolio-soundEnabled', enabled.toString());
};

export const isSoundEnabled = () => soundEnabled;

// Inicializa volume do localStorage
export const initVolume = () => {
  const savedVolume = localStorage.getItem('portfolio-volume');
  if (savedVolume) {
    globalVolume = parseFloat(savedVolume);
  }
  
  const savedEnabled = localStorage.getItem('portfolio-soundEnabled');
  if (savedEnabled !== null) {
    soundEnabled = savedEnabled === 'true';
  }
};

export const sounds = {
  click: () => {
    if (!soundEnabled || globalVolume === 0) return;
    try {
      const audio = loadClickAudio();
      audio.currentTime = 0;
      audio.volume = globalVolume;
      audio.play();
    } catch (e) {}
  },
  
  open: () => {
    if (!soundEnabled || globalVolume === 0) return;
    playTone(400, 0.08, 'sine', 0.2 * globalVolume);
    setTimeout(() => playTone(600, 0.1, 'sine', 0.15 * globalVolume), 60);
  },
  
  close: () => {
    if (!soundEnabled || globalVolume === 0) return;
    playTone(500, 0.06, 'sine', 0.15 * globalVolume);
    setTimeout(() => playTone(300, 0.08, 'sine', 0.1 * globalVolume), 40);
  },
  
  minimize: () => {
    if (!soundEnabled || globalVolume === 0) return;
    playTone(600, 0.04, 'sine', 0.15 * globalVolume);
    setTimeout(() => playTone(400, 0.06, 'sine', 0.1 * globalVolume), 30);
  },
  
  maximize: () => {
    if (!soundEnabled || globalVolume === 0) return;
    playTone(400, 0.04, 'sine', 0.12 * globalVolume);
    setTimeout(() => playTone(500, 0.06, 'sine', 0.15 * globalVolume), 30);
    setTimeout(() => playTone(700, 0.08, 'sine', 0.12 * globalVolume), 60);
  },
  
  hover: () => {
    if (!soundEnabled || globalVolume === 0) return;
    playTone(1000, 0.02, 'sine', 0.05 * globalVolume);
  },
  
  start: () => {
    if (!soundEnabled || globalVolume === 0) return;
    playTone(300, 0.08, 'sine', 0.2 * globalVolume);
    setTimeout(() => playTone(500, 0.08, 'sine', 0.15 * globalVolume), 50);
    setTimeout(() => playTone(700, 0.1, 'sine', 0.1 * globalVolume), 100);
  },
  
  error: () => {
    if (!soundEnabled || globalVolume === 0) return;
    playTone(200, 0.1, 'square', 0.15 * globalVolume);
    setTimeout(() => playTone(150, 0.15, 'square', 0.1 * globalVolume), 100);
  },
  
  notification: () => {
    if (!soundEnabled || globalVolume === 0) return;
    playTone(600, 0.05, 'sine', 0.1 * globalVolume);
    setTimeout(() => playTone(800, 0.08, 'sine', 0.12 * globalVolume), 80);
  },
};

export const initAudio = () => {
  initVolume();
  
  const ctx = getAudioContext();
  if (ctx.state === 'suspended') {
    ctx.resume();
  }
  
  // Adiciona listener de clique global
  document.addEventListener('click', () => {
    sounds.click();
  }, { capture: true });
};

export const updateVolumeDisplay = () => {
  return globalVolume;
};