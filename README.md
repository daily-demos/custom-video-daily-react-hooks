# Custom React video app with Daily React Hooks

This repository is part of [a Daily blog post series](<[https://www.daily.co/blog/custom-video-app-with-daily-react-hooks-part-one/](https://www.daily.co/blog/tag/daily-react-hooks/)>) on using the [Daily React Hooks library](https://www.daily.co/blog/introducing-the-new-daily-react-hooks-library/) to create a custom video calling app.

The first post in the series can be found [here](https://www.daily.co/blog/custom-video-app-with-daily-react-hooks-part-one/). The code in the [v1.0](https://github.com/daily-demos/custom-video-daily-react-hooks/tree/1.0) tag corresponds to this blog post.

The second post in the series is [here](https://www.daily.co/blog/add-a-prejoin-ui-to-a-custom-video-app-with-the-daily-react-hooks-library-part-2/). The code relevant to this post can be found in the [v2.0](https://github.com/daily-demos/custom-video-daily-react-hooks/tree/v2.0) tag.

The third post in the series, where we'll add chat messages, will be up soon! But its code can already be found in the `main` branch :-)

Deployed versions of the demo can be found here:

- v1.0: [custom-video-daily-react-hooks-v1](https://custom-video-daily-react-hooks-v1.netlify.app)
- v2.0: [custom-video-daily-react-hooks-v2](https://custom-video-daily-react-hooks-v2.netlify.app)
- main: [main](https://daily-react-hooks.netlify.app/)

---

## Requirements

To use this demo, you will first need to [create a Daily account](https://dashboard.daily.co/signup). You will also need a Daily room URL, which you can get via two options in this demo:

- To create new Daily rooms directly through this demo's UI, you will need your Daily API key, which can be found on the [Developers](https://dashboard.daily.co/developers) page. This will be used in your environment variables. (Instructions below.)
- Alternatively, you can use existing Daily rooms in the demo by pasting the room URL into the input. The room URL should be in this format to be valid: `https://your-domain.daily.co/room-name`, with `daily-domain` changed to your domain, and `room-name` changed to the name of the existing room you would like to use.

---

## Running locally

To run this demo locally:

1. Install dependencies `npm install`
2. Start dev server `npm start`
3. Then open your browser and go to `http://localhost:3000`.

### Creating new rooms locally

To create rooms new rooms via the app UI while testing locally, follow these additional steps:

- rename `example.env` to `.env`
- add your Daily API key (available in the Daily [dashboard](https://dashboard.daily.co/developers)) to `.env`

```
REACT_APP_DAILY_API_KEY=<-Your Daily API key here->
```

- In `api.js`, comment out the default request and uncomment the local request.

```javascript
// api.js
// make sure this request is uncommented and the one above it is commented out
const response = await fetch(`https://api.daily.co/v1/rooms/`, {
  method: 'POST',
  body: JSON.stringify(options),
  headers: {
    'Content-Type': 'application/json',
    Authorization: 'Bearer ' + process.env.REACT_APP_DAILY_API_KEY,
  },
});
```

- Restart your server, i.e. re-run `npm start`

OR...

## Deploy on Netlify

If you want access to the Daily REST API (using the proxy as specified in `netlify.toml`), you can deploy your own copy of this repo with one click via Netlify:

[![Deploy with Netlify](https://www.netlify.com/img/deploy/button.svg)](https://app.netlify.com/start/deploy?repository=https://github.com/daily-demos/custom-video-daily-react-hooks)

Note: You'll need your [Daily API key](https://dashboard.daily.co/developers) handy for this step.

Visit the deployed domain provided by Netlify after completing this step to view the app.
