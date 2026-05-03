import { useState, useEffect } from 'react';
import { LanguageProvider, useLanguage } from './i18n/LanguageContext';
import Desktop from './components/organisms/Desktop';
import Taskbar from './components/organisms/Taskbar';
import Window from './components/organisms/Window';
import AboutMe from './components/organisms/AboutMe';
import ContactMe from './components/organisms/ContactMe';
import ProjectsWindow from './components/organisms/ProjectsWindow';
import Projects from './components/organisms/Projects';
import { sounds, initAudio, setVolume, setSoundEnabled, getVolume, isSoundEnabled } from './utils/sounds';
import './styles.css';

const WINDOW_WIDTH = 400;
const WINDOW_HEIGHT = 300;
const TASKBAR_HEIGHT = 40;

function calculateInitialPositions() {
  const viewportWidth = typeof window !== 'undefined' ? window.innerWidth : 1920;
  const viewportHeight = typeof window !== 'undefined' ? window.innerHeight : 1080;
  
  const halfWidth = viewportWidth / 2;
  const rightSideStart = halfWidth;
  const rightSideEnd = viewportWidth;
  
  const rightAvailableWidth = rightSideEnd - rightSideStart;
  
  let canFitAll = rightAvailableWidth >= WINDOW_WIDTH;
  
  if (canFitAll) {
    const marginX = rightAvailableWidth * 0.1;
    const startX = rightSideStart + marginX;
    
    const verticalSpace = viewportHeight - TASKBAR_HEIGHT - 60;
    const neededHeight = WINDOW_HEIGHT * 3 + 60;
    const needsMultipleColumns = neededHeight > verticalSpace;
    
    let positions;
    
    if (needsMultipleColumns) {
      const cols = Math.ceil(neededHeight / verticalSpace);
      const colWidth = (rightAvailableWidth - marginX * 2) / cols;
      
      positions = [];
      for (let i = 0; i < 3; i++) {
        const col = i % cols;
        const row = Math.floor(i / cols);
        positions.push({
          x: startX + col * (colWidth + 10),
          y: 30 + row * (WINDOW_HEIGHT + 30)
        });
      }
    } else {
      positions = [
        { x: startX, y: 30 },
        { x: startX, y: 30 + WINDOW_HEIGHT + 40 },
        { x: startX, y: 30 + (WINDOW_HEIGHT + 40) * 2 },
      ];
    }
    
    const isOverlapping = (p1, p2) => {
      return !(p1.x + WINDOW_WIDTH < p2.x || 
               p1.x > p2.x + WINDOW_WIDTH || 
               p1.y + WINDOW_HEIGHT < p2.y || 
               p1.y > p2.y + WINDOW_HEIGHT);
    };
    
    const hasAnyOverlap = () => {
      for (let i = 0; i < positions.length; i++) {
        for (let j = i + 1; j < positions.length; j++) {
          if (isOverlapping(positions[i], positions[j])) {
            return true;
          }
        }
      }
      return false;
    };
    
    const fixOverlaps = () => {
      let attempts = 0;
      while (hasAnyOverlap() && attempts < 50) {
        attempts++;
        
        for (let i = 1; i < positions.length; i++) {
          for (let j = 0; j < i; j++) {
            if (isOverlapping(positions[i], positions[j])) {
              const prev = positions[j];
              const current = positions[i];
              
              const canMoveDown = current.y + WINDOW_HEIGHT + 30 < viewportHeight - TASKBAR_HEIGHT - 10;
              const canMoveRight = current.x + WINDOW_WIDTH + 30 < rightSideEnd - 10;
              
              if (canMoveDown) {
                current.y = prev.y + WINDOW_HEIGHT + 30;
              } else if (canMoveRight) {
                current.x = prev.x + WINDOW_WIDTH + 30;
              } else {
                current.y = 30;
                current.x = prev.x + WINDOW_WIDTH + 30;
              }
            }
          }
        }
      }
    };
    
    if (hasAnyOverlap()) {
      fixOverlaps();
    }
    
    positions.forEach(pos => {
      if (pos.x + WINDOW_WIDTH > rightSideEnd - 10) {
        pos.x = rightSideEnd - WINDOW_WIDTH - 10;
      }
      if (pos.x < rightSideStart + 10) pos.x = rightSideStart + 10;
      if (pos.y + WINDOW_HEIGHT > viewportHeight - TASKBAR_HEIGHT - 10) {
        pos.y = viewportHeight - TASKBAR_HEIGHT - WINDOW_HEIGHT - 10;
      }
      if (pos.y < 10) pos.y = 10;
    });
    
    return positions;
  } else {
    const marginX = rightAvailableWidth * 0.05;
    const startX = rightSideStart + marginX;
    
    let positions = [
      { x: startX, y: 30 },
      { x: startX, y: 30 + WINDOW_HEIGHT + 30 },
      { x: startX, y: 30 + (WINDOW_HEIGHT + 30) * 2 },
    ];
    
    positions.forEach(pos => {
      if (pos.x + WINDOW_WIDTH > rightSideEnd - 10) {
        pos.x = rightSideEnd - WINDOW_WIDTH - 10;
      }
      if (pos.x < 10) pos.x = 10;
      if (pos.y + WINDOW_HEIGHT > viewportHeight - TASKBAR_HEIGHT - 10) {
        pos.y = viewportHeight - TASKBAR_HEIGHT - WINDOW_HEIGHT - 10;
      }
      if (pos.y < 10) pos.y = 10;
    });
    
    return positions;
  }
}

function WindowContent({ content }) {
  const { t } = useLanguage();

  switch(content) {
    case 'about':
      return <AboutMe />;
    case 'projects':
      return <ProjectsWindow />;
    case 'contact':
      return <ContactMe />;
    default:
      return <div style={{ padding: '20px', color: '#000' }}>Content</div>;
  }
}

function AppContent() {
  const [windows, setWindows] = useState(() => {
    return [
      { id: 1, content: 'about', isOpen: true, isMinimized: false, position: { x: 500, y: 30 } },
      { id: 2, content: 'contact', isOpen: true, isMinimized: false, position: { x: 1000, y: 80 } },
    ];
  });
  const [activeWindow, setActiveWindow] = useState(1);
  const [showStartMenu, setShowStartMenu] = useState(false);

  useEffect(() => {
    initAudio();
  }, []);

  useEffect(() => {
    if (!showStartMenu) return;
    
    const handleClickOutside = (e) => {
      if (!e.target.closest('.start-menu') && !e.target.closest('.start-button')) {
        setShowStartMenu(false);
      }
    };
    
    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, [showStartMenu]);

  useEffect(() => {
    const handleResize = () => {
      setWindows(prevWindows => {
        const viewportWidth = window.innerWidth;
        const viewportHeight = window.innerHeight;
        
        const adjusted = prevWindows.map(win => {
          let newX = win.position.x;
          let newY = win.position.y;
          
          if (newX + WINDOW_WIDTH > viewportWidth) {
            newX = viewportWidth - WINDOW_WIDTH - 10;
          }
          if (newX < 10) newX = 10;
          
          if (newY + WINDOW_HEIGHT > viewportHeight - TASKBAR_HEIGHT) {
            newY = viewportHeight - TASKBAR_HEIGHT - WINDOW_HEIGHT - 10;
          }
          if (newY < 10) newY = 10;
          
          return { ...win, position: { x: newX, y: newY } };
        });
        
        return adjusted;
      });
    };

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const openWindow = (contentId, title, content) => {
    const existing = windows.find(w => w.content === contentId);
    if (existing) {
      if (existing.isMinimized) {
        setWindows(windows.map(w => w.content === contentId ? { ...w, isMinimized: false } : w));
      }
      setActiveWindow(existing.id);
    } else {
      const newId = Date.now();
      const offset = windows.length * 30;
      setWindows([...windows, { 
        id: newId, 
        title, 
        content, 
        contentId,
        isOpen: true, 
        isMinimized: false,
        position: { x: 100 + offset, y: -50 + offset }
      }]);
      setActiveWindow(newId);
    }
    setShowStartMenu(false);
  };

  const focusWindow = (contentId) => {
    const existing = windows.find(w => w.content === contentId);
    if (existing) {
      if (existing.isMinimized) {
        setWindows(windows.map(w => w.content === contentId ? { ...w, isMinimized: false } : w));
      }
      setActiveWindow(existing.id);
    }
  };

  const closeWindow = (id) => {
    sounds.close();
    setWindows(windows.filter(w => w.id !== id));
    if (activeWindow === id) {
      setActiveWindow(null);
    }
  };

  const minimizeWindow = (id) => {
    sounds.minimize();
    setWindows(windows.map(w => w.id === id ? { ...w, isMinimized: true } : w));
    if (activeWindow === id) {
      const visible = windows.filter(w => w.id !== id && !w.isMinimized);
      setActiveWindow(visible.length > 0 ? visible[visible.length - 1].id : null);
    }
  };

  const restoreWindow = (id) => {
    sounds.open();
    setWindows(windows.map(w => w.id === id ? { ...w, isMinimized: false } : w));
    setActiveWindow(id);
  };

  const updateWindowPosition = (id, position) => {
    setWindows(windows.map(w => w.id === id ? { ...w, position } : w));
  };

  const closeStartMenu = () => {
    if (showStartMenu) {
      sounds.click();
      setShowStartMenu(false);
    }
  };

  const toggleStartMenu = () => {
    sounds.start();
    setShowStartMenu(!showStartMenu);
  };

  return (
    <div className="desktop">
      <Desktop 
        onOpenWindow={openWindow}
        onFocusWindow={focusWindow}
        windows={windows}
        activeWindow={activeWindow}
      />
      
      {windows.map(win => {
        const isAbout = win.content === 'about';
        const isContact = win.content === 'contact';
        const isProjects = win.content === 'projects';

        if (isProjects) {
          return (
            <Window
              key={win.id}
              id={win.id}
              titleContent="projects"
              isActive={activeWindow === win.id}
              isMinimized={win.isMinimized}
              position={win.position}
              onClose={() => closeWindow(win.id)}
              onMinimize={() => minimizeWindow(win.id)}
              onFocus={() => setActiveWindow(win.id)}
              onPositionChange={(pos) => updateWindowPosition(win.id, pos)}
              width={1300}
              height={800}
              noWhiteBg={true}
            >
              <ProjectsWindow />
            </Window>
          );
        }

        return (
          <Window
            key={win.id}
            id={win.id}
            titleContent={win.content}
            isActive={activeWindow === win.id}
            isMinimized={win.isMinimized}
            position={win.position}
            onClose={() => closeWindow(win.id)}
            onMinimize={() => minimizeWindow(win.id)}
            onFocus={() => setActiveWindow(win.id)}
            onPositionChange={(pos) => updateWindowPosition(win.id, pos)}
            width={isAbout ? 700 : isContact ? 350 : isProjects ? 1300 : undefined}
            height={isAbout ? 550 : isContact ? 340 : isProjects ? 800 : undefined}
            noWhiteBg={isAbout || isProjects}
          >
            <WindowContent content={win.content} />
          </Window>
        );
})}
      
      <Taskbar
        windows={windows} 
        activeWindow={activeWindow}
        onWindowClick={(id) => {
          const win = windows.find(w => w.id === id);
          if (win?.isMinimized) {
            restoreWindow(id);
          } else if (activeWindow === id) {
            minimizeWindow(id);
          } else {
            setActiveWindow(id);
          }
        }}
        onStartClick={toggleStartMenu}
        showStartMenu={showStartMenu}
        onOpenWindow={openWindow}
      />
    </div>
  );
}

function App() {
  return (
    <LanguageProvider>
      <AppContent />
    </LanguageProvider>
  );
}

export default App;
