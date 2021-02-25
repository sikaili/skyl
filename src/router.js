import Vue from 'vue';
import Router from 'vue-router';
import Gallery from '@/components/views/Gallery.vue';
import Menu from '@/components/views/Menu.vue';
import Play from '@/components/views/Play.vue';
import Page from '@/components/views/Page.vue';

const Cv = () => import(/* webpackChunkName: "Cv" */ '@/components/views/Cv.vue');

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
      name: 'drawings',
      component: Gallery,
    },
    {
      path: '/photos',
      name: 'photos',
      component: Gallery,
    },
    {
      path: '/work/:id?',
      name: 'work',
      component: Menu,
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
      path: '/music/:id?/:songSlug?',
      name: 'music',
      component: Menu,
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
