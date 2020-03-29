<template>
  <div id="canvasContainer"></div>
</template>

<script>
import virus from "@/projects/virus/scripts/virus.js";
import { main as eyes } from "@/projects/eyes";
import * as p5 from "p5";

export default {
  name: "Canvas",
  data() {
    return {
      started: false,
      sketch: null,
      canvas: null
    };
  },
  mounted() {
    p5.disableFriendlyErrors = true;
    this.canvas = new p5(eyes, 'canvasContainer'); //eslint-disable-line
  },
  destroyed() {
    this.canvas.stop();
    this.canvas = null;
  }
};
</script>

<style scoped>
#canvasContainer {
  z-index: -999;
}
</style>
