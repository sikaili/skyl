<template>
  <MenuSmall
    v-if="$mq === `sm`"
    type="Music"
  />
  <MenuIpad
    v-else-if="$mq === `md` || ipad"
    type="Music"
  />
  <MenuDesktop
    v-else
    type="Music"
  />
</template>

<script>
import MenuSmall from '@/components/MenuSmall.vue';
import MenuDesktop from '@/components/MenuDesktop.vue';
import MenuIpad from '@/components/MenuIpad.vue';

export default {
  name: 'Music',
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
