<template>
  <div id="app">
    <Head msg="Hello, I'm Sikai." />
    <div class="back bw0" :style="getWidth">
      <iframe
        class="back bw0"
        scrolling="no"
        scroll="no"
        :src="link"
        :style="getWidth2"
      ></iframe>
    </div>
    <transition name="slide-fade1">
      <router-view />
    </transition>
    <footer
      class="fixed tc pv1 white-50"
      style="position: fixed;
    /* center the element */
    right: 0;
    left: 0;
    bottom:0;
    margin-right: auto;
    margin-left: auto;
    /* give it dimensions */
    min-height: 1em;
    width: 100%;"
    >
      <small class="f7 db tc"
        >© 2019 <b class="dib ph2 link light-gray dim ttu">sikai li</b> All
        Rights Reserved</small
      >
    </footer>
  </div>
</template>

<script>
document.ontouchmove = function(e) {
  console.log(e);
  return true;
};

import Head from "./components/Head.vue";
export default {
  name: "app",
  mounted() {
    this.$root.$on("itemDesOpen", a => {
      // a is link
      a.split(":")[0] == `https`
        ? (this.link = a)
        : (this.link = this.linkDefault);

      // a is name
      // a ? (this.link = `/${a}/index.html`) : "";
    });
    this.$root.$on("selected", a => {
      // a is link
      a.split(":")[0] == `https`
        ? (this.link = a)
        : (this.link = this.linkDefault);
      // this.link = a;
      // a is name
      // a ? (this.link = `/${a}/index.html`) : "";
    });
  },
  created() {
    window.addEventListener("resize", this.handleResize);
    this.handleResize();
  },
  destroyed() {
    window.removeEventListener("resize", this.handleResize);
  },
  components: {
    Head
  },
  data() {
    return {
      item: "eyes",
      linkDefault: "https://eyes.skyl.fr",
      link: `https://eyes.skyl.fr`,
      width: 0,
      height: 0
    };
  },
  methods: {
    handleResize() {
      this.width = window.innerWidth;
      this.height = window.innerHeight;
    }
  },
  computed: {
    getWidth: function() {
      const scale = 1;
      return `width:${this.$mq == "sm" ? screen.width * scale : this.width}px;
      height:${this.height * scale}px;
      opacity:${this.$route.path.includes("info") ? 1 : "1"};
      -moz-transform: scale(${1 / scale});
      -moz-transform-origin: 0 0;
      -o-transform: scale(${1 / scale});
      -o-transform-origin: 0 0;
      -webkit-transform: scale(${1 / scale});
      -webkit-transform-origin: 0 0;
      `;
    },
    getWidth2: function() {
      let scale = 1;
      const inInfo = this.$route.path.includes("info");
      inInfo && this.$mq == "sm" ? (scale = 2) : (scale = 1);
      return `width:${
        this.$mq == "sm" ? screen.width * scale : this.width * scale
      }px;
      height:${this.height * scale}px;
      opacity:${inInfo ? 1 : 0.5};
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
