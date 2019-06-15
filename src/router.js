import Vue from "vue";
import Router from "vue-router";
import draw from "./views/draw.vue";
import work from "./views/work.vue";
import info from "./views/info.vue";
import music from "./views/music.vue";

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: "/drawings",
      name: "draw",
      component: draw
    },
    {
      path: "/",
      name: "home",
      component: work
    },
    {
      path: "/info",
      name: "info",
      component: info
    },
    {
      path: "/music",
      name: "music",
      component: music
    }
  ]
});
