import { useState } from 'react';
import { useLanguage } from '../../i18n/LanguageContext';
import Window from '../organisms/Window';
import './Projects.css';

const sampleProjects = [
  { id: 'p1', name: 'E-commerce Platform', category: 'Web Development' },
  { id: 'p2', name: 'Portfolio Website', category: 'Web Development' },
  { id: 'p3', name: 'Mobile App', category: 'Mobile' },
  { id: 'p4', name: 'Dashboard', category: 'Web Development' },
];

const sampleCategories = [
  { id: 'c1', name: 'Web Development', projects: ['p1', 'p2', 'p4'] },
  { id: 'c2', name: 'Mobile', projects: ['p3'] },
  { id: 'c3', name: 'Design', projects: [] },
];

function Projects({ 
  isActive, 
  isMinimized, 
  position, 
  onClose, 
  onMinimize, 
  onFocus, 
  onPositionChange 
}) {
  const { t } = useLanguage();
  const [history, setHistory] = useState([{ type: 'root', name: t('projects') }]);
  const [historyIndex, setHistoryIndex] = useState(0);

  const current = history[historyIndex];

  const navigate = (action, data) => {
    if (action === 'back') {
      if (historyIndex > 0) {
        setHistoryIndex(historyIndex - 1);
      }
    } else if (action === 'forward') {
      if (historyIndex < history.length - 1) {
        setHistoryIndex(historyIndex + 1);
      }
    } else if (action === 'home') {
      setHistory([{ type: 'root', name: t('projects') }]);
      setHistoryIndex(0);
    } else if (action === 'breadcrumb') {
      const newIndex = data;
      setHistoryIndex(newIndex);
    } else if (action === 'category') {
      const category = sampleCategories.find(c => c.id === data);
      if (category) {
        const newHistory = history.slice(0, historyIndex + 1);
        newHistory.push({ type: 'category', id: data, name: category.name });
        setHistory(newHistory);
        setHistoryIndex(newHistory.length - 1);
      }
    } else if (action === 'project') {
      const project = sampleProjects.find(p => p.id === data);
      if (project) {
        const newHistory = history.slice(0, historyIndex + 1);
        newHistory.push({ type: 'project', id: data, name: project.name });
        setHistory(newHistory);
        setHistoryIndex(newHistory.length - 1);
      }
    }
  };

  const breadcrumb = history.slice(0, historyIndex + 1).map(h => h.name);
  const canGoBack = historyIndex > 0;
  const canGoForward = historyIndex < history.length - 1;

  const renderContent = () => {
    if (current.type === 'root') {
      return (
        <div className="projects-grid">
          {sampleCategories.map(cat => (
            <button 
              key={cat.id}
              className="project-category-card"
              onClick={() => navigate('category', cat.id)}
            >
              <span className="category-name">{cat.name}</span>
              <span className="category-count">{cat.projects.length} {t('projects')}</span>
            </button>
          ))}
        </div>
      );
    }

    if (current.type === 'category') {
      const category = sampleCategories.find(c => c.id === current.id);
      if (!category) return null;
      
      return (
        <div className="projects-grid">
          {category.projects.map(projectId => {
            const project = sampleProjects.find(p => p.id === projectId);
            if (!project) return null;
            
            return (
              <button 
                key={project.id}
                className="project-item-card"
                onClick={() => navigate('project', project.id)}
              >
                <span className="project-name">{project.name}</span>
              </button>
            );
          })}
        </div>
      );
    }

    if (current.type === 'project') {
      return (
        <div className="project-detail">
          <h2>{current.name}</h2>
          <p>{t('comingSoon')}</p>
        </div>
      );
    }

    return null;
  };

  const navigation = {
    breadcrumb,
    onNavigate: navigate,
    canGoBack,
    canGoForward,
  };

  return (
    <Window
      titleContent="projects"
      isActive={isActive}
      isMinimized={isMinimized}
      position={position}
      onClose={onClose}
      onMinimize={onMinimize}
      onFocus={onFocus}
      onPositionChange={onPositionChange}
      width={500}
      height={400}
      navigation={navigation}
    >
      <div className="projects-content">
        {renderContent()}
      </div>
    </Window>
  );
}

export default Projects;