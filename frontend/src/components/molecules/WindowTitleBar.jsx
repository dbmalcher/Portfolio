import { Icon, WindowButton } from '../atoms';
import './WindowTitleBar.css';

function WindowTitleBar({ title, isActive, onClose, onMinimize, onFocus, onMouseDown }) {
  return (
    <div 
      className="window-titlebar"
      onMouseDown={onMouseDown}
    >
      <div className="window-title">
        <Icon emoji="📄" className="window-icon" />
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
