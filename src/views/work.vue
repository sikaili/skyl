<template>
  <Menu :itemsprops="items" mName="Applications" />
</template>

<script>
import dataObj from "@/data.js";
import Menu from "@/components/Menu.vue";
export default {
  name: "work",
  components: {
    Menu
  },
  data() {
    return {
      items: dataObj.work
    };
  }
};
</script>

<style></style>
