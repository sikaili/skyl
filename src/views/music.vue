<template>
  <!-- <Menu :itemsprops="items" mName="Music" /> -->
  <MenuSmall v-if="$mq == `sm`" :itemsprops="items" mName="Music" />
  <MenuDesktop v-else :itemsprops="items" mName="Music" />
</template>

<script>
import MenuSmall from "@/components/MenuSmall.vue";
import MenuDesktop from "@/components/MenuDesktop.vue";
import dataObj from "@/data.js";
export default {
  name: "music",
  components: {
    MenuSmall,
    MenuDesktop
  },
  data() {
    return {
      items: dataObj.music
    };
  }
};
</script>

<style></style>
