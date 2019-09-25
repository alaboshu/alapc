<template>
  <div class="x-data-select">
    <el-form-item>
      <el-input placeholder="请输入内容" v-model="datausername" @focus="formInput">
        <template slot="append">
          <div @click="dialogFormVisible=true" class="cuopoin">选择商品</div>
        </template>
      </el-input>
    </el-form-item>
    <el-dialog title="选择商品" width="70%" top="5vh" :visible.sync="dialogFormVisible">
      <div v-loading.fullscreen.lock="sectLoading" class="xtable-select">
        <x-table @change="change" :widgetData="widgetData" v-if="widgetData" @onvalue="onfaus"></x-table>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  import tableJson from './user'
  import widget from './widget'
  import api from './product'
  export default {
    name: 'x-data-select',
    props: {
      elementData: {},
      dataName: {},
      type: {},
      widgetData: {}
    },
    data () {
      return {
        widgetModel: '',
        tableJson: '',
        dialogFormVisible: false,
        datausername: '',
        sectLoading: true
      }
    },
    mounted () {
      this.init()
    },
    methods: {
      async init () {
        this.widgetModel = widget
        this.tableJson = tableJson
        this.widgetData.dataSelectDisplay = true
        this.widgetData.fromFieldProperty = false// 为true时x-data-select为单选，为false时为多选
        if (this.type === 'widget') {
          this.tableJson = widget
        } else if (this.type === 'api') {
          this.tableJson = api
        }
        if (this.dataName) {
          this.datausername = this.dataName
        }
      },
      onfaus (value, row, column) {
        var strName = ''
        // if (this.type === 'widget') {
        //   strName = row[0].path
        // }
        // if (this.type === 'api') {
        //   strName = row[0].url
        // }
        for (var i = 0; i < row.length; i++) {
          if (this.type === 'widget') {
            strName = strName + row[i].path
          } else if (this.type === 'api') {
            strName = strName + row[i].url
          } else {
            strName = strName + row[i].name
          }
          if (row[i + 1]) {
            strName = strName + ','
          }
        }
        this.datausername = strName
        this.dialogFormVisible = value
        this.$emit('xdata', row, column)
        this.$emit('apiData', row, column)
      },
      formInput () {
        this.dialogFormVisible = true
      },
      change (val) {
        setTimeout(() => {
          this.sectLoading = false
        }, 500)
      }
    }
  }
</script>
<style rel="stylesheet/scss" lang="scss">
  .el-input-group__append {
    width: 150px;
  }
  .cuopoin {
    cursor: pointer;
    text-align: center;
  }
  .text-placeholder {
    color: #c0c4cc;
  }
  .xtable-select {
    // max-height: 80vh;
    height: 100%;
    overflow: auto;
  }
  .xtable-select::-webkit-scrollbar {
    width: 5px;
    height: 40px;
  }

  .xtable-select::-webkit-scrollbar-thumb {
    width: 5px;
    background-color: #dcdfe6;
    border-radius: 10px;
  }
</style>
