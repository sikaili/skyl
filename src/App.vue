<template>
  <div id="app">
    <Index msg="Welcome to Your Vue.js App" />
    <router-view />
  </div>
</template>

<script>
import Index from "./components/Index.vue";
export default {
  name: "app",
  components: {
    Index
  }
};
</script>

<style></style>
