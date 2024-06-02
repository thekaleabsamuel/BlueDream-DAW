import React, { useState, useEffect, useRef } from 'react';
import AudioTrack from './AudioTrack';

const AudioRecorder = () => {
  const [isRecording, setIsRecording] = useState(false);
  const [audioTracks, setAudioTracks] = useState([]);

  const mediaRecorderRef = useRef(null);
  const audioStreamRef = useRef(null);

  useEffect(() => {
    navigator.mediaDevices.getUserMedia({ audio: true })
      .then(stream => {
        audioStreamRef.current = stream;
        const mediaRecorder = new MediaRecorder(stream);
        mediaRecorderRef.current = mediaRecorder;

        mediaRecorder.ondataavailable = event => {
          if (event.data.size > 0) {
            const newTrack = {
              id: Date.now(),
              data: [event.data],
            };
            setAudioTracks(prevTracks => [...prevTracks, newTrack]);
          }
        };
      })
      .catch(error => {
        console.error('Error accessing microphone:', error);
      });
  }, []);

  const startRecording = () => {
    if (mediaRecorderRef.current) {
      mediaRecorderRef.current.start();
      setIsRecording(true);
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
    }
  };

  const addNewTrack = () => {
    setAudioTracks(prevTracks => [...prevTracks, { id: Date.now(), data: [] }]);
  };

  return (
    <div>
      <h2>Audio Recorder</h2>
      <button onClick={isRecording ? stopRecording : startRecording}>
        {isRecording ? 'Stop Recording' : 'Start Recording'}
      </button>
      <button onClick={addNewTrack}>Add New Track</button>
      {audioTracks.map(track => (
        <AudioTrack key={track.id} audioData={track.data} />
      ))}
    </div>
  );
};

export default AudioRecorder;