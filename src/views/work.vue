<template>
  <Menu :works="works" mName="Applications" />
</template>

<script>
import obj from "@/data.js";
import Menu from "@/components/Menu.vue";
export default {
  name: "work",
  components: {
    Menu
  },
  data() {
    return {
      works: obj.worksArray
    };
  }
};
</script>

<style></style>
