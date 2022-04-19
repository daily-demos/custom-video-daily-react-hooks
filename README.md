# Call Object Demo with daily-react-hooks

This is a demo of a [React app](https://svelte.dev/) using  Daily's call object API and the [Daily React Hooks library](https://docs.daily.co/reference/daily-react-hooks) to showcase a basic video web app.

![screen6](https://user-images.githubusercontent.com/12814720/164059341-73b04a6d-fc9e-41b8-b3d2-6a6b9b6f87f2.png)

Test a deployed version of this app at [https://TODO_TODO_TODO.netlify.app/](https://TODO_TODO_TODO.netlify.app/).

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

To create rooms new rooms via the app UI while testing locally, follow the these additional steps:

- rename `example.env` to `.env`
- add your Daily API key (available in the Daily [dashboard](https://dashboard.daily.co/developers)) to `.env`

```
REACT_APP_DAILY_API_KEY=<-Your Daily API key here->
```

- In `api.js`, comment out the default request and uncomment the local request.
- Restart your server, i.e. re-run `npm start`

OR...

## Deploy on Netlify

If you want access to the Daily REST API (using the proxy as specified in `netlify.toml`), you can deploy your own copy of this repo with one click via Netlify:

[![Deploy with Netlify](https://www.netlify.com/img/deploy/button.svg)](https://app.netlify.com/start/deploy?repository=TODO_TODO_TODO)

Note: You'll need your [Daily API key](https://dashboard.daily.co/developers) handy for this step.

Visit the deployed domain provided by Netlify after completing this step to view the app.
