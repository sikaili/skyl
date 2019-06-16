<template>
  <div class="cl">
    <div class="fl w-40 bg-black-50 flex flex-row justify-end">
      <h1 class="ph5 f3 white tr">{{ mName }}</h1>
    </div>
    <div class="fl w-20 bg-white-80">
      <div class="flex flex-column justify-center">
        <a
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
        <div v-for="(w, index) in works" :key="mName + index">
          <transition name="slide-fade">
            <div
              class="fl w-100 w-100-ns tl"
              v-show="w.show"
              @mouseenter="handleMouseIn(w, w.link)"
              @mouseleave="w.show = false"
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
                <button @click="goToPage(index)">+</button>
              </div>
            </div>
          </transition>
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
    },
    mName: {
      type: String
    }
  },
  data() {
    return {
      bwhite: "bg-white"
    };
  },
  methods: {
    handleMouseIn(w, itemId) {
      w.show = true;
      this.$root.$emit("itemDesOpen", itemId);
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
</style>
