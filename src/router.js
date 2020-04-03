import Vue from 'vue';
import Router from 'vue-router';
import VueAnalytics from 'vue-analytics';
import draw from './views/draw.vue';
import work from './views/work.vue';
import play from './views/play.vue';
import music from './views/music.vue';
import page from './views/page.vue';
import cv from './views/cv.vue';

Vue.use(Router);

const router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'home',
      redirect: '/work',
    },
    {
      path: '/drawings',
      name: 'draw',
      component: draw,
    },
    {
      path: '/work/:id?',
      name: 'work',
      component: work,
    },
    {
      path: '/page/:category/:id?',
      name: 'contentPage',
      component: page,
    },
    {
      path: '/play/:id?',
      name: 'play',
      component: play,
    },
    {
      path: '/music/:id?',
      name: 'music',
      component: music,
    },
    {
      path: '/cv',
      name: 'cv/',
      component: cv,
    },
  ],
});
export default router;

Vue.use(VueAnalytics, {
  id: 'UA-143317718-1',
  router,
  disableScriptLoader: true,
  autoTracking: {
    skipSamePath: true,
  },
});
