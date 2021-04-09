import { BrowserClient, Hub } from '@sentry/browser';
import { Integrations } from '@sentry/tracing';

export function init() {
  const client = new BrowserClient({
    dsn: 'http://c7020526afce463794366f0aa396cf43@192.168.142.100:9000/7',
    integrations: [new Integrations.BrowserTracing()],

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
