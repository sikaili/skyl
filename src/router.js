import Vue from 'vue';
import Router from 'vue-router';
import VueAnalytics from 'vue-analytics';
import Drawings from './views/Drawings.vue';
import Work from './views/Work.vue';
import Play from './views/Play.vue';
import Music from './views/Music.vue';
import Page from './views/Page.vue';
import Cv from './views/Cv.vue';

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
      name: 'Drawings',
      component: Drawings,
    },
    {
      path: '/work/:id?',
      name: 'work',
      component: Work,
    },
    {
      path: '/page/:category/:id?',
      name: 'contentPage',
      component: Page,
    },
    {
      path: '/play/:id?',
      name: 'play',
      component: Play,
    },
    {
      path: '/music/:id?',
      name: 'music',
      component: Music,
    },
    {
      path: '/cv',
      name: 'cv/',
      component: Cv,
    },
    { path: '*', redirect: '/play/random' },
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
