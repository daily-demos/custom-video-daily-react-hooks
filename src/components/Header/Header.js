import './Header.css';

export default function Header() {
  return (
    <header>
      <div className="header-section">
        <img src="/images/logo.svg" alt="Daily logo" />
        <span className="title">
          Custom video application demo with daily-react-hooks
        </span>
      </div>
      <div className="header-section">
        <a
          className="new-tab-link"
          href="https://docs.daily.co/reference/daily-js"
          target="_blank"
          rel="noreferrer noopenner">
          <span>API docs</span>
          <img src="/images/newtab.svg" alt="New tab" />
        </a>
        <a
          className="github-link"
          href="https://github.com/daily-demos/custom-video-daily-react-hooks"
          target="_blank"
          rel="noreferrer noopenner">
          <img src="/images/github.svg" alt="Github" />
        </a>
      </div>
    </header>
  );
}
