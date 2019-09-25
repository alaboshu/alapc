<template>
  <div>
    <i class="icon-7962-mianfeisrd0 icondemo"></i>
  </div>
</template>

<script>

  export default {
    data () {
      return {
        text: 'sss'
      }
    },
    mounted () {
      this.init()
    },
    methods: {
      async init () {
        console.info(this.$base.router())
      }
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss">
  .icondemo {
    font-size: 50px;
  }
</style>
