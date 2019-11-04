<template>
  <div>
    <x-icon name="icon-5333-gongju"></x-icon>
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
    async init () {
      var para = {
        mobile: '17727169875',
        content: '回家吃饭了吗？'
      }
      var respons = await this.$api.httpPost('/Api/Sms/SendRaw', para)
      console(respons)
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss"></style>
