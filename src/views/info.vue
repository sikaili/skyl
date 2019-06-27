<template>
  <div class="cl">
    <div class="fixed f3 tc left-1">
      <br />
      <a
        @click="back"
        href="#0"
        class="w-100 f5 no-underline white bg-black-80 bg-animate hover-bg-black hover-white inline-flex items-center pa3 border-box"
      >
        <i class="tc icon ion-md-shuffle"></i>

        <span class="pl1">Random </span>
      </a>
      <div class="f6 tl" style="min-height:5rem;">
        <p class="white bg-black-50">
          info
        </p>
        <!-- <p class="white bg-black-50">
        mail : skyl@me.com
      </p> -->
        <p class="mb0 pb2 white bg-black-50">links: <a>skyl.fr</a></p>
        <p class="ma0 pa0 f3 white bg-black-50">
          <!-- <a><i class="mh1 icon ion-logo-javascript"></i></a> -->
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
export default {
  name: "info",
  data() {
    return {};
  },
  methods: {
    back() {
      this.$router.go(-1);
    }
  }
};
</script>

<style scoped>
a:hover {
  background-color: black;
}
</style>
