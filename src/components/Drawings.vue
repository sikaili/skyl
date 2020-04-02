<template>
  <div>
    <VueGallery :images="images" :index="index" @close="index = null" />
    <br />
    <span
      @click="grid = !grid"
      class="ph2 pv1 no-underline white bg-black-40 bg-animate hover-bg-black-80 hover-white inline-flex items-center border-box"
      :class="$mq == `sm` ? `f4 ml3 mt0` : `fixed f2 ph3 mt4`"
      style="z-index:1000;margin-bottom:-100px;"
    >
      <i v-if="grid == false" class="icon ion-md-apps"></i>
      <i v-else class="icon ion-md-menu"></i>
    </span>
    <!-- grid -->
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
            class="db dim bw0 ba black-50 border-box"
            :class="$mq == `sm` ? `bw1` : `bw5`"
          />
          <dl class="mt2 f6 lh-copy">
            <dt class="clip">Title</dt>
            <dd class="ml0 black truncate w-100">{{ drawing.name }}</dd>
          </dl>
        </a>
      </div>
    </div>
    <!-- list -->
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
            :alt="drawing.name"
            class="w-100 db dim ba bw5 white-50 border-box"
          />
          <dl class="mt2 f6 lh-copy">
            <dt class="clip">Title</dt>
            <dd class="ml0 black truncate w-100">{{ drawing.name }}</dd>
          </dl>
        </a>
      </div>
      <!-- back to 0 0 -->
      <span
        @click="scroll"
        class="fl w-100  mt5 tc pb5 pt3 f2 center no-underline black-59 bg-white-50 bg-animate hover-bg-black-50 hover-white-50 border-box"
        style="z-index:1000;"
      >
        <i class="icon ion-md-arrow-up"></i>
      </span>
      <br />
      <br />
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
  components: {
    VueGallery
  },
  data() {
    return {
      grid: false,
      index: null
    };
  },
  methods: {
    scroll() {
      window.scrollTo(0, 0);
    }
  },
  computed: {
    images() {
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
