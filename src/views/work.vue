<template>
  <div class="flex flex-column">
    <Menu :works="arrr" mName="Applications" />
  </div>
</template>

<script>
import Menu from "@/components/Menu.vue";
export default {
  name: "work",
  components: {
    Menu
  },
  data() {
    return {
      arrr: [
        {
          name: "Eyes",
          link: "http://eyes.skyl.fr",
          img: require("@/assets/eyes.png"),
          id: 0,
          show: false
        },
        {
          name: "Unsustainable",
          link: "http://unsustainable.skyl.fr",
          img: require("@/assets/eyes.png"),
          id: 1,
          show: false
        },
        {
          name: "Where's Jane",
          link: "http://unsustainable.skyl.fr",
          img: require("@/assets/eyes.png"),
          id: 2,
          show: false
        },
        {
          name: "Noisy Lines",
          link: "http://unsustainable.skyl.fr",
          img: require("@/assets/eyes.png"),
          id: 3,
          show: false
        },
        {
          name: "Forces",
          link: "http://forces.skyl.fr",
          img: require("@/assets/eyes.png"),
          id: 4,
          show: false
        }
      ],
      arr1: [
        {
          name: "Eyes",
          link: "http://eyes.skyl.fr",
          img: require("@/assets/eyes.png"),
          id: 0,
          show: false
        },
        {
          name: "Unsustainable",
          link: "http://unsustainable.skyl.fr",
          img: require("@/assets/eyes.png"),
          id: 1,
          show: false
        },
        {
          name: "Where's Jane",
          link: "http://unsustainable.skyl.fr",
          img: require("@/assets/eyes.png"),
          id: 2,
          show: false
        },
        {
          name: "Noisy Lines",
          link: "http://unsustainable.skyl.fr",
          img: require("@/assets/eyes.png"),
          id: 3,
          show: false
        },
        {
          name: "Forces",
          link: "http://forces.skyl.fr",
          img: require("@/assets/eyes.png"),
          id: 4,
          show: false
        }
      ]
    };
  }
};
</script>

<style></style>
