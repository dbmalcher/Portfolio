export const shadows = {
  window: '0 5px 20px rgba(0, 0, 0, 0.4)',
  windowDragging: '0 15px 40px rgba(0, 0, 0, 0.5)',
  taskbar: '0 -2px 5px rgba(0, 0, 0, 0.3)',
  startmenu: '0 0 10px rgba(0, 0, 0, 0.5)',
  icon: '2px 2px 4px rgba(0, 0, 0, 0.5)',
  inset: 'inset 0 1px 0 rgba(255, 255, 255, 0.8)',
};

export const textShadows = {
  light: '1px 1px 0 rgba(0, 0, 0, 0.3)',
  strong: '1px 1px 2px rgba(0, 0, 0, 0.8)',
  strongNegative: '-1px -1px 1px rgba(0, 0, 0, 0.4)',
};

export const borders = {
  window: '1px solid #1a4674',
  transparent: '1px solid transparent',
  light: '1px solid rgba(0, 0, 0, 0.3)',
  lightHover: '1px solid rgba(255, 255, 255, 0.3)',
  startmenu: '1px solid rgba(0, 0, 0, 0.5)',
};

export const borderRadius = {
  sm: '3px',
  md: '5px',
  lg: '6px',
  xl: '8px',
};

export const transitions = {
  fast: '0.1s ease',
  normal: '0.15s ease-out',
};

export const zIndex = {
  taskbar: 1000,
  startmenu: 1001,
  windowActive: 100,
  windowInactive: 50,
};

export const opacity = {
  windowInactive: 0.95,
  minimized: 0.6,
  tray: 0.2,
};

export default { shadows, textShadows, borders, borderRadius, transitions, zIndex, opacity };
