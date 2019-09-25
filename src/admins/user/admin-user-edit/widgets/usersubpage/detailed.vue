<template>
  <div class="detailed" v-if="viewModel&&viewModel.user">
    <ul class="detailed-list">
      <li>
        <div class="detailed-text gender">
          性别
          <span>*</span>
        </div>
        <div class="detailed-input">
          <div class="detailed-radio">
            <el-radio-group v-model="genderType" v-for="(item, index) in gender" :key="index">
              <el-radio :label="item">{{item}}</el-radio>
            </el-radio-group>
          </div>
        </div>
      </li>
      <li>
        <div class="detailed-text">所属门店</div>
        <div class="detailed-input">
          <el-input v-model="viewModel.serviceCenterUserName"></el-input>
          <div>请输入门店所属人的用户名</div>
        </div>
      </li>
      <li>
        <div class="detailed-text">所在区域</div>
        <div class="detailed-input">
          <x-city-picker v-model="viewModel.userDetail.regionId"></x-city-picker>
        </div>
      </li>
      <li>
        <div class="detailed-text">详细地址</div>
        <div class="detailed-input">
          <el-input value="fdsklaj" v-model="viewModel.address"></el-input>
        </div>
      </li>
      <li>
        <div class="detailed-text">
          出生日期
          <span>*</span>
        </div>
        <div class="detailed-input">
          <el-date-picker type="date" v-model="viewModel.userDetail.birthday" placeholder="选择日期"></el-date-picker>
        </div>
      </li>
      <li>
        <div class="detailed-text">备注</div>
        <div class="detailed-input">
          <el-input type="textarea" v-model="viewModel.userDetail.remark"></el-input>
        </div>
      </li>
      <li class="detailed-buttom">
        <div class="detailed-text"></div>
        <div class="detailed-input">
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
        gender: ['男', '女', '保密'],
        genderType: this.actives.getEmun('Sex', this.viewModel.sex)
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
          ServiceCenterUserName: this.viewModel.serviceCenterUserName,
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



<style lang="scss" scoped>
  @import "./styles/detailed.scss";
</style>

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
  }
</style>

