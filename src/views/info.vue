<template>
  <div class="flex flex-column items-start justify-end pb5 f3 tc">
    <!-- <a
      @click="back"
      href="#0"
      class="self-center self-center f5 no-underline white bg-black-40 bg-animate hover-bg-black hover-white inline-flex items-center pa3 border-box mr1"
    >
      <svg
        class="w1"
        data-icon="chevronLeft"
        viewBox="0 0 32 32"
        style="fill:currentcolor"
      >
        <title>chevronLeft icon</title>
        <path d="M20 1 L24 5 L14 16 L24 27 L20 31 L6 16 z"></path>
      </svg>
      <span class="pl1">Return</span>
    </a> -->
    <br />
    <p class="tc f6 white bg-black-40">
      info_
      <i class="fr mr2 icon ion-logo-twitch"></i>
    </p>
    <p class="tc f6 white bg-black-40">mail: skyl@me.com</p>
    <p class="tc f6 white bg-black-40">link: skyl.fr</p>
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

<style></style>
