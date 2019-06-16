<template>
  <div id="app">
    <Head msg="Welcome to Your Vue.js App" />
    <iframe class="back" src="http://ocean.skylstudio.com"></iframe>
    <div class="back"></div>
    <transition name="slide-fade1">
      <router-view />
    </transition>
  </div>
</template>

<script>
import Head from "./components/Head.vue";
export default {
  name: "app",
  components: {
    Head
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
