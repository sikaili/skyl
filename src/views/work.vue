<template>
  <MenuS v-if="$mq == `sm`" :itemsprops="items" mName="Work" />
  <MenuD v-else :itemsprops="items" mName="Work" />
</template>

<script>
import MenuS from "@/components/MenuS.vue";
import MenuD from "@/components/MenuD.vue";
import dataObj from "@/data.js";

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
