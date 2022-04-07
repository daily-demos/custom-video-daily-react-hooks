import './Tile.css';
import { useEffect, useRef } from 'react';
import {
  useAudioTrack,
  useVideoTrack,
  useScreenVideoTrack,
} from '@daily-co/daily-react-hooks';

export default function Tile({ id, isScreenShare }) {
  const videoTrack = useVideoTrack(id);
  const audioTrack = useAudioTrack(id);

  const convertedScreenshareId = isScreenShare && id.replace('-screen', '');

  const screenVideoTrack = useScreenVideoTrack(convertedScreenshareId);

  const videoElement = useRef(null);
  const audioElement = useRef(null);

  /*  The track is ready to be played. We can show video of the remote participant in the UI.*/
  const videoTrackIsPlayable = videoTrack?.state === 'playable';
  const audioTrackIsPlayable = audioTrack?.state === 'playable';
  const screenVideoTrackIsPlayable = screenVideoTrack?.state === 'playable';

  console.log({screenVideoTrackIsPlayable})

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

  // If there is a playable screenshare, replace the videoElement with the screen video media track.
  useEffect(() => {
    if (screenVideoTrackIsPlayable) {
      videoElement.current &&
        (videoElement.current.srcObject =
          screenVideoTrack &&
          new MediaStream([screenVideoTrack.persistentTrack]));
    }
  }, [screenVideoTrack, screenVideoTrackIsPlayable]);


  return (
    <div className={isScreenShare ? 'tileScreenShare' : 'tile'}>
      <div className="tile-background">
        {videoTrack && <video autoPlay muted playsInline ref={videoElement} />}
        {audioTrack && <audio autoPlay playsInline ref={audioElement} />}
      </div>
    </div>
  );
}
