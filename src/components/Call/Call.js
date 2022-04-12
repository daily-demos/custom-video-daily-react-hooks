import React, { useEffect, useRef } from 'react';
import {
  useParticipantIds,
  useParticipant,
  useVideoTrack,
  useScreenShare,
  useLocalParticipant,
} from '@daily-co/daily-react-hooks';

import './Call.css';
import Tile from '../Tile/Tile';
import MeetingInformation from '../MeetingInformation/MeetingInformation';

export default function Call() {
  const localParticipant = useLocalParticipant();
  const localParticipantVideoTrack = useVideoTrack(
    localParticipant?.session_id,
  );
  const { screens } = useScreenShare();
  const remoteParticipantIds = useParticipantIds({ filter: 'remote' });

  const localVideoElement = useRef(null);

  useEffect(() => {
    localVideoElement.current &&
      (localVideoElement.current.srcObject =
        localParticipantVideoTrack &&
        new MediaStream([localParticipantVideoTrack?.persistentTrack]));
  }, [localParticipantVideoTrack?.persistentTrack]);

  return (
    <div className="call">
      <div className="call-meta">
        <MeetingInformation />
        {localParticipant && (
          <div className="self-view">
            <video autoPlay muted playsInline ref={localVideoElement} />
          </div>
        )}
      </div>
      {remoteParticipantIds.length > 0 || screens.length > 0 ? (
        <>
          <div className="tiles">
            {remoteParticipantIds.map((id) => (
              <Tile key={id} id={id} />
            ))}
            {screens.map((screen) => (
              <Tile
                key={screen.screenId}
                id={screen.session_id}
                isScreenShare
              />
            ))}
          </div>
        </>
      ) : (
        <div className="no-remote-participants">
          {/*This message isn't entirely correct - sometimes people will join and it'll take a sec before this
          message disappears, even though there's others in the call.
           TODO: use useDailyEvents (?) to correctly gauge the meeting's state */}
          <h2>No other participants</h2>
          <p>Copy and paste this URL to allow others to join:</p>
          <p className="room-url">{window.location.href}</p>
        </div>
      )}
    </div>
  );
}
