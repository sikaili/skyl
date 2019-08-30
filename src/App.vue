<template>
  <div id="app">
    <TheHead :link="link" />
    <div v-if="(iframe.show = true)" class="back bw0" :style="divStyle">
      <iframe
        class="back bw0"
        scrolling="no"
        scroll="no"
        :src="link"
        :style="iframeStyle"
      ></iframe>
    </div>
    <transition name="slide-fade1">
      <router-view />
    </transition>
    <transition name="slide-fade1">
      <TheFooter v-if="footer && $mq == `lg`" />
    </transition>
  </div>
</template>

<script>
// eslint-disable-next-line
document.ontouchmove = function(e) {
  return true;
};

import TheHead from "./components/TheHead.vue";
import TheFooter from "./components/TheFooter.vue";
import { store } from "@/store.js";
export default {
  name: "app",
  mounted() {
    this.$root.$on("itemDesOpen", a => {
      // a is link
      a.split(":")[0] == `https`
        ? (this.link = a)
        : (this.link = this.linkDefault);
    });
    this.$root.$on("selected", a => {
      // a is link
      a.split(":")[0] == `https`
        ? (this.link = a)
        : (this.link = this.linkDefault);
    });
  },
  created() {
    window.addEventListener("resize", this.handleResize);
    window.addEventListener("scroll", this.handleScroll);
    this.handleResize();
  },
  destroyed() {
    window.removeEventListener("resize", this.handleResize);
    window.removeEventListener("scroll", this.handleScroll);
  },
  components: {
    TheHead,
    TheFooter
  },
  data() {
    return {
      item: "eyes",
      link: store.state.activeLink,
      iframe: { width: 0, height: 0, showIframe: true },
      footer: true
    };
  },
  methods: {
    handleResize() {
      this.iframe.width = window.innerWidth;
      this.height = window.innerHeight;
    },
    handleScroll() {
      let id = window.setTimeout(function() {}, 0);
      while (id--) {
        window.clearTimeout(id);
      }
      this.footer = false;
      setTimeout(() => {
        this.footer = true;
      }, 2000);
    }
  },
  computed: {
    divStyle: function() {
      const scale = 1;
      return `width:${
        this.$mq == "sm" ? screen.width * scale : this.iframe.width
      }px;
      height:${this.height * scale}px;
      opacity:${this.$route.path.includes("play") ? 1 : "1"};
      -moz-transform: scale(${1 / scale});
      -moz-transform-origin: 0 0;
      -o-transform: scale(${1 / scale});
      -o-transform-origin: 0 0;
      -webkit-transform: scale(${1 / scale});
      -webkit-transform-origin: 0 0;
      `;
    },
    iframeStyle: function() {
      let scale = 1;
      const inInfo = this.$route.path.includes("play");
      inInfo && this.$mq == "sm" ? (scale = 2) : (scale = 1);
      return `width:${
        this.$mq == "sm" ? screen.width * scale : this.iframe.width * scale
      }px;
      height:${this.height * scale}px;
      opacity:${inInfo ? 1 : 0.4};
      -moz-transform: scale(${1 / scale});
      -moz-transform-origin: 0 0;
      -o-transform: scale(${1 / scale});
      -o-transform-origin: 0 0;
      -webkit-transform: scale(${1 / scale});
      -webkit-transform-origin: 0 0;
      `;
    }
  }
};
</script>

<style>
.slide-fade1-enter-active {
  transition: all 0.2s ease;
}
.slide-fade1-leave-active {
  transition: all 0s;
}
.slide-fade1-enter, .slide-fade1-leave-to
/* .slide-fade-leave-active below version 2.1.8 */ {
  transform: translateY(-30px);
  opacity: 0;
}
</style>
