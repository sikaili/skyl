<template>
  <div>
    <h1
      @click="shellMxn.installApp()"
      :class="$mq == `sm` ? style.s.h1 : style.d.h1"
    >
      LI Sikai
    </h1>
    <p @click="$router.push('cv')" :class="$mq == `sm` ? style.s.p : style.d.p">
      Technologist, interaction designer based in Paris, I make music & new
      media art.
    </p>
  </div>
</template>

<script>
import { shellMxn } from "@/js/mixins";

export default {
  name: "intro",
  data() {
    return {
      style: {
        s: {
          h1: "tc autoM f4 b white",
          p: "bg-black-10 tl white autoM f6 ph3"
        },
        d: { h1: "tc autoM f2 b white", p: "bg-black-10 tl white autoM" }
      }
    };
  },
  mixins: [shellMxn]
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
