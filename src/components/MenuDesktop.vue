<template>
  <div class="cl">
    <intro />
    <div
      @click="menuShow = !menuShow"
      class="fl bg-black-50 w-40 flex justify-end"
    >
      <h1 class="ph5 f3 white tr">{{ mName }}</h1>
    </div>
    <div v-if="menuShow" class="fl w-20 bg-white-80">
      <div class="flex flex-column justify-center">
        <a
          href="#"
          @click="handleClick(item)"
          v-for="(item, n) in items"
          :key="item.id + n"
          class="pa1 tc link"
          :class="item.show ? 'router-link-active' : ''"
        >
          <div class="link ma0 pa0 bw0">
            <dl class="mt2 f6 lh-copy">
              <dt class="clip"></dt>
              <dd
                class="relative f4 ml0 black truncate w-100 ph2"
                style="overflow: hidden; white-space: nowrap;"
              >
                {{ item.name }}
                <i
                  :class="
                    `absolute right-0 mr1 fr ma0 icon ion-md-arrow-dropright ${
                      item.show ? `mr3 black` : 'black-50'
                    }`
                  "
                ></i>
              </dd>
            </dl>
          </div>
        </a>
      </div>
    </div>
    <div class="fl w-40 bg-white">
      <div>
        <transition name="loading">
          <div v-show="loadingAnimation" class="loading bg-blue f3">
            Loading...
          </div>
        </transition>
        <div v-for="(w, index) in items" :key="mName + index">
          <transition name="slide-fade">
            <div
              class="fl w-100 w-100-ns tl ma0"
              v-show="w.show && menuShow"
              @mouseenter="handleMouseIn(w.link)"
              @mouseleave="handleMouseOut()"
            >
              <div class="pa4">
                <span class="f4 f1-ns b dib pr3">{{ w.name }}</span>
                <b class="dib bg-blue">{{ w.year }}</b>
                <blockquote class="ph0 pb2 mb1 bb mh0 mt0">
                  <p class="lh-copy measure f6">
                    {{ w.des }}
                    <br />
                    <span
                      @click="goToPage(w.id)"
                      class="tc w4 f6 dim link ba bw2 ph2 pv1 mt3 dib black"
                      >Read more..</span
                    >
                    <span
                      v-if="w.link.split(':')[0] == `https`"
                      @click="play(w)"
                      class="tc w4 ml3 f6 link ba bw2 ph3 pv1 mt3 dib black dim"
                    >
                      <span class="pr1">Play!</span>
                      <i class="icon ion-md-return-right"></i>
                    </span>
                  </p>
                </blockquote>
                <div class="w-100 overflow-auto">
                  <code class="f7 db lh-copy nowrap">{{ w.link }}</code>
                </div>
                <img :src="w.img" :alt="w.name" class="w-100 dim" />
                <h5>Credits</h5>
                <div
                  v-for="person in w.credits"
                  :key="person.link + person.role"
                  class="f7 flex"
                  style="line-height:1"
                >
                  <p class="truncate w-60">{{ person.role }}:</p>
                  <p class="truncate">
                    <a target="_blank" class="ml3 black" :href="person.link">
                      {{ person.name }}
                    </a>
                  </p>
                </div>
              </div>
            </div>
          </transition>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// eslint-disable-next-line no-unused-vars
import { clearTimeout } from "timers";
import intro from "@/components/Intro.vue";
import { store } from "@/store.js";
export default {
  name: "Menu",
  components: {
    intro
  },
  mounted() {
    if (this.items.every(a => a.show == false)) {
      this.items[0].show = true;
    }
  },
  props: {
    itemsprops: {
      type: Array,
      required: true
    },
    mName: {
      type: String
    }
  },
  data() {
    return {
      style: null,
      items: this.itemsprops,
      menuShow: true,
      loadingAnimation: false,
      bwhite: "bg-white"
    };
  },
  methods: {
    play(item) {
      this.$root.$emit("itemDesOpen", item.link);
      this.$router.push({ path: `/play/${item.id}` });
    },
    handleClick(item) {
      store.setActiveItem(this.mName.toLowerCase(), item);
    },
    handleMouseIn(itemToEmit) {
      if (itemToEmit) {
        this.load(itemToEmit);
      }
    },
    handleMouseOut() {
      this.abortLoad();
    },
    abortLoad() {
      let id = window.setTimeout(function() {}, 0);
      while (id--) {
        window.clearTimeout(id);
      }
      setTimeout(() => {
        this.loadingAnimation = false;
      }, 200);
    },
    load(itemToEmit) {
      this.loadingAnimation = true;
      setTimeout(() => {
        this.$root.$emit("itemDesOpen", itemToEmit),
          (this.loadingAnimation = false);
      }, 1000);
    },

    goToPage(itemToEmit) {
      this.$router.push({
        name: this.mName.toLowerCase(),
        params: { id: itemToEmit }
      });
    }
  }
};
</script>
<style>
.loading {
  width: 100%;
  height: 30px;
}
.slide-fade-enter-active {
  transition: all 0.15s ease;
}
.slide-fade-leave-active {
  display: none;
}
.slide-fade-enter {
  transform: translateX(30px);
  opacity: 0 0.15s;
}
.loading-enter-active {
  transition: all 1s;
}
.loading-leave-active {
  transition: all 0s;
  opacity: 0;
}
.loading-enter {
  width: 0;
  opacity: 0;
}
</style>
