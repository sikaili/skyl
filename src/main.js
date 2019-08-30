import Vue from "vue";
import App from "./App.vue";
import store from "./store";
import router from "./router";
import VueMq from "vue-mq";

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

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
