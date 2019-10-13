<template>
  <x-border title="产品线" color="info" icon="flaticon-interface-7">
    <div class="product-line" v-if="viewModel">
      <div class="product-line_from">
        <el-form :model="ruleForm" label-width="200px" size="medium" class="form-open">
          <el-form-item label="产品线名称" :required="true">
            <el-input v-model="viewModel.name" class="form-open_input"></el-input>
            <div class="form-open_intro">请输入产品线名称</div>
          </el-form-item>
          <el-form-item label="介绍">
            <el-input v-model="viewModel.intro" type="textarea" class="form-open_input"></el-input>
            <div class="form-open_intro">请输入介绍内容</div>
          </el-form-item>
        </el-form>
      </div>
      <div class="product-line_table">
        <x-line :border="true" title="产品线商品" icon="null" type="metal">
          <div slot="headerRight" class="add-buttom" @click="addGood">新增商品</div>
          <el-form :model="ruleForm" label-width="200px" size="medium" class="form-open">
            <el-form-item :required="true">
              <div class="line-table_list">
                <Table :viewModel="viewModel" @addChange="addChange"></Table>
              </div>
            </el-form-item>
          </el-form>
        </x-line>
      </div>
      <el-dialog title="新增商品" :visible.sync="dialogVisible" width="60%">
        <SelectGoods :dialogVisible="dialogVisible" :idArr="idArr" ref="SelectGoods"></SelectGoods>
        <span slot="footer" class="dialog-footer">
          <el-button @click="dialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="saveEdit">确 定</el-button>
        </span>
      </el-dialog>
      <div class="role-foot">
        <el-button @click="save" class="role-foot_right" :loading="loading">保存</el-button>
        <div class="role-foot_left">取消</div>
      </div>
    </div>
  </x-border>
</template>
<script>
  import SelectGoods from './widgets/select-goods'
  import Table from './table'
  export default {
    props: {
      widgetData: {}
    },
    components: {
      SelectGoods,
      Table
    },
    data () {
      return {
        ruleForm: {
          name: '',
          region: ''
        },
        dialogVisible: false,
        viewModel: [],
        idArr: [],
        loading: false
      }
    },
    mounted () {
      this.init()
    },
    methods: {
      async init () {
        var para = {
          id: this.$route.query.id
        }
        var response = await this.$api.httpGet('/Api/ProductLine/Edit', para)
        if (response.status === 1) {
          this.viewModel = response.result
          this.idArr = this.viewModel.productIds.split(',')
        }
      },
      addGood () {
        this.dialogVisible = true
      },
      async productEdit () {
        var data = {}
        await this.$api.httpPost('/Api/AdminBasic/Edit', data)
      },
      async save () {
        this.loading = true
        var productIds = this.idArr.join(',')
        var para = {
          name: this.viewModel.name,
          intro: this.viewModel.intro,
          sortOrder: this.viewModel.sortOrder,
          modifiedTime: this.viewModel.modifiedTime,
          id: this.viewModel.id,
          createTime: this.viewModel.createTime,
          version: this.viewModel.version,
          productIds
        }
        var response = await this.$api.httpPost('/Api/ProductLine/Edit', para)
        this.$crud.message(response)
        this.init()
        this.loading = false
      },
      saveEdit () {
        var list = this.$refs.SelectGoods.multipleSelection
        if (list !== '') {
          for (let i of list) {
            this.idArr.push(i.id)
            this.viewModel.productList.push(i)
          }
        }
        this.dialogVisible = false
      },
      addChange (val) {
        this.idArr.splice(val, 1)
      }
    }
  }
</script>
<style rel="stylesheet/scss" lang="scss">
  @import "./styles/style.scss";
  .operation {
    display: flex;
  }
</style>
