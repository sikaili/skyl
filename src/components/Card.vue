<template>
  <div @click="open" class="card pa3 mh3 bg-white-30 border-box">
    <img :src="img" />
    <p>{{ caption }}</p>
    <span class="tc w4 f6 dim link ba bw2 ph2 pv1 mt3 dib black"
      >Read more..</span
    >
  </div>
</template>

<script>
export default {
  props: {
    link: {
      type: String
    },
    caption: {
      type: String
    },
    img: {
      type: String
    }
  },
  methods: {
    open() {
      window.open(this.link);
    }
  }
};
</script>

<style scoped>
.card {
  max-width: 300px;
}
.card:hover {
  background-color: rgba(255, 255, 255, 0.7);
  transition: background-color 0.15s;
}
</style>
