import Icon from '../atoms/Icon';
import './MenuItem.css';

function MenuItem({ icon, label, onClick, onMouseEnter }) {
  return (
    <button className="menu-item" onClick={onClick} onMouseEnter={onMouseEnter}>
      <Icon name={icon} size={20} weight="fill" className="menu-item-icon" />
      <span className="menu-item-label">{label}</span>
    </button>
  );
}

export default MenuItem;