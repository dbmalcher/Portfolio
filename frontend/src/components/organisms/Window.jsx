import { useState, useEffect, useRef } from 'react';
import { useLanguage } from '../../i18n/LanguageContext';
import WindowTitleBar from '../molecules/WindowTitleBar';
import './Window.css';

function Window({ id, titleContent, isActive, isMinimized, position, onClose, onMinimize, onFocus, onPositionChange, width, height, noWhiteBg, children }) {
  const { t } = useLanguage();
  const [localPosition, setLocalPosition] = useState(position);
  const [isDragging, setIsDragging] = useState(false);
  const dragStartRef = useRef({ x: 0, y: 0, windowX: 0, windowY: 0, windowWidth: 0, windowHeight: 0 });
  const windowRef = useRef(null);

  const windowWidth = width || 400;
  const windowHeight = height || 300;

  const clampPosition = (pos, fixedWidth, fixedHeight) => {
    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;
    const titlebarHeight = 40;
    
    const w = fixedWidth || windowWidth;
    const h = fixedHeight || windowHeight;
    
    let adjustedX = pos.x;
    let adjustedY = pos.y;
    
    if (adjustedX < 0) adjustedX = 0;
    if (adjustedX + w > viewportWidth) {
      adjustedX = viewportWidth - w;
    }
    
    if (adjustedY < 0) adjustedY = 0;
    if (adjustedY + titlebarHeight > viewportHeight - 40) {
      adjustedY = viewportHeight - 40 - titlebarHeight;
    }
    if (adjustedY + h > viewportHeight - 40) {
      adjustedY = viewportHeight - 40 - h;
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
        
        const clamped = clampPosition(
          { x: newX, y: newY }, 
          dragStartRef.current.windowWidth, 
          dragStartRef.current.windowHeight
        );
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
    
    const rect = windowRef.current?.getBoundingClientRect();
    dragStartRef.current = {
      x: e.clientX,
      y: e.clientY,
      windowX: localPosition.x,
      windowY: localPosition.y,
      windowWidth: rect?.width || 400,
      windowHeight: rect?.height || 300
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
        width: windowWidth,
        height: windowHeight,
      }}
    >
      <div className="window-header">
        <WindowTitleBar 
          title={t(titleContent)}
          content={titleContent}
          isActive={isActive}
          onClose={onClose}
          onMinimize={onMinimize}
          onFocus={onFocus}
          onMouseDown={handleMouseDown}
        />
      </div>
      <div className={`window-body ${noWhiteBg ? 'no-bg' : ''}`}>
        <div className={`window-content ${noWhiteBg ? 'no-bg' : ''}`}>
          {children}
        </div>
      </div>
    </div>
  );
}

export default Window;
