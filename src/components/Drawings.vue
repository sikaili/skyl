<template>
  <div>
    <VueGallery :images="images" :index="index" @close="index = null" />
    <div class="bt bb b--black-20 cl">
      <div
        v-for="(drawing, imgIndex) in drawings"
        :key="imgIndex"
        class="center w-30 pa3 cl"
        :class="$mq == `sm` ? `w-100` : `w-40`"
      >
        <a @click="index = imgIndex" class="mt3 db link tc o-90">
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
  </div>
</template>

<script>
import VueGallery from "vue-gallery";
export default {
  props: {
    drawings: {
      type: Array,
      required: true
    }
  },
  data: function() {
    return {
      index: null
    };
  },
  components: {
    VueGallery
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
  max-width: 95%;
  opacity: 0.9;
  max-height: 95%;
}
</style>
