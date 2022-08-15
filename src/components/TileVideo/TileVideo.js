import { useMediaTrack } from '@daily-co/daily-react-hooks';
import { memo, useEffect, useRef } from 'react';

const TileVideo = memo(function ({ id, isScreenShare }) {
  const videoTrack = useMediaTrack(id, isScreenShare ? 'screenVideo' : 'video');

  const videoElement = useRef(null);

  useEffect(() => {
    /*  The track is ready to be played. We can show video of the remote participant in the UI.*/
    const video = videoElement.current;
    if (!video || !videoTrack?.persistentTrack) return;
    video.srcObject = new MediaStream([videoTrack?.persistentTrack]);
  }, [videoTrack?.persistentTrack]);

  if (!videoElement) return null;
  return <video autoPlay muted playsInline ref={videoElement} />;
});

export default TileVideo;
