<template>
  <x-border title="储值设置" color="success">
    <div class="store-value">
      <div class="store-value_head">
        <div class="store_btn" @click="newRules">新增储值规则</div>
        <div class="store_text">储值规则(最多添加九行)</div>
      </div>
      <div class="store-value_table">
        <el-table :data="tableData" style="width: 100%" stripe="true">
          <el-table-column label="序号" width="50">
            <template slot-scope="scope">
              {{scope.$index+1}}
            </template>
          </el-table-column>
          <el-table-column label="充值金额">
            <template slot-scope="scope">
              ￥{{scope.row.recharge}}
            </template>
          </el-table-column>
          <el-table-column label="到账余额">
            <template slot-scope="scope">
              ￥{{scope.row.account}}
            </template>
          </el-table-column>
          <el-table-column label="赠送兑换劵">
            <template slot-scope="scope">
              ￥{{scope.row.convertible}}
            </template>
          </el-table-column>
          <el-table-column label="赠送购物劵">
            <template slot-scope="scope">
              <div class="column_text">
                ￥{{ scope.row.shop }}
              </div>
            </template>
          </el-table-column>
          <el-table-column label="操作" width="100">
            <template slot-scope="scope">
              <div class="colomn_btn" @click="handleEdit(scope.$index, scope.row)">修改</div>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div class="stored-footer">
        <div class="stored-footer_but">保存</div>
      </div>
      <el-dialog title="储值比例设置" :visible.sync="dialogVisible" width="25%" top="30vh" :before-close="handleClose">
        <div class="dialog_column">
          <div class="dialog_column-left">
            <div class="list-box">
              <div class="list-box_text">储值金额</div>
              <el-input v-model="valueModel.recharge"></el-input>
            </div>
            <div class="list-box">
              <div class="list-box_text">到账金额</div>
              <el-input v-model="valueModel.account"></el-input>
            </div>
          </div>
          <div class="dialog_column-left">
            <div class="list-box">
              <div class="list-box_text">赠送兑换劵</div>
              <el-input v-model="valueModel.convertible"></el-input>
            </div>
            <div class="list-box">
              <div class="list-box_text">赠送购物劵</div>
              <el-input v-model="valueModel.shop"></el-input>
            </div>
          </div>
          <div class="statement-text">赠送兑换劵=赠送购物劵</div>
          <div class="dialog-footer">
            <div class="dialog-footer_list">
              <div class="footer_btn" @click="dialogVisible=flase">取消</div>
            </div>
            <div class="dialog-footer_list">
              <div class="footer_btn btn-color" @click="storedValue">储值</div>
            </div>
          </div>
        </div>
      </el-dialog>
    </div>
  </x-border>
</template>
<script>
  export default {
    data () {
      return {
        tableData: [{
          recharge: '100',
          account: '140',
          convertible: '110',
          shop: '100'
        },
        {
          recharge: '100',
          account: '140',
          convertible: '110',
          shop: '100'
        },
        {
          recharge: '100',
          account: '140',
          convertible: '110',
          shop: '100'
        },
        {
          recharge: '100',
          account: '140',
          convertible: '110',
          shop: '100'
        }
        ],
        dialogVisible: false,
        valueModel: {
          recharge: '',
          account: '',
          convertible: '',
          shop: ''
        }
      }
    },
    mounted () {

    },
    methods: {
      async newRules () {
        if (this.tableData.length < 9) {
          this.valueModel = {
            recharge: '',
            account: '',
            convertible: '',
            shop: ''
          }
          this.dialogVisible = true
        } else {
          this.$notify({
            title: '警告',
            message: '储蓄规则最多只能添加9条',
            type: 'warning',
            position: 'bottom-right'
          })
        }
      },
      handleEdit (index, conter) {
        this.dialogVisible = true
      },
      async storedValue () {
        this.tableData.push(this.valueModel)
        this.dialogVisible = false
      }
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss">
  @import "./style.scss";
</style>
