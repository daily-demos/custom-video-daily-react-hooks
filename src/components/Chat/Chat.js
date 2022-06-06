import React, { useCallback, useState } from 'react';
import { useAppMessage, useLocalParticipant } from '@daily-co/daily-react-hooks';

import './Chat.css';

const Arrow = () => {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M5 11.25C4.58579 11.25 4.25 11.5858 4.25 12C4.25 12.4142 4.58579 12.75 5 12.75V11.25ZM19 12L19.5303 12.5303C19.8232 12.2374 19.8232 11.7626 19.5303 11.4697L19 12ZM14.5303 6.46967C14.2374 6.17678 13.7626 6.17678 13.4697 6.46967C13.1768 6.76256 13.1768 7.23744 13.4697 7.53033L14.5303 6.46967ZM13.4697 16.4697C13.1768 16.7626 13.1768 17.2374 13.4697 17.5303C13.7626 17.8232 14.2374 17.8232 14.5303 17.5303L13.4697 16.4697ZM5 12.75H19V11.25H5V12.75ZM19.5303 11.4697L14.5303 6.46967L13.4697 7.53033L18.4697 12.5303L19.5303 11.4697ZM18.4697 11.4697L13.4697 16.4697L14.5303 17.5303L19.5303 12.5303L18.4697 11.4697Z"
        fill="#121A24"
      />
    </svg>
  );
};

export default function Chat({ showChat }) {
  const localParticipant = useLocalParticipant();

  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState('');

  const sendAppMessage = useAppMessage({
    onAppMessage: useCallback(
      (ev) =>
        setMessages((messages) => [
          ...messages,
          {
            msg: ev.data.msg,
            name: ev.data.name,
          },
        ]),
      [],
    ),
  });

  const sendMessage = useCallback(
    (message) => {
      /* Send the message to all participants in the chat - this does not include ourselves!
       * See https://docs.daily.co/reference/daily-js/events/participant-events#app-message
       */
      sendAppMessage(
        {
          msg: message,
          name: localParticipant?.user_name || 'Guest',
        },
        '*',
      );

      /* Since we don't receive our own messages, we will set our message in the messages array.
       * This way _we_ can also see what we wrote.
       */
      setMessages([
        ...messages,
        {
          msg: message,
          name: localParticipant?.user_name || 'Guest',
        },
      ]);
    },
    [localParticipant, messages, sendAppMessage],
  );

  const onChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    sendMessage(inputValue);
    setInputValue('');
  };

  return (
    <>
      {showChat ? (
        <section className="chat">
          <ul className="chat-messages">
            {messages.map((message, index) => (
              <li key={`message-${index}`} className="chat-message">
                <span className="chat-message-author">{message?.name}</span>: {" "} <p className="chat-message-body">{message?.msg}</p>
              </li>
            ))}
          </ul>
          <div className="add-message">
            <form className="chat-form" onSubmit={handleSubmit}>
              <input
                className="chat-input"
                type="text"
                placeholder="Type your message here.."
                value={inputValue}
                onChange={(e) => onChange(e)}
              />
              <button type="submit" className="chat-submit-button" onClick={handleSubmit}>
                <Arrow/>
              </button>
            </form>
          </div>
        </section>
      ) : null}
    </>
  );
}
