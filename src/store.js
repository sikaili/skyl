import Vuex from 'vuex';
import Vue from 'vue';
import { infosProjects, listProjects } from '@/seed';

Vue.use(Vuex);
const state = {
  projects: infosProjects,
  activeItem: {},
  loading: true,
  iframeItems: listProjects,
  filter: 'beta',
  canvasFullScreen: false,
};
const mutations = {
  TOGGLE_ITEM(state, payload) {
    state.projects.filter((item) => item.type === payload.name)
      .forEach((item) => {
        item === payload.obj && item.show ? (item.show = false) : ''; //eslint-disable-line
        item === payload.obj ? (item.show = true) : (item.show = false); //eslint-disable-line
      });
  },
  SET_ACTIVE_ITEM(state, item) {
    if (typeof item === 'string') {
      item = state.iframeItems.find((obj) => obj.id === item);
    }
    if (item && item.link && !item.link.includes('https')) return;
    state.activeItem = item;
  },
  SET_IFRAME_ITEMS(state, payload) {
    state.iframeItems = payload;
  },
  CHANG_LOADING_STATE(state, loading) {
    state.loading = loading;
  },
  UPDATE_PROJECTS(state, payload) {
    state.projects = payload;
  },
  SET_CANVAS_FULLSCREEN(state, payload) {
    state.canvasFullScreen = payload;
  },
};
const actions = {
  updateProjects(context, payload) {
    context.commit('UPDATE_MUSIC', payload);
    context.commit('CHANG_LOADING_STATE', false);
  },
  toggleItem(context, payload) {
    context.commit('TOGGLE_ITEM', payload);
  },
  setActiveItem(context, payload) {
    context.commit('SET_ACTIVE_ITEM', payload);
  },
  setIframeItems(context, payload) {
    context.commit('SET_IFRAME_ITEMS', payload);
  },
  changeLoadingState(context, payload) {
    context.commit('CHANG_LOADING_STATE', payload);
  },
  setCanvasFullScreen(context, payload) {
    context.commit('SET_CANVAS_FULLSCREEN', payload);
  },
};
const getters = {
  activeItem(state) {
    return state.activeItem;
  },
  iframeItems(state) {
    return state.iframeItems.filter((item) => !item[state.filter]);
  },
  workItems(state) {
    return state.projects.filter((item) => item.type === 'work');
  },
  musicItems(state) {
    return state.projects.filter((item) => item.type === 'music');
  },
  loading(state) {
    return state.loading;
  },
  canvasFullScreen(state) {
    return state.canvasFullScreen;
  },
};

export default new Vuex.Store({
  state,
  mutations,
  actions,
  getters,
});
