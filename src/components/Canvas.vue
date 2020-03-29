<template>
  <div id="canvasContainer"></div>
</template>

<script>
import * as p5 from "p5";

export default {
  name: "Canvas",
  props: {
    current: null
  },
  data() {
    return {
      started: false,
      canvas: null
    };
  },
  mounted() {
    p5.disableFriendlyErrors = true;
    this.canvas = new p5(this.current, 'canvasContainer'); //eslint-disable-line
  },
  destroyed() {
    this.canvas.stop();
  }
};
</script>

<style scoped>
#canvasContainer {
  z-index: -999;
}
</style>
