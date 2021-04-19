import { BrowserClient, Hub, defaultIntegrations } from '@sentry/browser';
import { Integrations } from '@sentry/tracing';
import { getComponentName } from './helps';

export function init({ Vue, dsn }) {
  const client = new BrowserClient({
    Vue,
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

export function run({ Vue, hub }) {
  const currentErrorHandler = Vue.config.errorHandler;
  Vue.config.errorHandler = function (error, vm, info) {
    const metadata = {};
    if (vm) {
      metadata.componentName = getComponentName(vm);
      metadata.propsData = vm.$options.propsData;
    }
    if (info) {
      metadata.lifecycleHook = info;
    }
    setTimeout(function () {
      hub.run((currentHub) => {
        currentHub.configureScope(function (scope) {
          scope.setContext('vue', metadata);
        });
        currentHub.captureException(error);
      });
    });
    if (typeof currentErrorHandler === 'function') {
      currentErrorHandler.call(Vue, error, vm, info);
    }
    console.error(error);
  };
}
