<template>
  <div id="app">
    <Head msg="Hello, I'm Sikai." />
    <iframe
      id="iframe"
      class="back bw0"
      scrolling="no"
      scroll="no"
      :src="link"
      :style="getWidth"
    ></iframe>
    <transition name="slide-fade1">
      <router-view />
    </transition>
  </div>
</template>

<script>
document.ontouchmove = function(e) {
  console.log(e);
  return true;
};
// document.getElementById("iframe").addEventListener(
//   "ontouchmove",
//   function(e) {
//     e.preventDefault();
//   },
//   {
//     passive: false
//   }
// );
// document.getElementById("iframe").ontouchmove = function(d) {
//   d.preventDefault();
// };

import Head from "./components/Head.vue";
export default {
  name: "app",
  mounted() {
    this.$root.$on("itemDesOpen", a => {
      // a is link
      a.split(":")[0] == `http`
        ? (this.link = a)
        : (this.link = this.linkDefault);

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
      linkDefault: "http://eyes.skyl.fr",
      link: `http://eyes.skyl.fr`,
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
      return `width:${this.$mq == "sm" ? screen.width : this.width}px;
      height:${this.height}px;
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
