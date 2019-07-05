<template>
  <MenuSmall v-if="$mq == `sm`" :itemsprops="items" mName="Work" />
  <MenuIpad v-else-if="$mq == `md`" :itemsprops="items" mName="Work" />
  <MenuDesktop v-else :itemsprops="items" mName="Work" />
</template>

<script>
import MenuSmall from "@/components/MenuSmall.vue";
import MenuDesktop from "@/components/MenuDesktop.vue";
import MenuIpad from "@/components/MenuIpad.vue";

import dataObj from "@/data.js";

export default {
  name: "work",
  components: {
    MenuSmall,
    MenuDesktop,
    MenuIpad
  },
  data() {
    return {
      items: dataObj.work
    };
  }
};
</script>

<style></style>
