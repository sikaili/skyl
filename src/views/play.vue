<template>
  <div class="fixed mw4 f3 tc left-1">
    <br />
    <span
      @click="randomLink"
      class="w-100 f5 no-underline white bg-black-80 bg-animate hover-bg-white hover-black inline-flex items-center pa3 border-box"
    >
      <i class="tc icon ion-md-shuffle"></i>
      <span class="pl1">Random</span>
    </span>
    <div class="f6 tl" style="min-height:5rem;">
      <p
        v-if="!currentLink"
        @click="toggle()"
        class="bg-animate hover-bg-white hover-black white bg-black-60"
      >
        list
        <i
          :class="
            `white fr ma0 icon ion-md-arrow-drop-down ${
              displayList ? ` ion-md-arrow-dropup` : ' ion-md-arrow-dropdown'
            }`
          "
        ></i>
      </p>
      <p
        v-if="currentLink.split(':')[0] == `https`"
        @click="toggle()"
        class="pa2 bg-animate hover-bg-white hover-black mb0 pb2 white bg-black-60"
      >
        {{ getName(currentLink) }}
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
        <a :href="currentLink" target="_blank" class="link white">skyl.fr</a>
      </p>

      <p class="ma0 pa0 f3 white bg-black-60">
        <a target="_blank" href="https://github.com/sikaili">
          <i class="white mh1 icon ion-logo-github"></i>
        </a>
        <a target="_blank" href="https://www.instagram.com/skyl.fr/">
          <i class="white mh1 icon ion-logo-instagram"></i>
        </a>
        <a target="_blank">
          <i class="white mh1 icon ion-logo-twitter"></i>
        </a>
        <a href="mailto:skyl@me.com">
          <i class="white icon ion-ios-send"></i>
        </a>
      </p>
    </div>
    <transition name="slide-fade1">
      <div v-if="displayList" class="overflow-y-scroll vh-50 f6 tl bg-white-30">
        <span v-for="item in linksArr" :key="item.link">
          <p
            @click="handlePClick(item.link)"
            class="bg-animate hover-bg-white hover-black white bg-black-60"
          >
            {{ item.name }}
          </p>
        </span>
      </div>
    </transition>
  </div>
</template>

<script>
import dataObj from "@/data.js";
export default {
  name: "play",
  data() {
    return {
      links: [
        { link: "https://forces.skyl.fr" },
        { link: "https://k.skyl.fr" },
        { link: "https://data.skyl.fr" },
        { link: "https://sikaili.github.io/p5js/3d-terrain/" },
        { link: "https://sikaili.github.io/p5js/toxic/" },
        { link: "https://sikaili.github.io/p5js/joker/" },
        { link: "https://sikaili.github.io/p5js/hua/" },
        { link: "https://sikaili.github.io/p5js/washed/" },
        { link: "https://sikaili.github.io/p5js/e-minor/" },
        { link: "https://sikaili.github.io/p5js/blood-particles-2017/" },
        { link: "https://sikaili.github.io/p5js/c-syn/" },
        { link: "https://sikaili.github.io/p5js/happy-birthday-mon-zhu/" },
        { link: "https://sikaili.github.io/p5js/eyes-sand-sound/" },
        { link: "https://sikaili.github.io/p5js/eyes-macro/" }
      ],
      displayList: false,
      currentLink: ""
    };
  },
  methods: {
    randomLink() {
      const n = Math.floor(Math.random() * this.linksArr.length);
      this.currentLink = this.linksArr[n].link;
      this.displayList = false;
      this.$root.$emit("itemDesOpen", this.currentLink);
      this.$router.replace({ path: `/play/${this.getName(this.currentLink)}` });
    },
    getName: function(link) {
      let dump = link.split("//");
      if (!dump[0].includes("https")) {
        return "";
      }
      if (dump[1].includes(`github`)) {
        dump = link.split("/");
        dump = dump[dump.length - 2];
      } else {
        dump = dump[1].split(".")[0];
      }
      return dump;
    },
    handlePClick(link) {
      this.currentLink = link;
      this.displayList = false;
      this.$root.$emit("itemDesOpen", this.currentLink);
      this.$router.replace({ path: `/play/${this.getName(this.currentLink)}` });
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
  },
  computed: {
    linksArr: function() {
      // deep copy dataObj
      const data = JSON.parse(JSON.stringify(dataObj));
      const arr = [...data.work];
      const dump = arr.concat(this.links);
      dump.forEach(a => {
        a.name = this.getName(a.link);
      });
      // sort items by name using localeCompare
      dump.sort((a, b) => a.name.localeCompare(b.name));
      return dump;
    },
    startLink: function() {
      let dump = this.linksArr.find(a => a.name == this.$route.params.id);
      if (!dump) {
        return "";
      }
      return dump.link;
    }
  },
  mounted() {
    this.$nextTick(function() {
      // Code that will run only after the
      // entire view has been rendered
      if (this.startLink.split(":")[0].includes(`https`)) {
        this.$root.$emit("itemDesOpen", this.startLink);
      }
    });
  }
};
</script>

<style scoped>
a:hover {
  background-color: black;
}
</style>
