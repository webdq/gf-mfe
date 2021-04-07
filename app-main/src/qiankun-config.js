import { registerMicroApps, start } from 'qiankun';

export function startQiankun() {
  const apps = [
    {
      name: 'app-vue',
      entry: '//localhost:9901',
      container: '#subapp',
      activeRule: '/app-vue'
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
