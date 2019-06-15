<template>
  <div id="nav">
    <div class="flex justify-center bg-white-50">
      <router-link class="tc min pa3 w-20 f4 black link" to="/"
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
    <div class="flex justify-center">
      <div class="tc w-20">
        <h1 class="f2 b white">LI Sikai</h1>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Head"
};
</script>

<style>
.min {
  min-width: 5rem;
}
</style>
