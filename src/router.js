import Vue from 'vue';
import Router from 'vue-router';
import Drawings from '@/components/views/Drawings.vue';
import Menu from '@/components/views/Menu.vue';
import Play from '@/components/views/Play.vue';
import Page from '@/components/views/Page.vue';
import VueGtag from 'vue-gtag';

const Cv = () => import(/* webpackChunkName: "Cv" */ '@/components/views/Cv.vue');
const Article = () => import(/* webpackChunkName: "Article" */'@/components/views/Article.vue');

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
    {
      path: '/article',
      name: 'article',
      component: Article,
    },
    { path: '*', redirect: '/play/random' },
  ],
});

Vue.use(VueGtag, {
  config: {
    id: 'UA-143317118-5',
    bootstrap: false,
  }
  ,
}, router);

export default router;
