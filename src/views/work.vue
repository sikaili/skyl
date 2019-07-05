<template>
  <MenuSmall v-if="$mq == `sm`" :itemsprops="items" mName="Work" />
  <MenuDesktop v-else :itemsprops="items" mName="Work" />
</template>

<script>
import MenuSmall from "@/components/MenuSmall.vue";
import MenuDesktop from "@/components/MenuDesktop.vue";
import dataObj from "@/data.js";

export default {
  name: "work",
  components: {
    MenuSmall,
    MenuDesktop
  },
  data() {
    return {
      items: dataObj.work
    };
  }
};
</script>

<style></style>
