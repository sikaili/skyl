<template>
  <div>
    <h3>
      {{ title }}
    </h3>
    <p class="black-50">
      {{ caption }}
    </p>
    <p>
      {{ content }}
    </p>
  </div>
</template>

<script>
export default {
  props: {
    title: {
      type: String
    },
    caption: {
      type: String
    },
    content: {
      type: String
    }
  }
};
</script>

<style scoped>
* {
  font-family: "Helvetica Neue", sans-serif;
  line-height: 1rem;
}
</style>
