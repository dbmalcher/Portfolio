import { useState, useEffect } from 'react';
import './Clock.css';

function Clock({ language }) {
  const getTime = () => {
    const now = new Date();
    return now.toLocaleTimeString(language === 'pt' ? 'pt-BR' : 'en-US', { 
      hour: '2-digit', 
      minute: '2-digit' 
    });
  };

  const [time, setTime] = useState(getTime());

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(getTime());
    }, 1000);
    return () => clearInterval(timer);
  }, [language]);

  return <div className="tray-clock">{time}</div>;
}

export default Clock;
