<template>
  <div class="flex flex-wrap justify-content-start">
    <h1 class="fl ph3 f3 tl">Applications</h1>
    <div class="flex flex-row">
      <div v-for="work in works" :key="work.id" class="w-20 pa3 tc">
        <a
          @mousemove="work.show = true"
          @mouseout="work.show = false"
          :href="work.link"
          class="link ma0 pa0 bw0"
        >
          <img :src="work.img" :alt="work.name" class="w-100 dim" />
          <dl class="mt2 f6 lh-copy">
            <dt class="clip">Title</dt>
            <dd class="ml0 black truncate w-100">{{ work.name }}</dd>
          </dl>
        </a>
      </div>
    </div>
    <div>
      <div v-for="w in works" :key="w.id * 100 + 100" v-show="w.show">
        <div
          class="fl w-100 w-100-ns tl"
          style="color:#000000;background-color:#ffffff"
        >
          <div class="pa4">
            <span class="f4 f1-ns b dib pr3">{{ w.name }}</span>
            <b class="dib bg-blue">19.56</b>
            <blockquote class="ph0 pb2 mb3 bb mh0 mt0">
              <p class="lh-copy measure f6">
                {{ w.name }}
                <i></i>
              </p>
            </blockquote>
            <div class="w-100 overflow-auto">
              <code class="f6 db lh-copy nowrap"
                >.black { color: #000000 }</code
              >
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "work",
  props: {},
  data() {
    return {
      works: [
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
          name: "Unsustainable",
          link: "http://unsustainable.skyl.fr",
          img: require("@/assets/eyes.png"),
          id: 4,
          show: false
        }
      ]
    };
  },
  methods: {},
  computed: {
    url: function(id) {
      return `"@/assets/s${id}.png`;
    }
  }
};
</script>

<style></style>
