<template>
  <x-border ref="xBorder">
    <x-table ref="xTable" :type="table.type" @afterTableLoad="afterTableLoad" :columns="table.columns" v-if="table.type">
    </x-table>
    <div v-if="$base.filter() === 3" class="derived-box" slot="headerRight">
      <el-popover placement="bottom-end" trigger="hover">
        <div class="derived_popover">
          <ul>
            <li @click="toExcel('exportTabl')">导出表格</li>
          </ul>
        </div>
        <div class="derived-box_btn" slot="reference">
          <i class="el-icon-more-outline"></i>
        </div>
      </el-popover>
    </div>
  </x-border>
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
        table: {
          type: null,
          columns: null
        },
        tableName: null, // 名称,
        icon: null
      }
    },
    methods: {
      async init () {
        this.tableName = this.widget.value.title
        if (!this.tableName) {
          this.tableName = this.$api.vuexLocalGet('admin_current_menu').name
        }
        this.table = this.widget.value.table
        if (this.widget.value && this.widget.value.icon) {
          this.icon = this.widget.value.icon.name
        }
      },
      // 表格加载完成事件
      afterTableLoad (dataResult) {
        this.$nextTick(() => {
          this.$refs.xBorder.changeStyle(this.tableName, this.icon, this.widget.value.themeColor, dataResult.description)
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
  @import "./index.scss";
</style>

