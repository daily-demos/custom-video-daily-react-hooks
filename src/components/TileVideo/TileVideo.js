import { memo } from 'react';

const TileVideo = memo(function ({ videoElement }) {
  return <video autoPlay muted playsInline ref={videoElement} />;
});

export default TileVideo;
