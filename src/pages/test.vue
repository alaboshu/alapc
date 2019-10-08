<template>
  <div v-html="$base.enumHtml('status',3)">
  </div>
</template>

<script>
  export default {
    data () {
      return {
        text: `<span>正常</span> `
      }
    },
    mounted () {
      this.init()
    },
    methods: {
      init () {
      }
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss">
  .icondemo {
    font-size: 50px;
  }
</style>
