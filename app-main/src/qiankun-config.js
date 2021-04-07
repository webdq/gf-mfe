import { registerMicroApps, start } from 'qiankun';
import * as vueAppSentry from './sentry/vue';

export function startQiankun() {
  const apps = [
    {
      name: 'app-vue',
      entry: '//localhost:9901',
      container: '#subapp',
      activeRule: '/app-vue',
      props: { appSentry: vueAppSentry }
    },
    {
      name: 'app-react',
      entry: '//localhost:9902',
      container: '#subapp',
      activeRule: '/app-react'
    }
  ];
  registerMicroApps(apps);
  start({ prefetch: false });
}
