<template>
  <div>
    <li>
      {{ item }}
    </li>
    <ul v-if="children">
      <li v-for="child in children" :key="child">{{ child }}</li>
    </ul>
  </div>
</template>

<script>
export default {
  props: {
    item: {
      type: String
    },
    children: { type: Array }
  }
};
</script>

<style scoped>
* {
  font-family: "Helvetica Neue", sans-serif;
}

ul li {
  padding: 0.5rem 0;
}
</style>
