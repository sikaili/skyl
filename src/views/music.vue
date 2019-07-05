<template>
  <!-- <Menu :itemsprops="items" mName="Music" /> -->
  <MenuSmall v-if="$mq == `sm`" :itemsprops="items" mName="Music" />
  <MenuIpad v-else-if="$mq == `md`" :itemsprops="items" mName="Music" />

  <MenuDesktop v-else :itemsprops="items" mName="Music" />
</template>

<script>
import MenuSmall from "@/components/MenuSmall.vue";
import MenuDesktop from "@/components/MenuDesktop.vue";
import MenuIpad from "@/components/MenuIpad.vue";

import dataObj from "@/data.js";
export default {
  name: "music",
  components: {
    MenuSmall,
    MenuDesktop,
    MenuIpad
  },
  data() {
    return {
      items: dataObj.music
    };
  }
};
</script>

<style></style>
