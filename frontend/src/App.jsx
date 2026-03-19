import { useState, useEffect } from 'react';
import { LanguageProvider, useLanguage } from './i18n/LanguageContext';
import Desktop from './components/organisms/Desktop';
import Taskbar from './components/organisms/Taskbar';
import Window from './components/organisms/Window';
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
  
  const skills = [
    { name: 'React / React Native', level: 90 },
    { name: 'Node.js', level: 85 },
    { name: 'TypeScript', level: 80 },
    { name: 'Python', level: 75 },
    { name: 'PostgreSQL', level: 70 },
    { name: 'CSS / SCSS', level: 85 },
  ];

  switch(content) {
    case 'about':
      return (
        <div style={{ padding: '20px', color: '#000' }}>
          <h2 style={{ marginBottom: '15px', fontSize: '24px' }}>Daniel Developer</h2>
          <p style={{ marginBottom: '10px' }}>{t('fullStackDeveloper')}</p>
          <p style={{ marginBottom: '10px' }}>{t('specialties')}</p>
          <ul style={{ marginLeft: '20px' }}>
            <li>React / React Native</li>
            <li>Node.js</li>
            <li>TypeScript</li>
            <li>Python</li>
          </ul>
        </div>
      );
    case 'projects':
      return (
        <div style={{ padding: '20px', color: '#000' }}>
          <h2 style={{ marginBottom: '15px', fontSize: '24px' }}>{t('projects')}</h2>
          <p>{t('comingSoon')}</p>
        </div>
      );
    case 'contact':
      return (
        <div style={{ padding: '20px', color: '#000' }}>
          <h2 style={{ marginBottom: '20px', fontSize: '24px' }}>{t('contact')}</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <span style={{ fontSize: '20px' }}>📧</span>
              <span>{t('email')}: daniel@email.com</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <span style={{ fontSize: '20px' }}>🐙</span>
              <span>{t('github')}: github.com/daniel</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <span style={{ fontSize: '20px' }}>💼</span>
              <span>{t('linkedin')}: linkedin.com/in/daniel</span>
            </div>
          </div>
        </div>
      );
    case 'skills':
      return (
        <div style={{ padding: '20px', color: '#000' }}>
          <h2 style={{ marginBottom: '20px', fontSize: '24px' }}>{t('abilities')}</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
            {skills.map((skill) => (
              <div key={skill.name}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '5px' }}>
                  <span>{skill.name}</span>
                  <span>{skill.level}%</span>
                </div>
                <div style={{ 
                  width: '100%', 
                  height: '10px', 
                  background: '#e0e0e0', 
                  borderRadius: '5px',
                  overflow: 'hidden'
                }}>
                  <div style={{ 
                    width: `${skill.level}%`, 
                    height: '100%', 
                    background: 'linear-gradient(to right, #1e4f9e, #3c85cb)',
                    borderRadius: '5px'
                  }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      );
    default:
      return <div style={{ padding: '20px', color: '#000' }}>Content</div>;
  }
}

function AppContent() {
  const [windows, setWindows] = useState(() => {
    const positions = calculateInitialPositions();
    return [
      { id: 1, content: 'about', isOpen: true, isMinimized: false, position: positions[0] },
      { id: 2, content: 'contact', isOpen: true, isMinimized: false, position: positions[1] },
      { id: 3, content: 'skills', isOpen: true, isMinimized: false, position: { x: positions[2].x - 30, y: positions[2].y } },
    ];
  });
  const [activeWindow, setActiveWindow] = useState(1);
  const [showStartMenu, setShowStartMenu] = useState(false);

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
    return () => window.removeEventListener('resize', handleResize);
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
        position: { x: 100 + offset, y: 50 + offset }
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
    setWindows(windows.filter(w => w.id !== id));
    if (activeWindow === id) {
      setActiveWindow(null);
    }
  };

  const minimizeWindow = (id) => {
    setWindows(windows.map(w => w.id === id ? { ...w, isMinimized: true } : w));
    if (activeWindow === id) {
      const visible = windows.filter(w => w.id !== id && !w.isMinimized);
      setActiveWindow(visible.length > 0 ? visible[visible.length - 1].id : null);
    }
  };

  const restoreWindow = (id) => {
    setWindows(windows.map(w => w.id === id ? { ...w, isMinimized: false } : w));
    setActiveWindow(id);
  };

  const updateWindowPosition = (id, position) => {
    setWindows(windows.map(w => w.id === id ? { ...w, position } : w));
  };

  const toggleStartMenu = () => {
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
      
      {windows.map(win => (
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
        >
          <WindowContent content={win.content} />
        </Window>
      ))}
      
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
