<template>
  <div class="ma5">
    <!-- <div v-for="drawing in drawings" :key="drawing.id"> -->
    <div
      v-for="drawing in drawings"
      :key="drawing.id"
      class="fl w-50 w-25-m w-20-l pa2"
    >
      <a href class="db link tc">
        <img
          :src="drawing.link"
          alt="Frank Ocean Blonde Album Cover"
          class="w-100 db dim ba black border-box"
        />
        <dl class="mt2 f6 lh-copy">
          <dt class="clip">Title</dt>
          <dd class="ml0 black truncate w-100">{{ drawing.name }}</dd>
        </dl>
      </a>
    </div>
  </div>
</template>

<script>
export default {
  name: "Drawings",
  data() {
    return {
      drawings: [
        {
          name: "a dream",
          link: require("@/assets/1.jpg"),
          id: 0
        },
        {
          name: "supermarket",
          link: require("@/assets/2.jpg"),
          id: 1
        },
        {
          name: "twist",
          link: require("@/assets/3.jpg"),
          id: 2
        },
        {
          name: "mushroom",
          link: require("@/assets/4.jpg"),
          id: 3
        }
      ]
    };
  }
};
</script>

<style></style>
