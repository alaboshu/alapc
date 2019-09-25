<template>
  <div class="zk-product-superior">
    <img :src="widget.value.login" alt="">
  </div>
</template>
<script>
  export default {
    props: {
      widget: {}
    },
    mounted () {
    },
    methods: {}
  }
</script>


<style lang="scss" scoped>
  .zk-product-superior {
    width: 100%;
    margin: 0;
    padding: 0;
    img {
      width: 100%;
      display: block;
    }
  }
</style>

