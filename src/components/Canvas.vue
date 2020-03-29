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
    if (this.current) {
    this.canvas = new p5(this.current, 'canvasContainer'); //eslint-disable-line
      this.started = true;
    }
  },
  destroyed() {
    if (this.canvas && this.canvas.stop) {
      this.canvas.stop();
      this.canvas = null;
    }
  }
};
</script>

<style scoped>
#canvasContainer {
  z-index: -999;
}
</style>
