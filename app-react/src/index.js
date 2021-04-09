import './public-path';
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import ErrorBoundary from './sentry/ErrorBoundary';
// import { addErrorHandler, removeErrorHandler } from './sentry/errorHandler';

let appSentry = null;

function render(props) {
  const { container } = props;
  const { client, hub } = appSentry.init();
  client.setupIntegrations();
  // addErrorHandler(hub);
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

export async function bootstrap(props) {
  appSentry = props.appSentry;
  console.log('[react17] react app bootstraped');
}

export async function mount(props) {
  console.log('[react17] props from main framework', props);
  render(props);
}

export async function unmount(props) {
  const { container } = props;
  ReactDOM.unmountComponentAtNode(container ? container.querySelector('#root') : document.querySelector('#root'));
  appSentry = null;
  // removeErrorHandler();
}
