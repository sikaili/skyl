<template>
  <div class="fixed mw4 f3 tc left-1">
    <br />
    <span
      @click="randomIframe"
      class="w-100 f5 no-underline white bg-black-80 bg-animate hover-bg-white hover-black inline-flex items-center pa3 border-box"
    >
      <i class="tc icon ion-md-shuffle"></i>
      <span class="pl1">Random</span>
    </span>
    <div class="f6 tl" style="min-height:5rem;">
      <p
        @click="toggle()"
        class="pa2 bg-animate hover-bg-white hover-black mb0 pb2 white bg-black-60"
      >
        {{ activeItem.id ? activeItem.id : "list" }}
        <i
          :class="
            `hover-black fr ma0 icon ion-md-arrow-drop-down ${
              displayList ? ` ion-md-arrow-dropup` : ' ion-md-arrow-dropdown'
            }`
          "
        ></i>
      </p>
      <p class="mb0 pb2 white bg-black-60">
        links:
        <a
          :href="activeItem.link"
          target="_blank"
          title="open in a new page"
          class="link white"
          >skyl.fr</a
        >
      </p>

      <p class="ma0 pa0 f3 white bg-black-60">
        <a target="_blank" href="https://github.com/sikaili">
          <i class="white mh1 icon ion-logo-github"></i>
        </a>
        <a
          target="_blank"
          title="instagram"
          href="https://www.instagram.com/skylfr/"
        >
          <i class="white mh1 icon ion-logo-instagram"></i>
        </a>
        <a
          target="_blank"
          rel="canonical"
          :href="
            'https://twitter.com/intent/tweet?url=https://skyl.fr' + $route.path
          "
        >
          <i class="white mh1 icon ion-logo-twitter"></i>
        </a>
        <a href="mailto:contact@sikai.li" title="mail">
          <i class="white icon ion-ios-send"></i>
        </a>
      </p>
    </div>
    <transition name="slide-fade1">
      <div v-if="displayList" class="overflow-y-scroll vh-50 f6 tl bg-white-30">
        <span v-for="(item, index) in iframeItems" :key="index">
          <p
            @click="handlePClick(item)"
            class="ph1 bg-animate hover-bg-white hover-black white bg-black-60"
          >
            {{ item.id }}
          </p>
        </span>
      </div>
    </transition>
  </div>
</template>
<script>
import { mapActions, mapGetters } from "vuex";
export default {
  name: "SideMenu",
  data() {
    return {
      displayList: false
    };
  },
  computed: {
    ...mapGetters({
      activeItem: "activeItem",
      iframeItems: "iframeItems"
    })
  },
  methods: {
    ...mapActions(["setActiveItem"]),
    randomIframe() {
      const n = Math.floor(Math.random() * this.iframeItems.length);
      const item = this.iframeItems[n];
      this.displayList = false;
      this.setActiveItem(item);
      this.$router.replace({ params: { id: item.id } });
    },
    handlePClick(item) {
      if (item != this.activeItem) {
        this.displayList = false;
        this.setActiveItem(item);
        this.$router.replace({ params: { id: this.activeItem.id } });
      }
    },
    // the right toggle
    toggle() {
      if (this.displayList) {
        return this.hide();
      }
      return this.show();
    },
    show() {
      this.displayList = true;
      setTimeout(() => document.addEventListener("click", this.hide), 0);
    },
    hide() {
      this.displayList = false;
      document.removeEventListener("click", this.hide);
    }
  }
};
</script>

<style scoped>
a:hover {
  background-color: black;
}
</style>
