<template>
  <div id="app">
    <Head msg="Welcome to Your Vue.js App" />
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
