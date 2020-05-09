<template>
  <MenuSmall
    v-if="$mq === `sm`"
    type="Work"
  />
  <MenuIpad
    v-else-if="$mq === `md` || ipad"
    type="Work"
  />
  <MenuDesktop
    v-else
    type="Work"
  />
</template>

<script>
import MenuSmall from '@/components/menu/MenuSmall.vue';
import MenuDesktop from '@/components/menu/MenuDesktop.vue';
import MenuIpad from '@/components/menu/MenuIpad.vue';

export default {
  name: 'Work',
  components: {
    MenuSmall,
    MenuDesktop,
    MenuIpad,
  },
  computed: {
    ipad() {
      return navigator.userAgent.match(/Tablet|iPad/i);
    },
  },
};
</script>

<style></style>
