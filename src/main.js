import Vue from 'vue';
import VueMq from 'vue-mq';
import App from './App.vue';
import store from './store';
import router from './router';

import './registerServiceWorker';

Vue.use(VueMq, {
  breakpoints: {
    sm: 675,
    md: 1000,
    lg: Infinity,
  },
  defaultBreakpoint: 'sm', // customize this for SSR
});

Vue.config.productionTip = false;

window.vm = new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
