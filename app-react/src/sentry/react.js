import { BrowserClient, Hub, defaultIntegrations } from '@sentry/browser';
import { Integrations } from '@sentry/tracing';

export function init({ dsn }) {
  const client = new BrowserClient({
    dsn,
    integrations: [...defaultIntegrations, new Integrations.BrowserTracing()],

    // Set tracesSampleRate to 1.0 to capture 100%
    // of transactions for performance monitoring.
    // We recommend adjusting this value in production
    tracesSampleRate: 1.0,
    attachProps: true,
    logErrors: true
  });

  const hub = new Hub(client);
  return { client, hub };
}

let handleError = null;

export function run({ hub }) {
  handleError = function handleError(error) {
    setTimeout(function () {
      hub.run((currentHub) => {
        currentHub.configureScope(function (scope) {
          scope.setContext('originalException', error);
        });
        currentHub.captureException(error);
      });
    });
  };
  window.addEventListener('error', handleError);
  window.addEventListener('unhandledrejection', handleError);
}

export function stop() {
  if (handleError) {
    window.removeEventListener('error', handleError);
    window.removeEventListener('unhandledrejection', handleError);
  }
}
