<template>
  <div class="cl">
    <div class="flex justify-center bg-white-50">
      <router-link class="tc min pa3 w-20 f4 black link" to="/" exact
        >Applis</router-link
      >
      <router-link class="tc min pa3 w-20 f4 black link" to="/music"
        >Music</router-link
      >
      <router-link class="tc min pa3 w-20 f4 black link" to="/drawings"
        >Drawings</router-link
      >
      <router-link class="tc min pa3 w-20 f4 black link" to="/info"
        >Info</router-link
      >
    </div>
    <h1 class="tc autoM f2 b white">LI Sikai</h1>
    <p class="bg-black-10 tl white autoM">
      I'm a creative technologist & interction designer based in Paris. I make
      music and new media art.
    </p>
  </div>
</template>

<script>
export default {
  name: "Head",
  data() {
    return {
      path: window.location.pathname,
      classes: ["bg-white", "linet"]
    };
  }
};
</script>

<style>
.min {
  min-width: 5rem;
  max-width: 10rem;
}
.autoM {
  /* display: inline-block; */
  max-width: 25rem;
  margin-left: auto;
  margin-right: auto;
}
.router-link-active {
  background: white;
  text-decoration: line-through;
}
</style>
