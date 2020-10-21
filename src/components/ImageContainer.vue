<template>
  <div class="ImageContainer">
    <img
      class="ImageContainer__image"
      :src="src"
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
  },
};
</script>
<style scoped lang="scss">
    .ImageContainer {
        // max-width: 500px;
        // width: auto;
        background: white;
        object-fit: contain;
        overflow: hidden;

        img {
            // min-height: 100%;
            width: 100%;
            height: auto;
            object-fit: fill;
            vertical-align: bottom;
            text-indent: 100%;
            white-space: nowrap;
            overflow: hidden;
        }
    }
</style>
