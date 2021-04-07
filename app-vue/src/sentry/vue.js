import Vue from 'vue';
import { BrowserClient, Hub } from '@sentry/browser';
import { Integrations } from '@sentry/tracing';
import { getComponentName } from './helps';

const client = new BrowserClient({
  Vue,
  dsn: 'http://72de4b0a32fe4e8db584fa5980328b8e@192.168.142.100:9000/6',
  integrations: [new Integrations.BrowserTracing()],

  // Set tracesSampleRate to 1.0 to capture 100%
  // of transactions for performance monitoring.
  // We recommend adjusting this value in production
  tracesSampleRate: 1.0,
  attachProps: true,
  logErrors: true
});

const hub = new Hub(client);

export function run(err, vm, info) {
  const metadata = {};
  if (vm) {
    metadata.componentName = getComponentName(vm);
    metadata.propsData = vm.$options.propsData;
  }
  if (info) {
    metadata.lifecycleHook = info;
  }
  setTimeout(function () {
    hub.withScope(function (scope) {
      scope.setContext('vue', metadata);
      hub.captureException(err);
    });
  });
  console.error(err);
}
