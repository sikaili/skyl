<template>
  <div id="app">
    <TheHead />
    <div class="back bw0" :style="iframeContainer">
      <iframe
        v-if="showIframe"
        class="back bw0"
        scrolling="no"
        scroll="no"
        :src="activeItem.link"
        :style="canvas"
        :key="showIframe"
      ></iframe>
      <Canvas v-else :key="showIframe" />
    </div>
    <transition name="slide-fade-main">
      <router-view />
    </transition>
    <transition name="slide-fade-main">
      <TheFooter v-if="footer && $mq == `lg`" />
    </transition>
  </div>
</template>

<script>
document.ontouchmove = function(e) { //eslint-disable-line
  return true;
};
import { mapGetters } from "vuex";
// import { dataMxn } from "@/js/mixins/";
import TheHead from "./components/TheHead.vue";
import TheFooter from "./components/TheFooter.vue";
import Canvas from "./components/Canvas.vue";
export default {
  name: "app",
  created() {
    // dataMxn.getData("./data/work.json").then(data => {
    //   data = dataMxn.addMedia(data);
    //   this.$store.dispatch("updateProjectsFeed", data);
    // });
    window.addEventListener("resize", this.handleResize);
    window.addEventListener("scroll", this.handleScroll);
    window.addEventListener("orientationchange", this.handleResize);
    this.handleResize();
  },
  destroyed() {
    window.removeEventListener("resize", this.handleResize);
    window.removeEventListener("scroll", this.handleScroll);
    window.removeEventListener("orientationchange", this.handleResize);
  },
  components: {
    TheHead,
    TheFooter,
    Canvas
  },
  data() {
    return {
      footer: true,
      width: 0,
      height: 0,
      showIframe: false
    };
  },
  methods: {
    handleResize() {
      this.width = window.innerWidth;
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
    ...mapGetters(["activeItem"]),
    iframeContainer: function() {
      const scale = 1;
      return `width:${this.$mq == "sm" ? screen.width * scale : this.width}px;
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
    canvas: function() {
      let scale = 1;
      const inPlay = this.$route.path.includes("play");
      inPlay && this.$mq == "sm" ? (scale = 2) : (scale = 1);
      return `width:${
        this.$mq == "sm" ? screen.width * scale : this.width * scale
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
    }
  }
};
</script>

<style>
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
</style>
