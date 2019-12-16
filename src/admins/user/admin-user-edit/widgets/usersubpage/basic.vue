<template>
  <div class="user-basic" v-if="viewModel&&viewModel.user">
    <el-form ref="form">
      <el-form-item label="会员等级">
        <el-radio-group v-model="viewModel.user.gradeId" v-for="(item, index) in viewModel.gradeList" :key="index">
          <el-radio :label="item.id">{{item.name}}</el-radio>
        </el-radio-group>
        <div class="admin-user-base-tips">状态为正常时才显示</div>
      </el-form-item>
      <el-form-item label="姓名">
        <el-input v-model="viewModel.user.name"></el-input>
        <div class="admin-user-base-tips">填写会员昵称，若要编辑必需填写</div>
      </el-form-item>
      <el-form-item label="手机">
        <el-input v-model="viewModel.user.mobile"></el-input>
        <div class="admin-user-base-tips">请输入有效的手机号码</div>
      </el-form-item>
      <el-form-item label="邮箱">
        <el-input v-model="viewModel.user.email"></el-input>
        <div class="admin-user-base-tips">请输入有效的邮箱，若要编辑必需填写</div>
      </el-form-item>
      <el-form-item size="large" label-width="240px">
        <el-button type="primary" @click="save">保存</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
  export default {
    props: ['viewModel'],
    mounted () { },
    methods: {
      async save () {
        var user = this.viewModel.user
        var paras = {
          User: {
            Id: user.id,
            UserName: user.userName,
            ParentId: user.parentId,
            GradeId: user.gradeId,
            Name: user.name,
            Mobile: user.mobile,
            Email: user.email
          },
          Status: this.viewModel.status
        }
        var response = await this.$api.httpPost('/Api/UserAdmin/EditBasic', paras)
        this.$crud.message(response)
      }
    }
  }
</script>
<style  lang="scss" scoped>
  .user-basic {
    .el-radio:last-child {
      margin-right: 15px;
    }
    .admin-user-base-tips {
      height: 20px;
      line-height: 20px;
      font-size: 12px;
    }
  }
</style>
