import './Tile.css';
import { useEffect, useRef } from 'react';
import {
  useLocalParticipant,
  useMediaTrack,
  useParticipant,
  useVideoTrack,
} from '@daily-co/daily-react-hooks';
import { RaiseHand} from "../Tray/Icons";

export default function Tile({ id, isScreenShare, isLocalParticipant, multipleParticipants }) {
  /* This is for displaying our self-view. */
  const localParticipant = useLocalParticipant();
  const localParticipantVideoTrack = useVideoTrack(localParticipant?.session_id);
  const localVideoElement = useRef(null);

  useEffect(() => {
    if (!localParticipantVideoTrack.persistentTrack) return;
    localVideoElement?.current &&
      (localVideoElement.current.srcObject =
        localParticipantVideoTrack.persistentTrack &&
        new MediaStream([localParticipantVideoTrack?.persistentTrack]));
  }, [localParticipantVideoTrack.persistentTrack]);

  /* This is for remote participants */
  const videoTrack = useMediaTrack(id, isScreenShare ? 'screenVideo' : 'video');
  const audioTrack = useMediaTrack(id, isScreenShare ? 'screenAudio' : 'audio');

  const videoElement = useRef(null);
  const audioElement = useRef(null);

  const participant = useParticipant(id);

  useEffect(() => {
    /*  The track is ready to be played. We can show video of the remote participant in the UI.*/
    if (videoTrack?.state === 'playable') {
      videoElement.current &&
        (videoElement.current.srcObject =
          videoTrack && new MediaStream([videoTrack.persistentTrack]));
    }
  }, [videoTrack]);

  useEffect(() => {
    if (audioTrack?.state === 'playable') {
      audioElement?.current &&
        (audioElement.current.srcObject =
          audioTrack && new MediaStream([audioTrack.persistentTrack]));
    }
  }, [audioTrack]);

  return (
    <>
      {isLocalParticipant && (
        <div className={multipleParticipants ? 'self-view' : 'self-view alone'}>
          <video autoPlay muted playsInline ref={localVideoElement} />
          <div className="hand-raised"><RaiseHand/></div>
          <div className="tile-info">
            {localParticipant?.user_name || localParticipant?.user_id} (you)
          </div>
        </div>
      )}
      {!isLocalParticipant && (
        <div className={isScreenShare ? 'tile-screenshare' : 'tile-video'}>
          {videoTrack && <video autoPlay muted playsInline ref={videoElement} />}
          {audioTrack && <audio autoPlay playsInline ref={audioElement} />}
          <div className="hand-raised"><RaiseHand/></div>
          <div className="tile-info">
            {participant?.user_name || participant?.user_id}
          </div>
        </div>
      )}
    </>
  );
}
