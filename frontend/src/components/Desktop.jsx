import DesktopIcons from './DesktopIcons';
import './Desktop.css';

function Desktop({ onOpenWindow, onFocusWindow, windows, activeWindow }) {
  return (
    <div className="desktop-background">
      <DesktopIcons 
        onOpenWindow={onOpenWindow} 
        onFocusWindow={onFocusWindow}
        windows={windows}
        activeWindow={activeWindow}
      />
    </div>
  );
}

export default Desktop;
