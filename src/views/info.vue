<template>
  <div class="fixed f3 tc">
    <br />
    <div class="f6 tl" style="min-height:5rem;">
      <p class="white bg-black-40">
        info
        <i class="mh2 icon ion-logo-twitch"></i>
      </p>
      <p class="white bg-black-40">mail: skyl@me.com</p>
      <p class="white bg-black-40">link: skyl.fr</p>
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

<style></style>
