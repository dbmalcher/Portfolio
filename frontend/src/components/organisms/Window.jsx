import { useState, useEffect, useRef } from 'react';
import { useLanguage } from '../../i18n/LanguageContext';
import { WindowTitleBar } from '../molecules';
import './Window.css';

function Window({ id, titleContent, isActive, isMinimized, position, onClose, onMinimize, onFocus, onPositionChange, children }) {
  const { t } = useLanguage();
  const [localPosition, setLocalPosition] = useState(position);
  const [isDragging, setIsDragging] = useState(false);
  const dragStartRef = useRef({ x: 0, y: 0, windowX: 0, windowY: 0 });
  const windowRef = useRef(null);

  const clampPosition = (pos) => {
    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;
    const titlebarHeight = 28;
    
    const windowWidth = windowRef.current?.offsetWidth || 400;
    const windowHeight = windowRef.current?.offsetHeight || 300;
    
    let adjustedX = pos.x;
    let adjustedY = pos.y;
    
    if (adjustedX < 0) adjustedX = 0;
    if (adjustedX + windowWidth > viewportWidth) {
      adjustedX = viewportWidth - windowWidth;
    }
    
    if (adjustedY < 0) adjustedY = 0;
    if (adjustedY + titlebarHeight > viewportHeight - 40) {
      adjustedY = viewportHeight - 40 - titlebarHeight;
    }
    if (adjustedY + windowHeight > viewportHeight - 40) {
      adjustedY = viewportHeight - 40 - windowHeight;
    }
    
    return { x: adjustedX, y: adjustedY };
  };

  useEffect(() => {
    const clamped = clampPosition(position);
    if (clamped.x !== position.x || clamped.y !== position.y) {
      setLocalPosition(clamped);
      onPositionChange(clamped);
    } else {
      setLocalPosition(position);
    }
  }, []);

  useEffect(() => {
    setLocalPosition(position);
  }, [position]);

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (isDragging) {
        const newX = dragStartRef.current.windowX + (e.clientX - dragStartRef.current.x);
        const newY = dragStartRef.current.windowY + (e.clientY - dragStartRef.current.y);
        
        const clamped = clampPosition({ x: newX, y: newY });
        setLocalPosition(clamped);
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
      ref={windowRef}
      className={`window ${isActive ? 'active' : 'inactive'} ${isDragging ? 'dragging' : ''}`}
      onMouseDown={onFocus}
      style={{
        left: localPosition.x,
        top: localPosition.y,
      }}
    >
      <WindowTitleBar 
        title={t(titleContent)}
        isActive={isActive}
        onClose={onClose}
        onMinimize={onMinimize}
        onFocus={onFocus}
        onMouseDown={handleMouseDown}
      />
      <div className="window-content">
        {children}
      </div>
    </div>
  );
}

export default Window;
