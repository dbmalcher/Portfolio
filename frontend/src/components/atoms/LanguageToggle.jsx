import Icon from './Icon';
import './LanguageToggle.css';

function LanguageToggle({ language, onToggle }) {
  return (
    <button className="tray-lang" onClick={onToggle}>
      <Icon name="globe" size={14} className="lang-icon" weight="regular" />
      <span className="lang-text">{language.toUpperCase()}</span>
    </button>
  );
}

export default LanguageToggle;
