import Vuex from 'vuex';
import Vue from 'vue';
import { infosProjects, playableSketches } from '@/seed';

Vue.use(Vuex);
const state = {
  projects: infosProjects,
  activeItem: {},
  loading: true,
  playableSketches,
  filter: process.env.VUE_APP_FILTER,
  canvasFullScreen: false,
};
const mutations = {
  TOGGLE_MENU_ITEM(state, payload) {
    state.projects.filter((item) => item.type === payload.name)
      .forEach((item) => {
        item === payload.obj && item.show ? (item.show = false) : ''; //eslint-disable-line
        item === payload.obj ? (item.show = true) : (item.show = false); //eslint-disable-line
      });
  },
  SET_ACTIVE_ITEM(state, item) {
    if (typeof item === 'string') {
      item = state.playableSketches.find((obj) => obj.id === item);
    }
    if (item && item.link && !item.link.includes('https')) return;
    state.activeItem = item;
  },
  SET_PLAYABLE_SKETCHES(state, payload) {
    state.playableSketches = payload;
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
    context.commit('UPDATE_PROJECTS', payload);
    context.commit('CHANG_LOADING_STATE', false);
  },
  toggleMenuItem(context, payload) {
    context.commit('TOGGLE_MENU_ITEM', payload);
  },
  setActiveItem(context, payload) {
    context.commit('SET_ACTIVE_ITEM', payload);
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
  playableSketches(state) {
    return state.playableSketches.filter((item) => !item[state.filter]);
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
