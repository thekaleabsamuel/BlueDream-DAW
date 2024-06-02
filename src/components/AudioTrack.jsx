import React, { useRef, useEffect } from 'react';
import WaveSurfer from 'wavesurfer.js';

const AudioTrack = ({ audioData }) => {
  const waveSurferRef = useRef(null);

  useEffect(() => {
    const waveSurfer = WaveSurfer.create({
      container: '#waveform',
      waveColor: '#bdbdbd',
      progressColor: '#2196f3',
      cursorColor: 'navy',
      height: 150,
      responsive: true,
      scrollParent: true,
    });

    waveSurferRef.current = waveSurfer;

    const blob = new Blob(audioData, { type: 'audio/webm' });
    const url = URL.createObjectURL(blob);
    waveSurfer.load(url);

    return () => {
      waveSurfer.destroy();
    };
  }, [audioData]);

  return <div id="waveform" />;
};

export default AudioTrack;