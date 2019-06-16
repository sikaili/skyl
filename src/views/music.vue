<template>
  <Menu :works="arrr" mName="Music" />
</template>

<script>
import Menu from "@/components/Menu.vue";
import obj from "@/data.js";
export default {
  name: "music",
  components: {
    Menu
  },
  data() {
    return {
      arrr: obj.musicArray
    };
  }
};
</script>

<style></style>
