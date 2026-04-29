export const typography = {
  fontFamily: {
    DEFAULT: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
  },
  fontSize: {
    xs: '10px',
    sm: '11px',
    base: '12px',
    md: '13px',
    lg: '14px',
    xl: '18px',
    '2xl': '24px',
    hero: '40px',
  },
  fontWeight: {
    normal: 400,
    medium: 500,
    bold: 700,
  },
  lineHeight: {
    tight: 1.2,
    normal: 1.4,
    relaxed: 1.5,
  },
};

export const textStyles = {
  windowTitle: {
    fontSize: typography.fontSize.md,
    fontWeight: typography.fontWeight.bold,
    color: '#ffffff',
    textShadow: '1px 1px 0 rgba(0, 0, 0, 0.3)',
  },
  menuItem: {
    fontSize: typography.fontSize.lg,
    color: '#ffffff',
  },
  clock: {
    fontSize: typography.fontSize.base,
    color: '#ffffff',
  },
  desktopIcon: {
    fontSize: typography.fontSize.base,
    color: '#ffffff',
    textShadow: '1px 1px 2px rgba(0, 0, 0, 0.8)',
  },
  heading: {
    fontSize: typography.fontSize['2xl'],
    fontWeight: typography.fontWeight.medium,
    color: '#000000',
  },
  body: {
    fontSize: typography.fontSize.base,
    color: '#000000',
  },
};

export default { typography, textStyles };
