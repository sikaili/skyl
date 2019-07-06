<template>
  <div>
    <VueGallery :images="images" :index="index" @close="index = null" />
    <br />

    <div @click="grid = !grid" class="mt4 fixed f2" style="z-index:1000;">
      <span
        class="pv2 ph3 no-underline white bg-black-50 bg-animate hover-bg-white hover-black inline-flex items-center border-box"
      >
        <i v-if="grid == false" class="icon ion-md-apps"></i>
        <i v-else class="icon ion-md-menu"></i>
      </span>
    </div>
    <div
      v-if="grid == true"
      class="mt3 center b--black-20 flex flex-wrap items-start"
      :class="$mq == `sm` ? `w-100` : `w-80`"
    >
      <div
        v-for="(drawing, imgIndex) in drawings"
        :key="imgIndex"
        class="w-third white-50"
      >
        <a @click="index = imgIndex" class="mt3 db link tc o-90">
          <img
            :src="drawing.link"
            :alt="drawing.name"
            class="db dim bw0 ba bw5 black-50 border-box"
          />
          <dl class="mt2 f6 lh-copy">
            <dt class="clip">Title</dt>
            <dd class="ml0 black truncate w-100">{{ drawing.name }}</dd>
          </dl>
        </a>
      </div>
    </div>
    <div v-else class="b--black-20 cl">
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
      grid: false,
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
