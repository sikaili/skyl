<template>
  <SideMenu v-show="showSideMenu" />
</template>

<script>
import SideMenu from '@/components/SideMenu.vue';

export default {
  name: 'Play',
  components: {
    SideMenu,
  },
  data() {
    return {
      showSideMenu: true,
    };
  },
  mounted() {
    this.$root.$on('emit-showSideMenu', (show) => {
      this.showSideMenu = show;
    });
  },
  beforeDestroy() {
    this.$root.$off('emit-showSideMenu');
  },
};
</script>

<style scoped>
    a:hover {
        background-color: black;
    }
</style>
