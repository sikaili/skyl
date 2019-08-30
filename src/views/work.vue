<template>
  <MenuSmall v-if="$mq == `sm`" :itemsprops="items" mName="Work" />
  <MenuIpad v-else-if="$mq == `md`" :itemsprops="items" mName="Work" />
  <MenuDesktop v-else mName="work" />
</template>

<script>
import MenuSmall from "@/components/MenuSmall.vue";
import MenuDesktop from "@/components/MenuDesktop.vue";
import MenuIpad from "@/components/MenuIpad.vue";
export default {
  name: "work",
  components: {
    MenuSmall,
    MenuDesktop,
    MenuIpad
  }
};
</script>

<style></style>
