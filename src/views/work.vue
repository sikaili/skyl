<template>
  <div class="flex flex-wrap justify-content-start">
    <!-- <div v-for="drawing in drawings" :key="drawing.id"> -->
    <div v-for="work in works" :key="work.id" class="w-50 pa0 ma0">
      <a :href="work.link" class="link ma0 pa0 bw0">
        <!-- <img :src="work.img" :alt="work.name" class="w-100 dim ba black">
        <dl class="mt2 f6 lh-copy">
          <dt class="clip">Title</dt>
          <dd class="ml0 black truncate w-100">{{ work.name }}</dd>
        </dl>-->
        <img class="bw0" :src="work.img">
      </a>
    </div>
  </div>
</template>

<script>
export default {
  name: "work",
  data() {
    return {
      works: [
        {
          name: "Eyes",
          link: "http://eyes.skyl.fr",
          img: require("@/assets/eyes.png"),
          id: 0
        },
        {
          name: "Unsustainable",
          link: "http://unsustainable.skyl.fr",
          img: require("@/assets/unsustainable.png"),
          id: 1
        },
        {
          name: "Unsustainable",
          link: "http://unsustainable.skyl.fr",
          img: require("@/assets/unsustainable.png"),
          id: 2
        },
        {
          name: "Unsustainable",
          link: "http://unsustainable.skyl.fr",
          img: require("@/assets/unsustainable.png"),
          id: 3
        },
        {
          name: "Unsustainable",
          link: "http://unsustainable.skyl.fr",
          img: require("@/assets/unsustainable.png"),
          id: 4
        },
        {
          name: "Unsustainable",
          link: "http://unsustainable.skyl.fr",
          img: require("@/assets/unsustainable.png"),
          id: 5
        }
      ]
    };
  },
  computed: {}
};
</script>

<style></style>
