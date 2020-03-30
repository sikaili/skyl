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
      loaded: null,
      canvas: null
    };
  },
  mounted() {
    p5.disableFriendlyErrors = true;
    if (this.current && !this.canvas && this.loaded !== this.current) {
      this.canvas = new p5(this.current, 'canvasContainer'); //eslint-disable-line
      this.loaded = this.current;
    }
  },
  destroyed() {
    if (this.canvas && this.canvas.stop) {
      this.canvas.stop();
      this.canvas = null;
      this.loaded = null;
    }
  }
};
</script>

<style scoped>
#canvasContainer {
  z-index: -999;
}
</style>
