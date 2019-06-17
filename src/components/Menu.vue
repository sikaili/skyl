<template>
  <div class="cl">
    <div
      @click="menuShow = !menuShow"
      class="fl w-40 bg-black-50 flex flex-row justify-end"
    >
      <h1 class="ph5 f3 white tr">{{ mName }}</h1>
    </div>
    <div v-if="menuShow" class="fl w-20 bg-white-80 h5 overflow-auto">
      <div class="flex flex-column justify-center">
        <a
          target="_blank"
          v-for="work in works"
          :href="work.link"
          :key="work.id"
          class="pa3 tc link"
          :class="work.show ? bwhite : ''"
          @mouseenter="work.show = true"
          @mouseleave="work.show = false"
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
        <transition name="loading">
          <div v-show="tab.show" class="loading bg-blue f3">Loading...</div>
        </transition>
        <div v-for="(w, index) in works" :key="mName + index">
          <transition name="slide-fade">
            <div
              class="fl w-100 w-100-ns tl"
              v-show="w.show"
              @mouseenter="handleMouseIn(w, w.id)"
              @mouseleave="handleMouseOut(w)"
            >
              <div class="pa4">
                <span class="f4 f1-ns b dib pr3">{{ w.name }}</span>
                <b class="dib bg-blue">{{ w.year }}</b>
                <blockquote class="ph0 pb2 mb3 bb mh0 mt0">
                  <p class="lh-copy measure f6">
                    {{ w.des }}
                    <i></i>
                  </p>
                </blockquote>
                <div class="w-100 overflow-auto">
                  <code class="f6 db lh-copy nowrap">{{ w.link }}</code>
                </div>
                <img :src="w.img" :alt="w.name" class="w-100 dim" />
                <button @click="goToPage(index)">Read more...</button>
              </div>
            </div>
          </transition>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { clearTimeout } from "timers";
export default {
  name: "Menu",
  props: {
    works: {
      type: Array,
      required: true
    },
    mName: {
      type: String
    }
  },
  data() {
    return {
      menuShow: true,
      tab: { show: false },
      bwhite: "bg-white"
    };
  },
  methods: {
    handleMouseIn(w, itemId) {
      w.show = true;
      this.tab.show = true;
      setTimeout(() => {
        this.$root.$emit("itemDesOpen", itemId), (this.tab.show = false);
      }, 1000);
    },
    handleMouseOut(w) {
      w.show = false;
      this.tab.show = false;

      let id = window.setTimeout(function() {}, 0);
      while (id--) {
        window.clearTimeout(id);
      }
    },
    goToPage(itemId) {
      console.log(itemId);
      this.$router.push({
        name: this.mName.toLowerCase(),
        params: { id: itemId }
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
  transition: all 0s;
  display: none;
}
.slide-fade-enter {
  transform: translateX(30px);
  opacity: 0;
}
.loading-enter-active {
  transition: all 1s;
}
.loading-leave-active {
  transition: all 0.2s;
  opacity: 0 0.2s;
}
.loading-enter {
  width: 0;
  opacity: 0;
}
</style>
