import React, { useCallback } from 'react';
import {
  useDaily,
  useScreenShare,
  useLocalParticipant,
  useVideoTrack,
  useAudioTrack,
} from '@daily-co/daily-react-hooks';

import './Tray.css';

export default function Tray({ leaveCall }) {
  const callObject = useDaily();
  const { isSharingScreen, startScreenShare, stopScreenShare } =
    useScreenShare();

  const localParticipant = useLocalParticipant();
  const localVideo = useVideoTrack(localParticipant?.session_id);
  const localAudio = useAudioTrack(localParticipant?.session_id);
  const mutedVideo = localVideo.isOff;
  const mutedAudio = localAudio.isOff;

  const toggleVideo = useCallback(() => {
    callObject.setLocalVideo(mutedVideo);
  }, [callObject, mutedVideo]);

  const toggleAudio = useCallback(() => {
    callObject.setLocalAudio(mutedAudio);
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
