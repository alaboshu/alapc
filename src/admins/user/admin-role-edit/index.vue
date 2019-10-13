<template>
  <x-border title="岗位权限" type="success" icon="flaticon-add-circular-button">
    <div class="role-box" v-if="async">
      <div>
        <el-form label-width="200px" size="medium" class="form-open">
          <el-form-item label="岗位名称" :required="true">
            <el-input v-model="viewModel.name" class="form-open_input"></el-input>
            <div class="form-open_intro">请输入岗位名称</div>
          </el-form-item>
          <el-form-item label="岗位说明" :required="true">
            <el-input type="textarea" v-model="viewModel.summary" class="form-open_input"></el-input>
            <div class="form-open_intro">请输入岗位说明</div>
          </el-form-item>
        </el-form>
      </div>
      <div>
        <x-line :border="true" title="选择该岗位的权限" type="metal" icon="flaticon-layers">
          <el-form label-width="200px" size="medium" class="form-open">
            <el-form-item label="" :required="true">
              <div class="role-item_box">
                <div class="el-tree_list">
                  <el-tree ref="role_list" :data="viewTree" show-checkbox node-key="id" :props="defaultProps" :default-checked-keys="viewModel.roleIds" @check="change">
                  </el-tree>
                </div>
              </div>
            </el-form-item>
          </el-form>
        </x-line>
      </div>
      <div class="role-foot">
        <el-button class="role-foot_right" :loading="loading" @click="save">保存岗位功能</el-button>
        <div class="role-foot_left">取消</div>
      </div>
    </div>
  </x-border>
</template>
<script>
  export default {
    data () {
      return {
        async: false,
        viewModel: null,
        viewTree: '',
        defaultProps: {
          children: 'appItems',
          label: 'name'
        },
        loading: false,
        roleIdsList: []
      }
    },
    mounted () {
      this.init()
    },
    methods: {
      async init () {
        var paras = {
          id: this.$route.query.id
        }
        var res = await this.$api.httpGet('/Api/PostRole/ViewById', paras)
        this.viewModel = res.result
        var response = await this.$api.httpGet('/Api/PostRole/tree')
        this.viewTree = response.result
        this.async = true
      },
      change (e, b) {
        this.viewModel.roleIds = this.$refs.role_list.getCheckedKeys()
      },
      async save () {
        this.roleIdsList = [...this.viewModel.roleIds]
        this.$refs.role_list.getHalfCheckedNodes().forEach(item => {
          this.roleIdsList.push(item.id)
        })
        this.loading = true
        var para = {
          id: this.$route.query.id,
          name: this.viewModel.name,
          summary: this.viewModel.summary,
          roleIds: this.roleIdsList
        }
        var response = await this.$api.httpPost('/Api/PostRole/Edit', para)
        this.$crud.message(response)
        this.init()
        this.loading = false
      }
    }
  }
</script>
<style rel="stylesheet/scss" lang='scss'>
  @import "./styles/style.scss";
  @import "./styles/open.scss";
</style>
