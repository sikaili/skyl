import Vue from "vue";
import Router from "vue-router";
import draw from "./views/draw.vue";
import work from "./views/work.vue";
import info from "./views/info.vue";
import music from "./views/music.vue";
import page from "./views/page.vue";

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: "/",
      name: "home",
      redirect: "/work",

      component: work
    },
    {
      path: "/drawings",
      name: "draw",
      component: draw
    },
    {
      path: "/work",
      name: "work/",
      component: work
    },
    {
      path: "/work/:id",
      name: "applications",
      component: page
    },
    {
      path: "/info",
      name: "info",
      component: info
    },
    {
      path: "/music",
      name: "music/",
      component: music
    },

    {
      path: "/music/:id",
      name: "music",
      component: page
    }
    // {
    //   path: "/:id",
    //   component: page
    // }
  ]
});
