<template>
  <div>
    <h1 :class="$mq == `sm` ? style.mobile.h1 : style.desktop.h1">
      LI Sikai
    </h1>
    <p :class="$mq == `sm` ? style.mobile.p : style.desktop.p">
      Technologist, interaction designer based in Paris, I make music & new
      media art.
    </p>
  </div>
</template>

<script>
import { shellMxn } from '@/js/mixins';

export default {
  name: 'Intro',
  mixins: [shellMxn],
  data() {
    return {
      style: {
        mobile: {
          h1: 'tc autoM f4 b white',
          p: 'bg-black-10 tl white autoM f6 ph3',
        },
        desktop: { h1: 'tc autoM f2 b white', p: 'bg-black-10 tl white autoM' },
      },
    };
  },
};
</script>

<style scoped>
h1,
p {
  cursor: pointer;
}
h1:hover {
  background-color: rgba(0, 0, 0, 0.2);
  transition: background-color 0.2s ease-in;
}
</style>
