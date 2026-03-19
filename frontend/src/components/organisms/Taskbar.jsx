import { useLanguage } from '../../i18n/LanguageContext';
import Icon from '../atoms/Icon';
import Clock from '../atoms/Clock';
import LanguageToggle from '../atoms/LanguageToggle';
import TaskbarWindow from '../molecules/TaskbarWindow';
import StartMenu from './StartMenu';
import './Taskbar.css';

function Taskbar({ windows, activeWindow, onWindowClick, onStartClick, showStartMenu, onOpenWindow }) {
  const { language, toggleLanguage, t } = useLanguage();
  
  const openWindows = windows.filter(w => w.isOpen);

  return (
    <div className="taskbar">
      <StartMenu 
        isOpen={showStartMenu} 
        onClose={() => onStartClick()}
        onOpenWindow={onOpenWindow}
      />
      
      <button 
        className={`start-button ${showStartMenu ? 'active' : ''}`}
        onClick={onStartClick}
      >
        <Icon emoji="🪟" className="start-icon" />
        <span className="start-text">{t('start')}</span>
      </button>
      
      <div className="taskbar-divider"></div>
      
      <div className="open-windows">
        {openWindows.map((win) => (
          <TaskbarWindow
            key={win.id}
            title={t(win.content)}
            isActive={activeWindow === win.id && !win.isMinimized}
            isMinimized={win.isMinimized}
            onClick={() => onWindowClick(win.id)}
          />
        ))}
      </div>
      
      <div className="taskbar-tray">
        <LanguageToggle language={language} onToggle={toggleLanguage} />
        <Icon emoji="🔊" className="tray-icon" />
        <Clock language={language} />
      </div>
    </div>
  );
}

export default Taskbar;
