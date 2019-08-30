import { seedData } from "@/seed.js";
console.log(seedData);
export const store = {
  state: {
    work: seedData.work,
    music: seedData.music,
    activeLink: ""
  },
  getActiveItem(categorie) {
    return this.state[categorie].find(item => item.show);
  },
  setActiveItem(categorie, itemObj) {
    this.state[categorie].map(item => {
      item == itemObj ? (item.show = true) : (item.show = false);
    });
  },
  setActiveLink(link) {
    link == this.state.activeLink ? "" : (this.state.activeLink = link);
    console.log(this.state.activeLink);
  }
};

// export default {
//   work: data.work,
//   music: data.music
// };
