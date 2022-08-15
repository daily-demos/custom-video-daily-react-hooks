import React, { useCallback, useState } from 'react';
import {
  useDaily,
  useScreenShare,
  useLocalParticipant,
  useVideoTrack,
  useAudioTrack,
  useDailyEvent,
} from '@daily-co/daily-react-hooks';

import MeetingInformation from '../MeetingInformation/MeetingInformation';
import Chat from '../Chat/Chat';

import './Tray.css';
import {
  CameraOn,
  Leave,
  CameraOff,
  MicrophoneOff,
  MicrophoneOn,
  Screenshare,
  Info,
  ChatIcon,
  ChatHighlighted,
} from './Icons';

export default function Tray({ leaveCall }) {
  const callObject = useDaily();
  const { isSharingScreen, startScreenShare, stopScreenShare } = useScreenShare();

  const [showMeetingInformation, setShowMeetingInformation] = useState(false);
  const [showChat, setShowChat] = useState(false);
  const [newChatMessage, setNewChatMessage] = useState(false);
  const [isMutingOthers, setMuteOthers] = useState(false);

  const localParticipant = useLocalParticipant();
  const localVideo = useVideoTrack(localParticipant?.session_id);
  const localAudio = useAudioTrack(localParticipant?.session_id);
  const mutedVideo = localVideo.isOff;
  const mutedAudio = localAudio.isOff;

  /* When a remote participant sends a message in the chat, we want to display a differently colored
   * chat icon in the Tray as a notification. By listening for the `"app-message"` event we'll know
   * when someone has sent a message. */
  useDailyEvent(
    'app-message',
    useCallback(() => {
      /* Only light up the chat icon if the chat isn't already open. */
      if (!showChat) {
        setNewChatMessage(true);
      }
    }, [showChat]),
  );

  useDailyEvent(
    'participant-joined',
    useCallback(
      ({ participant: { session_id: id } }) => {
        callObject.updateParticipant(id, {
          setSubscribedTracks: {
            audio: isMutingOthers ? 'staged' : true,
            video: true,
            screenAudio: false,
            screenVideo: false,
          },
        });
      },
      [callObject, isMutingOthers],
    ),
  );

  const toggleVideo = useCallback(() => {
    callObject.setLocalVideo(mutedVideo);
  }, [callObject, mutedVideo]);

  const toggleAudio = useCallback(() => {
    callObject.setLocalAudio(mutedAudio);
  }, [callObject, mutedAudio]);

  const toggleScreenShare = () => (isSharingScreen ? stopScreenShare() : startScreenShare());

  const toggleMeetingInformation = () => {
    setShowMeetingInformation(!showMeetingInformation);
  };

  const toggleChat = () => {
    setShowChat(!showChat);
    if (newChatMessage) {
      setNewChatMessage(!newChatMessage);
    }
  };

  const toggleMuteOthers = () => {
    const updateList = {};
    for (const id in callObject.participants()) {
      if (id !== 'local') {
        updateList[id] = {
          setSubscribedTracks: {
            audio: !isMutingOthers ? 'staged' : true,
            video: true,
            screenAudio: false,
            screenVideo: false,
          },
        };
      }
    }

    callObject.updateParticipants(updateList);
    setMuteOthers(!isMutingOthers);
  };

  return (
    <div className="tray">
      {showMeetingInformation && <MeetingInformation />}
      {/*  The chat messages 'live' in the <Chat/> component's state. We can't just remove the component*/}
      {/*  from the DOM when hiding the chat, because that would cause us to lose that state. So we're*/}
      {/*  choosing a slightly different approach of toggling the chat: always render the component, but only*/}
      {/*  render its HTML when showChat is set to true.*/}

      {/*   We're also passing down the toggleChat() function to the component, so we can open and close the chat*/}
      {/*   from the chat UI and not just the Tray.*/}
      <Chat showChat={showChat} toggleChat={toggleChat} />
      <div className="tray-buttons-container">
        <div className="controls">
          <button onClick={toggleVideo}>
            {mutedVideo ? <CameraOff /> : <CameraOn />}
            {mutedVideo ? 'Turn camera on' : 'Turn camera off'}
          </button>
          <button onClick={toggleAudio}>
            {mutedAudio ? <MicrophoneOff /> : <MicrophoneOn />}
            {mutedAudio ? 'Unmute mic' : 'Mute mic'}
          </button>
        </div>
        <div className="actions">
          <button onClick={toggleScreenShare}>
            <Screenshare />
            {isSharingScreen ? 'Stop sharing screen' : 'Share screen'}
          </button>
          <button onClick={toggleMeetingInformation}>
            <Info />
            {showMeetingInformation ? 'Hide info' : 'Show info'}
          </button>
          <button onClick={toggleChat}>
            {newChatMessage ? <ChatHighlighted /> : <ChatIcon />}
            {showChat ? 'Hide chat' : 'Show chat'}
          </button>
          <button onClick={toggleMuteOthers}>
            {isMutingOthers ? 'Unmute others' : 'Mute others'}
          </button>
        </div>
        <div className="leave">
          <button onClick={leaveCall}>
            <Leave /> Leave call
          </button>
        </div>
      </div>
    </div>
  );
}
