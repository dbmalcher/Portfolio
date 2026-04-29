import { useEffect, useRef } from 'react';
import { useLanguage } from '../../i18n/LanguageContext';
import { sounds } from '../../utils/sounds';
import Icon from '../atoms/Icon';
import '../molecules/MenuItem.css';
import './StartMenu.css';

const menuItems = [
  { id: 'about', icon: 'user', label: 'Sobre Mim' },
  { id: 'contact', icon: 'mailbox', label: 'Contato' },
  { id: 'projects', icon: 'folder', label: 'Projetos' },
];

const rightMenuItems = [
  { labelKey: 'myDocuments', icon: 'folder' },
  { labelKey: 'images', icon: 'globe' },
  { labelKey: 'settings', icon: 'paintbrush' },
];

function StartMenu({ isOpen, onClose, onOpenWindow }) {
  const { t } = useLanguage();
  const menuRef = useRef(null);

  useEffect(() => {
    if (!isOpen) return;

    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        onClose();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleItemClick = (itemId, label) => {
    sounds.click();
    onOpenWindow(itemId, label, itemId);
  };

  return (
    <div className="start-menu" ref={menuRef}>
      <div className="start-menu-left">
        <div className="user-panel">
          <div className="user-avatar">
            <Icon name="user" size={22} weight="fill" />
          </div>
          <span className="user-name">Daniel</span>
        </div>
        <div className="menu-items">
          {menuItems.map((item) => (
            <button
              key={item.id}
              className="menu-item"
              onClick={() => handleItemClick(item.id, t(item.id) || item.label)}
              onMouseEnter={() => sounds.hover()}
            >
              <Icon name={item.icon} size={20} weight="fill" className="menu-item-icon" />
              <span className="menu-item-label">{t(item.id) || item.label}</span>
            </button>
          ))}
        </div>
      </div>
      <div className="start-menu-right">
        {rightMenuItems.map((item) => (
          <button
            key={item.labelKey}
            className="menu-item"
            onClick={() => {}}
            onMouseEnter={() => sounds.hover()}
          >
            <Icon name={item.icon} size={18} weight="fill" className="menu-item-icon" />
            <span className="menu-item-label">{t(item.labelKey)}</span>
          </button>
        ))}
      </div>
    </div>
  );
}

export default StartMenu;