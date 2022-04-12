import './Tile.css';
import { useEffect, useRef } from 'react';
import {
  useMediaTrack,
} from '@daily-co/daily-react-hooks';

export default function Tile({ id, isScreenShare }) {
  const videoTrack = useMediaTrack(id, isScreenShare ? 'screenVideo' : 'video');
  const audioTrack = useMediaTrack(id, isScreenShare ? 'screenAudio' : 'audio');

  const videoElement = useRef(null);
  const audioElement = useRef(null);

  /*  The track is ready to be played. We can show video of the remote participant in the UI.*/
  const videoTrackIsPlayable = videoTrack?.state === 'playable';
  const audioTrackIsPlayable = audioTrack?.state === 'playable';

  useEffect(() => {
    if (videoTrackIsPlayable) {
      videoElement.current &&
        (videoElement.current.srcObject =
          videoTrack && new MediaStream([videoTrack.persistentTrack]));
    }
  }, [videoTrack, videoTrackIsPlayable]);

  useEffect(() => {
    if (audioTrackIsPlayable) {
      audioElement?.current &&
        (audioElement.current.srcObject =
          audioTrack && new MediaStream([audioTrack.persistentTrack]));
    }
  }, [audioTrack, audioTrackIsPlayable]);


  return (
    <div className={isScreenShare ? 'tile-screenshare' : 'tile-video'}>
      <div className="tile-background">
        {videoTrack && <video autoPlay muted playsInline ref={videoElement} />}
        {audioTrack && <audio autoPlay playsInline ref={audioElement} />}
      </div>
    </div>
  );
}
