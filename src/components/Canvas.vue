<template>
  <div id="canvasContainer"></div>
</template>

<script>
export default {
  name: "Canvas",
  data() {
    return {
      started: false,
      sketch: null
    };
  },
  created() {
    (async () => {
      await import("@/projects/virus/scripts/index.js");
    })();
  },
  destroyed() {}
};
</script>

<style scoped>
#canvasContainer {
  z-index: -999;
}
</style>
