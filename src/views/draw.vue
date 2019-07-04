<template>
  <Drawings :drawings="drawings" />
</template>

<script>
import Drawings from "@/components/Drawings.vue";
export default {
  name: "draw",
  components: {
    Drawings
  },
  data() {
    return {
      drawings: [
        {
          name: "a dream",
          link: require("@/assets/drawings/1.jpg"),
          id: 0
        },
        {
          name: "Leg",
          link: require("@/assets/drawings/6.jpg"),
          id: 1
        },
        {
          name: "supermarket",
          link: require("@/assets/drawings/2.jpg"),
          id: 2
        },
        {
          name: "twist",
          link: require("@/assets/drawings/5.jpg"),
          id: 3
        },
        {
          name: "mushroom",
          link: require("@/assets/drawings/4.jpg"),
          id: 4
        }
      ]
    };
  }
};
</script>

<style></style>
