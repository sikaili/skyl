<template functional>
  <span
    class="f5 no-underline white bg-black-40 bg-animate hover-bg-black hover-white inline-flex items-center pa3 border-box mr1"
    :class="props.style"
  >
    <i class="icon ion-md-return-left" />

    <span class="pl1"><slot /></span>
  </span>
</template>
