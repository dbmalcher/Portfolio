const audioContext = new (window.AudioContext || window.webkitAudioContext)();

let globalVolume = 0.5;
let soundEnabled = true;
let computerAudio = null;
let computerLoopAudio = null;
let fanInterval = null;

const loadComputerAudio = () => {
  if (!computerAudio) {
    computerAudio = new Audio('/sounds/computer.mp3');
    computerAudio.volume = 0.5;
  }
  return computerAudio;
};

const loadComputerLoopAudio = () => {
  if (!computerLoopAudio) {
    computerLoopAudio = new Audio('/sounds/computer-loop.mp3');
    computerLoopAudio.volume = 0.4;
    computerLoopAudio.loop = true;
  }
  return computerLoopAudio;
};

const createFanSound = () => {
  if (!soundEnabled || globalVolume === 0) return null;
  
  try {
    const bufferSize = audioContext.sampleRate * 2;
    const buffer = audioContext.createBuffer(1, bufferSize, audioContext.sampleRate);
    const data = buffer.getChannelData(0);
    
    for (let i = 0; i < bufferSize; i++) {
      data[i] = (Math.random() * 2 - 1) * 0.3;
    }
    
    const noise = audioContext.createBufferSource();
    noise.buffer = buffer;
    noise.loop = true;
    
    const gainNode = audioContext.createGain();
    const filter = audioContext.createBiquadFilter();
    
    filter.type = 'lowpass';
    filter.frequency.value = 400;
    
    noise.connect(filter);
    filter.connect(gainNode);
    gainNode.connect(audioContext.destination);
    
    gainNode.gain.setValueAtTime(globalVolume * 0.08, audioContext.currentTime);
    
    return { noise, gainNode };
  } catch (e) {
    return null;
  }
};

export const setVolume = (vol) => {
  globalVolume = Math.max(0, Math.min(1, vol));
  if (fanInterval && fanInterval.gainNode) {
    fanInterval.gainNode.gain.setValueAtTime(globalVolume * 0.15, audioContext.currentTime);
  }
};

export const getVolume = () => globalVolume;
export const setSoundEnabled = (enabled) => { soundEnabled = enabled; };
export const isSoundEnabled = () => soundEnabled;

let clickAudio = null;

const loadClickAudio = () => {
  if (!clickAudio) {
    clickAudio = new Audio('/sounds/click.mp3');
    clickAudio.volume = 0.4;
  }
  return clickAudio;
};

export const sounds = {
  click: () => {
    try {
      const audio = loadClickAudio();
      audio.currentTime = 0;
      audio.playbackRate = 0.9 + Math.random() * 0.2;
      audio.volume = 0.3 + Math.random() * 0.2;
      audio.play();
    } catch (e) {}
  },
  open: () => {
    playTone(400, 0.1, 'sine', 0.25);
    setTimeout(() => playTone(600, 0.15, 'sine', 0.2), 80);
  },
  close: () => {
    playTone(500, 0.08, 'sine', 0.2);
    setTimeout(() => playTone(300, 0.1, 'sine', 0.15), 60);
  },
  minimize: () => {
    playTone(600, 0.05, 'sine', 0.2);
    setTimeout(() => playTone(400, 0.08, 'sine', 0.15), 40);
  },
  hover: () => playTone(1000, 0.03, 'sine', 0.1),
  start: () => {
    playTone(300, 0.1, 'sine', 0.25);
    setTimeout(() => playTone(500, 0.1, 'sine', 0.2), 60);
    setTimeout(() => playTone(700, 0.15, 'sine', 0.15), 120);
  },
  error: () => playTone(200, 0.15, 'square', 0.2),
  computerOn: () => {},
  startFan: () => {
    if (fanInterval) return;
    const fan = createFanSound();
    if (fan) {
      fan.noise.start();
      fanInterval = fan;
    }
  },
  stopFan: () => {
    if (fanInterval) {
      try { fanInterval.noise.stop(); } catch (e) {}
      fanInterval = null;
    }
  },
};

export const initAudio = () => {
  if (audioContext.state === 'suspended') {
    audioContext.resume();
  }
  
  document.addEventListener('click', () => {
    sounds.click();
  }, { capture: true });
};

export const updateFanVolume = () => {
  if (fanInterval && fanInterval.gainNode) {
    fanInterval.gainNode.gain.setValueAtTime(globalVolume * 0.15, audioContext.currentTime);
  }
};