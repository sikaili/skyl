import { mapGetters, mapActions } from 'vuex';
import TheIntro from '@/components/TheIntro.vue';
import { sendEvent } from '@/js/utlis/googleAnalytics';

export default {
  watch: {
    loading(loading) {
      if (loading === false && this.$mq !== 'sm') {
        this.toggleMenuItem({
          name: this.name,
          obj: this.menuItems[0],
        });
      }
    },
    $route() {
      if (this.menuItems && this.menuItems.filter((item) => item.show).length === 0 && this.$mq !== 'sm') {
        this.toggleMenuItem({
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
    activeItem() {
      return this.menuItems.filter((item) => item.show)[0];
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
      // set active router item from params id
      const item = this.menuItems.filter((item) => item.id === this.$route.params.id)[0];
      this.toggleMenuItem({
        name: this.name,
        obj: item || this.menuItems[0],
      });
    }
  },
  mounted() {
    window.addEventListener('click', this.pauseToneAudioContext);
  },
  updated() {
    // if (this.name === 'music' && window.Tone && window.Tone.context.state === 'running') {
    //   window.Tone.context.close();
    // } else if (this.name !== 'music' && window.Tone && window.Tone.context.state === 'suspended') {
    //   window.Tone.context.resume();
    // }
  },
  beforeDestroy() {
    // if (window.Tone && window.Tone.context.state === 'suspended') {
    //   window.Tone.context.resume();
    // }
    // window.removeEventListener('click', this.pauseToneAudioContext);
  },
  methods: {
    ...mapActions(['setActiveItem', 'toggleMenuItem', 'changeLoadingState']),
    showReadMoreButton(item) {
      return item.imgs.length > 1 && this.type !== 'music';
    },
    setCurrentSong(emit) {
      const songTitle = emit.title.toLowerCase().replace(/\s/g, '-');
      sendEvent(`listen-${songTitle}`);
      this.$router.push({ params: { songSlug: songTitle } });
    },
    showPlayButton(item) {
      return item.link.split(':')[0] === 'https' && this.type !== 'music' && !item.list;
    },
    pauseToneAudioContext() {
      if (this.name === 'music' && window.Tone && window.Tone.context.state === 'running') {
        window.Tone.context.close();
      }
    },
    playerProps(item) {
      const props = {
        theme: '#357edd',
        audio: {
          preload: 'metadata',
          volume: 1,
        },
      };
      if (!item.show && !item.played) {
        return {};
      }
      item.played = true;
      if (item.list && item.list.length > 0) {
        props.list = item.list.filter((item) => item);
        [props.music] = item.list;
        if (this.$route.params.songSlug) {
          const song = item.list.filter((song) => song.title.toLowerCase().replace(' ', '-') === this.$route.params.songSlug.toLowerCase().replace(' ', '-'))[0];
          if (song) {
            props.music = song;
          }
        }
      } else {
        const songSlug = item.name.replace(' ', '-').toLowerCase();
        props.music = {
          title: item.name,
          artist: 'Sikai Li',
          src: `/src/projects/player/sound/${songSlug}.m4a`,
          pic: item.img,
        };
      }
      return props;
    },
    play(item) {
      this.abortLoad();
      const itemName = item.app || item.id || item;
      this.setActiveItem(itemName);
      this.$router.push({ path: `/play/${itemName}` })
        .catch((err) => {});
      if (item.app && item.id) {
        this.$router.push({ query: { id: item.id } });
      }
      sendEvent(`play-${item.id}`);
    },
    setItemActive(item, options) {
      this.$router
        .push({ name: this.name, params: { id: item.id, songSlug: undefined } })
        .catch((err) => {});

      if (options === 'touchScreen') {
        this.menuItems.filter((a) => a !== item).map((a) => (a.show = false));
        item.show = !item.show;
      } else {
        this.toggleMenuItem({ name: this.name, obj: item });
      }
      sendEvent(`menu-${item.name.replace(/\s/, '-')}`);
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
      }, 1000);
    },
    goToPage(item) {
      sendEvent(`read-more-${item.id}`);
      this.$router.push({ path: `/page/${this.name}/${item.id}` });
    },
  },
};
