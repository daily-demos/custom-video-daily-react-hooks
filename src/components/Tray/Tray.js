import React, { useCallback, useState } from 'react';
import {
  useDaily,
  useScreenShare,
  useLocalParticipant,
  useVideoTrack,
  useAudioTrack,
} from '@daily-co/daily-react-hooks';
import MeetingInformation from '../MeetingInformation/MeetingInformation';

import './Tray.css';
import {
  CameraOn,
  Leave,
  CameraOff,
  MicrophoneOff,
  MicrophoneOn,
  Screenshare,
  Info,
} from './Icons';

export default function Tray({ leaveCall }) {
  const callObject = useDaily();
  const { isSharingScreen, startScreenShare, stopScreenShare } =
    useScreenShare();

  const [showMeetingInformation, setShowMeetingInformation] = useState(false)

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

  const toggleMeetingInformation = () => {
    showMeetingInformation ? setShowMeetingInformation(false) : setShowMeetingInformation(true);
  }

  return (
    <div className="tray">
      {showMeetingInformation && <MeetingInformation/>}
      <div className="tray-buttons-container">
        <div className="controls">
          <button onClick={toggleVideo}>
            {mutedVideo ? <CameraOff /> : <CameraOn/>}
            {mutedVideo ? 'Turn on' : 'Turn off'}
          </button>
          <button onClick={toggleAudio}>
            {mutedAudio ? <MicrophoneOff /> : <MicrophoneOn />}
            {mutedAudio ? 'Unmute' : 'Mute'}
          </button>
        </div>
        <div className="actions">
          <button onClick={toggleScreenShare}>
            <Screenshare />
            {isSharingScreen ? 'Stop sharing' : 'Share'}
          </button>
          <button onClick={toggleMeetingInformation}>
            <Info/>
            {showMeetingInformation ? 'Hide info' : 'Show info'}

          </button>
        </div>
        <div className="leave">
          <button onClick={leave}>
            <Leave /> Leave
          </button>
        </div>
      </div>
    </div>
  );
}
