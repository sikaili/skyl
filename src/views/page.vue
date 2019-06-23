<template>
  <div>
    <h1 class="tc">{{ item.name }}</h1>
    <p></p>

    <img :src="require('@/assets/2.png')" class="back iframe idiv" />
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
      console.log(arr[this.id]);

      return arr[this.id];
    }
  }
};
</script>

<style>
.iframe {
  height: 100%;
  width: 100%;
}

.idiv {
  position: absolute;
  top: 5rem;
  left: 0px;
  right: 0px;
  bottom: 0px;
}
</style>
