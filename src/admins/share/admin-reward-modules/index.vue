<template>
  <div class="admin-reward-modules">
    <div class="modules-search">
      <el-input placeholder="请输入维度名称，简介，维度Id等" v-model="searchValue" @input="searchSubimt"></el-input>
      <div class="search-buttom" @click="searchSubimt">搜索</div>
    </div>
    <div class="reward-modules_ul">
      <div class="reward-modules_li" v-for="(item,index) in widgetModel" :key="index">
        <div class="reward-modules_box">
          <div class="modules_li-left">
            <router-link :to="'/Admin/RewardRule/Edit?moduleId='+item.id" class="modules-title" :title="item.name" @click="rewardRouter(item)">{{item.name}}</router-link>
            <router-link :to="'/Admin/RewardRule/Edit?moduleId='+item.id" class="modules-intro" :title="item.intro" @click="rewardRouter(item)">{{item.intro}}</router-link>
            <router-link :to="'/Admin/RewardRule/Edit?moduleId='+item.id" class="modules-buttom" @click="rewardRouter(item)">维度管理</router-link>
          </div>
          <div class="modules_li-right">
            <i class="icon iconfont" :class="item.icon"></i>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import './var.scss'

  export default {
    data () {
      return {
        widgetModel: null,
        searchValue: ''
      }
    },
    props: {
      widget: {}
    },
    mounted () {
      this.init()
    },
    methods: {
      async init () {
        if (this.widgetModel === null) {
          var response = await this.$api.httpGet('/Api/RewardRule/Modules')
          if (response.status === 1) {
            this.widgetModel = response.result.shareModules
          }
        }
      },
      async searchSubimt () {
        this.widgetModel = null
        var para = {
          key: this.searchValue
        }
        var response = await this.$api.httpGet('/Api/RewardRule/Modules', para)
        if (response.status === 1) {
          this.widgetModel = response.result.shareModules
        }
      }
    }
  }
</script>
