import './WindowButton.css';

function WindowButton({ type, onClick, children }) {
  return (
    <button 
      className={`window-btn ${type}`} 
      onClick={onClick}
    >
      {children}
    </button>
  );
}

export default WindowButton;
