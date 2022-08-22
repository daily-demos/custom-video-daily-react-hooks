import { useState, useEffect } from 'react';
import { useLocalParticipant, useRoom } from '@daily-co/daily-react-hooks';
import './Chat.css';
import api from '../../api';

export default function Chat({ showChat }) {
  const localParticipant = useLocalParticipant();
  const { name: roomName } = useRoom();

  const [loaded, setLoaded] = useState(false);

  const launchCometChat = (room) => {
    window.CometChatWidget.launch({
      widgetID: process.env.REACT_APP_COMET_CHAT_WIDGET_ID,
      target: '#cometchat',
      roundedCorners: 'false',
      height: '100%',
      width: '100%',
      defaultID: room, //default UID (user) or GUID (group) to show,
      defaultType: 'group', //user or group
    });
    setLoaded(true);
  };

  const createCometChatGroup = () => {
    const GUID = roomName;
    // make GET request to CometChat's REST API to see if group exists
    api.getCometChatGroup(GUID).then((group) => {
      if (group?.data) {
        // group already exists in CometChat so we don't have to create it
        launchCometChat(group.data.guid);
        return;
      }

      // Otherwise, create new CometChat group for this Daily room
      const GROUP_NAME = roomName;
      const GROUP_TYPE = 'public';
      const newGroup = new window.CometChatWidget.CometChat.Group(GUID, GROUP_NAME, GROUP_TYPE);

      // CREATE GROUP WITH ROOM INFO
      window.CometChatWidget.createOrUpdateGroup(newGroup)
        .then(() => {
          // Proceed with launching your Chat Widget
          launchCometChat(GROUP_NAME);
        })
        .catch((e) => {
          // handle error
          console.error(e);
        });
    });
  };

  // INITIATE COMETCHAT WIDGET!
  useEffect(() => {
    // don't initiate chat if it's already there
    if (loaded) return;

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
          });
        });
      },
      (error) => {
        console.error('Initialization failed with error:', error);
        //Check the reason for error and take appropriate action.
      },
    );
  }, [localParticipant.session_id, localParticipant.user_name, loaded, roomName]);

  return (
    <aside className={`chat ${!showChat ? 'hidden' : ''}`}>
      <div id="cometchat"></div>
    </aside>
  );
}
