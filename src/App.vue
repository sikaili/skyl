<template>
  <div
    id="app"
    class="App"
  >
    <div
      class="ToggleFullScreen"
      @click="handleFullScreenMouseIn()"
      @mouseleave="handleFullScreenMouseLeave()"
    />
    <the-header v-if="!canvasFullScreen" />
    <div
      v-if="updateExists"
      class="Notification"
    >
      <i class="icon ion-md-sync" />
      new version available,
      <span
        class="Notification__click"
        @click="refreshApp()"
      >
        click here
      </span> to refresh.
    </div>
    <div
      :key="canvasWrapperKey"
      class="sketchContainer bw0"
      :style="iframeContainer"
    >
      <the-canvas-wrapper
        v-if="activeItem && activeItem.type === 'sketch' || activeItem.type === 'musicIframe'"
        :key="canvasWrapperKey + 2"
        :current="activeItem.app ? activeItem.app : activeItem.id"
        :type="activeItem.type"
      />
      <iframe
        v-if="activeItem && activeItem.type !== 'sketch'"
        :key="canvasWrapperKey + 1"
        class="sketchContainer bw0"
        scrolling="no"
        scroll="no"
        :src="activeItem.link"
        :style="iframeStyle"
      />
    </div>
    <transition name="slide-fade-main">
      <keep-alive include="Menu">
        <router-view />
      </keep-alive>
    </transition>
    <div
      v-show="proposeDesktop && !updateExists && $mq === 'sm' && ($route.name === 'work' || $route.name === 'music')"
      class="flex menuItems-center justify-center pa3 f6 ph3 bg-black-30 white"
    >
      <svg
        class="w1"
        data-icon="info"
        viewBox="0 0 32 32"
        style="fill: currentcolor;"
      >
        <title>info icon</title>
        <path
          d="M16 0 A16 16 0 0 1 16 32 A16 16 0 0 1 16 0 M19 15 L13 15 L13 26 L19 26 z M16 6 A3 3 0 0 0 16 12 A3 3 0 0 0 16 6"
        />
      </svg>
      <span
        class="MenuSmall__Notification lh-title ml3"
      >Please come back on a desktop for better expereince
      </span>
      <p
        class="pl3"
        @click="disablePromptDesktop()"
      >
        X
      </p>
    </div>
    <transition name="slide-fade-main">
      <the-footer v-if="footer && $mq === 'lg' && !canvasFullScreen && !updateExists" />
    </transition>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import TheHeader from '@/components/TheHeader.vue';
import TheFooter from '@/components/TheFooter.vue';
import TheCanvasWrapper from '@/components/TheCanvasWrapper.vue';
import loadScript from '@/js/utlis/loadScript';

// import BaseNotificationBar from '@/components/base/BaseNotificationBar.vue';
// import { allIframeLinks as sketches } from '@/seed.js';
// import Loading from '@/components/base/BaseLoading.vue';

document.ontouchmove = function(e) { //eslint-disable-line
  return true;
};
export default {
  name: 'App',
  components: {
    TheHeader,
    TheFooter,
    TheCanvasWrapper,
    // BaseNotificationBar,
  },
  data() {
    return {
      proposeDesktop: !localStorage.getItem('propose-desktop'),
      refreshing: false,
      registration: null,
      updateExists: false,
      footer: true,
      width: 0,
      height: 0,
      showIframe: false,
      canvasWrapperKey: 0,
      sketches: {},
      version: process.env.VUE_APP_VERSION,
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
      this.canvasWrapperKey = Math.random().toFixed(2);
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
      this.canvasWrapperKey = Math.random().toFixed(2);
    });
    const { id } = this.$route.params;
    if (id !== 'random') {
      const iframeItem = this.$store.state.iframeItems.find(
        (item) => item.id === id,
      ) || {
        id: ['eyes', 'eyes', 'p', 'quadtree'][Math.floor(Math.random() * 4)],
        type: 'sketch',
      };
      this.$store.dispatch('setActiveItem', iframeItem);
    }
  },
  mounted() {
    loadScript('https://www.googletagmanager.com/gtag/js?id=UA-143317718-5');
    window.dataLayer = window.dataLayer || [];
    window.gtag = (...theArgs) => {
      window.dataLayer.push(theArgs);
    };
    window.gtag('js', new Date());
    window.gtag('config', 'UA-143317718-5');
    document.addEventListener(
      'swUpdated', this.showRefreshUI, { once: true },
    );
    navigator.serviceWorker.addEventListener(
      'controllerchange', () => {
        if (this.refreshing) return;
        this.refreshing = true;
        window.location.reload();
      },
    );

    window.addEventListener('resize', this.handleResize);
    window.addEventListener('scroll', this.handleScroll);
    window.addEventListener('orientationchange', this.handleResize);
    this.handleResize();
    // const lastPlayed = localStorage.getItem('lastPlayed');
    // if (lastPlayed) {
    //   this.$store.dispatch('setActiveItem', lastPlayed);
    //   this.$router.push({ name: 'play', params: { id: lastPlayed } });
    //   localStorage.removeItem('lastPlayed');
    //   return;
    // }
    // const { id } = this.$route.params;
    // if (id !== 'random') {
    //   const sketch = sketches.find(
    //     (item) => item.id === id,
    //   ) || {
    //     id: ['eyes', 'eyes', 'p'][Math.floor(Math.random() * 3)],
    //     type: 'sketch',
    //   };

    //   if (sketch.id !== id && id) {
    //     this.$router.push({
    //       params: {
    //         id: undefined,
    //       },
    //     });
    //   }

    //   this.$store.dispatch('setActiveItem', sketch);
    // }
    // this.$root.$on('refreshCanvas', () => {
    //   this.canvasWrapperKey = Math.random().toFixed(2);
    // });
  },
  destroyed() {
    window.removeEventListener('resize', this.handleResize);
    window.removeEventListener('scroll', this.handleScroll);
    window.removeEventListener('orientationchange', this.handleResize);
  },
  methods: {
    showRefreshUI(e) {
      this.registration = e.detail;
      // this.updateExists = true;
    },
    refreshApp() {
      this.updateExists = false;
      if (this.registration && this.registration.waiting) {
        this.registration.waiting.postMessage({ type: 'SKIP_WAITING' });
      }
    },
    disablePromptDesktop() {
      localStorage.setItem('propose-desktop', true);
      this.proposeDesktop = false;
    },
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
      }, 300);
    },
    handleFullScreenMouseLeave() {
      clearTimeout(this.activeFullScreen);
    },
  },
};
</script>

<style lang="scss">
    .App {
        font-family: 'Roboto Mono', monospace, 'helvetica neue', helvetica, sans-serif;
        font-display: swap;
        overflow: hidden;
        user-select: none;
        z-index: 100;
        box-sizing: border-box;

        .sketchContainer {
            z-index: -100;
            position: fixed;
            left: 0;
            top: 0;
            opacity: 0.5;
        }
    }

    .ToggleFullScreen {
        position: fixed;
        right: 0;
        top: 55px;
        width: 15px;
        height: 30px;
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
    .Notification {
        background-color: rgba(0,0,0, 0.8);
        padding: 18px 48px;
        line-height: 24px;
        text-align: center;
        position: fixed;
        width: 100%;
        color: white;
        bottom: 0px;

        &__click {
            color: rgba(150,150,255);
        }
    }

    body {
        padding: 0 0 0 0;
        margin: 0 0 0 0;
    }
</style>
