import './Tile.css';
import { useEffect, useRef } from 'react';
import { useMediaTrack } from '@daily-co/daily-react-hooks';

export default function Tile({ id, isScreenShare }) {
  const videoTrack = useMediaTrack(id, isScreenShare ? 'screenVideo' : 'video');
  const audioTrack = useMediaTrack(id, isScreenShare ? 'screenAudio' : 'audio');

  const videoElement = useRef(null);
  const audioElement = useRef(null);

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
    <div className={isScreenShare ? 'tile-screenshare' : 'tile-video'}>
      {videoTrack && <video autoPlay muted playsInline ref={videoElement} />}
      {audioTrack && <audio autoPlay playsInline ref={audioElement} />}
    </div>
  );
}
