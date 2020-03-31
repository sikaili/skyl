<template>
  <div id="app">
    <TheHead />
    <div class="back bw0" :style="iframeContainer" :key="key + 2">
      <iframe
        v-if="activeItem.type !== 'sketch'"
        class="back bw0"
        scrolling="no"
        scroll="no"
        :src="activeItem.link"
        :style="iframeStyle"
        :key="key + 1"
      ></iframe>
      <Canvas v-else :current="activeItem.id" :key="activeItem.id" />
    </div>
    <transition name="slide-fade-main">
      <router-view />
    </transition>
    <transition name="slide-fade-main">
      <TheFooter v-if="footer && $mq == `lg`" />
    </transition>
    <!-- <div id="canvasContainer"></div> -->
  </div>
</template>

<script>
document.ontouchmove = function(e) { //eslint-disable-line
  return true;
};
import { mapGetters } from "vuex";
import TheHead from "./components/TheHead.vue";
import TheFooter from "./components/TheFooter.vue";
import Canvas from "./components/Canvas.vue";
// import p5 from "p5";
export default {
  name: "app",
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
      showIframe: false,
      key: 0,
      sketches: {}
    };
  },
  computed: {
    ...mapGetters(["activeItem"]),
    iframeContainer: function() {
      if (!this.activeItem.type) {
        return `width:${this.$mq == "sm" ? screen.width : this.width}px;
      height:${this.height}px;
      opacity:${this.$route.path.includes("play") ? 1 : ""};
      -moz-transform: scale(1);
      -moz-transform-origin: 0 0;
      -o-transform: scale(1);
      -o-transform-origin: 0 0;
      -webkit-transform: scale(1);
      -webkit-transform-origin: 0 0;
      `;
      }
      return `opacity:${this.$route.path.includes("play") ? 1 : ""}`;
    },
    iframeStyle: function() {
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
    },
    canvas: function() {
      let scale = 1;
      const inPlay = this.$route.path.includes("play");
      inPlay && this.$mq == "sm" ? (scale = 1) : (scale = 1);
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
  created() {
    this.$store.dispatch("setActiveItem", { id: "virus", type: "sketch" });
    window.addEventListener("resize", this.handleResize);
    window.addEventListener("scroll", this.handleScroll);
    window.addEventListener("orientationchange", this.handleResize);
    this.handleResize();
  },
  mounted() {
    // let m = new p5(p, "canvasContainer");
  },
  destroyed() {
    window.removeEventListener("resize", this.handleResize);
    window.removeEventListener("scroll", this.handleScroll);
    window.removeEventListener("orientationchange", this.handleResize);
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
