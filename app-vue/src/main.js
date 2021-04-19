import './public-path';
import Vue from 'vue';
import App from './App.vue';
import VueRouter from 'vue-router';
import routes from './router';
import store from './store';

Vue.config.productionTip = false;

let router = null;
let instance = null;
let appSentry = null;

function render(props = {}) {
  const { hub } = appSentry.init({ Vue, dsn: process.env.VUE_APP_SENTRY_DSN });
  appSentry.run({ Vue, hub });

  const { container } = props;
  router = new VueRouter({
    base: window.__POWERED_BY_QIANKUN__ ? '/app-vue/' : '/',
    mode: 'history',
    routes
  });

  instance = new Vue({
    router,
    store,
    render: (h) => h(App)
  }).$mount(container ? container.querySelector('#app') : '#app');
}

// 独立运行时
if (!window.__POWERED_BY_QIANKUN__) {
  appSentry = require('./sentry/vue'); // eslit-disable-line
  render();
}

export async function bootstrap() {
  console.log('[vue] vue app bootstraped');
}
export async function mount(props) {
  console.log('[vue] props from main framework', props);
  appSentry = props.appSentry;
  render(props);
}
export async function unmount() {
  instance.$destroy();
  instance.$el.innerHTML = '';
  instance = null;
  router = null;
  appSentry = null;
}
