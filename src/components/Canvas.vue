//eslint-disable-file
<template>
  <div id="canvasContainer" />
</template>

<script>
import p5 from 'p5/lib/p5.min';

let current;
const changeSketch = (name) => {
  import(`./../projects/${name}/${name}.js`).then(module => { //eslint-disable-line
    current = new p5(module.default, 'canvasContainer'); //eslint-disable-line
  });
};

export default {
  name: 'Canvas',
  props: {
    current: { type: String, default: '' },
  },
  data() {
    return {
      loaded: null,
    };
  },
  created() {
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
  },
};
</script>

<style scoped>
#canvasContainer {
  z-index: -999;
}
</style>
