<template>
  <div id="app">
    <Head msg="Welcome to Your Vue.js App"/>
    <iframe class="back" :src="link"></iframe>
    <div class="back"></div>
    <transition name="slide-fade1">
      <router-view/>
    </transition>
  </div>
</template>

<script>
import Head from "./components/Head.vue";
export default {
  name: "app",
  mounted() {
    this.$root.$on("itemDesOpen", a => {
      // a is link
      // a.split(":")[0] == `http`
      //   ? (this.link = a)
      //   : (this.link = this.linkDefault);
      // a is name
      a ? (this.link = `/${a}/index.html`) : "";
    });
  },
  components: {
    Head
  },
  data() {
    return {
      item: "eyes",
      linkDefault: "http://eyes.skyl.fr",
      link: `/eyes/index.html`
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
