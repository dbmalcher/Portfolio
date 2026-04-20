import { useLanguage } from '../../i18n/LanguageContext';
import Icon from '../atoms/Icon';
import MenuItem from '../molecules/MenuItem';
import './StartMenu.css';

const menuItems = [
  { id: 'about', icon: 'user' },
  { id: 'contact', icon: 'mailbox' },
  { id: 'projects', icon: 'folder' },
];

const rightMenuItems = [
  { labelKey: 'myDocuments', icon: 'folder' },
  { labelKey: 'images', icon: 'globe' },
  { labelKey: 'settings', icon: 'paintbrush' },
];

function StartMenu({ isOpen, onClose, onOpenWindow }) {
  const { t } = useLanguage();

  if (!isOpen) return null;

  return (
    <div className="start-menu">
      <div className="start-menu-left">
        <div className="user-panel">
          <Icon name="user" size={32} className="user-avatar" />
          <span className="user-name">{t('Daniel')}</span>
        </div>
        <div className="menu-items">
          {menuItems.map((item) => (
            <MenuItem
              key={item.id}
              icon={item.icon}
              label={t(item.id)}
              onClick={() => onOpenWindow(item.id, t(item.id), item.id)}
            />
          ))}
        </div>
      </div>
      <div className="start-menu-right">
        {rightMenuItems.map((item) => (
          <MenuItem
            key={item.labelKey}
            icon={item.icon}
            label={t(item.labelKey)}
            onClick={() => {}}
          />
        ))}
      </div>
    </div>
  );
}

export default StartMenu;
