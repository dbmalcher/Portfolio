import { useLanguage } from '../../i18n/LanguageContext';
import DesktopIcon from '../molecules/DesktopIcon';
import './Desktop.css';

const desktopIcons = [
  { id: 'about', icon: '👤' },
  { id: 'projects', icon: '📁' },
  { id: 'contact', icon: '✉️' },
  { id: 'skills', icon: '⚡' },
];

function Desktop({ onOpenWindow, onFocusWindow, windows, activeWindow }) {
  const { t } = useLanguage();

  const handleClick = (iconId) => {
    const label = t(iconId);
    const existingWindow = windows.find(w => w.content === iconId);
    
    if (existingWindow) {
      if (existingWindow.isMinimized) {
        onFocusWindow(iconId);
      } else if (activeWindow !== existingWindow.id) {
        onFocusWindow(iconId);
      }
    } else {
      onOpenWindow(iconId, label, iconId);
    }
  };

  return (
    <div className="desktop-background">
      <div className="desktop-icons">
        {desktopIcons.map((icon) => {
          const existingWindow = windows.find(w => w.content === icon.id);
          const isActive = existingWindow && activeWindow === existingWindow.id && !existingWindow.isMinimized;
          
          return (
            <DesktopIcon
              key={icon.id}
              icon={icon.icon}
              label={t(icon.id)}
              isActive={isActive}
              onClick={() => handleClick(icon.id)}
            />
          );
        })}
      </div>
    </div>
  );
}

export default Desktop;
