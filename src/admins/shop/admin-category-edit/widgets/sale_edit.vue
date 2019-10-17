<template>
  <div class="sale-edit dialog-box" v-if="inshow">
    <div class="edit-head">
      <div class="edit-head_left">销售属性<span class="edit-head_intro">商品销售属性信息，比如服装类目中的颜色和尺码，销售属性至少一个，最多三个</span></div>
      <div class="edit-head_right">
        <div class="right-buttom" @click="saleEdit">新增销售属性</div>
      </div>
    </div>
    <div class="edit-table">
      <el-table :data="salePropertys" style="width: 100%">
        <el-table-column label="名称" prop="name" width="180">
          <template slot-scope="scope">
            {{scope.row.name}}
          </template>
        </el-table-column>
        <el-table-column label="属性值">
          <template slot-scope="scope" prop="valueName">
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
    <el-dialog title="新增销售属性" :visible.sync="dialogVisible" width="70%" top="15vh">
      <div class="display-edit">
        <el-form ref="form" label-width="150px" size="mini">
          <el-form-item label="名称">
            <el-input maxlength="10" v-model="tableList.name" @keydown.native="restrictedNum" placeholder="请输入类目名称"></el-input>
            <div class="sale-intro">请输入销售属性名称</div>
          </el-form-item>
          <el-form-item label="排序">
            <el-input-number v-model="tableList.sortOrder" controls-position="right" :min="1" :max="10"></el-input-number>
            <div class="sale-intro">设置商品属性排序</div>
          </el-form-item>
        </el-form>
        <x-line title="新增销售属性值"></x-line>
        <div class="dialog-table">
          <el-table :data="tableList.values" style="width: 100%">
            <el-table-column label="名称" prop="name">
              <template slot-scope="scope">
                <el-input maxlength="10" @change.native="valueNameInput(scope.$index, $event)" v-model="scope.row.valueName"></el-input>
              </template>
            </el-table-column>
            <el-table-column label="操作">
              <template slot-scope="scope">
                <div class="scope-buttom">
                  <div class="but-two" @click="attributeDelete(scope.$index, scope.row)">删除</div>
                </div>
              </template>
            </el-table-column>
          </el-table>
          <el-button type="primary" style="margin-top: 20px;" @click="editValues">新增属性</el-button>
        </div>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click.native="save">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
  import sale from './js/sale'
  export default {
    props: {
      productView: {

      }
    },
    data () {
      return {
        topcategory: false,
        typecategory: '',
        dialogVisible: false,
        radioGroup: '',
        saleName: '',
        tableList: [],
        addEdit: '',
        salePropertys: '',
        inshow: false,
        listIndex: null
      }
    },
    mounted () {
      this.init()
    },
    methods: {
      async init () {
        this.inshow = false
        this.salePropertys = this.productView.salePropertys
        this.inshow = true
      },
      handleDelete (index, val) {
        sale.handleDelete(this, index, val)
      },
      attributeDelete (index, val) {
        this.tableList.values.splice(index, 1)
      },
      handleEdit (index, val) {
        this.dialogVisible = true
        this.tableList = val
        this.listIndex = index
      },
      save () {
        sale.save(this)
      },
      saleEdit () {
        sale.saleEdit(this)
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

