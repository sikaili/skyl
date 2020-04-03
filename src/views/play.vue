<template>
  <SideMenu />
</template>

<script>
import SideMenu from '@/components/SideMenu.vue';

export default {
  name: 'Play',
  components: {
    SideMenu,
  },
  data() {
    return {};
  },
};
</script>

<style scoped>
a:hover {
  background-color: black;
}
</style>
