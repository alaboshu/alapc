<template>
  <div>

  </div>

</template>
<script>
  export default {
    data () {
      return {
        viewModel: null
      }
    },
    mounted () {
      this.init()
    },
    methods: {
      async   init () {
        var para = {
          mobile: '17727169875',
          content: '设么时候归来吃饭？'
        }
        var respons = await this.$api.httpPost('/Api/Sms/SendRaw', para)
        console(respons)
      }
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss">
</style>
