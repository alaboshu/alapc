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
        borderModel: {
          title: '',
          icon: '',
          description: '',
          type: ''
        },
        widgetValue: ''
      }
    },
    methods: {
      async init () {
        if (!this.widget.value || this.widget.value.table) {
          this.$admin.message('类型传入不正确,请重新传入', 'danger')
        }
        this.widgetValue = this.widget.value
        this.table = this.widgetValue.table
        console.info('this.widgetValue', this.widgetValue)
      },
      // 获取边框
      getBorder (widget, typeBorder) {
        if (typeBorder) {
          this.borderModel = typeBorder // 使用服务返回的数据
        }
        if (this.widgetValue) {
          // 优先级：先使用DIY传过来的数据
          if (this.widgetValue.title) {
            this.borderModel.title = this.widgetValue.title
          }
          this.borderModel.type = this.widgetValue.themeColor
        }
        if (!this.borderModel.title) {
          this.borderModel.title = this.$api.vuexLocalGet('admin_current_menu').name
        }
        if (this.widget.value && this.widget.value.icon) {
          // this.icon = this.widget.value.icon.name
        }
      },
      // 表格加载完成事件
      afterTableLoad (dataResult) {
        this.$nextTick(() => {
          dataResult.border.type = this.widget.value.themeColor
          var border = this.getBorder(dataResult.border)
          console.info('边框', border)
          this.$refs.xBorder.init(border)
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

