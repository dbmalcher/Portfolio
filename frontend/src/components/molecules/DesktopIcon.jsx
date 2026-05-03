import Icon from '../atoms/Icon';
import './DesktopIcon.css';

function DesktopIcon({ icon, label, isActive, onClick, onMouseEnter }) {
  return (
    <div 
      className={`desktop-icon ${isActive ? 'active' : ''}`}
      onClick={onClick}
      onMouseEnter={onMouseEnter}
    >
      <Icon name={icon} size={40} className="desktop-icon-image" />
      <div className="desktop-icon-label">{label}</div>
    </div>
  );
}

export default DesktopIcon;
