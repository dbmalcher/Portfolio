import { useState } from 'react';
import { LanguageProvider, useLanguage } from './i18n/LanguageContext';
import { Desktop, Taskbar, Window } from './components/organisms';
import './styles.css';

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
  const [windows, setWindows] = useState([
    { id: 1, content: 'about', isOpen: true, isMinimized: false, position: { x: 900, y: 20 } },
    { id: 2, content: 'contact', isOpen: true, isMinimized: false, position: { x: 1400, y: 180 } },
    { id: 3, content: 'skills', isOpen: true, isMinimized: false, position: { x: 1000, y: 500 } },
  ]);
  const [activeWindow, setActiveWindow] = useState(3);
  const [showStartMenu, setShowStartMenu] = useState(false);

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
