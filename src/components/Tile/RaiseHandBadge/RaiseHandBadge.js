import { RaiseHand } from '../../Tray/Icons';
import { useHandRaisedQueue } from '../../../hooks/useHandRaising';
import './RaiseHandBadge.css';


export default function RaiseHandBadge({ id, isLocal }) {
  const handRaisedQueueNumber = useHandRaisedQueue(id);

  return (
    <div className={`has-hand-raised ${isLocal && 'local'}`}>
      <RaiseHand />
      <span className="queue-number">{handRaisedQueueNumber}</span>
    </div>
  );
}
