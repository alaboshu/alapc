<template>
  <div class="admin-reward-rule">
    <div class="admin-reward-left">
      <admin-reward-sidebar></admin-reward-sidebar>
    </div>
    <x-border ref="xBorder" icon="flaticon-settings" class="admin-reward-right" title="分润维度">
      <x-table ref="xTable" type="RewardRuleTable" @afterTableLoad="afterTableLoad">
      </x-table>
    </x-border>
  </div>
</template>


<script>
  export default {
    props: {
      widget: {},
      title: {}
    },
    data () {
      return {
        reload: true, // 是否刷新
        widgetValue: ''
      }
    },
    methods: {
      async init () {

      },

      // 表格加载完成事件
      afterTableLoad (dataResult) {
        this.$nextTick(() => {
          dataResult.border.type = this.widget.value.themeColor
          if (this.widgetValue) {
            var border = this.$crud.getBorder(dataResult.border, this.widgetValue.table.border)
            this.$refs.xBorder.init(border)
          }
        })
      },
      toExcel (command) {
        this.$refs.xTable.toExcel(command)
      },
      // 监听 x-widget值得变化,不能直接监听路由，直接监听路由可能会导致数据延迟
      watchWidget (val) {
        this.init()
        if (this.reload === false) {
          this.$nextTick(() => {
            this.$refs.xTable.init(this.table.type, this.table.columns)
          })
        }
        this.reload = false // 解决刷新浏览器，数据加载两次的问题
      }
    }
  }
</script>
<style rel="stylesheet/scss" lang="scss">
  @import "./var.scss";
</style>

