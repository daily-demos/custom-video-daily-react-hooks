import React, { useEffect, useRef } from 'react';
import {
  useParticipantIds,
  useParticipant,
  useVideoTrack,
  useScreenShare,
} from '@daily-co/daily-react-hooks';

import './Call.css';
import Tile from '../Tile/Tile';
import MeetingInformation from '../MeetingInformation/MeetingInformation';

export default function Call() {
  // Ideally we'd use useLocalParticipant() here, but the useLocalParticipant hook is...a bit wonky.
  // Currently, it's adding an arbitrary delay of 1 second after the loaded event fired,
  // but 1 second doesn't seem to be enough. I guess it depends on the runtime but on my machine I pretty consistently get back `null`.
  // For now this will do (though not great for a hooks demo :|)
  const localParticipantId = useParticipantIds({ filter: 'local' })[0];
  const localParticipant = useParticipant(localParticipantId);
  const localParticipantVideoTrack = useVideoTrack(localParticipantId);
  const { screens, isSharingScreen } = useScreenShare();

  const remoteParticipantIds = useParticipantIds({ filter: 'remote' });
  const screenIds = screens?.map((screen) => screen.screenId);

  /* We're combining the IDs of "people" (participants) and screenshares here.
   * This we'll pass on to our Tile component to render the all MediaScreenTracks: video and screenshares.
   * There might be an easier way to do this, but I haven't found it yet..
   */
  const remoteParticipantIdsAndScreenIds = [
    ...remoteParticipantIds,
    ...screenIds,
  ];

  const localVideoElement = useRef(null);

  /* This will be the self-view displayed in the top right. */
  useEffect(() => {
    localVideoElement.current &&
      (localVideoElement.current.srcObject =
        localParticipantVideoTrack &&
        new MediaStream([localParticipantVideoTrack.persistentTrack]));
  }, [localParticipantVideoTrack]);

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
      {remoteParticipantIdsAndScreenIds.length > 0 ? (
        <>
          {/* We want to display a different grid depending on whether someone is screensharing or not.
           This is still a Work in Progress -- I'm probably overcomplicating things but I'm like 68% sure that
           once I get the CSS in place I can clean up this code afterwards 🤷‍
           */}
          <div
            className={
              isSharingScreen ? 'remote-participants-small' : 'remote-participants-large'
            }>
            {remoteParticipantIdsAndScreenIds.map((id) => (
              <Tile key={id} id={id} isScreenShare={id.endsWith('-screen')} />
            ))}
          </div>
          )}
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
