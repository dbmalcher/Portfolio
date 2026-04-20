import { sounds } from '../../utils/sounds';
import './WindowButton.css';

function WindowButton({ type, onClick, children }) {
  const handleClick = (e) => {
    if (type === 'close') {
      sounds.close();
    } else if (type === 'minimize') {
      sounds.minimize();
    } else {
      sounds.click();
    }
    onClick(e);
  };
  
  return ( 
    <button 
      className={`window-btn ${type}`} 
      onClick={handleClick}
    >
      {children}
    </button>
  );
}

export default WindowButton;
