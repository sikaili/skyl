// eslint-disable-next-line no-unused-vars
import { mapGetters, mapActions } from 'vuex';
import intro from '@/components/Intro.vue';

export default {
  watch: {
    loading(loading) {
      if (loading === false && this.$mq !== 'sm') {
        this.toggleItem({
          name: this.name,
          obj: this.menuItems[0],
        });
      }
    },
  },
  components: {
    intro,
  },
  computed: {
    ...mapGetters({
      musicItems: 'musicItems',
      workItems: 'workItems',
      loading: 'loading',
    }),
    menuItems() {
      return this[`${this.name}Items`];
    },
    name() {
      return this.type.toLowerCase();
    },
  },
  created() {
    if (this.$mq !== 'sm') {
      this.toggleItem({
        name: this.name,
        obj: this.menuItems[0],
      });
    }
  },
  methods: {
    ...mapActions(['setActiveItem', 'toggleItem', 'changeLoadingState']),
    play(item) {
      this.setActiveItem(item.id);
      this.$router.push({ path: `/play/${item.id}` });
    },
    setItemActive(item, options) {
      this.$router
        .push({ name: this.name, params: { id: item.id } })
        .catch((err) => {});
      if (options === 'touchScreen') {
        this.menuItems.filter((a) => a != item).map((a) => (a.show = false));
        item.show = !item.show;
      } else {
        this.toggleItem({ name: this.name, obj: item });
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
      let id = window.setTimeout(() => {}, 0);
      while (id--) {
        window.clearTimeout(id);
      }
      setTimeout(() => {
        this.loadingAnimation = false;
      }, 200);
    },
    load(item) {
      if (item.link.split(':')[0] !== 'https') return;
      this.loadingAnimation = true;
      setTimeout(() => {
        this.setActiveItem(item.id);
        this.loadingAnimation = false;
      }, 1500);
    },
    goToPage(item) {
      this.$router.push({ path: `/page/${this.name}/${item.id}` });
    },
  },
};
