import Icon from '../atoms/Icon';
import './DesktopIcon.css';

function DesktopIcon({ icon, label, isActive, onClick }) {
  return (
    <div 
      className={`desktop-icon ${isActive ? 'active' : ''}`}
      onClick={onClick}
    >
      <Icon emoji={icon} className="desktop-icon-image" />
      <div className="desktop-icon-label">{label}</div>
    </div>
  );
}

export default DesktopIcon;
