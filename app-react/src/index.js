import './public-path';
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import ErrorBoundary from './sentry/ErrorBoundary';

let appSentry = null;

function render(props) {
  const { hub } = appSentry.init({ dsn: process.env.REACT_APP_SENTRY_DSN });
  appSentry.run({ hub });

  const { container } = props;
  ReactDOM.render(
    <ErrorBoundary hub={hub}>
      <App />
    </ErrorBoundary>,
    container ? container.querySelector('#root') : document.querySelector('#root')
  );
}

if (!window.__POWERED_BY_QIANKUN__) {
  appSentry = require('./sentry/react'); // eslit-disable-line
  render({});
}

export async function bootstrap() {
  console.log('[react17] react app bootstraped');
}

export async function mount(props) {
  console.log('[react17] props from main framework', props);
  appSentry = props.appSentry;
  render(props);
}

export async function unmount(props) {
  const { container } = props;
  ReactDOM.unmountComponentAtNode(container ? container.querySelector('#root') : document.querySelector('#root'));
  appSentry.stop();
  appSentry = null;
}
