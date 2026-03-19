import { Icon } from '../atoms';
import './MenuItem.css';

function MenuItem({ icon, label, onClick }) {
  return (
    <button className="menu-item" onClick={onClick}>
      <Icon emoji={icon} className="menu-item-icon" />
      <span className="menu-item-label">{label}</span>
    </button>
  );
}

export default MenuItem;
