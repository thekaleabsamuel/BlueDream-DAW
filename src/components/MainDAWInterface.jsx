import React from 'react';
import AudioRecorder from './AudioRecorder';
import DrumSequencer from './DrumSequencer';

const MainDAWInterface = () => {
  return (
    <div className="daw-container" style={{ backgroundColor: 'black', color: 'white' }}>
      <h2>Digital Audio Workspace</h2>
      <div className="track-container">
        <div className="track">
          <h3>Audio Track</h3>
          <AudioRecorder />
        </div>
        <div className="track">
          <h3>MIDI Track</h3>
          <DrumSequencer />
        </div>
      </div>
    </div>
  );
};

export default MainDAWInterface;