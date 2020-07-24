// eslint-disable-next-line no-unused-vars
import { mapGetters, mapActions } from 'vuex';
import TheIntro from '@/components/TheIntro.vue';

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
    TheIntro,
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
    isTouchDevice() {
      return 'ontouchstart' in window;
    },
    isIpad() {
      return navigator.userAgent.match(/Tablet|iPad/i);
    },
  },
  created() {
    if (this.$mq !== 'sm' || this.$route.params.id) {
      const item = this.menuItems.filter((item) => item.id === this.$route.params.id)[0];
      this.toggleItem({
        name: this.name,
        obj: item || this.menuItems[0],
      });
    }
  },
  mounted() {
    window.addEventListener('click', this.pauseToneAudioContext);
  },
  updated() {
    if (this.name === 'music' && window.Tone && window.Tone.context.state === 'running') {
      window.Tone.context.suspend();
    } else if (this.name !== 'music' && window.Tone && window.Tone.context.state === 'suspended') {
      window.Tone.context.resume();
    }
  },
  beforeDestroy() {
    if (window.Tone && window.Tone.context.state === 'suspended') {
      window.Tone.context.resume();
    }
    window.removeEventListener('click', this.pauseToneAudioContext);
  },
  methods: {
    ...mapActions(['setActiveItem', 'toggleItem', 'changeLoadingState']),
    showReadMoreButton(item) {
      return item.imgs.length > 1 && this.type !== 'music';
    },
    showPlayButton(item) {
      return item.link.split(':')[0] === 'https' && this.type !== 'music';
    },
    pauseToneAudioContext() {
      if (this.name === 'music' && window.Tone && window.Tone.context.state === 'running') {
        window.Tone.context.suspend();
      }
    },
    playerProps(item) {
      const songName = item.name.replace(' ', '-').toLowerCase();
      return {
        theme: '#1d1d1b',
        audio: {
          preload: 'metadata',
          volume: 1,
        },
        music: {
          title: item.name,
          artist: 'Sikai Li',
          src: `/src/projects/player/sound/${songName}.m4a`,
          pic: item.img,
        },
      };
    },
    play(item) {
      this.abortLoad();
      this.setActiveItem(item.app || item.id);
      this.$router.push({ path: `/play/${item.app || item.id}` })
        .catch((err) => {});
      if (item.app && item.id) {
        this.$router.push({ query: { id: item.id } });
      }
      this.$ga.event(`play-${item}`, 'click', 'usage-menu', 1);
    },
    setItemActive(item, options) {
      this.$router
        .push({ name: this.name, params: { id: item.id } })
        .catch((err) => {});
      if (options === 'touchScreen') {
        this.menuItems.filter((a) => a !== item).map((a) => (a.show = false));
        item.show = !item.show;
      } else {
        this.toggleItem({ name: this.name, obj: item });
      }
    },
    handleMouseIn(itemToEmit) {
      if (itemToEmit && !this.isIpad && this.type !== 'music') {
        this.load(itemToEmit);
      }
    },
    handleMouseOut() {
      if (!this.isIpad && this.type !== 'music') {
        this.abortLoad();
      }
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
        this.setActiveItem(item.app || item.id);
        this.loadingAnimation = false;
      }, 1500);
    },
    goToPage(item) {
      this.$ga.event(`read-more-${item}`, 'click', 'usage-menu', 1);
      this.$router.push({ path: `/page/${this.name}/${item.id}` });
    },
  },
};
