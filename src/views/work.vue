<template>
  <MenuSmall v-if="$mq == `sm`" :itemsprops="items" mName="Work" />
  <MenuIpad v-else-if="$mq == `md`" :itemsprops="items" mName="Work" />
  <MenuDesktop v-else :itemsprops="items" mName="Work" />
</template>

<script>
import MenuSmall from "@/components/MenuSmall.vue";
import MenuDesktop from "@/components/MenuDesktop.vue";
import MenuIpad from "@/components/MenuIpad.vue";
import { mapGetters } from "vuex";
export default {
  name: "work",
  components: {
    MenuSmall,
    MenuDesktop,
    MenuIpad
  },
  computed: {
    ...mapGetters({
      items: "workItems"
    })
  }
};
</script>

<style></style>
