import Vue from 'vue';
import VueMq from 'vue-mq';
import App from '@/App.vue';
import store from '@/store';
import router from '@/router';
import VueGtag from 'vue-gtag';

import './registerServiceWorker';

Vue.use(VueGtag, {
  disableScriptLoad: true,
  config: { id: 'UA-143317718-5' },
}, router);

Vue.use(VueMq, {
  breakpoints: {
    sm: 675,
    md: 1024,
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
