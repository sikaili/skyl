import Vue from "vue";
import App from "./App.vue";
import store from "./store";
import router from "./router";
import VueMq from "vue-mq";

import "./registerServiceWorker";

Vue.use(VueMq, {
  breakpoints: {
    sm: 675,
    md: 1000,
    lg: Infinity
  },
  defaultBreakpoint: "sm" // customize this for SSR
});

Vue.config.productionTip = false;

window.vm = new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");

window.addEventListener("beforeinstallprompt", e => {
  e.preventDefault();
  console.log(e);
  window.vm.deferredInstallPrompt = e;
});
