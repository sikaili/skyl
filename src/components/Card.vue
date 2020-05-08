<template functional>
  <a
    :href="props.link"
    target="_blank"
    :class="props.mq === 'lg' ? 'mr4' : 'mr2'"
  >
    <div class="relative card pa3 bg-white-30 border-box">
      <img :src="props.img">
      <p class="pb4">{{ props.caption }}</p>
      <span
        class="tc w4 f6 dim link ba bw2 ph2 pv1 mt3 dib black"
      >Read more..</span>
    </div>
  </a>
</template>

<style scoped>
    .card {
        max-width: 300px;
    }
    .card:hover {
        background-color: rgba(255, 255, 255, 0.7);
        transition: background-color 1s ease-in;
    }
    a,
    a:hover {
        color: black;
        text-decoration: none;
    }
    span {
        position: absolute;
        bottom: 1rem;
    }
</style>
