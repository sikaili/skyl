<template>
  <div>
    <h1 :class="$mq == `sm` ? style.s.h1 : style.d.h1">LI Sikai</h1>
    <p :class="$mq == `sm` ? style.s.p : style.d.p">
      Technologist, interaction designer based in Paris, I make music and new
      media art.
    </p>
  </div>
</template>

<script>
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
  }
};
</script>

<style></style>
