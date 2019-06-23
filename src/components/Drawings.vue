<template>
  <div>
    <gallery :images="images" :index="index" @close="index = null"></gallery>
    <div class="bg-black-30 bt bb b--black-20 cl">
      <div
        v-for="(drawing, imgIndex) in drawings"
        :key="drawing.id"
        class="center w-30 pa3 cl"
        :class="$mq == `sm` ? `w-100` : `w30`"
      >
        <a @click="index = imgIndex" class="mt3 db link tc o-80">
          <img
            :src="drawing.link"
            alt="Frank Ocean Blonde Album Cover"
            class="w-100 db dim ba bw5 white-50 border-box"
          >
          <dl class="mt2 f6 lh-copy">
            <dt class="clip">Title</dt>
            <dd class="ml0 black truncate w-100">{{ drawing.name }}</dd>
          </dl>
        </a>
      </div>
    </div>
  </div>
</template>

<script>
import VueGallery from "vue-gallery";

export default {
  data: function() {
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
      ],
      index: null
    };
  },
  components: {
    gallery: VueGallery
  },
  computed: {
    images: function() {
      return this.drawings.map(a => a.link);
    }
  }
};
</script>

<style>
.blueimp-gallery > .slides > .slide > .slide-content {
  margin: auto;
  border: solid rgba(255, 255, 255, 0.3) 30px;
  /* height: auto; */
  max-width: 60%;
  opacity: 0.9;
  max-height: 70%;
}
</style>
