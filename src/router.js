import Vue from 'vue';
import Router from 'vue-router';
import VueAnalytics from 'vue-analytics';
import Article from '@/components/views/Article.vue';
import Drawings from '@/components/views/Drawings.vue';
import Work from '@/components/views/Work.vue';
import Play from '@/components/views/Play.vue';
import Music from '@/components/views/Music.vue';
import Page from '@/components/views/Page.vue';
import Cv from '@/components/views/Cv.vue';

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
    {
      path: '/article',
      name: 'article',
      component: Article,
    },
    { path: '*', redirect: '/play/random' },
  ],
});
export default router;

Vue.use(VueAnalytics, {
  id: 'UA-143317718-4',
  router,
  disableScriptLoader: true,
  autoTracking: {
    skipSamePath: true,
  },
});
