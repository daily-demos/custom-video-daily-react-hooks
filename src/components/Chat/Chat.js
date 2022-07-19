import { useCallback, useState, useEffect } from 'react';
import { useLocalParticipant, useRoom } from '@daily-co/daily-react-hooks';

import { Arrow } from '../Tray/Icons/index';
import './Chat.css';

export default function Chat({ showChat }) {
  const localParticipant = useLocalParticipant();
  const { name: roomName } = useRoom();

  const [loaded, setLoaded] = useState(false);

  const launchCometChat = useCallback(
    () =>
      window.CometChatWidget.launch({
        widgetID: process.env.REACT_APP_COMET_CHAT_WIDGET_ID,
        target: '#cometchat',
        roundedCorners: 'false',
        height: '100%',
        width: '100%',
        defaultID: roomName, //default UID (user) or GUID (group) to show,
        defaultType: 'group', //user or group
      }),
    [roomName],
  );
  const createCometChatGroup = () => {
    const GUID = roomName;
    const GROUP_NAME = roomName;
    const GROUP_TYPE = 'public';
    const group = new window.CometChatWidget.CometChat.Group(GUID, GROUP_NAME, GROUP_TYPE);

    // CREATE GROUP WITH ROOM INFO
    window.CometChatWidget.createOrUpdateGroup(group)
      .then((group) => {
        // Proceed with launching your Chat Widget
        launchCometChat();
      })
      .catch((e) => {
        // If the group already exists, launch chat without trying to create
        // the group first
        if (e.code === 'ERR_GROUP_NOT_JOINED') {
          launchCometChat();
        }
      });
  };

  // INITIATE COMETCHAT WIDGET!
  useEffect(() => {
    if (loaded) return;
    // INITIALIZE COMETCHAT WIDGET
    window.CometChatWidget.init({
      appID: process.env.REACT_APP_COMET_CHAT_APP_ID,
      appRegion: process.env.REACT_APP_COMET_CHAT_APP_REGION,
      authKey: process.env.REACT_APP_COMET_CHAT_APP_AUTH_KEY,
    }).then(
      () => {
        const UID = localParticipant.session_id;
        const user = new window.CometChatWidget.CometChat.User(UID);
        user.setName(localParticipant.user_name);

        // CREATE USER WITH LOCAL PARTICIPANT INFO
        window.CometChatWidget.createOrUpdateUser(user).then((user) => {
          // Proceed with user login
          window.CometChatWidget.login({
            uid: UID,
          }).then(() => {
            createCometChatGroup();

            setLoaded(true);
          });
        });
      },
      (error) => {
        console.log('Initialization failed with error:', error);
        //Check the reason for error and take appropriate action.
      },
    );
  }, [localParticipant.session_id, localParticipant.user_name, loaded, roomName]);

  return (
    <aside className={`chat ${!showChat ? 'hidden' : ''}`}>
      {/* <button onClick={toggleChat} className="close-chat">
        <Arrow />
      </button> */}
      <div id="cometchat"></div>
    </aside>
  );
}
