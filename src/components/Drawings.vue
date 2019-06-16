<template>
  <div class="bg-black-60 bt bb bw5 b--black-20 cl">
    <div
      v-for="drawing in drawings"
      :key="drawing.id"
      class="center w-50 pa5 cl"
    >
      <a href class="db link tc o-80">
        <img
          :src="drawing.link"
          alt="Frank Ocean Blonde Album Cover"
          class="w-100 db dim ba bw5 white-50 border-box"
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
          name: "Leg",
          link: require("@/assets/6.jpg"),
          id: 1
        },
        {
          name: "supermarket",
          link: require("@/assets/2.jpg"),
          id: 2
        },
        {
          name: "twist",
          link: require("@/assets/5.jpg"),
          id: 3
        },
        {
          name: "mushroom",
          link: require("@/assets/4.jpg"),
          id: 4
        }
      ]
    };
  }
};
</script>

<style></style>
