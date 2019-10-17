<template>
  <div class="commodity_edit dialog-box">
    <div class="edit-head">
      <div class="edit-head_left">商品参数<span class="edit-head_intro">商品参数，非销售属性，比如出场地、质保时间、有效期、材料、做工、适用范围等。详细的商品参数更利于销售</span></div>
      <div class="edit-head_right">
        <div class="right-buttom" @click="commodityEdit">新增商品属性</div>
      </div>
    </div>
    <div class="edit-table">
      <el-table :data="displayPropertys" style="width: 100%">
        <el-table-column label="名称" width="150">
          <template slot-scope="scope">
            {{scope.row.name}}
          </template>
        </el-table-column>
        <el-table-column label="输入类型" width="100">
          <template slot-scope="scope">
            {{$base.getEnumText('ControlsType',scope.row.controlsType)}}
          </template>
        </el-table-column>
        <el-table-column label="属性值">
          <template slot-scope="scope">
            {{scope.row.intro}}
          </template>
        </el-table-column>
        <el-table-column label="操作" width="150">
          <template slot-scope="scope">
            <div class="scope-buttom">
              <div class="but-one" @click="handleEdit(scope.$index, scope.row)">编辑</div>
              <div class="but-two" @click="handleDelete(scope.$index, scope.row)">删除</div>
            </div>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <el-dialog title="新增商品属性" :visible.sync="dialogVisible" width="70%" top="15vh">
      <div class="display-edit">
        <el-form ref="form" label-width="150px" size="mini">
          <el-form-item label="名称">
            <el-input @keydown.native="restrictedNum" maxlength="10" v-model="tableList.name" placeholder="请输入类目名称"></el-input>
            <div class="sale-intro">请输入商品属性名称</div>
          </el-form-item>
          <el-form-item label="排序">
            <el-input-number v-model="tableList.sortOrder" controls-position="right" :min="1" :max="10"></el-input-number>
            <div class="sale-intro">请输入商品属性名称</div>
          </el-form-item>
          <el-form-item label="类型">
            <el-radio-group v-model="tableList.controlsType">
              <el-radio :label="2">文本</el-radio>
              <el-radio :label="5">单选</el-radio>
              <el-radio :label="6">下拉</el-radio>
              <el-radio :label="4">复选</el-radio>
            </el-radio-group>
            <div class="sale-intro">请选择类型</div>
          </el-form-item>
        </el-form>
        <x-line title="新增商品属性值"></x-line>
        <div v-if="tableList.controlsType !=2">
          <div class="dialog-table">
            <el-table :data="tableList.values" style="width: 100%">
              <el-table-column label="名称" prop="name">
                <template slot-scope="scope">
                  <el-input maxlength="10" @change="valueNameInput(scope.$index, $event)" v-model="scope.row.valueName"></el-input>
                </template>
              </el-table-column>
              <el-table-column label="操作">
                <template slot-scope="scope">
                  <div class="scope-buttom">
                    <div class="but-two" @click="commodityDetele(scope.$index, scope.row)">删除</div>
                  </div>
                </template>
              </el-table-column>
            </el-table>
            <el-button type="primary" style="margin-top: 20px;" @click="editValues">新增属性</el-button>
          </div>
        </div>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="save(2)">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
  import commodity from './js/commodity.js'
  export default {
    props: {
      productView: {}
    },
    data () {
      return {
        dialogVisible: false,
        tableList: [],
        addList: [],
        radioGroup: '4',
        displayEdit: '',
        displayPropertys: this.productView.displayPropertys,
        listInde: null
      }
    },
    methods: {
      handleDelete (index, val) {
        commodity.handleDelete(this, index, val)
      },
      commodityDetele (index, val) {
        this.tableList.values.splice(index, 1)
      },
      handleDeletes (index, val) {
        console.log(this.displayPropertys, index, val)
      },
      commodityEdit () {
        this.dialogVisible = true
        commodity.commodityEdit(this)
      },
      save (index) {
        commodity.save(this)
      },
      handleEdit (index, val) {
        this.tableList = val
        this.dialogVisible = true
        this.listInde = index
      },
      editValues () {
        var data = {
          id: '00000000-0000-0000-0000-000000000000',
          valueName: ''
        }
        this.tableList.values.push(data)
      },
      restrictedNum (ev) {
        if (ev.target.value.length > 30) {
          this.$alert('最多输入三十个字符').then(() => { }).catch(() => { })
          this.tableList.name = ''
        }
      },
      valueNameInput (index, ev) {
        if (ev.target.value.length > 8) {
          this.$alert('最多输入八个字符').then(() => { }).catch(() => { })
          this.tableList.values[index].valueName = ''
        }
      }
    }
  }
</script>
<style rel="stylesheet/scss" lang="scss">
  @import "./style.scss";
</style>

