import { useState } from 'react';
import Icon from './Icon';
import { getVolume, setVolume, isSoundEnabled, setSoundEnabled, sounds, updateFanVolume } from '../../utils/sounds';
import './VolumeButton.css';

function VolumeButton() {
  const [showPanel, setShowPanel] = useState(false);
  const [volume, setVolumeState] = useState(getVolume());
  const [enabled, setEnabledState] = useState(isSoundEnabled());

  const handleVolumeChange = (e) => {
    const newVol = parseFloat(e.target.value);
    setVolume(newVol);
    setVolumeState(newVol);
    sounds.click();
    updateFanVolume();
  };

  const toggleSound = () => {
    const newEnabled = !enabled;
    setEnabledState(newEnabled);
    setSoundEnabled(newEnabled);
    if (newEnabled) {
      sounds.click();
    }
  };

  return (
    <div className="volume-button">
      <button 
        className="volume-toggle"
        onClick={() => setShowPanel(!showPanel)}
        onMouseEnter={() => sounds.hover()}
      >
        <Icon 
          name={enabled && volume > 0 ? "speaker-high" : "speaker-x"} 
          size={16} 
          weight="fill" 
          className="volume-icon"
        />
      </button>
      
      {showPanel && (
        <div className="volume-panel">
          <button 
            className="sound-toggle"
            onClick={toggleSound}
            onMouseEnter={() => sounds.hover()}
          >
            <Icon 
              name={enabled ? "speaker-high" : "speaker-slash"} 
              size={14} 
              weight="fill"
            />
          </button>
          
          <input 
            type="range" 
            min="0" 
            max="1" 
            step="0.1"
            value={volume}
            onChange={handleVolumeChange}
            className="volume-slider"
          />
        </div>
      )}
    </div>
  );
}

export default VolumeButton;