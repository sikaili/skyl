<template>
  <Menu :itemsprops="arrr" mName="Music" />
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
      arrr: obj.music
    };
  }
};
</script>

<style></style>
