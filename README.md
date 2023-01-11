# Custom React video app with Daily React Hooks

This repository is part of [a Daily blog post series](<[https://www.daily.co/blog/custom-video-app-with-daily-react-hooks-part-one/](https://www.daily.co/blog/tag/daily-react-hooks/)>) on using the [Daily React library](https://docs.daily.co/reference/daily-react) to create a custom video calling app.

|                                                                                                                                                                                                     |                                                                                                                                |
| --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------ |
| ![Prejoin UI](https://lh5.googleusercontent.com/pybG1ZczFSgh_wn5j-LEobidbl1TgjTj9bZxOdj1UbYH5XH-XoBBBH7ZIREx4QD_8LlgSpL-vXNFVlcNPedq2poGFhvNPZhWb5XqWzXwNBpxbzc2JoEwUBwKH4B1U1Y5qgTLDuvrfKvwkwKD5g) | ![in-call UI with multiple participants](https://www.daily.co/blog/content/images/size/w1600/2022/05/end-of-this-post-opt.png) |
| ![in-call UI with one participant](https://www.daily.co/blog/content/images/size/w1600/2022/05/waiting-for-others-opt.png)                                                                          | ![Active screen share](https://www.daily.co/blog/content/images/size/w1600/2022/05/screenshare-opt.png)                        |
| ![Chat UI](https://www.daily.co/blog/content/images/2022/06/ss1.png)                                                                                                                                |

## Features

This app includes:

- Custom video tiles using Daily's APIs for multi-participant calls
- A tray for local device management
- Prejoin UI for device management before joining the call
- Screen sharing
- Custom text-based chat while in the call
- Custom usernames
- "Waiting for others" card

This is a demo app meant to showcase how to interact with the Daily APIs. It is not optimized for large calls. (Read our [large meetings series](https://www.daily.co/blog/tag/large-meeting-series/) for more information.)

## Tutorial series

Find our full series on how we built this app on the [Daily blog](https://www.daily.co/blog/tag/daily-react-hooks/).

The first post in the series covers how to [build the video components](https://www.daily.co/blog/custom-video-app-with-daily-react-hooks-part-one/). The code in the [v1.0](https://github.com/daily-demos/custom-video-daily-react-hooks/tree/1.0) tag corresponds to this blog post.

The second post in the series covers how to build a [prejoin UI](https://www.daily.co/blog/add-a-prejoin-ui-to-a-custom-video-app-with-the-daily-react-hooks-library-part-2/). The code relevant to this post can be found in the [v2.0](https://github.com/daily-demos/custom-video-daily-react-hooks/tree/v2.0) tag.

The third post in the series covers how to build a [custom chat widget](https://www.daily.co/blog/add-chat-to-your-custom-video-app-with-daily-react-hooks-part-3/). The code relevant to this post can be found in the [v3.0](https://github.com/daily-demos/custom-video-daily-react-hooks/tree/v3.0) tag.

All features mentioned above are available on `main`. Earlier versions exclude later features.

Deployed versions of the demo can be found below:

- main: [main](https://daily-react-hooks.netlify.app/)
- v1.0: [custom-video-daily-react-hooks-v1](https://custom-video-daily-react-hooks-v1.netlify.app)
- v2.0: [custom-video-daily-react-hooks-v2](https://custom-video-daily-react-hooks-v2.netlify.app)
- v3.0: [custom-video-daily-react-hooks-v3](https://custom-video-daily-react-hooks-v3.netlify.app)

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

To create new rooms via the app UI while testing locally, follow these additional steps:

- rename `example.env` to `.env`
- add your Daily API key (available in the Daily [dashboard](https://dashboard.daily.co/developers)) to `.env`
- add the value `local` to the `REACT_APP_ROOM_ENDPOINT` variable in `.env`

```dotenv
REACT_APP_DAILY_API_KEY=your-daily-api-key
REACT_APP_ROOM_ENDPOINT=local
```

- Restart your server, i.e. re-run `npm start`

OR...

## Deploy on Netlify

If you want access to the Daily REST API (using the proxy as specified in `netlify.toml`), you can deploy your own copy of this repo with one click via Netlify:

[![Deploy with Netlify](https://www.netlify.com/img/deploy/button.svg)](https://app.netlify.com/start/deploy?repository=https://github.com/daily-demos/custom-video-daily-react-hooks)

Note: You'll need your [Daily API key](https://dashboard.daily.co/developers) handy for this step.

Visit the deployed domain provided by Netlify after completing this step to view the app.
