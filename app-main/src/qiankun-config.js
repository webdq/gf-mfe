import { registerMicroApps, start } from 'qiankun';
import * as vueAppSentry from './sentry/vue';
import * as reactAppSentry from './sentry/react';

export function startQiankun() {
  const apps = [
    {
      name: 'app-vue',
      entry: process.env.VUE_APP_SUBAPP_VUE_URL,
      container: '#subapp',
      activeRule: '/app-vue',
      props: { appSentry: vueAppSentry }
    },
    {
      name: 'app-react',
      entry: process.env.VUE_APP_SUBAPP_REACT_URL,
      container: '#subapp',
      activeRule: '/app-react',
      props: { appSentry: reactAppSentry }
    }
  ];
  registerMicroApps(apps);
  start({ prefetch: false });
}
