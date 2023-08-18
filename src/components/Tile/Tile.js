import './Tile.css';
import { useRef } from 'react';
import { DailyVideo, useMediaTrack } from '@daily-co/daily-react';
import Username from '../Username/Username';
import FaceDetector from '../FaceDetector/FaceDetector';

export default function Tile({ id, isScreenShare, isLocal, isAlone }) {
  const videoState = useMediaTrack(id, 'video');
  const videoRef = useRef();

  let containerCssClasses = isScreenShare ? 'tile-screenshare' : 'tile-video';

  if (isLocal) {
    containerCssClasses += ' self-view';
    if (isAlone) {
      containerCssClasses += ' alone';
    }
  }

  /* If a participant's video is muted, hide their video and
  add a different background color to their tile. */
  if (videoState.isOff) {
    containerCssClasses += ' no-video';
  }

  return (
    <div className={containerCssClasses}>
      <DailyVideo
        ref={videoRef}
        automirror
        sessionId={id}
        type={isScreenShare ? 'screenVideo' : 'video'}
      />
      <Username id={id} isLocal={isLocal} />
      <FaceDetector id={id} isLocal={isLocal} videoRef={videoRef} />
    </div>
  );
}
