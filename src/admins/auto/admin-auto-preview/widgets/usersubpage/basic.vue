<template>
  <div class="user-basic" v-if="viewModel&&viewModel.user">
    <ul class="basic-list">
      <li>
        <div class="basic-text">会员等级</div>
        <div class="basic-input">
          <div class="basic-radio">
            <el-radio-group v-model="viewModel.user.gradeId" v-for="(item, index) in viewModel.gradeList" :key="index">
              <el-radio :label="item.id">{{item.name}}</el-radio>
            </el-radio-group>
          </div>
          <div>状态为正常时才显示</div>
        </div>
      </li>
      <li>
        <div class="basic-text">姓名</div>
        <div class="basic-input">
          <el-input v-model="viewModel.user.name"></el-input>
          <div>填写会员昵称，若要编辑必需填写</div>
        </div>
      </li>
      <li>
        <div class="basic-text">手机</div>
        <div class="basic-input">
          <el-input v-model="viewModel.user.mobile"></el-input>
          <div>请输入有效的手机号码</div>
        </div>
      </li>
      <li>
        <div class="basic-text">邮箱</div>
        <div class="basic-input">
          <el-input v-model="viewModel.user.email"></el-input>
          <div>请输入有效的邮箱，若要编辑必需填写</div>
        </div>
      </li>
      <li>
        <div class="basic-text">状态<span>*</span> </div>
        <div>
          <div class="basic-radio">
            <el-radio-group v-model="viewModel.status" v-for="(item,index) in viewModel.statusList" :key="index">
              <el-radio :label="item.value">{{item.name}}</el-radio>
            </el-radio-group>
          </div>
          <div>状态为正常时才显示</div>
        </div>
      </li>
      <li class="basic-buttom">
        <div class="basic-text"></div>
        <div>
          <el-button type="primary" @click="save">保存</el-button>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
  export default {
    props: ['viewModel', 'actives'],
    data () {
      return {
        stateText: this.actives.getEmun('Status', this.viewModel.user.status)

      }
    },
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

<style lang="scss" scoped>
  @import "./styles/basic.scss";
</style>
<style  lang="scss" scoped>
  .user-basic {
    .el-radio:last-child {
      margin-right: 15px;
    }
  }
</style>
