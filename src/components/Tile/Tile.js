import './Tile.css';
import { useEffect, useRef } from 'react';
import { useMediaTrack } from '@daily-co/daily-react-hooks';
import Username from '../Username/Username';
import TileVideo from '../TileVideo/TileVideo';

export default function Tile({ id, isScreenShare, isLocal, isAlone }) {
  let containerCssClasses = isScreenShare ? 'tile-screenshare' : 'tile-video';
  let audioTrack = null;
  let audioElement = null;
  
  if (isLocal) {
    containerCssClasses += ' self-view';
    if (isAlone) {
      containerCssClasses += ' alone';
    }
  } else {
    // Only create audio track and element if the participant is not local.
    audioTrack = useMediaTrack(id, isScreenShare ? 'screenAudio' : 'audio');
    audioElement = useRef(null);

    useEffect(() => {
      if (audioTrack?.state === 'playable') {
        if (audioElement?.current) {
          (audioElement.current.srcObject =
            audioTrack && new MediaStream([audioTrack.persistentTrack]));
        }
      }
    }, [audioTrack]);
  }

  return (
    <div className={containerCssClasses}>
      <TileVideo id={id} isScreenShare={isScreenShare} />
      {!isLocal && audioTrack && <audio autoPlay playsInline ref={audioElement} />}
      <Username id={id} isLocal={isLocal} />
    </div>
  );
}