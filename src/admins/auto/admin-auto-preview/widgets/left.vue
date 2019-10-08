<template>
  <div class="user-left" v-if="viewModel && viewModel.user">
    <div class="edit-left">
      <div class="edit-left-top">
        <div class="edit-user-img">
          <img :src="viewModel.avator" alt>
        </div>
        <div class="edit-subscriber">
          <div class="edit-user-top-title">{{viewModel.user.userName}}({{viewModel.user.name}})</div>
          <div class="edit-user-top-button">{{actives.getEmun('Status', viewModel.user.status)}}</div>
        </div>
        <div class="edit-user-text">18269326776@5ug.com&nbsp;&nbsp;&nbsp;&nbsp;18269326776</div>
        <ul class="edit-user-buttom-button">
          <li>ta的推荐</li>
          <li>发送短信</li>
          <li>删除会员</li>
        </ul>
        <div class="user_top_bottom"></div>
      </div>
      <List :viewModel="viewModel" :actives="actives"></List>
      <div class="team-list">
        <ul class="team-list_ul">
          <li class="team-list_li">
            <div class="team-list_li-left">
              <div class="left-title">团队数量</div>
              <div class="left-enit">Team Number</div>
            </div>
            <div class="right-number number-noe">{{ viewModel.user.map.teamNumber }}</div>
          </li>
          <li class="team-list_li">
            <div class="team-list_li-left">
              <div class="left-title">团队业绩</div>
              <div class="left-enit">Team Sales</div>
            </div>
            <div class="right-number number-two">{{ viewModel.user.map.teamSales.toFixed(2) }}</div>
          </li>
          <li class="team-list_li">
            <div class="team-list_li-left">
              <div class="left-title">推荐会员</div>
              <div class="left-enit">Recommended members</div>
            </div>
            <div class="right-number number-three">0</div>
          </li>
          <li class="team-list_li">
            <div class="team-list_li-left">
              <div class="left-title">登录次数</div>
              <div class="left-enit">Login Number</div>
            </div>
            <div class="right-number number-four">{{viewModel.userDetail.loginNum}}</div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>
<script>
  import list from './edit.json'
  import List from './list.vue'
  export default {
    props: ['viewModel'],
    components: {
      List
    },
    data () {
      return {
        list: list.list
      }
    }
  }
</script>
<style rel="stylesheet/scss" lang="scss">
  @import "./style.scss";
</style>
