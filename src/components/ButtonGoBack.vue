<template funcional>
  <span
    @click.once="$router.replace({ path: `/${$route.path.split('/')[1]}/` })"
    class="f5 no-underline white bg-black-40 bg-animate hover-bg-black hover-white inline-flex items-center pa3 border-box mr1"
  >
    <i class="icon ion-md-return-left"></i>

    <span class="pl1">Return</span>
  </span></template
>
