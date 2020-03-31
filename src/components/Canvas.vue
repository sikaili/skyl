<template>
  <div id="canvasContainer"></div>
</template>

<script>
import p5 from "p5";
let current;
const changeSketch = name => {
  import("./../projects/" + name + "/" + name + ".js").then(module => {
    current = new p5(module.default, 'canvasContainer'); //eslint-disable-line
  });
};
export default {
  name: "Canvas",
  props: {
    current: null
  },
  data() {
    return {
      loaded: null
    };
  },
  mounted() {
    this.$nextTick(() => {
      if (this.current && this.current !== this.loaded) {
        p5.disableFriendlyErrors = true;
        changeSketch(this.current);
        this.loaded = this.current;
      }
    });
  },
  beforeDestroy() {
    if (current) {
      current.stop();
      this.loaded = null;
    }
  },
  destroyed() {
    current = null;
  }
};
</script>

<style scoped>
#canvasContainer {
  z-index: -999;
}
</style>
