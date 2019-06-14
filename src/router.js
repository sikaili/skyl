import Vue from "vue";
import Router from "vue-router";
import Drawings from "./views/Drawings.vue";
Vue.use(Router);

export default new Router({
  routes: [
    {
      path: "/drawings",
      name: "drawings",
      component: Drawings
    },
    {
      path: "/",
      name: "home"
    }
  ]
});
