<template>
  <x-border title="短信发送" color="info">
    <div class="admin-sms-send">
      <div class="sms-send_top">
        <div class="alert-success">
          <p class="alert-p1">短信发送说明：</p>
          <p class="alert-p2">短信内容不能含有黄赌毒，宗教，党政等信息</p>
          <p class="alert-p2">短信内容要求2~60个字，无须添加【】符号，发送会自带【】符号</p>
        </div>
        <div class="sms-send_form">
          <el-form label-width="250px">
            <el-form-item label="手机号码" :required="true">
              <el-input></el-input>
              <div class="stored-edit_intro">请输入手机号码</div>
            </el-form-item>
            <el-form-item label="消息内容" :required="true">
              <el-input type="textarea"></el-input>
              <div class="stored-edit_intro">请输入消息内容</div>
            </el-form-item>
          </el-form>
        </div>
      </div>
      <div class="stored_footer">
        <div class="stored_btn">发送短信</div>
      </div>
    </div>
  </x-border>
</template>
<script>
  export default {

  }
</script>
<style rel="stylesheet/scss" lang="scss">
  @import "./admin-sms-send.scss";
</style>
