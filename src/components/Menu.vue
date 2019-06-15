<template>
  <div>
    <div class="cl">
      <div class="fl w-40 bg-black-50 flex flex-row justify-end">
        <h1 class="ph5 f3 white tr">Applications</h1>
        <!-- <h1 class="ph5 f3 white tr"></h1> -->
      </div>
      <div class="fl w-20 bg-white-80">
        <div class="flex flex-column justify-center">
          <a
            v-for="work in works"
            :href="work.link"
            :key="work.id"
            @mousemove="work.show = true"
            @mouseout="work.show = false"
            class="pa3 tc link"
            :class="work.show ? bwhite : ''"
          >
            <div class="link ma0 pa0 bw0">
              <dl class="mt2 f6 lh-copy">
                <dt class="clip"></dt>
                <dd class="f4 ml0 black truncate w-100">{{ work.name }}</dd>
              </dl>
            </div>
          </a>
        </div>
      </div>
      <div class="fl w-40 bg-white">
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
  </div>
</template>

<script>
export default {
  name: "Menu",
  props: {
    works: {
      type: Array,
      required: true
    }
  },
  data() {
    return {
      bwhite: "bg-white"
    };
  }
};
</script>
