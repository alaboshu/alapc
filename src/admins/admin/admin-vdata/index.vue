<template>
  <x-border title="酷屏" type="brand">
    <div class="admin-vdata">
      <div class="admin-vdata-list" v-for="item in 10" :key="item">
        <img class="admin-vdata-image" src="https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=2934232835,3423836292&fm=26&gp=0.jpg" alt="" />
        <div class="admin-vdata-cont">大数据屏幕</div>
        <div class="admin-layout">
          <div class="admin-layout-delete" title="删除模板">删除模板</div>
          <div class="admin-layout-cont">
            <div class="admin-layout-button left-background">编辑</div>
            <div class="admin-layout-button right-background">预览</div>
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
        adminVData: {

        }
      }
    }
  }
</script>
<style lang="scss" scoped>
  @import "./var.scss";
</style>
