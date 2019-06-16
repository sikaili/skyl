<template>
  <div>
    <h1 class="tc">{{ item.name }}</h1>
    <p></p>
  </div>
</template>

<script>
import obj from "@/data.js";
export default {
  name: "page",
  data() {
    return {
      obj: obj,
      id: this.$route.params.id
    };
  },
  computed: {
    item: function() {
      const arr = this.obj[this.$route.path.split("/")[1]];
      if (this.id > arr.length) {
        return "ERROR!";
      }
      return arr[this.id];
    }
  }
};
</script>

<style></style>
