<template>
  <x-border title="添加\编辑类目" color="success" v-loading.fullscreen.lock="loading">
    <div class="category-box" v-if="inshow">
      <displayEdit :productView="viewModel"></displayEdit>
      <saleEdit :refs="init" :productView="viewModel"></saleEdit>
      <commodityEdit :productView="viewModel"></commodityEdit>
    </div>
    <div class="edit-foot">
      <el-button type="primary" class="edit-foot_but" @click="save" style="margin-left: 200px;">保存</el-button>
    </div>
  </x-border>
</template>
<script>
  import saleEdit from './widgets/sale_edit.vue'
  import displayEdit from './widgets/display_edit.vue'
  import commodityEdit from './widgets/commodity_edit.vue'
  import service from './service.js'
  // import catgory from '@/pages/base/layout/json/catgory.json'
  export default {
    components: {
      saleEdit,
      displayEdit,
      commodityEdit
    },
    data () {
      return {
        viewModel: '',
        inshow: false,
        loading: false
      }
    },
    mounted () {
      this.init()
    },
    methods: {
      async save () {
        service.save(this)
      },
      async init () {
        this.inshow = false
        this.loading = true
        // if (this.$route.query.category) {
        var para = {
          categoryId: this.$route.query.id
        }
        var response = await this.$api.httpGet('Api/Category/GetView', para)
        console.log(response)
        if (response.status === 1) {
          this.viewModel = response.result
        }
        // } else {
        //   this.viewModel = await this.$crud.getView(this, 'Api/category/viewbyid')
        //   // this.viewModel = catgory.result
        // }
        this.inshow = true
        this.loading = false
      }
    }
  }
</script>
<style rel="stylesheet/scss" lang="scss">
  @import "./widgets/style.scss";
</style>

