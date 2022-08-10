import './Tile.css';
import { useEffect, useRef } from 'react';
import { useMediaTrack } from '@daily-co/daily-react-hooks';
import Username from '../Username/Username';
import TileVideo from '../TileVideo/TileVideo';

export default function Tile({ id, isScreenShare, isLocal }) {
  const videoTrack = useMediaTrack(id, isScreenShare ? 'screenVideo' : 'video');
  const audioTrack = useMediaTrack(id, isScreenShare ? 'screenAudio' : 'audio');

  const videoElement = useRef(null);
  const audioElement = useRef(null);

  useEffect(() => {
    /*  The track is ready to be played. We can show video of the remote participant in the UI.*/
    const video = videoElement.current;
    if (!video || !videoTrack?.persistentTrack) return;
    video.srcObject = new MediaStream([videoTrack?.persistentTrack]);
  }, [videoTrack?.persistentTrack]);

  useEffect(() => {
    if (audioTrack?.state === 'playable') {
      audioElement?.current &&
        (audioElement.current.srcObject =
          audioTrack && new MediaStream([audioTrack.persistentTrack]));
    }
  }, [audioTrack]);

  return (
    <div className={isScreenShare ? 'tile-screenshare' : 'tile-video'}>
      {videoTrack && <TileVideo videoElement={videoElement} />}
      {audioTrack && <audio autoPlay playsInline ref={audioElement} />}
      <Username id={id} isLocal={isLocal} />
    </div>
  );
}
