<template functional>
  <table
    class="f6 w-100 mw8 center"
    cellspacing
  >
    <tbody class="lh-copy">
      <tr
        v-for="(cate, i) in props.categories"
        :key="i"
      >
        <td class="pv3 pr3 bb b--black-20">
          {{ cate }}
        </td>
        <td class="b pv3 pr3 bb b--black-20">
          {{ props.content[i] }}
        </td>
      </tr>
    </tbody>
  </table>
</template>

<style scoped>
    * {
        font-family: "Helvetica Neue", sans-serif;
    }
</style>
