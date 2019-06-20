<template>
  <Menu :itemsprops="items" mName="Music" />
</template>

<script>
import Menu from "@/components/Menu.vue";
import dataObj from "@/data.js";
export default {
  name: "music",
  components: {
    Menu
  },
  data() {
    return {
      items: dataObj.music
    };
  }
};
</script>

<style></style>
