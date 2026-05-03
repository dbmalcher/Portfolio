import { useLanguage } from '../../i18n/LanguageContext';
import { CaretLeft, CaretRight, House } from '@phosphor-icons/react';
import './WindowNavigation.css';

function WindowNavigation({ 
  breadcrumb = [], 
  onNavigate, 
  canGoBack, 
  canGoForward 
}) {
  const { t } = useLanguage();

  const handleBack = () => {
    if (canGoBack && onNavigate?.('back')) {
      onNavigate('back');
    }
  };

  const handleForward = () => {
    if (canGoForward && onNavigate?.('forward')) {
      onNavigate('forward');
    }
  };

  const handleBreadcrumbClick = (index) => {
    if (onNavigate?.('breadcrumb')) {
      onNavigate('breadcrumb', index);
    }
  };

  const handleHomeClick = () => {
    if (onNavigate?.('home')) {
      onNavigate('home');
    }
  };

  return (
    <div className="window-navigation">
      <div className="nav-buttons">
        <button 
          className="nav-btn" 
          onClick={handleBack}
          disabled={!canGoBack}
          title={t('back')}
        >
          <CaretLeft size={16} weight="bold" />
        </button>
        <button 
          className="nav-btn" 
          onClick={handleForward}
          disabled={!canGoForward}
          title={t('forward')}
        >
          <CaretRight size={16} weight="bold" />
        </button>
      </div>
      
      <div className="breadcrumb">
        <button 
          className="breadcrumb-home" 
          onClick={handleHomeClick}
          title={t('home')}
        >
          <House size={14} weight="fill" />
        </button>
        
        {breadcrumb.map((item, index) => (
          <div key={index} className="breadcrumb-item">
            <span className="breadcrumb-separator">/</span>
            <button 
              className="breadcrumb-link"
              onClick={() => handleBreadcrumbClick(index)}
              disabled={index === breadcrumb.length - 1}
            >
              {item}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default WindowNavigation;