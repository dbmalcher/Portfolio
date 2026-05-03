import { useLanguage } from '../../i18n/LanguageContext';
import Icon from '../atoms/Icon';
import Clock from '../atoms/Clock';
import LanguageToggle from '../atoms/LanguageToggle';
import VolumeButton from '../atoms/VolumeButton';
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
        <div className="start-icon-wrapper">
          <Icon name="house" size={28} className="start-icon-blur" weight="fill" />
          <Icon name="house" size={28} className="start-icon" weight="fill" />
        </div>
      </button>
      
      <div className="taskbar-divider"></div>
      
      <div className="open-windows">
        {openWindows.map((win) => (
          <TaskbarWindow
            key={win.id}
            title={t(win.content)}
            content={win.content}
            isActive={activeWindow === win.id && !win.isMinimized}
            isMinimized={win.isMinimized}
            onClick={() => onWindowClick(win.id)}
          />
        ))}
      </div>
      
      <div className="taskbar-tray">
        <LanguageToggle language={language} onToggle={toggleLanguage} />
        <VolumeButton />
        <Clock language={language} />
      </div>
    </div>
  );
}

export default Taskbar;
