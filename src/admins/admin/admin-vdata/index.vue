<template>
  <x-border title="酷屏" type="focus" icon="icon-5333-sudu">
    <div class="admin-vdata" v-if="viewModel">
      <div class="admin-vdata-list" v-for="item in viewModel" :key="item">
        <img class="admin-vdata-image" src="https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=2934232835,3423836292&fm=26&gp=0.jpg" alt="" />
        <div class="admin-vdata-cont">{{item.name}}</div>
        <div class="admin-layout">
          <div class="admin-layout-delete" title="删除模板" v-if="false">删除模板</div>
          <div class="admin-layout-cont">
            <div class="admin-layout-button left-background" :href="'/admin/vdata/preview?path='+item.path" target="_blank">编辑</div>
            <a class="admin-layout-button right-background" :href="'/admin/vdata/preview?path='+item.path" target="_blank">预览</a>
          </div>
        </div>
      </div>
    </div>
  </x-border>
</template>

<script>
  export default {
    data () {
      return {
        adminVData: {},
        viewModel: null
      }
    },
    mounted () {
      this.init()
    },
    methods: {
      async init () {
        var response = await this.$api.httpGet('/api/themepage/querylist?isVDataPage=true')
        if (response.status === 1) {
          this.viewModel = response.result
        }
        console.info('response', this.viewModel)
      }
    }
  }
</script>
<style lang="scss" scoped>
  @import "./var.scss";
</style>
