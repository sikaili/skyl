<template>
  <MenuS v-if="$mq == `sm`" :itemsprops="items" mName="Applications" />
  <MenuD v-else :itemsprops="items" mName="Applications" />
</template>

<script>
import dataObj from "@/data.js";
import MenuS from "@/components/MenuS.vue";
import MenuD from "@/components/MenuD.vue";

export default {
  name: "work",
  components: {
    MenuS,
    MenuD
  },
  data() {
    return {
      items: dataObj.work
    };
  }
};
</script>

<style></style>
