<template>
  <div v-html="$base.enumHtml('status',1)">
    {{$base.enumHtml('status',1)}}
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
        await this.$base.localData()
      }
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss">
  .icondemo {
    font-size: 50px;
  }
</style>
