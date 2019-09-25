<template>
  <div class="x-select-table">
    <el-form-item>
      <el-input placeholder="请选择用户" @focus="dialogFormVisible = true">
        <template slot="append">
          <div @click="dialogFormVisible=true" class="cuopoin">选择用户</div>
        </template>
      </el-input>
    </el-form-item>
    <el-dialog title="选择商品" width="70%" top="5vh" :visible.sync="dialogFormVisible">
      <x-table @change="change" :widgetData="widgetData" @onvalue="onfaus"  v-if="async"></x-table>
    </el-dialog>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        async: false,
        dialogFormVisible: false,
        widgetData: ''
      }
    },
    props: {
      widget: {}
    },
    mounted () {
      this.init()
    },
    methods: {
      async init () {
        this.widgetData = this.widget
        this.widgetData.dataSelectDisplay = true
        this.widgetData.fromFieldProperty = false// 为true时x-data-select为单选，为false时为多选

        // var response = await this.$api.httpGet(this.widget.dataSource)
        this.async = false
      },
      onfaus (value, row, column) {
      },
      change (val) {
        // setTimeout(() => {
        //   this.sectLoading = false
        // }, 500)
      }
    }
  }
</script>
