<template>
  <div>
    <!-- <SideMenu /> -->
    <Drawings :drawings="drawings" />
  </div>
</template>

<script>
import Drawings from "@/components/Drawings.vue";
import SideMenu from "@/components/SideMenu.vue";

export default {
  name: "draw",
  components: {
    Drawings,
    SideMenu
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
          name: "up",
          link: require("@/assets/drawings/9.jpg")
        },
        {
          name: "no escape",
          link: require("@/assets/drawings/7.jpg")
        },
        {
          name: "stone",
          link: require("@/assets/drawings/8.jpg")
        }
      ]
    };
  }
};
</script>

<style></style>
