import './UserMediaError.css';
import React from 'react';

const refreshPage = () => {
  console.log(
    "make sure to allow access to your microphone and camera in your browser's permissions",
  );
  window.location.reload();
};

export default function UserMediaError() {
  return (
    <div className="call">
      <div className="info-box get-user-media-error">
        <h1>Camera or mic blocked</h1>
        <button onClick={refreshPage}>Try again</button>
        <p>
          <a
            href="https://docs.daily.co/guides/how-daily-works/handling-device-permissions"
            target="_blank"
            rel="noreferrer noopenner">
            Get help
          </a>
        </p>
      </div>
    </div>
  );
}
