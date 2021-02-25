/* eslint-disable */
<template>
  <div :key="$route.name">
    <VueGallery
      :images="images"
      :index="index"
      @close="index = null"
    />
    <br>
    <span
      class="ph2 pv1 no-underline white bg-black-40 bg-animate hover-bg-black-80 hover-white inline-flex items-center border-box"
      :class="$mq === `sm` ? `f4 ml3 mt0` : `fixed f2 ph3 mt4`"
      style="z-index: 1000; margin-bottom: -100px;"
      @click="grid = !grid"
    >
      <i
        v-if="grid === false"
        class="icon ion-md-apps"
      />
      <i
        v-else
        class="icon ion-md-menu"
      />
    </span>
    <div
      v-if="grid === true"
      class="mt3 center b--black-20 flex flex-wrap items-start"
      :class="$mq === `sm` ? `w-100` : `w-80`"
    >
      <div
        v-for="(drawing, imgIndex) in previews"
        :key="imgIndex"
        class="w-third white-50"
      >
        <a
          class="mt3 db link tc o-90"
          @click="index = imgIndex"
        >
          <img
            :src="drawing.link"
            :alt="drawing.name ? drawing.name : ''"
            class="db dim bw0 ba black-50 border-box"
            :class="$mq === `sm` ? `bw1` : `bw5`"
          >
          <dl
            v-if="drawing.name"
            class="mt2 f6 lh-copy"
          >
            <dt class="clip">Title</dt>
            <dd class="ml0 black truncate w-100">{{ drawing.name }}</dd>
          </dl>
        </a>
      </div>
    </div>
    <div
      v-else
      class="b--black-20 cl"
    >
      <div
        v-for="(drawing, imgIndex) in previews"
        :key="imgIndex"
        class="center w-30 pa3 cl"
        :class="$mq === `sm` ? `w-100` : `w-40`"
      >
        <a
          class="mt3 db link tc o-90"
          @click="index = imgIndex"
        >
          <img
            :src="drawing.link"
            :alt="drawing.name ? drawing.name : ''"
            class="w-100 db dim ba bw5 white-50 border-box"
          >
          <dl
            v-if="drawing.name"
            class="mt2 f6 lh-copy"
          >
            <dt class="clip">Title</dt>
            <dd class="ml0 black truncate w-100">{{ drawing.name }}</dd>
          </dl>
        </a>
      </div>
      <span
        class="fl w-100  mt5 tc pb5 pt3 f2 center no-underline black-59 bg-white-50 bg-animate hover-bg-black-50 hover-white-50 border-box"
        style="z-index: 1000;"
        @click="scroll"
      >
        <i class="icon ion-md-arrow-up" />
      </span>
      <br>
      <br>
    </div>
  </div>
</template>

<script>
import VueGallery from 'vue-gallery';

export default {
  name: 'Gallery',
  components: {
    VueGallery,
  },
  data() {
    return {
      drawings: [
        {
          name: 'a dream',
          link: require('@/assets/drawings/1.jpg'),
        },
        {
          name: 'Leg',
          link: require('@/assets/drawings/6.jpg'),
        },
        {
          name: 'supermarket',
          link: require('@/assets/drawings/2.jpg'),
        },
        {
          name: 'twist',
          link: require('@/assets/drawings/5.jpg'),
        },
        {
          name: 'mushroom',
          link: require('@/assets/drawings/4.jpg'),
        },
        // {
        //   name: 'down',
        //   link: require('@/assets/drawings/8.jpg'),
        // },
        {
          name: 'up',
          link: require('@/assets/drawings/9.jpg'),
        },
        {
          name: 'parts 01',
          link: require('@/assets/drawings/parts1.jpg'),
        },
        {
          name: 'no escape',
          link: require('@/assets/drawings/7.jpg'),
        },
        {
          name: 'parts 02',
          link: require('@/assets/drawings/parts2.jpg'),
        },
        {
          name: 'the witch',
          link: require('@/assets/drawings/10.jpg'),
        },
        {
          name: 'green',
          link: require('@/assets/drawings/lv1.jpg'),
        },
        {
          name: 'the witch 02',
          link: require('@/assets/drawings/11.jpg'),
        },
        {
          name: 'green 02',
          link: require('@/assets/drawings/lv2.jpg'),
        },
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
      ],
      photos: [],
      grid: false,
      index: null,
    };
  },
  computed: {
    previews() {
      return this[this.$route.name];
    },
    images() {
      return this.previews.map((a) => a.link);
    },
  },
  created() {
    this.photos = Array(17).fill(null).map((item, index) => ({
      link: require(`@/assets/photos/_${index}.jpg`),
    }));
    console.log(JSON.stringify(this.photos));
  },
  methods: {
    scroll() {
      window.scrollTo(0, 0);
    },
  },
};
</script>

<style></style>
