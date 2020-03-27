<template>
  <div class="cl">
    <div class="flex justify-center bg-white-50">
      <router-link :class="classBySize" to="/work">Work</router-link>
      <router-link :class="classBySize" to="/music">Music</router-link>
      <router-link :class="classBySize" to="/drawings">Drawings</router-link>
      <router-link
        :class="classBySize"
        :to="{ name: 'play', params: { id: $route.params.id } }"
      >
        Play!
      </router-link>
    </div>
  </div>
</template>

<script>
export default {
  name: "Head",
  props: {
    link: {
      type: String,
      default: "https://eyes.skyl.fr"
    }
  },
  data() {
    return {
      class: {
        mdPlus: "tc min pa3 w-20 f4 black link",
        sm: "tc min pv4 ph1 w-20 f6 black link"
      }
    };
  },
  computed: {
    classBySize: function() {
      if (this.$mq == "sm") {
        return this.class.sm;
      } else {
        return this.class.mdPlus;
      }
    }
  }
};
</script>

<style>
.bg-white-50 {
  background-color: var(--bg-color);
  color: var(--color);
}

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
  background: var(--bg-white-80);
  text-decoration: line-through;
}
</style>
