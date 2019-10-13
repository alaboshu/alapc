<template>
  <x-border title="门店设置" type="primary">
    <div class="admin-store-settings">
      <el-form el-form ref="form" label-width="250px">
        <el-form-item label="店铺名称">
          <el-input v-model="models.storeName" placeholder="请输入店铺名称"></el-input>
        </el-form-item>
        <el-form-item label="门店logo">
          <x-upload-file v-model="models.login" :domain="models.logo"></x-upload-file>
        </el-form-item>
        <el-form-item label="门店描述">
          <el-input type="textarea" v-model="models.storeIntro" placeholder="请输入门店描述"></el-input>
        </el-form-item>
      </el-form>
      <div class="store-buttom">
        <div class="store_but" @click="save">保存</div>
      </div>
    </div>
  </x-border>
</template>
<script>
  export default {
    props: {
      widgetData: {}
    },
    data () {
      return {
        viewModel: '',
        models: {
          storeName: '',
          logo: '',
          storeIntro: ''
        }
      }
    },
    mounted () {
      this.init()
    },
    methods: {
      async init () {
      },
      async save () {
        this.models.storeid = this.$user.loginUser().merchantStoreId
        this.models.userId = this.$user.loginUser().id
        var type = this.$crud.getType()
        let parameter = {
          type: type,
          model: JSON.stringify(this.models),
          key: type
        }
        var response = await this.$api.httpPost('/api/auto/save', parameter)
        this.$crud.message(response)
      }
    }
  }
</script>
<style rel="stylesheet/scss" lang="scss">
  @import "./style.scss";
</style>
