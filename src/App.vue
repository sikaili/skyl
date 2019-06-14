<template>
  <div id="app">
    <Head msg="Welcome to Your Vue.js App" />
    <iframe class="back" src="http://eyes.skyl.fr"></iframe>
    <div class="back"></div>
    <router-view />
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

<style></style>
