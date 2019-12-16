<template>
  <transition mode="out-in">
    <router-view></router-view>
  </transition>
</template>


<script>
  export default {
    name: 'App'
  }
</script>

<style  lang="scss" scoped>
  @import "~_style/theme.scss";
  img[lazy="loading"] {
    width: 120px !important;
    height: 120px !important;
    position: relative;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
</style>
