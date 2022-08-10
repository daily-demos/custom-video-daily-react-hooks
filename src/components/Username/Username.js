import './Username.css';
import { useParticipantProperty } from '@daily-co/daily-react-hooks';

export default function Username({ id, isLocal }) {
  const username = useParticipantProperty(id, 'user_name');

  return (
    <div className="username">
      {username || id} {isLocal && '(you)'}
    </div>
  );
}
