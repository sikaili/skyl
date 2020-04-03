<template>
  <div id="canvasContainer" />
</template>

<script>
import p5 from 'p5/lib/p5.min';

p5.disableFriendlyErrors = true;

let current;
let loaded = true;
console.log('here');
const changeSketch = (name) => {
  if (!loaded) {
    loaded = true;
    console.log('0');
    import("./../projects/" + name + "/" + name+ ".js").then(module => { //eslint-disable-line
    current = new p5(module.default, 'canvasContainer'); //eslint-disable-line
    });
  }
};
export default {
  name: 'Canvas',
  props: {
    current: { type: String, default: '' },
  },
  beforeMount() {
    loaded = false;
    changeSketch(this.current);
    loaded = true;
  },
  beforeDestroy() {
    if (current) {
      current.stop();
    }
  },
  destroyed() {
    current = undefined;
  },
};
</script>

<style scoped>
#canvasContainer {
  z-index: -999;
}
</style>
