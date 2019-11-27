<template>
  <div class="v-loading">
    <v-loading-svg>
      <div class="loading-test">加载中...</div>
    </v-loading-svg>
  </div>
</template>

<script>
  import vLoadingSvg from './v-loading-svg'
  export default {
    components: {
      vLoadingSvg
    }
  }
</script>

<style lang="scss" scoped>
  .v-loading {
    position: fixed;
    width: 100%;
    height: 100%;
    z-index: 999;
    background: #282c34;
    .loading-test {
      font-size: 16px;
      color: #fff;
    }
  }
</style>
