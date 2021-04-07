import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import { startQiankun } from './qiankun-config';
import * as appSentry from './sentry/main';

Vue.config.errorHandler = function (err, vm, info) {
  console.log('app main errorHandler');
  appSentry.run(err, vm, info);
};

startQiankun();

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: (h) => h(App)
}).$mount('#app');
