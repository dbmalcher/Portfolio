import { useState, useEffect, useRef } from 'react';
import './Window.css';

function Window({ id, title, isActive, isMinimized, position, onClose, onMinimize, onFocus, onPositionChange, children }) {
  const [localPosition, setLocalPosition] = useState(position);
  const [isDragging, setIsDragging] = useState(false);
  const dragStartRef = useRef({ x: 0, y: 0, windowX: 0, windowY: 0 });

  useEffect(() => {
    setLocalPosition(position);
  }, [position]);

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (isDragging) {
        const newX = dragStartRef.current.windowX + (e.clientX - dragStartRef.current.x);
        const newY = dragStartRef.current.windowY + (e.clientY - dragStartRef.current.y);
        setLocalPosition({ x: newX, y: newY });
      }
    };

    const handleMouseUp = () => {
      if (isDragging) {
        setIsDragging(false);
        onPositionChange(localPosition);
      }
    };

    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
    }

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging, localPosition, onPositionChange]);

  const handleMouseDown = (e) => {
    if (e.target.closest('.window-btn')) return;
    
    dragStartRef.current = {
      x: e.clientX,
      y: e.clientY,
      windowX: localPosition.x,
      windowY: localPosition.y
    };
    setIsDragging(true);
    onFocus();
  };

  if (isMinimized) {
    return null;
  }

  return (
    <div 
      className={`window ${isActive ? 'active' : 'inactive'} ${isDragging ? 'dragging' : ''}`}
      onMouseDown={onFocus}
      style={{
        left: localPosition.x,
        top: localPosition.y,
      }}
    >
      <div 
        className="window-titlebar"
        onMouseDown={handleMouseDown}
      >
        <div className="window-title">
          <span className="window-icon">📄</span>
          {title}
        </div>
        <div className="window-controls">
          <button className="window-btn minimize" onClick={onMinimize}>─</button>
          <button className="window-btn maximize">□</button>
          <button className="window-btn close" onClick={onClose}>✕</button>
        </div>
      </div>
      <div className="window-content">
        {children}
      </div>
    </div>
  );
}

export default Window;
