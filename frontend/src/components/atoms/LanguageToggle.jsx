import './LanguageToggle.css';

function LanguageToggle({ language, onToggle }) {
  return (
    <button className="tray-lang" onClick={onToggle}>
      {language.toUpperCase()}
    </button>
  );
}

export default LanguageToggle;
