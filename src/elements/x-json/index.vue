<template>
  <div class="x-json" v-if="async">
    <div class="activity-table-cont">
      <el-table style="width: 100%" :data="tableList.tableValue">
        <el-table-column :prop="head.prop" :label="head.label" width="100" v-for="(head,headIndex) in tableList.tableHead" :key="headIndex">
          <template slot-scope="scope">
            <div v-if="head.type==='floatingInput'">
              <el-input v-model="scope.row[head.prop]" type="number" placeholder="请输入内容" @change="inputChange"></el-input>
            </div>
            <div v-else-if="head.type==='input'">
              <el-input v-model="scope.row[head.prop]" placeholder="请输入内容" @change="inputChange"></el-input>
            </div>
            <div v-else-if="head.type==='hide'">
              <el-input v-model="scope.row[head.prop]" placeholder="请输入内容" type="hidden" @change="inputChange"></el-input>
            </div>
            <div v-else-if="head.type==='label'">
              {{scope.row[head.prop]}}
            </div>
            <div v-else>
              {{scope.row[head.prop]}}
            </div>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>
<script>
  import convert from './convert.js'
  export default {
    data () {
      return {
        async: false,
        tableList: {
          tableHead: [],
          tableValue: []
        },
        currentValue: [],
        price: 0,
        separatePrice: 0,
        testValue: []
      }
    },
    props: {
      widget: {},
      value: {}
    },
    mounted () {
      this.init()
    },
    methods: {
      init () {
        if (!this.$api.isEmpty(this.widget)) {
          if (this.widget.jsonItems.length !== 0) {
            var that = this
            this.widget.jsonItems[0].items.forEach((items, itemsIndex) => {
              var list = {
                prop: items.field,
                label: items.name,
                type: convert.getType(items.type)
              }
              that.tableList.tableHead.push(list)
            })
            this.widget.jsonItems.forEach((item, itemIndex) => {
              var list = {}
              item.items.forEach((items, itemsIndex) => {
                for (var i in items) {
                  var value
                  if (i === 'field') {
                    value = items[i]
                    list[items[i]] = ''
                  }
                  if (i === 'value') {
                    list[value] = items[i]
                  }
                }
              })
              this.tableList.tableValue.push(list)
            })
            this.async = true
            this.current()
          }
        }
      },
      determine () {
        var that = this
        this.tableList.forEach((list, listIndex) => {
          list.tableValue.forEach((value, valueIndex) => {
            if (that.price !== 0 || that.price > 0) {
              value.price = this.price
            }
            if (that.fenrunprice !== 0 || that.fenrunprice > 0) {
              value.fenrunprice = this.separatePrice
            }
          })
        })
        this.current()
      },
      inputChange () {
        this.current()
      },
      current () {
        var that = this
        this.widget.jsonItems.forEach((value, valueIndex) => {
          value.items.forEach((item, itemIndex) => {
            for (var i in that.tableList.tableValue[valueIndex]) {
              if (item.field === i) {
                item.value = that.tableList.tableValue[valueIndex][i]
              }
            }
          })
        })
        this.$emit('input', this.tableList.tableValue)
      }
    }
  }
</script>

<style lang="scss" rel="stylesheet/scss">
  .x-json {
    .activity-table-title {
      color: #e95a40;
      padding: 12px 0;
      border-bottom: 1px solid #dcdfe6;
    }

    .activity-table-edit {
      padding-top: 19px;
      display: flex;
      align-items: center;
      height: 42px;
    }

    .activity-table-input {
      width: 200px;
      margin-left: 20px;
    }

    .buttom {
      margin-left: 20px;
    }

    .activity-table-cont {
      margin: 20px 0;
      .cell {
        div {
          font-size: 11px;
        }
      }
      .el-input__inner {
        height: 35px;
        line-height: 35px;
        font-size: 11px;
        padding: 0px 10px;
      }
    }
  }
</style>
