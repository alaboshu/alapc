<template>
  <x-border ref="xBorder">
    <x-table ref="xTable" :type="table.type" :columns="table.columns" v-if="table.type">
    </x-table>
    <div v-if="$base.filter() === 3" class="derived-box" slot="borderFooter">
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
        table: {
          type: null,
          columns: null
        },
        tableName: null
      }
    },
    mounted () {
      this.init()
    },
    methods: {
      async init () {
        this.tableName = this.widget.value.title
        this.table = this.widget.value.table
        this.$nextTick(() => {
          this.$refs.xBorder.changeStyle(this.widget.value.title, this.widget.value.icon.name, this.widget.value.themeColor)
        })
      },
      // 表格加载完成事件
      afterTableLoad (dataResult) {
        this.$nextTick(() => {
          if (!this.widget || !this.widget.value) {
            this.$refs.xBorder.changeStyle(dataResult.name)
          }
        })
      },
      toExcel (command) {
        this.$refs.xTable.toExcel(command)
      },
      watchWidget (val) {
        this.init()
        this.$nextTick(() => {
          this.$refs.xTable.init(this.table.type, this.table.columns)
        })
      }
    },
    watch: {
      widget: 'watchWidget',
      $route: 'watchWidget'
    }
  }
</script>
<style rel="stylesheet/scss" lang="scss">
  @import "./index.scss";
</style>

