<template>
  <div class="cl">
    <div class="flex justify-center bg-white-50">
      <router-link :class="style" to="/work" exact>Applis</router-link>
      <router-link :class="style" to="/music">Music</router-link>
      <router-link :class="style" to="/drawings">Drawings</router-link>
      <router-link :class="style" to="/info:0">Play!</router-link>
    </div>
  </div>
</template>

<script>
export default {
  name: "Head",
  data() {
    return {
      class: {
        mdPlus: "tc min pa3 w-20 f4 black link",
        sm: "tc min pv4 ph1 w-20 f6 black link"
      }
    };
  },
  computed: {
    style: function() {
      if (this.$mq == "sm") {
        return this.class.sm;
      } else {
        return this.class.mdPlus;
      }
    }
  },
  methods: {
    navigate: function(name) {
      if (this.$route.name == name) {
        this.$router.push({ path: `/info:0` });
      }
    }
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
