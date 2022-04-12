import React from 'react';
import './HomeScreen.css';

export default function HomeScreen({ createCall, startJoiningCall }) {
  const startCall = () => {
    createCall().then((url) => startJoiningCall(url));
  };

  return (
    <div className="home-screen">
      <h2>Custom React video application</h2>
      <p>Start demo with a new unique room by clicking the button below.</p>
      <button onClick={startCall}>Click to start a call</button>
    </div>
  );
}
