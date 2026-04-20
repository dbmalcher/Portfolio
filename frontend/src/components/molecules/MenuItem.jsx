import Icon from '../atoms/Icon';
import './MenuItem.css';

function MenuItem({ icon, label, onClick }) {
  return (
    <div className="menu-item" onClick={onClick}>
      <Icon name={icon} size={24} className="menu-item-icon" />
      <span className="menu-item-label">{label}</span>
    </div>
  );
}

export default MenuItem;
