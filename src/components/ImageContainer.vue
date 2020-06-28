<template>
  <div class="ImageContainer">
    <img
      class="ImageContainer__image"
      :src="src"
      :style="{height : height + 'px'}"
    >
  </div>
</template>

<script>
export default {
  name: 'ImageContainer',
  props: {
    src: {
      type: String,
      default: '',
    },
    height: {
      type: Number,
      default: 300,
    },
  },
};
</script>
<style scoped lang="scss">
    .ImageContainer {
        max-width: 500px;
        width: auto;
        background: white;
        object-fit: contain;
        overflow: hidden;

        img {
            min-height: 100%;
            min-width: 100%;
            object-fit: fill;
            vertical-align: bottom;
            text-indent: 100%;
            white-space: nowrap;
            overflow: hidden;
        }
    }
</style>
