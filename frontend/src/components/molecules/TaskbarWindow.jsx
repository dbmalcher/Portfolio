import Icon from '../atoms/Icon';
import './TaskbarWindow.css';

function TaskbarWindow({ title, isActive, isMinimized, onClick }) {
  return (
    <button
      className={`taskbar-window ${isActive ? 'active' : ''} ${isMinimized ? 'minimized' : ''}`}
      onClick={onClick}
    >
      <Icon emoji="📄" className="window-icon" />
      <span className="window-title">{title}</span>
    </button>
  );
}

export default TaskbarWindow;
