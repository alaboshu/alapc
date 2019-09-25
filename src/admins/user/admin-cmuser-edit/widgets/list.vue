<template>
  <ul class="edit-left-center">
    <li>
      <div class="edit-left-list-left">
        <i class="icon iconfont"></i>
        <span>会员等级</span>
      </div>
      <div class="edit-left-list-right">
        <i class="icon iconfont"></i>
        <span>{{viewModel.user.userGradeConfig.name}}</span>
      </div>
    </li>
    <!-- <li>
      <div class="edit-left-list-left">
        <i class="icon iconfont"></i>
        <span>实名认证？</span>
      </div>
      <div class="edit-left-list-right">
        <i class="icon iconfont"></i>
        <span>{{actives.getEmun('IdentityStatus', viewModel.identityStatus)}}</span>
      </div>
    </li> -->
    <li>
      <div class="edit-left-list-left">
        <i class="icon iconfont"></i>
        <span>推荐人</span>
      </div>
      <div class="edit-left-list-right">
        <i class="icon iconfont"></i>
        <span>{{viewModel.serviceCenterUserName}}</span>
      </div>
    </li>
    <!-- <li>
      <div class="edit-left-list-left">
        <i class="icon iconfont"></i>
        <span>门店？</span>
      </div>
      <div class="edit-left-list-right">
        <i class="icon iconfont"></i>
        <span>{{viewModel.serviceCenterName}}</span>
      </div>
    </li> -->
    <li>
      <div class="edit-left-list-left">
        <i class="icon iconfont"></i>
        <span>性别</span>
      </div>
      <div class="edit-left-list-right">
        <i class="icon iconfont"></i>
        <span>{{actives.getEmun('Sex', viewModel.sex)}}</span>
      </div>
    </li>
    <!-- <li>
      <div class="edit-left-list-left">
        <i class="icon iconfont"></i>
        <span>所属区域</span>
      </div>
      <div class="edit-left-list-right">
        <i class="icon iconfont"></i>
        <span>{{viewModel.regionName}}</span>
      </div>
    </li> -->
    <li>
      <div class="edit-left-list-left">
        <i class="icon iconfont"></i>
        <span>最后登录IP</span>
      </div>
      <div class="edit-left-list-right">
        <i class="icon iconfont"></i>
        <span>{{viewModel.user.detail.lastLoginIp}}</span>
      </div>
    </li>
    <li>
      <div class="edit-left-list-left">
        <i class="icon iconfont"></i>
        <span>注册时间</span>
      </div>
      <div class="edit-left-list-right">
        <i class="icon iconfont"></i>
        <span>{{viewModel.user.detail.createTime}}</span>
      </div>
    </li>
    <li>
      <div class="edit-left-list-left">
        <i class="icon iconfont"></i>
        <span>最后登录时间</span>
      </div>
      <div class="edit-left-list-right">
        <i class="icon iconfont"></i>
        <span>{{viewModel.user.detail.lastLoginTime}}</span>
      </div>
    </li>
  </ul>
</template>

<script>
  export default {
    props: ['viewModel', 'actives']
  }
</script>
