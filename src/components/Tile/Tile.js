import './Tile.css';
import { useEffect, useRef } from 'react';
import { useMediaTrack } from '@daily-co/daily-react-hooks';
import Username from './Username/Username';
import TileVideo from '../TileVideo/TileVideo';
import { useHandRaising } from "../../hooks/useHandRaising";
import RaiseHandBadge from "./RaiseHandBadge/RaiseHandBadge";

export default function Tile({ id, isScreenShare, isLocal, isAlone }) {
  const audioTrack = useMediaTrack(id, isScreenShare ? 'screenAudio' : 'audio');
  const audioElement = useRef(null);
  const { handRaisedParticipants } = useHandRaising();
  const userHasHandRaised = handRaisedParticipants?.includes(id)

  useEffect(() => {
    if (audioTrack?.state === 'playable') {
      audioElement?.current &&
        (audioElement.current.srcObject =
          audioTrack && new MediaStream([audioTrack.persistentTrack]));
    }
  }, [audioTrack]);
  let containerCssClasses = isScreenShare ? 'tile-screenshare' : 'tile-video';

  if (isLocal) {
    containerCssClasses += ' self-view';
    if (isAlone) {
      containerCssClasses += ' alone';
    }
  }

  return (
    <div className={containerCssClasses}>
      {<TileVideo id={id} isScreenShare={isScreenShare} />}
      {audioTrack && <audio autoPlay playsInline ref={audioElement} />}
      <Username id={id} isLocal={isLocal} />
      {userHasHandRaised && <RaiseHandBadge id={id} isLocal={isLocal}/>}
    </div>
  );
}
