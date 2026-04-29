import { useState, useEffect } from 'react';
import { useLanguage } from '../../i18n/LanguageContext';
import DesktopIcon from '../molecules/DesktopIcon';
import { sounds, getWallpaperChanged } from '../../utils/sounds';
import './Desktop.css';

const desktopIcons = [
  { id: 'about', icon: 'user' },
  { id: 'contact', icon: 'mailbox' },
  { id: 'projects', icon: 'folder' },
];

function Desktop({ onOpenWindow, onFocusWindow, windows, activeWindow }) {
  const { t } = useLanguage();
  const [wallpaper, setWallpaper] = useState(false);

  useEffect(() => {
    const checkWallpaper = () => setWallpaper(getWallpaperChanged());
    checkWallpaper();
    const interval = setInterval(checkWallpaper, 500);
    return () => clearInterval(interval);
  }, []);

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
      sounds.open();
      onOpenWindow(iconId, label, iconId);
    }
  };

  const handleHover = () => {
    sounds.hover();
  };

  const backgroundStyle = wallpaper 
    ? { background: 'url(/img/desktop.jpg) center/cover no-repeat' }
    : {};

  return (
    <div className="desktop-background" style={backgroundStyle}>
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
              onMouseEnter={handleHover}
            />
          );
        })}
      </div>
    </div>
  );
}

export default Desktop;
