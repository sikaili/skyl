<template>
  <table class="f6 w-100 mw8 center" cellspacing>
    <tbody class="lh-copy">
      <tr v-for="(cate, i) in categories" :key="i">
        <td class="pv3 pr3 bb b--black-20">{{ cate }}</td>
        <td class="b pv3 pr3 bb b--black-20">{{ content[i] }}</td>
      </tr>
    </tbody>
  </table>
</template>

<script>
export default {
  props: {
    categories: {
      type: Array
    },
    content: {
      type: Array
    }
  }
};
</script>

<style scoped>
* {
  font-family: "Helvetica Neue", sans-serif;
}
</style>
