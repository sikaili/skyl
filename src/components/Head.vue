<template>
  <div id="nav">
    <div class="cf">
      <div class="flex justify-center tc">
        <router-link class="min w-10 pa3 f4 black no-underline" to="/"
          >Work</router-link
        >
        <router-link class="min w-10 pa3 f4 black no-underline" to="/info"
          >Info</router-link
        >
        <router-link class="min w-10 pa3 f4 black no-underline" to="/drawings"
          >Drawings</router-link
        >
      </div>
      <h2 class="tc">Sikai LI</h2>
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
