<template>
  <!-- <Menu :itemsprops="items" mName="Music" /> -->
  <MenuS v-if="$mq == `sm`" :itemsprops="items" mName="Music" />
  <MenuD v-else :itemsprops="items" mName="Music" />
</template>

<script>
import MenuS from "@/components/MenuS.vue";
import MenuD from "@/components/MenuD.vue";

import dataObj from "@/data.js";
export default {
  name: "music",
  components: {
    MenuS,
    MenuD
  },
  data() {
    return {
      items: dataObj.music
    };
  }
};
</script>

<style></style>
