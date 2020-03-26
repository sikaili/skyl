import Vuex from "vuex";
import Vue from "vue";
import { seedData } from "@/seed.js";
console.log(JSON.stringify(seedData));
Vue.use(Vuex);

const state = {
  work: seedData.work,
  music: seedData.music,
  activeLink: "https://eyes.skyl.fr"
};
const mutations = {
  TOGGLE_ITEM(state, payload) {
    state[payload.name].map(item => {
      item == payload.obj && item.show ? (item.show = false) : "";
      item == payload.obj ? (item.show = true) : (item.show = false);
    });
  },
  SET_LINK(state, link) {
    link == state.activeLink ? "" : (state.activeLink = link);
  }
};
const actions = {
  toggleItem(context, payload) {
    context.commit("TOGGLE_ITEM", payload);
  },
  setLink(context, payload) {
    if (payload.includes("https")) {
      context.commit("SET_LINK", payload);
    }
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
  link(state) {
    return state.activeLink;
  }
};

export default new Vuex.Store({
  state,
  mutations,
  actions,
  getters
});
