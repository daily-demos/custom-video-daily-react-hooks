import React from 'react';
import {
  useDaily,
  useNetwork,
  useParticipantIds,
  useRoom,
} from '@daily-co/daily-react-hooks';
import './MeetingInformation.css';

export default function MeetingInformation() {
  const callObject = useDaily();
  const room = useRoom();
  const network = useNetwork();
  const allParticipants = useParticipantIds()?.toString();

  return (
    <section className="meeting-information">
      <h1>Meeting information</h1>
      <ul>
        <li>Meeting state: {callObject?.meetingState() ?? 'unknown'}</li>
        <li>Room ID: {room?.id ?? 'unknown'}</li>
        <li>Room name: {room?.name ?? 'unknown'}</li>
        <li>Network status: {network?.threshold ?? 'unknown'}</li>
        <li>Network topology: {network?.topology ?? 'unknown'}</li>
        <li>Participant IDs: {allParticipants}</li>
      </ul>
    </section>
  );
}
