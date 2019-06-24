<template>
  <div id="app">
    <Head msg="Hello, I'm Sikai." />
    <iframe
      class="back vh-100 bw0 w-100"
      :src="link"
      :style="getWidth"
    ></iframe>
    <transition name="slide-fade1">
      <router-view />
    </transition>
    <!-- <div class="back popover-body"> -->
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
  },
  computed: {
    getWidth: function() {
      return `width:${window.innerWidth}`;
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
