import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import { startQiankun } from './qiankun-config';
import * as appSentry from './sentry/vue';

const { hub } = appSentry.init({ Vue, dsn: process.env.VUE_APP_SENTRY_DSN });
appSentry.run({ Vue, hub });

startQiankun();

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: (h) => h(App, { props: { a: 100 } })
}).$mount('#app');
