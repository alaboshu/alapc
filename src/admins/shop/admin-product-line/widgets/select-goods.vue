<template>
  <div class="select-goods">
    <div class="selecting_box">
      <div class="keyword">
        <div class="keyword-input">
          <el-input placeholder="输入关键字进行过滤" v-model="dataparm"></el-input>
        </div>
        <div class="keyword-but" @click="dataSearch">搜索</div>
      </div>
      <div class="table_slet">
        <div class="table_left">
          <div>
            <el-table ref="table" :data="tableData" tooltip-effect="dark" style="width: 100%" @selection-change="handleSelectionChange" @row-click="tableCell" max-height="482">
              <el-table-column type="selection" width="55">
              </el-table-column>
              <el-table-column v-for="(column, columnIndex) in tableConfig" :key="columnIndex" :width="column.width" :prop="column.prop" :label="column.label">
                <template slot-scope="scope">
                  <span v-if="column.prop === 'smallUrl'">
                    <img :src="$api.baseUrl()+scope.row[column.prop]" class="img" alt="">
                  </span>
                  <span class="text" v-else>{{ scope.row[column.prop] }}</span>
                </template>
              </el-table-column>
            </el-table>
          </div>
          <el-pagination layout="prev, pager, next, jumper" :page-size="pageSize" @current-change="switchPages" :total="totalPage">
          </el-pagination>
        </div>
        <div class="table_right">
          <div class="right_text">已选择项</div>
          <ul class="selective_list">
            <li v-for="(item,index) in multipleSelection" :key="index" @click="toggleSelection(item)">{{item.name}}</li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  export default {
    props: ['idArr', 'dialogVisible'],
    data () {
      return {
        dataparm: '',
        multipleSelection: '',
        tableConfig: [
          { label: '图片', prop: 'smallUrl', width: 100 },
          { label: '名称', prop: 'name', width: 410 },
          { label: '货号', prop: 'bn', width: '' },
          { label: '价格', prop: 'price', width: '' }
        ],
        tableData: [],
        totalPage: null,
        pageSize: null
      }
    },
    mounted () {
      this.init()
    },
    methods: {
      async init (index) {
        var para = {
          pageIndex: index || 1,
          pageSize: 15
        }
        var response = await this.$api.httpGet('/Api/Product/ProductList', para)
        if (response.status === 1) {
          this.totalPage = response.result.recordCount
          this.pageSize = response.result.pageSize
          this.tableData = response.result.result
          this.data = response.result.result
        }
      },
      async  dataSearch () {
        var list = []
        this.data.forEach(element => {
          if (element.name.indexOf(this.dataparm) > -1 || element.bn.indexOf(this.dataparm) > -1) {
            list.push(element)
          }
        })
        this.tableData = list
      },
      tableCell (row) {
        this.$refs.table.toggleRowSelection(row)
      },
      handleSelectionChange (rows) {
        this.multipleSelection = rows
      },
      toggleSelection (val) {
        this.$refs.table.toggleRowSelection(val)
      },
      switchPages (val) {
        this.init(val)
      }
    },
    watch: {
      dialogVisible (val) {
        if (val === true) {
          if (this.multipleSelection.length > 0) {
            this.multipleSelection = ''
            this.init()
          }
        }
      }
    }
  }
</script>
<style rel="stylesheet/scss" lang="scss">
  @import "../styles/style.scss";
</style>
