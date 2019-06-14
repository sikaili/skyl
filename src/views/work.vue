<template>
  <div>
    <div class="fl w-40 bg-black-50">
      <h1 class="ph5 f3 white tr">Applications:</h1>
    </div>
    <div class="fl w-20 bg-white-80">
      <div class="flex flex-column justify-center">
        <div v-for="work in works" :key="work.id" class="pa3 tc">
          <a
            @mousemove="work.show = true"
            @mouseout="work.show = false"
            :href="work.link"
            class="link ma0 pa0 bw0"
          >
            <dl class="mt2 f6 lh-copy">
              <dt class="clip">Title</dt>
              <dd class="ml0 black truncate w-100">{{ work.name }}</dd>
            </dl>
          </a>
        </div>
      </div>
    </div>
    <div class="fl w-40 bg-white-80">
      <div>
        <div v-for="w in works" :key="w.id * 100 + 100" v-show="w.show">
          <div class="fl w-100 w-100-ns tl">
            <div class="pa4">
              <span class="f4 f1-ns b dib pr3">{{ w.name }}</span>
              <b class="dib bg-blue">2018</b>
              <blockquote class="ph0 pb2 mb3 bb mh0 mt0">
                <p class="lh-copy measure f6">
                  {{ w.name }}
                  <i></i>
                </p>
              </blockquote>
              <div class="w-100 overflow-auto">
                <code class="f6 db lh-copy nowrap">eyes.skyl.fr</code>
              </div>
              <img :src="w.img" :alt="w.name" class="w-100 dim" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
const arr = [
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
];
export default {
  name: "work",
  props: {},
  data() {
    return {
      works: arr
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
