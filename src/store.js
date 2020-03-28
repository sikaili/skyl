import Vuex from "vuex";
import Vue from "vue";
import { seedData, allIframeLinks } from "@/seed.js";

Vue.use(Vuex);

const state = {
  work: seedData.work,
  music: seedData.music,
  activeItem: { name: "eyes", link: "https://eyes.skyl.fr" },
  loading: true,
  iframeItems: allIframeLinks
};
const mutations = {
  TOGGLE_ITEM(state, payload) {
    state[payload.name].map(item => {
      item == payload.obj && item.show ? (item.show = false) : "";
      item == payload.obj ? (item.show = true) : (item.show = false);
    });
  },
  SET_ACTIVE_ITEM(state, item) {
    item == state.activeItem ? "" : (state.activeItem = item);
  },
  SET_IFRAME_ITEMS(state, payload) {
    state.iframeItems = payload;
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
  setActiveItem(context, payload) {
    if (payload.link.includes("https://"))
      context.commit("SET_ACTIVE_ITEM", payload);
  },
  setIframeItems(context, payload) {
    context.commit("SET_IFRAME_ITEMS", payload);
  },
  changeLoadingState(context, payload) {
    context.commit("CHANG_LOADING_STATE", payload);
  }
};
const getters = {
  activeItem(state) {
    return state.activeItem;
  },
  iframeItems(state) {
    return state.iframeItems;
  },
  workItems(state) {
    return state.work;
  },
  musicItems(state) {
    return state.music;
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
