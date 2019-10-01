import Vue from "vue";
import App from "./App.vue";
import store from "./store";
import router from "./router";
import VueMq from "vue-mq";
// import Modernizr from "modernizr/";

import "./registerServiceWorker";

Vue.use(VueMq, {
  breakpoints: {
    // default breakpoints - customize this
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

// if (Modernizr.serviceworker) {
let sw;
window.addEventListener("load", () => {
  navigator.serviceWorker
    .register("./sw.js", {
      scope: "."
    })
    .then(registration => {
      sw = registration;
    })
    .catch(err => {
          console.error('Error sw registration', err); //eslint-disable-line
    });
});
window.addEventListener("beforeinstallprompt", e => {
  e.preventDefault();
  console.log(e);
  window.vm.deferredInstallPrompt = e;
});
// }
