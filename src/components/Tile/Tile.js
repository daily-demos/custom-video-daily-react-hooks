import './Tile.css';
import { DailyVideo, useVideoTrack } from '@daily-co/daily-react';
import Username from '../Username/Username';

export default function Tile({ id, isScreenShare, isLocal, isAlone }) {
  const videoState = useVideoTrack(id);

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
      <DailyVideo automirror sessionId={id} type={isScreenShare ? 'screenVideo' : 'video'} />
      {!isScreenShare && <Username id={id} isLocal={isLocal} />}
    </div>
  );
}
