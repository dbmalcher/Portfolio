export const colors = {
  primary: {
    900: '#001f5c',
    700: '#003399',
    500: '#1e4f9e',
    400: '#245edb',
    300: '#2a5fad',
    200: '#3c85cb',
    100: '#4a90e2',
    50: '#2585d6',
  },
  accent: {
    DEFAULT: '#4a90e2',
    light: '#64b5f6',
  },
  window: {
    bgStart: '#f0f0f0',
    bgEnd: '#ffffff',
    border: '#1a4674',
    titlebar: '#3c85cb',
    titlebarActive: '#1e4f9e',
    titlebarEnd: '#2a5fad',
  },
  taskbar: {
    start: '#245edb',
    end: '#2b71c9',
    light: '#64b5f6',
  },
  startmenu: {
    start: '#1e4f9e',
    mid: '#2a5fad',
    mid2: '#3c85cb',
    end: '#4599da',
  },
  close: {
    start: '#e57a7a',
    mid: '#d64d4d',
    end: '#c73e3e',
    hoverStart: '#f08080',
    hoverMid: '#e05050',
    hoverEnd: '#d04040',
  },
  text: {
    white: '#ffffff',
    black: '#000000',
    dark: '#333333',
    gray: '#e0e0e0',
  },
  bg: {
    dark: '#000000',
    light: '#e6e6e6',
  },
};

export const gradients = {
  windowTitlebar: 'linear-gradient(to bottom, #3c85cb 0%, #2a5fad 100%)',
  windowTitlebarActive: 'linear-gradient(to bottom, #1e4f9e 0%, #2a5fad 100%)',
  taskbar: 'linear-gradient(to bottom, #245edb 0%, #3483eb 5%, #4293eb 14%, #52a2ec 21%, #5caef8 28%, #64b5f6 40%, #5cadf4 55%, #4c9de8 75%, #3885dd 90%, #2b71c9 100%)',
  startmenu: 'linear-gradient(to bottom, #1e4f9e 0%, #2a5fad 8%, #3371bc 14%, #3c85cb 21%, #4599da 50%, #3c85cb 79%, #2a5fad 100%)',
  window: 'linear-gradient(to bottom, #f0f0f0 0%, #e6e6e6 5%, #ffffff 6%, #ffffff 100%)',
  button: 'linear-gradient(to bottom, #f5f5f5 0%, #e0e0e0 50%, #d0d0d0 100%)',
  buttonHover: 'linear-gradient(to bottom, #ffffff 0%, #f0f0f0 50%, #e0e0e0 100%)',
  close: 'linear-gradient(to bottom, #e57a7a 0%, #d64d4d 50%, #c73e3e 100%)',
  closeHover: 'linear-gradient(to bottom, #f08080 0%, #e05050 50%, #d04040 100%)',
};

export default { colors, gradients };
