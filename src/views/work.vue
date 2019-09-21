<template>
  <MenuSmall v-if="$mq == `sm`" mName="Work" />
  <MenuIpad v-else-if="$mq == `md` || ipad" mName="Work" />
  <MenuDesktop v-else mName="Work" />
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
  },
  computed: {
    ipad() {
      return navigator.userAgent.match(/Tablet|iPad/i);
    }
  }
};
</script>

<style></style>
