function Icon({ emoji, className = '' }) {
  return <span className={`icon ${className}`}>{emoji}</span>;
}

export default Icon;
