import { useCallback } from 'react';
import { useDaily, useParticipantIds } from '@daily-co/daily-react-hooks';

export const HAND_RAISED_USER_DATA_KEY = 'hr'; // Keep this as small as possible: the max payload size is 4K characters

export const useHandRaisedQueue = (id) => {
  const idsWithRaisedHands = useParticipantIds({
    filter: useCallback((p) => p.userData?.[HAND_RAISED_USER_DATA_KEY], []),
    /* Sort hand raisers by date ascending */
    sort: useCallback((a, b) => {
      const aDate = a.userData?.[HAND_RAISED_USER_DATA_KEY];
      const bDate = b.userData?.[HAND_RAISED_USER_DATA_KEY];
      if (aDate < bDate) return -1;
      if (aDate > bDate) return 1;
      return 0;
    }, []),
  });
  if (idsWithRaisedHands.includes(id))
    // Arrays start with 0, but our queue numbers should start at 1
    return idsWithRaisedHands.indexOf(id) + 1;
  return undefined;
};

export const useHandRaising = () => {
  const daily = useDaily();
  // Find all IDs with a "hr" key on their user data object: these are people who have their hand raised.
  const handRaisedParticipants = useParticipantIds({
    filter: useCallback((p) => p.userData?.[HAND_RAISED_USER_DATA_KEY], []),
  });

  const raiseHand = useCallback(() => {
    const prevUserData = daily?.participants()?.localSessionId?.userData;
    // When we're modifying user data, we want to make sure not to overwrite any existing data.
    daily.setUserData({
      ...prevUserData,
      [HAND_RAISED_USER_DATA_KEY]: new Date().toISOString(),
    });
  }, [daily]);

  const lowerHand = useCallback(() => {
    const prevUserData = { ...daily?.participants()?.localSessionId?.userData };
    delete prevUserData[HAND_RAISED_USER_DATA_KEY];
    daily.setUserData({ ...prevUserData });
  }, [daily]);

  return {
    raiseHand,
    lowerHand,
    handRaisedParticipants,
  };
};
