import { useLanguage } from '../../i18n/LanguageContext';
import Icon from '../atoms/Icon';
import './ContactMe.css';

function ContactMe() {
  const { t } = useLanguage();

  const contacts = [
    { type: 'phone', label: 'Phone', value: '+55 (92) 99220-0863', link: 'tel:+5592992200863', icon: 'phone' },
    { type: 'whatsapp', label: 'WhatsApp', value: '+55 (92) 98844-9683', link: 'https://wa.me/55929988449683', icon: 'whatsapp' },
    { type: 'email', label: t('email'), value: 'dbmalcher@gmail.com', link: 'mailto:dbmalcher@gmail.com', icon: 'email' },
    { type: 'github', label: t('github'), value: 'github.com/dbmalcher', link: 'https://github.com/dbmalcher', icon: 'github' },
    { type: 'linkedin', label: t('linkedin'), value: 'linkedin.com/in/dbmalcher', link: 'https://linkedin.com/in/dbmalcher', icon: 'linkedin' },
  ];

  return (
    <div className="contact-me">
      <h2 className="contact-title">{t('getInTouch')}</h2>
      <div className="contact-list">
        {contacts.map((contact) => (
          <div key={contact.type} className="contact-item">
            <Icon name={contact.icon} size={24} className="contact-icon" />
            <span className="contact-label">{contact.label}:</span>
            <a href={contact.link} className="contact-value" target="_blank" rel="noopener noreferrer">{contact.value}</a>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ContactMe;
