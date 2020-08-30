<template>
  <div class="List">
    <li @click="show = !show">
      {{ item }}
    </li>
    <ul
      v-if="children && show"
      class="List__secondLevel"
    >
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
  name: 'BaseList',
  props: {
    item: {
      type: String,
      default: '',
    },
    children: {
      type: Array,
      default: () => [],
    },
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
        font-display: swap;
    }

    ul li {
        padding: 0.5rem 0;
    }
</style>
