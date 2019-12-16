<template>
  <div class="voucher" v-if="async">
    <el-form label-width="100px">
      <el-form-item label="图片">
        <x-select-image style="margin-left: 20px;" v-model="payGoods.icertificate" :count="imageCount" :isBoost="true" :isUpload="false"></x-select-image>
      </el-form-item>
      <el-form-item label="描述">
        {{payGoods.desc}}
      </el-form-item>
    </el-form>
  </div>
</template>


<script>
  export default {
    data () {
      return {
        payGoods: [],
        imageCount: '',
        async: false
      }
    },
    props: {
      viewModel: {}
    },
    mounted () {
      this.imageCount = this.viewModel.order.orderExtension.payGoods.icertificate.length
      this.payGoods = this.viewModel.order.orderExtension.payGoods
      this.async = true
    }
  }
</script>





<style  lang="scss" scoped>
  .voucher {
    .el-form-item__label {
      margin-right: 20px;
    }
  }
</style>
