import './DesktopIcons.css';

const desktopIcons = [
  { id: 'about', label: 'Sobre Mim', icon: '👤' },
  { id: 'projects', label: 'Projetos', icon: '📁' },
  { id: 'contact', label: 'Contato', icon: '✉️' },
  { id: 'skills', label: 'Habilidades', icon: '⚡' },
];

function DesktopIcons({ onOpenWindow, onFocusWindow, windows, activeWindow }) {
  const handleClick = (icon) => {
    const existingWindow = windows.find(w => w.content === icon.id);
    
    if (existingWindow) {
      if (existingWindow.isMinimized) {
        onFocusWindow(icon.id);
      } else if (activeWindow !== existingWindow.id) {
        onFocusWindow(icon.id);
      }
    } else {
      onOpenWindow(icon.id, icon.label, icon.id);
    }
  };

  return (
    <div className="desktop-icons">
      {desktopIcons.map((icon) => {
        const existingWindow = windows.find(w => w.content === icon.id);
        const isActive = existingWindow && activeWindow === existingWindow.id && !existingWindow.isMinimized;
        
        return (
          <div 
            key={icon.id}
            className={`desktop-icon ${isActive ? 'active' : ''}`}
            onClick={() => handleClick(icon)}
          >
            <div className="desktop-icon-image">{icon.icon}</div>
            <div className="desktop-icon-label">{icon.label}</div>
          </div>
        );
      })}
    </div>
  );
}

export default DesktopIcons;
