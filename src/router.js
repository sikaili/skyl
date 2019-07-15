import Vue from "vue";
import Router from "vue-router";
import VueAnalytics from "vue-analytics";

import draw from "./views/draw.vue";
import work from "./views/work.vue";
import play from "./views/play.vue";
import music from "./views/music.vue";
import page from "./views/page.vue";
Vue.use(Router);
Vue.use(VueAnalytics, {
  id: "UA-143317718-1",
  Router
});

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
      name: "work",
      component: page
    },
    {
      path: "/play/:id",
      name: "play",
      component: play
    },
    {
      path: "/play/",
      redirect: "/play/0"
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
  ]
});
