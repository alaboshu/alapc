<template>
  <div class="x-qrcode">
    <div id="qrcode"></div>
  </div>
</template>


<script>
  import QRCode from 'qrcodejs2' // 导入二维码配置
  export default {
    mounted () {
      this.init()
    },
    methods: {
      init () {
        var _this = this
        this.qrcode = new QRCode('qrcode', {
          width: 130,
          height: 130,
          colorDark: '#000',
          colorLight: '#fff'
        })
      }
    }
  }
</script>


<style lang="scss" scoped>
  .x-qrcode {
    width: 130px;
    height: 130px;
    margin: 0 auto;
    img {
      height: 100%;
      width: 100%;
    }
  }
</style>

