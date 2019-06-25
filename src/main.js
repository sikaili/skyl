import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import VueMq from "vue-mq";

Vue.use(VueMq, {
  breakpoints: {
    // default breakpoints - customize this
    sm: 450,
    md: 1250,
    lg: Infinity
  },
  defaultBreakpoint: "sm" // customize this for SSR
});

Vue.config.productionTip = false;
// router.beforeEach((to, from, next) => {
//   console.log(to);
//   console.log(from);
//   if (to.name == from.name) {
//     next("/0");
//   } else {
//     next();
//   }
//   console.log(next);
// });

new Vue({
  router,
  render: h => h(App)
}).$mount("#app");
