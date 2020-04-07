<template>
  <div>
    <li @click="show = !show">
      {{ item }}
    </li>
    <ul v-if="children && show">
      <li
        v-for="child in children"
        :key="child"
      >
        {{ child }}
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  props: {
    item: {
      type: String,
    },
    children: { type: Array },
  },
  data() {
    return {
      show: true,
    };
  },
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
