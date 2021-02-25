<template>
  <div class="TheHeader flex justify-center bg-white-50">
    <router-link
      :class="classBySize"
      to="/work"
    >
      Work
    </router-link>
    <router-link
      :class="classBySize"
      to="/music"
    >
      Music
    </router-link>
    <router-link
      v-if="$route.name!=='drawings'"
      :class="classBySize"
      to="/drawings"
    >
      Drawings
    </router-link>
    <router-link
      v-else-if="$route.name==='drawings'"
      :class="classBySize"
      to="/photos"
    >
      Photos
    </router-link>
    <router-link
      :class="classBySize"
      :to="{ name: 'play', params: { id: $route.params.id } }"
    >
      Play!
    </router-link>
  </div>
</template>

<script>
export default {
  name: 'TheHeader',
  data() {
    return {
      link: 'https://eyes.skyl.fr',
    };
  },
  computed: {
    classBySize() {
      if (this.$mq === 'sm') {
        return 'tc min pv4 ph1 w-20 f6 black link';
      }
      return 'tc min pa3 w-20 f4 black link';
    },
  },
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
        max-width: 25rem;
        margin-left: auto;
        margin-right: auto;
    }

    .router-link-active {
        background: var(--bg-white-80);
        text-decoration: line-through;
    }
</style>
