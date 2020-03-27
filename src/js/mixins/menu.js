// eslint-disable-next-line no-unused-vars
import { clearTimeout } from "timers";
import { mapGetters, mapActions } from "vuex";
import intro from "@/components/Intro.vue";

export default {
  watch: {
    loading(loading) {
      if (loading === false && this.$mq !== "sm") {
        this.toggleItem({
          name: this.name,
          obj: this.menuItems[0]
        });
      }
    }
  },
  components: {
    intro
  },
  computed: {
    ...mapGetters({
      musicItems: "musicItems",
      workItems: "workItems",
      loading: "loading"
    }),
    menuItems() {
      return this[this.name + "Items"];
    },
    name() {
      return this.type.toLowerCase();
    }
  },
  methods: {
    ...mapActions(["setActiveLink", "toggleItem"]),
    play(item) {
      this.setActiveLink(item.link);
      this.$router.push({ path: `/play/${item.id}` });
    },
    setItemActive(item, options) {
      if (options === "touchScreen") {
        this.menuItems.filter(a => a != item).map(a => (a.show = false));
        item.show = !item.show;
        this.setActiveLink(item.link);
      } else {
        this.toggleItem({ name: this.name, obj: item });
        this.$router.push({ name: this.name, params: { id: item.id } });
      }
    },
    handleMouseIn(itemToEmit) {
      if (itemToEmit) {
        this.load(itemToEmit);
      }
    },
    handleMouseOut() {
      this.abortLoad();
    },
    abortLoad() {
      let id = window.setTimeout(function() {}, 0);
      while (id--) {
        window.clearTimeout(id);
      }
      setTimeout(() => {
        this.loadingAnimation = false;
      }, 200);
    },
    load(link) {
      if (link.split(":")[0] !== "https") return;
      this.loadingAnimation = true;
      setTimeout(() => {
        this.setActiveLink(link);
        this.loadingAnimation = false;
      }, 1000);
    },
    goToPage(item) {
      this.$router.push({ path: `/page/${this.name}/${item.id}` });
    }
  }
};
