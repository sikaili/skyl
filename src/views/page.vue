<template>
  <div>
    <h1 class="tc">{{ array[$route.params.id].name }}</h1>
    <p></p>
  </div>
</template>

<script>
import obj from "@/data.js";
export default {
  name: "page",
  data() {
    return {
      array: obj.musicArray
    };
  }
};
</script>

<style></style>
