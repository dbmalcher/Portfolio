import Icon from '../atoms/Icon';
import './TaskbarWindow.css';

const iconMap = {
  about: 'user',
  contact: 'mailbox',
  projects: 'folder',
  skills: 'paintbrush',
};

function TaskbarWindow({ title, isActive, isMinimized, onClick, content }) {
  const iconName = iconMap[content] || 'folder';
  
  return (
    <button
      className={`taskbar-window ${isActive ? 'active' : ''} ${isMinimized ? 'minimized' : ''}`}
      onClick={onClick}
    >
      <Icon name={iconName} size={16} className="window-icon" />
      <span className="window-title">{title}</span>
    </button>
  );
}

export default TaskbarWindow;
