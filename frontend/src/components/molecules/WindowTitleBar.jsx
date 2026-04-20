import Icon from '../atoms/Icon';
import WindowButton from '../atoms/WindowButton';
import './WindowTitleBar.css';

const iconMap = {
  about: 'user-circle',
  contact: 'mailbox',
  projects: 'folder',
  skills: 'paintbrush',
};

function WindowTitleBar({ title, isActive, onClose, onMinimize, onFocus, onMouseDown, content }) {
  const iconName = iconMap[content] || 'folder';
  
  return (
    <div 
      className="window-titlebar"
      onMouseDown={onMouseDown}
    >
      <div className="window-title">
        <Icon name={iconName} size={18} className="window-icon" />
        <span className="window-title-text">{title}</span>
      </div>
      <div className="window-controls">
        <WindowButton type="minimize" onClick={onMinimize}>─</WindowButton>
        <WindowButton type="maximize" onClick={() => {}}>□</WindowButton>
        <WindowButton type="close" onClick={onClose}>✕</WindowButton>
      </div>
    </div>
  );
}

export default WindowTitleBar;
