<template>
  <div id="app">
    <Head msg="Hello, I'm Sikai." />
    <!-- <div class="flex items-center justify-center w-100">
      <iframe class="back bw0 w-100" :src="link"></iframe>
    </div> -->

    <transition name="slide-fade1">
      <router-view />
    </transition>
    <!-- <div class="back popover-body"> -->
    <div id="iframe">
      <iframe class="back w-100" :src="link"></iframe>
    </div>
    <!-- </div> -->
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
      a.split(":")[0] == `http`
        ? (this.link = a)
        : (this.link = this.linkDefault);

      // a is name
      // a ? (this.link = `/${a}/index.html`) : "";
    });
  },
  components: {
    Head
  },
  data() {
    return {
      item: "eyes",
      linkDefault: "http://eyes.skyl.fr",
      link: `http://eyes.skyl.fr`
    };
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
