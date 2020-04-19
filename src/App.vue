<template>
  <div id="app">
    <div
      class="ToggleFullScreen"
      @mouseenter="handleFullScreenMouseIn()"
      @click="handleFullScreenMouseIn()"
      @mouseleave="handleFullScreenMouseLeave()"
    />
    <TheHead v-if="!canvasFullScreen" />
    <div
      :key="key"
      class="back bw0"
      :style="iframeContainer"
    >
      <Canvas
        v-if="activeItem && activeItem.type === 'sketch' || activeItem.type === 'musicIframe'"
        :key="key + 2"
        :current="activeItem.app ? activeItem.app : activeItem.id"
        :type="activeItem.type"
      />
      <iframe
        v-if="activeItem && activeItem.type !== 'sketch'"
        :key="key + 1"
        class="back bw0"
        scrolling="no"
        scroll="no"
        :src="activeItem.link"
        :style="iframeStyle"
      />
    </div>
    <transition name="slide-fade-main">
      <router-view />
    </transition>
    <transition name="slide-fade-main">
      <TheFooter v-if="footer && $mq === 'lg' && !canvasFullScreen" />
    </transition>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import TheHead from './components/TheHead.vue';
import TheFooter from './components/TheFooter.vue';
import Canvas from './components/Canvas.vue';

document.ontouchmove = function(e) { //eslint-disable-line
  return true;
};
export default {
  name: 'App',
  components: {
    TheHead,
    TheFooter,
    Canvas,
  },
  data() {
    return {
      footer: true,
      width: 0,
      height: 0,
      showIframe: false,
      key: 0,
      sketches: {},
    };
  },
  computed: {
    ...mapGetters(['activeItem', 'canvasFullScreen']),
    iframeContainer() {
      if (this.activeItem && !this.activeItem.type) {
        return `width:${this.$mq === 'sm' ? window.screen.width : this.width}px;
      height:${this.height}px;
      opacity:${this.$route.path.includes('play') ? 1 : ''};
      -moz-transform: scale(1);
      -moz-transform-origin: 0 0;
      -o-transform: scale(1);
      -o-transform-origin: 0 0;
      -webkit-transform: scale(1);
      -webkit-transform-origin: 0 0;
      `;
      }
      return `opacity:${this.$route.path.includes('play') ? 1 : ''}`;
    },
    iframeStyle() {
      const inPlay = this.$route.name === 'play';
      const scale = this.$mq === 'sm' ? 2 : 1;
      return `width:${
        this.$mq === 'sm' ? window.screen.width * scale : this.width * scale
      }px;
      height:${this.height * scale}px;
      opacity:${inPlay ? 1 : 0.4};
      -moz-transform: scale(${1 / scale});
      -moz-transform-origin: 0 0;
      -o-transform: scale(${1 / scale});
      -o-transform-origin: 0 0;
      -webkit-transform: scale(${1 / scale});
      -webkit-transform-origin: 0 0;
      `;
    },
  },
  watch: {
    activeItem() {
      this.key = Math.random().toFixed(2);
    },
  },
  beforeCreate() {
    const lastPlayed = localStorage.getItem('lastPlayed');
    if (lastPlayed) {
      this.$store.dispatch('setActiveItem', lastPlayed);
      this.$router.push({ name: 'play', params: { id: lastPlayed } });
      localStorage.removeItem('lastPlayed');
      return;
    }
    this.$root.$on('refreshCanvas', () => {
      this.key = Math.random().toFixed(2);
    });
    const { id } = this.$route.params;
    if (id !== 'random') {
      const iframeItem = this.$store.state.iframeItems.find(
        (item) => item.id === id,
      ) || {
        id: ['eyes', 'eyes', 'virus', 'p'][Math.floor(Math.random() * 4)],
        type: 'sketch',
      };
      this.$store.dispatch('setActiveItem', iframeItem);
    }
  },
  created() {
    window.addEventListener('resize', this.handleResize);
    window.addEventListener('scroll', this.handleScroll);
    window.addEventListener('orientationchange', this.handleResize);
    this.handleResize();
  },
  destroyed() {
    window.removeEventListener('resize', this.handleResize);
    window.removeEventListener('scroll', this.handleScroll);
    window.removeEventListener('orientationchange', this.handleResize);
  },
  methods: {
    handleResize() {
      this.width = window.innerWidth;
      this.height = window.innerHeight;
    },
    handleScroll() {
      clearTimeout(this.timeOut);
      this.footer = false;
      this.timeOut = setTimeout(() => {
        this.footer = true;
      }, 2000);
    },
    handleFullScreenMouseIn() {
      this.activeFullScreen = setTimeout(() => {
        this.$store.dispatch('setCanvasFullScreen', !this.canvasFullScreen);
      }, 1500);
    },
    handleFullScreenMouseLeave() {
      clearTimeout(this.activeFullScreen);
    },
  },
};
</script>

<style>
    .ToggleFullScreen {
        position: fixed;
        right: 0;
        top: 0;
        width: 30px;
        height: 40px;
    }
    .slide-fade-main-enter-active {
        transition: all 0.2s ease;
    }
    .slide-fade-main-leave-active {
        transition: all 0s;
    }
    .slide-fade-main-enter,
    .slide-fade-main-leave-to {
        transform: translateY(-30px);
        opacity: 0;
    }
    canvas.p5Canvas {
        display: block;
        margin-left: auto;
        margin-right: auto;
        padding: 0 0 0 0;
    }

    body {
        padding: 0 0 0 0;
        margin: 0 0 0 0;
    }
</style>
