<template>
  <x-border ref="xBorder">
    <x-table ref="xTable" :type="table.type" @afterTableLoad="afterTableLoad" :columns="table.columns" v-if="table.type">
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
        tableName: null, // 名称,
        icon: null
      }
    },
    mounted () {
      this.init()
    },
    methods: {
      async init () {
        console.info('this.widget', this.widget.value)
        this.tableName = this.widget.value.title
        this.table = this.widget.value.table
        if (this.widget.value && this.widget.value.icon) {
          this.icon = this.widget.value.icon.name
        }
        this.$nextTick(() => {
          this.$refs.xBorder.changeStyle(this.tableName, this.icon, this.widget.value.themeColor)
        })
      },
      // 表格加载完成事件
      afterTableLoad (dataResult) {
        this.$nextTick(() => {
          if (!this.tableName) {
            this.$refs.xBorder.changeStyle(dataResult.name)
          }
        })
      },
      toExcel (command) {
        this.$refs.xTable.toExcel(command)
      },
      watchWidget (val) {
        console.info('监听', val)
        this.init()
        this.$nextTick(() => {
          this.$refs.xTable.init(this.table.type, this.table.columns)
        })
      }
    }
  }
</script>
<style rel="stylesheet/scss" lang="scss">
  @import "./index.scss";
</style>

