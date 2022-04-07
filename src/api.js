async function createRoom() {
  // we'll add 60 min expiry (exp) so rooms won't linger too long on your account
  // we'll also turn on chat (enable_chat)
  // todo: enable prejoin when I don't need any more robots
  // see other available options at https://docs.daily.co/reference#create-room
  const exp = Math.round(Date.now() / 1000) + 60 * 60;
  const options = {
    properties: {
      exp,
      enable_chat: true,
      enable_prejoin_ui: false,
    },
  };

  // TODO: figure out how deployment to Netlify works
  // This endpoint is using the proxy as outlined in netlify.toml
  // Comment this out if you want to use the local option below.
  // const response = await fetch(`${window.location.origin}/api/rooms`, {
  //   method: "POST",
  //   body: JSON.stringify(options),
  // });

  // Uncomment the request below to test the "create room" functionality locally. Don't forget to comment out the request above, too!
  const response = await fetch('https://api.daily.co/v1/rooms/', {
    method: 'POST',
    body: JSON.stringify(options),
    headers: {
      'Content-Type': 'application/json',
      Authorization: "Bearer " + process.env.REACT_APP_DAILY_API_KEY,
    },
  });

  return await response.json();
}

export default { createRoom };
