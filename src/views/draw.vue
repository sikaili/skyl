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
          link: require("@/assets/drawings/1.jpg")
        },
        {
          name: "Leg",
          link: require("@/assets/drawings/6.jpg")
        },
        {
          name: "supermarket",
          link: require("@/assets/drawings/2.jpg")
        },
        {
          name: "twist",
          link: require("@/assets/drawings/5.jpg")
        },
        {
          name: "mushroom",
          link: require("@/assets/drawings/4.jpg")
        },
        {
          name: "down",
          link: require("@/assets/drawings/8.jpg")
        },
        {
          name: "up",
          link: require("@/assets/drawings/9.jpg")
        },
        {
          name: "parts 01",
          link: require("@/assets/drawings/parts1.jpg")
        },
        {
          name: "no escape",
          link: require("@/assets/drawings/7.jpg")
        },
        {
          name: "parts 02",
          link: require("@/assets/drawings/parts2.jpg")
        },
        {
          name: "the witch",
          link: require("@/assets/drawings/10.jpg")
        },
        {
          name: "green",
          link: require("@/assets/drawings/lv1.jpg")
        },
        {
          name: "the witch 02",
          link: require("@/assets/drawings/11.jpg")
        },
        {
          name: "green 02",
          link: require("@/assets/drawings/lv2.jpg")
        }
        // {
        //   name: "cell",
        //   link: require("@/assets/drawings/cell.jpg")
        // }
        // {
        //   name: "cell",
        //   link: require("@/assets/drawings/up.jpg")
        // },
        // {
        //   name: "cell",
        //   link: require("@/assets/drawings/up1.jpg")
        // }
      ]
    };
  }
};
</script>

<style></style>
