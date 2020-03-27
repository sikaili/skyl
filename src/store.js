import Vuex from "vuex";
import Vue from "vue";
import { seedData } from "@/seed.js";

Vue.use(Vuex);

const state = {
  work: seedData.work,
  music: seedData.music,
  activeLink: "https://eyes.skyl.fr",
  loading: true
};
const mutations = {
  TOGGLE_ITEM(state, payload) {
    state[payload.name].map(item => {
      item == payload.obj && item.show ? (item.show = false) : "";
      item == payload.obj ? (item.show = true) : (item.show = false);
    });
  },
  SET_ACTIVE_LINK(state, link) {
    link == state.activeLink ? "" : (state.activeLink = link);
  },
  CHANG_LOADING_STATE(state, loading) {
    state.loading = loading;
  },
  UPDATE_MUSIC(state, music) {
    state.music = music;
  },
  UPDATE_WORK(state, work) {
    state.work = work;
  }
};
const actions = {
  updateProjectsFeed(context, payload) {
    context.commit("UPDATE_MUSIC", payload.music);
    context.commit("UPDATE_WORK", payload.work);
    context.commit("CHANG_LOADING_STATE", false);
  },
  toggleItem(context, payload) {
    context.commit("TOGGLE_ITEM", payload);
  },
  setActiveLink(context, payload) {
    if (payload.includes("https")) {
      context.commit("SET_ACTIVE_LINK", payload);
    }
  },
  changeLoadingState(context, payload) {
    context.commit("CHANG_LOADING_STATE", payload);
  }
};
const getters = {
  activeItem(state, categorie) {
    if (!state[categorie]) {
      return;
    }
    return state[categorie].find(item => item.show);
  },
  workItems(state) {
    return state.work;
  },
  musicItems(state) {
    return state.music;
  },
  activeLink(state) {
    return state.activeLink;
  },
  loading(state) {
    return state.loading;
  }
};

export default new Vuex.Store({
  state,
  mutations,
  actions,
  getters
});
