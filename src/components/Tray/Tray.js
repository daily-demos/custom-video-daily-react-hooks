import React, { useCallback, useState } from 'react';
import { useDaily, useScreenShare } from '@daily-co/daily-react-hooks';

import './Tray.css';

export default function Tray({ leaveCall }) {
  const callObject = useDaily();
  const [mutedVideo, setMutedVideo] = useState(false);
  const [mutedAudio, setMutedAudio] = useState(false);
  const { isSharingScreen, startScreenShare, stopScreenShare } =
    useScreenShare();

  const toggleVideo = useCallback(() => {
    callObject.setLocalVideo(mutedVideo);
    setMutedVideo(!mutedVideo);
  }, [callObject, mutedVideo]);

  const toggleAudio = useCallback(() => {
    callObject.setLocalAudio(mutedAudio);
    setMutedAudio(!mutedAudio);
  }, [callObject, mutedAudio]);

  const toggleScreenShare = () =>
    isSharingScreen ? stopScreenShare() : startScreenShare();

  const leave = () => {
    leaveCall();
  };

  return (
    <div className="tray">
      <div className="tray-buttons-container">
        <button onClick={toggleVideo}>
          {mutedVideo ? 'Unmute your video' : 'Mute your video'}
        </button>
        <button onClick={toggleAudio}>
          {mutedAudio ? 'Unmute your audio' : 'Mute your audio'}
        </button>
        <button onClick={toggleScreenShare}>
          {isSharingScreen ? 'Stop sharing screen' : 'Share your screen'}
        </button>
        <button onClick={leave}>Leave call</button>
      </div>
    </div>
  );
}
