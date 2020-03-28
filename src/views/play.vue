<template>
  <SideMenu />
</template>

<script>
import SideMenu from "@/components/SideMenu.vue";
export default {
  name: "play",
  data() {
    return {};
  },
  components: {
    SideMenu
  },
  mounted() {
    const id = this.$route.params.id;
    const iframeItem = this.$store.state.iframeItems.find(
      item => item.id === id
    );
    if (iframeItem) this.$store.dispatch("setActiveItem", iframeItem);
  }
};
</script>

<style scoped>
a:hover {
  background-color: black;
}
</style>
