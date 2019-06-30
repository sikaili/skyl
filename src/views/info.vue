<template>
  <div class="cl">
    <div class="fixed f3 tc left-1">
      <br />
      <span
        @click="send"
        class="w-100 f5 no-underline white bg-black-80 bg-animate hover-bg-white hover-black inline-flex items-center pa3 border-box"
      >
        <i class="tc icon ion-md-shuffle"></i>

        <span class="pl1">Random </span>
      </span>
      <div class="f6 tl" style="min-height:5rem;">
        <p class="white bg-black-50">info</p>
        <!-- <p class="white bg-black-50">
        mail : skyl@me.com
      </p> -->
        <p
          v-if="currentLink.split(':')[0] == `https`"
          class=" mb0 pb2 white bg-black-50"
        >
          {{ name }}
        </p>
        <p class="mb0 pb2 white bg-black-50">links: <a>skyl.fr</a></p>

        <p class="ma0 pa0 f3 white bg-black-50">
          <a target="_blank" href="https://github.com/sikaili"
            ><i class="white mh1 icon ion-logo-github"></i
          ></a>
          <a target="_blank"
            ><i class="white mh1 icon ion-logo-instagram"></i
          ></a>
          <a target="_blank"><i class="white mh1 icon ion-logo-twitter"></i></a>
          <a href="mailto:skyl@me.com"
            ><i class="white icon ion-ios-send"></i
          ></a>
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import dataObj from "@/data.js";
export default {
  name: "info",
  data() {
    return {
      dataObj: dataObj,
      links: [
        { link: "https://forces.skyl.fr" },
        { link: "https://k.skyl.fr" },
        { link: "https://data.skyl.fr" },
        { link: "https://sikaili.github.io/p5js/3d-terrain/" },
        { link: "https://sikaili.github.io/p5js/joker/" },
        { link: "https://sikaili.github.io/p5js/hua/" },
        { link: "https://sikaili.github.io/p5js/washed/" },
        { link: "https://sikaili.github.io/p5js/e-minor/" },
        { link: "https://sikaili.github.io/p5js/blood-particles-2017/" },
        { link: "https://sikaili.github.io/p5js/c-syn/" },
        { link: "https://sikaili.github.io/p5js/happy-birthday-mon-zhu/" },
        { link: "https://sikaili.github.io/p5js/blood-particles-2017/" },
        { link: "https://sikaili.github.io/p5js/eyes-sand-sound/" },
        { link: "https://sikaili.github.io/p5js/eyes-macro/" }
      ],
      currentLink: ""
    };
  },
  methods: {
    send() {
      let arr = this.dataObj["work"];
      arr = arr.concat(this.links);
      // console.log(arr);
      const n = Math.floor(Math.random() * arr.length);
      this.currentLink = arr[n].link;
      this.$root.$emit("itemDesOpen", this.currentLink);
    }
  },
  computed: {
    name: function() {
      let dump = this.currentLink.split("//");
      if (dump[1].includes(`github`)) {
        dump = this.currentLink.split("/");
        dump = dump[dump.length - 2];
      } else {
        dump = dump[1].split(".")[0];
      }
      return dump;
    }
  }
};
</script>

<style scoped>
a:hover {
  background-color: black;
}
</style>
