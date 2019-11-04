<template>
  <div class="detailed" v-if="viewModel&&viewModel.user">
    <el-form ref="form">
      <el-form-item label="性别" v-if="false">
        <x-radio type="Sex" v-model="viewModel.sex"></x-radio>
        <div class="detail-user-base-tips">请选择性别</div>
      </el-form-item>
      <el-form-item label="所在区域">
        <x-city-picker v-model="viewModel.userDetail.regionId"></x-city-picker>
        <div class="detail-user-base-tips">请选择您所在的区域</div>
      </el-form-item>
      <el-form-item label="详细地址">
        <el-input value="fdsklaj" v-model="viewModel.address"></el-input>
        <div class="detail-user-base-tips">请输入您所在区域的详细地址</div>
      </el-form-item>
      <el-form-item label="出生日期" :rules="[{ required: true, message: '出生日期不能为空'}]">
        <el-date-picker type="date" v-model="viewModel.userDetail.birthday" placeholder="选择日期"></el-date-picker>
        <div class="detail-user-base-tips">请选择您的生日</div>
      </el-form-item>
      <el-form-item label="备注">
        <el-input type="textarea" v-model="viewModel.userDetail.remark"></el-input>
        <div class="detail-user-base-tips">请填写该备注</div>
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
    data () {
      return {
      }
    },
    methods: {
      async save () {
        var Region = String(this.viewModel.userDetail.regionId)
        var para = {
          User: {
            Id: this.viewModel.userDetail.id,
            UserName: this.viewModel.user.userName
          },
          Sex: this.viewModel.Sex,
          ProvinceRegionId: Number.parseInt(Region.substr(0, 2) + '0000'),
          CityId: Number.parseInt(Region.substr(0, 4) + '00'),
          RegionId: Number.parseInt(Region),
          UserDetail: {
            Id: this.viewModel.userDetail.id,
            AddressId: this.viewModel.userDetail.addressId,
            Birthday: this.viewModel.userDetail.birthday,
            RegionId: Number.parseInt(Region),
            Remark: this.viewModel.userDetail.remark
          },
          Address: this.viewModel.address
        }
        var response = await this.$api.httpPost('/Api/UserAdmin/Edit', para)
        this.$crud.message(response)
      }
    }
  }
</script>


<style lang="scss">
  .detailed {
    .el-textarea__inner {
      height: 70px;
    }
    .el-radio-group {
      margin-right: 15px;
    }
    .el-radio__label {
      margin-left: 5px;
    }
    .detail-user-base-tips {
      height: 20px;
      line-height: 20px;
    }
  }
</style>

