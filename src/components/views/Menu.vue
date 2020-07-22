<template>
  <MenuSmall
    v-if="$mq === `sm`"
    :type="$route.name"
  />
  <MenuDesktop
    v-else
    :type="$route.name"
  />
</template>

<script>
import MenuSmall from '@/components/menu/MenuSmall.vue';
import MenuDesktop from '@/components/menu/MenuDesktop.vue';

export default {
  name: 'Menu',
  components: {
    MenuSmall,
    MenuDesktop,
  },
  computed: {
    ipad() {
      return navigator.userAgent.match(/Tablet|iPad/i);
    },
  },
};
</script>

<style></style>
