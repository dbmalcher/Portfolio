import './StartMenu.css';

const menuItems = [
  { id: 'about', label: 'Sobre Mim', icon: '👤' },
  { id: 'projects', label: 'Projetos', icon: '📁' },
  { id: 'contact', label: 'Contato', icon: '✉️' },
  { id: 'skills', label: 'Habilidades', icon: '⚡' },
];

const rightMenuItems = [
  { label: 'Meus Documentos', icon: '📂' },
  { label: 'Imagens', icon: '🖼️' },
  { label: 'Configurações', icon: '⚙️' },
];

function StartMenu({ isOpen, onClose, onOpenWindow }) {
  if (!isOpen) return null;

  return (
    <div className="start-menu">
      <div className="start-menu-left">
        <div className="user-panel">
          <div className="user-avatar">👤</div>
          <div className="user-name">Daniel</div>
        </div>
        <div className="menu-items">
          {menuItems.map((item) => (
            <button
              key={item.id}
              className="menu-item"
              onClick={() => onOpenWindow(item.id, item.label, item.id)}
            >
              <span className="menu-item-icon">{item.icon}</span>
              <span className="menu-item-label">{item.label}</span>
            </button>
          ))}
        </div>
      </div>
      <div className="start-menu-right">
        {rightMenuItems.map((item, index) => (
          <button key={index} className="right-menu-item">
            <span className="right-menu-icon">{item.icon}</span>
            <span className="right-menu-label">{item.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
}

export default StartMenu;
