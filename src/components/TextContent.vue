<template functional>
  <div class="mt4">
    <h3>
      {{ props.title }}
    </h3>
    <p class="black-50">
      {{ props.caption }}
    </p>
    <p>
      {{ props.content }}
    </p>
  </div>
</template>

<style scoped>
* {
  font-family: "Helvetica Neue", sans-serif;
  line-height: 1rem;
}
p,
h3 {
  margin: 12px 0 0 0;
}
</style>
