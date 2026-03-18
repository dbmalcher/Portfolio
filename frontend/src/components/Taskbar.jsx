import { useState, useEffect } from 'react';
import StartMenu from './StartMenu';
import './Taskbar.css';

function Taskbar({ windows, activeWindow, onWindowClick, onStartClick, showStartMenu, onOpenWindow }) {
  const getTime = () => {
    const now = new Date();
    return now.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });
  };

  const [time, setTime] = useState(getTime());

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(getTime());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

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
        <span className="start-icon">🪟</span>
        <span className="start-text">Iniciar</span>
      </button>
      
      <div className="taskbar-divider"></div>
      
      <div className="open-windows">
        {openWindows.map((win) => (
          <button
            key={win.id}
            className={`taskbar-window ${activeWindow === win.id && !win.isMinimized ? 'active' : ''} ${win.isMinimized ? 'minimized' : ''}`}
            onClick={() => onWindowClick(win.id)}
          >
            <span className="window-icon">📄</span>
            <span className="window-title">{win.title}</span>
          </button>
        ))}
      </div>
      
      <div className="taskbar-tray">
        <div className="tray-icon">🔊</div>
        <div className="tray-icon">🌐</div>
        <div className="tray-clock">{time}</div>
      </div>
    </div>
  );
}

export default Taskbar;
