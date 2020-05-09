<template functional>
  <div
    class="Notification"
  >
    <i
      :class="'icon ion-md-' + props.icon"
    />
    <slot />
  </div>
</template>
<style lang="scss" scoped>
    .Notification {
        background-color: rgba(0,0,0, 0.8);
        padding: 18px 48px;
        line-height: 24px;
        text-align: center;
        position: fixed;
        width: 100%;
        color: white;
        bottom: 0px;
    }
</style>
